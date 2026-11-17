/* Trading Idle denge simülasyonu.
   Oyunun KENDİ kodunu (index.html içindeki /*PURE-START*\/ ... const BONEC satırı + UNLK/FRV/VSEQ satırları) vm ile çalıştırır:
   genK, ratioAt, botPlan, crashEv, errOf, rD/rF/raErr, tüm fiyat sabitleri doğrudan oyundan gelir.
   Oyuncu davranışı (tepki süresi, eşikler, hata) ve tur arası bekleme süreleri VARSAYIMDIR (tahmin), aşağıda TYPES içinde.
   Kullanım: node sim.js <html> <runs> [etiket]  */
const fs = require('fs'), vm = require('vm');

function loadGame(file, seed) {
  const L = fs.readFileSync(file, 'utf8').split('\n');
  const a = L.findIndex(l => l.includes('/*PURE-START*/')), b = L.findIndex(l => l.startsWith('const BONEC'));
  const pick = p => { const l = L.find(x => x.startsWith(p)); if (!l) throw new Error('yok: ' + p); return l };
  const code = 'let S={};\n' + L.slice(a, b + 1).join('\n') + '\n' + pick('const UNLK') + '\n' + pick('const FRV') + '\n' + pick('const VSEQ') + '\n' +
    'this.G={COINS,genK,ratioAt,botPlan,crashEv,errOf,ROBD,ROBF,BMAXL,BMAXR,RC,rlcost,TCC,OTC,OTD,ROBP,AUTOP,FOOD,EB,CB,BONEC,CAPC,SPCP,RMAX,RSLOT,RACCC,RLEVC,rD,rF,raErr,UNLK,FRV,VSEQ};';
  const ctx = vm.createContext({ console });
  vm.runInContext(`(function(){let s=${seed >>> 0};Math.random=function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})()`, ctx);
  vm.runInContext(code, ctx);
  const G = ctx.G; G.rng = vm.runInContext('Math.random', ctx);
  // sayısal (float) kopyalar — BigInt yerine; göreli hassasiyet 1e-16, simülasyon için yeterli
  const n = x => Number(x) / 1e4;
  G.price = G.COINS.map(c => n(c.p)); G.vcost = G.COINS.map(c => c.costs.map(n));
  G.unlockNeed = G.COINS.map(c => n(c.p * G.UNLK[c.cat] / 100n));
  G.nRC = G.RC.map(r => r.map(n)); G.nRL = [0, 1, 2, 3].map(k => Array.from({ length: G.BMAXR[k] - 1 }, (_, i) => n(G.rlcost(k, i + 1))));
  G.nTCC = {}; for (const k in G.TCC) G.nTCC[k] = n(G.TCC[k]);
  G.nOTC = G.OTC.map(n); G.nFOOD = n(G.FOOD); G.nSPC = n(G.SPCP); G.nRSLOT = G.RSLOT.map(n); G.nRACC = G.RACCC.map(n); G.nRLEV = G.RLEVC.map(n);
  G.nROBP = n(G.ROBP); G.nAUTOP = n(G.AUTOP);
  return G;
}

/* ---------------- oyuncu tipleri (TÜMÜ VARSAYIM / tahmin) ----------------
   tau: tepki süresi (gerçek sn) · b: dipten bu kadar dönünce AL · s: tepeden bu kadar düşünce SAT
   err: işlemin yanlış zamanlanma olasılığı (ek 0–1 sn gecikme) · ovh: tur arası elle geçen süre (sn)
   lev: 'best' = beklentisi en iyi kaldıraç, 'max' = hep en yüksek · H: geri dönüş ufku (sn) · wA: otomasyon (Bobby/robot/oto-tur/zaman) ağırlığı */
const TYPES = {
  ortalama: { tau: .40, pace: 3, fmax: .6, err: .15, ovh: 2.5, lev: 'best', H: 600, wA: 1 },
  iyi: { tau: .25, pace: 2, fmax: .8, err: .05, ovh: 1.5, lev: 'best', H: 600, wA: 1 },
  bobby: { tau: .40, pace: 3, fmax: .6, err: .15, ovh: 2.5, lev: 'best', H: 600, wA: 3 },
};
const LEVK = +(process.env.LEVK || 2);
const BUY_OVH = 2, INTRO = 75, MC = 60;   // satın alma başına 2 sn, giriş (bilgisayar onarımı + 10$) 75 sn — tahmin

/* ---------------- tur motorları (sonuçlar 'stake' biriminde: 1 = coin fiyatı) ---------------- */
/* İnsan oyuncu: oyunun kendi botPlan'ı ile, parametreler insan sınırlarından türetilir (VARSAYIM):
   d (gecikme, bacak süresinin oranı) = tepki süresi / ortalama bacak süresi; dönüm noktası çoğaldıkça (yüksek volatilite) insan geç kalır.
   f (yakalanan dip oranı) = 15 sn'de yapılabilen işlem sayısı (tempo) / dip sayısı; en fazla fmax. Zaman Kapsülü (spd) insanı yavaşlatır. */
function humanRound(G, ci, cl, lev, T, spd) {
  const N = G.VSEQ(ci)[Math.min(G.VSEQ(ci).length, cl) - 1], K = G.genK(ci, N, cl);
  const d = Math.min(.85, Math.max(.15, T.tau * spd / (15 / (N + 1)))), f = Math.min(T.fmax, 15 / (T.pace * spd) / (N / 2));
  // grafik takip edilemeyecek kadar hızlıysa (d>0,45) oyuncu al-tut yapar: turun başında alır, sonunda satar (VARSAYIM)
  if (d > .45) { const x = Math.max(-1, lev * (G.ratioAt(K, 15) / G.ratioAt(K, .3) - 1)); let liq = 0, y = x; if (lev > 1) for (let t = .3; t < 15; t += .05) if ((G.ratioAt(K, t) / G.ratioAt(K, .3) - 1) * lev <= -1) { y = -1; liq = 1; break } return { gross: Math.max(0, y), net: y, liq, K } }
  const r = botRound(G, K, d, f, T.err, lev); r.K = K; return r;
}
function botRound(G, K, d, f, e, lev) {
  const ev = G.crashEv(K, G.botPlan(K, d, f, e).flatMap(([a, b]) => [{ t: a, k: 'b' }, { t: b, k: 's' }]));
  let pos = null, t0 = 0, gross = 0, net = 0, liq = 0;
  const liqT = (a, b) => { if (lev <= 1) return -1; for (let t = a; t <= b + 1e-9; t += .02) if ((G.ratioAt(K, Math.min(t, 15)) / pos - 1) * lev <= -1) return t; return -1 };
  for (const x of ev) {
    if (pos !== null) { const lt = liqT(t0, x.t); if (lt >= 0) { net -= 1; liq++; pos = null } }
    t0 = x.t;
    if (x.k === 'b') { if (pos === null) pos = G.ratioAt(K, x.t) }
    else if (pos !== null) { const dd = Math.max(-1, lev * (G.ratioAt(K, x.t) / pos - 1)); net += dd; if (dd > 0) gross += dd; pos = null }
  }
  if (pos !== null) { const lt = liqT(t0, 15); if (lt >= 0) { net -= 1; liq++ } else { const dd = Math.max(-1, lev * (G.ratioAt(K, 15) / pos - 1)); net += dd; if (dd > 0) gross += dd } }
  return { gross, net, liq };
}
const bobbyParams = (G, ci, rl) => { const cat = G.COINS[ci].cat, ix = cat === 3 ? Math.round((rl - 1) * 19 / (G.BMAXL[3] - 1)) : rl - 1; return [G.ROBD[ix], G.ROBF[ix], G.errOf(ci, rl)] };

/* ---------------- Monte Carlo beklenti önbellekleri ---------------- */
function mkCache(G, T) {
  const C = new Map();
  const get = (key, fn) => { let v = C.get(key); if (!v) { let g = 0, n = 0; for (let i = 0; i < MC; i++) { const r = fn(); g += r.gross; n += r.net } v = { g: g / MC, n: n / MC }; C.set(key, v) } return v };
  return {
    player: (ci, cl, lev, spd) => get(`p${ci}|${cl}|${lev}|${spd}`, () => humanRound(G, ci, cl, lev, T, spd)),
    bobby: (ci, cl, rlv, rl) => get(`b${ci}|${cl}|${rlv}|${rl}`, () => { const N = G.VSEQ(ci)[Math.min(G.VSEQ(ci).length, cl) - 1], K = G.genK(ci, N, cl), [d, f, e] = bobbyParams(G, ci, rlv); return botRound(G, K, d, f, e, 2 ** (rl - 1)) }),
    robot: (ci, cl, a, v) => get(`r${ci}|${cl}|${a}|${v}`, () => { const N = G.VSEQ(ci)[Math.min(G.VSEQ(ci).length, cl) - 1], K = G.genK(ci, N, cl); return botRound(G, K, G.rD(a), G.rF(a), G.raErr(a) / 100, 2 ** (v - 1)) }),
  };
}

/* ---------------- tek oyun ---------------- */
function play(G, typeName, maxH = 10) {
  const T = TYPES[typeName], E = mkCache(G, T);
  const st = { t: INTRO, cash: 7, tot: 7, stp: 0, open: G.COINS.map((_, i) => i === 0 ? 1 : 0), cl: G.COINS.map((_, i) => i === 0 ? +(process.env.PEBCL || 1) : 1), ll: G.COINS.map(() => 1),
    rob: 0, rlv: [1, 1, 1, 1], rl: [1, 1, 1, 1], auto: 0, al: 1, tc: 1, spc: 0, rb: [], rci: 0, rclock: 0, rev: {}, food: 0 };
  const log = [], unl = { 0: INTRO / 60 }, buys = [];
  const spd = () => st.tc, val = (o, fin) => fin ? o.n : .5 * o.g + .5 * o.n;
  const nextLocked = () => st.open.indexOf(0);
  const levs = (ci, s) => { const m = G.COINS[ci].boss ? 1 : 2 ** (s.ll[ci] - 1), a = []; for (let l = 1; l <= m; l *= 2) a.push(l); return a };
  const Lr = s => 15 / spd() + Math.min(T.ovh, s.auto ? G.OTD[s.al - 1] / spd() : 1e9);
  // bir durum için en iyi coin+kaldıraç ve saniye başına değer
  function best(s, fin) {
    let bestv = -1e300, pick = null;
    for (let ci = 0; ci < 20; ci++) {
      if (!s.open[ci] || s.cash < G.price[ci]) continue;
      const cand = T.lev === 'max' ? [levs(ci, s).pop()] : levs(ci, s);
      for (const lv of cand) {
        const p = E.player(ci, s.cl[ci], lv, spd()); let g = p.g, n = p.n;
        if (s.rob) { const b = E.bobby(ci, s.cl[ci], s.rlv[G.COINS[ci].cat], s.rl[G.COINS[ci].cat]); g += b.g; n += b.n }
        const v = val({ g, n }, fin) * G.price[ci];
        if (v > bestv) { bestv = v; pick = { ci, lv, g: g * G.price[ci], n: n * G.price[ci] } }
      }
    }
    return pick;
  }
  function robotBest(s, fin) { let bv = 0, bc = -1; for (let ci = 0; ci < 20; ci++) { if (!s.open[ci] || G.COINS[ci].boss) continue; let v = 0; for (const R of s.rb) v += val(E.robot(ci, s.cl[ci], R.a, R.v), fin) * G.price[ci]; if (bc < 0 || v > bv) { bv = v; bc = ci } } return { ci: bc, v: bv } }
  function rate(s, fin) {
    const p = best(s, fin), pr = p ? val(p, fin) / Lr(s) : 0;
    const rr = s.spc && s.rb.length ? robotBest(s, fin).v * spd() / 16 : 0;
    return pr + rr;
  }
  const revd = (k, first) => st.rev[k] || (st.tot >= 1.5 * first ? (st.rev[k] = 1) : 0);
  function candidates() {
    const c = [], cur = best(st, false), ci = cur ? cur.ci : 0;
    // oyuncu yükseltmeleri: tüm açık coinler (oyuncu hangi coinde oynuyorsa onun mağazası; listeden seçebilir)
    for (let i = 0; i < 20; i++) {
      if (!st.open[i] || G.COINS[i].boss) continue;
      // zincir: sonraki 1..kalan seviyenin toplamı da değerlendirilir (ilk adım alınır) — tek adımlık miyopluğu önler
      for (let j = 1; st.cl[i] - 1 + j <= G.COINS[i].max - 1; j++) { let cost = 0; for (let q = 0; q < j; q++) cost += G.vcost[i][st.cl[i] - 1 + q]; c.push({ k: 'cup', i, cost, step: G.vcost[i][st.cl[i] - 1], w: 1, ap: s => s.cl[i] += j, ap1: s => s.cl[i]++ }) }
      for (let j = 1; st.ll[i] + j <= 4; j++) { let cost = 0; for (let q = 0; q < j; q++) cost += G.price[i] * 2 ** (st.ll[i] + q) * LEVK; c.push({ k: 'lup', i, cost, step: G.price[i] * 2 ** st.ll[i] * LEVK, w: 1, ap: s => s.ll[i] += j, ap1: s => s.ll[i]++ }) }
    }
    if (!st.rob && revd('rb', G.nROBP)) c.push({ k: 'bobby', cost: G.nROBP, w: T.wA, ap: s => s.rob = 1 });
    if (st.rob) for (let k = 0; k < 4; k++) {
      if (!st.open[k * 5]) continue;
      for (let j = 1; j <= 4 && st.rlv[k] + j <= G.BMAXL[k]; j++) { let cost = 0; for (let q = 0; q < j; q++) cost += G.nRC[k][st.rlv[k] - 1 + q]; c.push({ k: 'bobLv' + (k + 1), cost, step: G.nRC[k][st.rlv[k] - 1], w: T.wA, ap: s => s.rlv[k] += j, ap1: s => s.rlv[k]++ }) }
      for (let j = 1; j <= 4 && st.rl[k] + j <= G.BMAXR[k]; j++) { let cost = 0; for (let q = 0; q < j; q++) cost += G.nRL[k][st.rl[k] - 1 + q]; c.push({ k: 'bobKal' + (k + 1), cost, step: G.nRL[k][st.rl[k] - 1], w: T.wA, ap: s => s.rl[k] += j, ap1: s => s.rl[k]++ }) }
    }
    if (!st.auto && revd('au', G.nAUTOP)) c.push({ k: 'otoTur', cost: G.nAUTOP, w: T.wA, ap: s => s.auto = 1 });
    if (st.auto && st.al < 5) c.push({ k: 'otoSure', cost: G.nOTC[st.al - 1], w: T.wA, ap: s => s.al++ });
    if (st.tc < 6 && (st.tc > 1 || revd('tc', G.nTCC[2]))) c.push({ k: 'zaman', cost: G.nTCC[st.tc + 1], w: T.wA, ap: s => s.tc++ });
    if (!st.spc && revd('spc', G.nSPC)) c.push({ k: 'otoMerkez', cost: G.nSPC, w: T.wA, ap: s => s.spc = 1, combo: s => { s.spc = 1; s.rb = [{ a: 1, v: 1 }] }, extra: G.nRSLOT[0] });
    if (st.spc && st.rb.length < G.RMAX) c.push({ k: 'robot', cost: G.nRSLOT[st.rb.length], w: T.wA, ap: s => s.rb.push({ a: 1, v: 1 }) });
    st.rb.forEach((R, r) => {
      if (R.a < 10) c.push({ k: 'robDog', cost: G.nRACC[R.a - 1], w: T.wA, ap: s => s.rb[r].a++ });
      if (R.v < 6) c.push({ k: 'robKal', cost: G.nRLEV[R.v - 1], w: T.wA, ap: s => s.rb[r].v++ });
    });
    return c;
  }
  const clone = s => ({ ...s, cl: s.cl.slice(), ll: s.ll.slice(), rlv: s.rlv.slice(), rl: s.rl.slice(), rb: s.rb.map(R => ({ ...R })), open: s.open.slice() });
  function shop() {
    const fin = nextLocked() < 0;
    for (let guard = 0; guard < 40; guard++) {
      const base = rate(st, fin), cur = best(st, fin), reserve = cur ? G.price[cur.ci] : 0;
      let bestC = null, bestPB = Infinity;
      for (const c of candidates()) {
        const cost = c.cost + (c.extra || 0), now = (c.step || c.cost) + (c.extra || 0);
        if (st.cash - now < reserve && !(st.cash - now >= 0 && reserve === 0)) continue;
        const s2 = clone(st); s2.cash -= cost; (c.combo || c.ap)(s2);
        const gain = rate(s2, fin) - base; if (gain <= 0) continue;
        const pb = cost / gain / c.w;
        if (pb < bestPB) { bestPB = pb; bestC = c }
      }
      if (!bestC || bestPB > T.H) return;
      const pay = (bestC.step || bestC.cost) + (bestC.extra || 0); st.cash -= pay; (bestC.combo || bestC.ap1 || bestC.ap)(st); st.t += BUY_OVH;
      buys.push({ t: +(st.t / 60).toFixed(1), k: bestC.k + (bestC.i !== undefined ? ':' + G.COINS[bestC.i].n : ''), cost: pay });
    }
  }
  function credit(g, n) { st.cash = Math.max(0, st.cash + n); st.tot = Math.max(0, st.tot + n); st.stp += g; checkOpen() }
  function checkOpen() {
    const nl = nextLocked(); if (nl < 0) return;
    if (st.stp >= G.unlockNeed[nl]) { st.open[nl] = 1; st.stp = 0; unl[nl] = st.t / 60 }
  }
  const lim = maxH * 3600; let rounds = 0, liqs = 0, idle = 0;
  while (st.t < lim) {
    shop();
    // final
    if (nextLocked() < 0 && st.cash >= G.nFOOD && st.tot >= 1.5 * G.nFOOD) { st.cash -= G.nFOOD; st.t += 30; unl.final = st.t / 60; break }
    const p = best(st, nextLocked() < 0);
    const L = p ? Lr(st) : 5.5;
    // kediye mama: +2$ (su 1$) = +1$ net, aşama kârına +1$, ~5,5 sn (sürükle + 4 sn dökme; tahmin). Nakit yetmezse ya da trade bundan az kazandırıyorsa oyuncu mama döker.
    if (!p || val(p, nextLocked() < 0) / Lr(st) < 1 / 5.5) { credit(1, 1); st.t += 5.5; idle++; }
    else {
      const ci = p.ci, r = humanRound(G, ci, st.cl[ci], p.lv, T, spd()); rounds++; liqs += r.liq;
      let g = r.gross * G.price[ci], n = r.net * G.price[ci];
      if (st.rob) { const cat = G.COINS[ci].cat, [d, f, e] = bobbyParams(G, ci, st.rlv[cat]), b = botRound(G, r.K, d, f, e, 2 ** (st.rl[cat] - 1)); g += b.gross * G.price[ci]; n += b.net * G.price[ci] }
      st.t += L; credit(g, n);
    }
    // robotlar arka planda: her 16/spd sn bir tur
    if (st.spc && st.rb.length) {
      st.rclock += L; const rl = 16 / spd(); const rc = robotBest(st, nextLocked() < 0).ci;
      while (st.rclock >= rl) { st.rclock -= rl; if (rc < 0) break; for (const R of st.rb) { if (st.cash < G.price[rc]) continue; const K = G.genK(rc, G.VSEQ(rc)[Math.min(G.VSEQ(rc).length, st.cl[rc]) - 1], st.cl[rc]); const b = botRound(G, K, G.rD(R.a), G.rF(R.a), G.raErr(R.a) / 100, 2 ** (R.v - 1)); credit(b.gross * G.price[rc], b.net * G.price[rc]) } }
    }
  }
  return { unl, total: unl.final, rounds, liqs, idle, buys, endT: st.t / 60, opened: st.open.reduce((a, b) => a + b, 0) };
}

/* ---------------- toplu koşu ---------------- */
function catTimes(u) {   // katalog süresi: kataloğun ilk coini açıldı → sonraki kataloğun ilk coini (son katalog: final)
  const s = [u[0], u[5], u[10], u[15], u.final];
  return [0, 1, 2, 3].map(k => s[k] !== undefined && s[k + 1] !== undefined ? s[k + 1] - s[k] : null);
}
function median(a) { a = a.filter(x => x !== null && x !== undefined && isFinite(x)).sort((x, y) => x - y); if (!a.length) return null; const m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2 }
function walls(u, G) {   // ardışık iki açılış arasındaki en uzun 3 aralık
  const ev = []; for (let i = 0; i < 20; i++) if (u[i] !== undefined) ev.push([G.COINS[i].n + (G.COINS[i].boss ? '(boss' + (G.COINS[i].cat + 1) + ')' : ''), u[i]]); if (u.final !== undefined) ev.push(['FİNAL', u.final]);
  const gaps = []; for (let i = 1; i < ev.length; i++) gaps.push([ev[i - 1][0] + '→' + ev[i][0], ev[i][1] - ev[i - 1][1]]);
  return gaps.sort((a, b) => b[1] - a[1]).slice(0, 3);
}

if (require.main === module) {
  const file = process.argv[2] || '/home/user/trader_cat/index.html', runs = +(process.argv[3] || 8), tag = process.argv[4] || 'mevcut', maxH = +(process.argv[5] || 10);
  const types = (process.argv[6] || Object.keys(TYPES).join(',')).split(',');
  const out = { file, runs, tag, types: {} };
  for (const ty of types) {
    const res = [];
    for (let r = 0; r < runs; r++) { const G = loadGame(file, 1000 + r * 7919); res.push(play(G, ty, maxH)) }
    const G = loadGame(file, 1);
    const unlMed = {}; for (let i = 0; i < 20; i++) unlMed[G.COINS[i].n + '#' + i] = median(res.map(x => x.unl[i]));
    unlMed.final = median(res.map(x => x.unl.final));
    const cats = [0, 1, 2, 3].map(k => median(res.map(x => catTimes(x.unl)[k])));
    const finished = res.filter(x => x.total !== undefined).length;
    const wallCount = {}; res.forEach(x => walls(x.unl, G).forEach(([k, v]) => { (wallCount[k] = wallCount[k] || []).push(v) }));
    const topWalls = Object.entries(wallCount).map(([k, v]) => [k, median(v), v.length]).sort((a, b) => b[1] - a[1]).slice(0, 4);
    out.types[ty] = { finished, total: median(res.map(x => x.total)), totalMin: Math.min(...res.map(x => x.total ?? Infinity)), totalMax: Math.max(...res.map(x => x.total ?? Infinity)), cats, unlMed, topWalls,
      rounds: median(res.map(x => x.rounds)), liqs: median(res.map(x => x.liqs)), idle: median(res.map(x => x.idle)), opened: median(res.map(x => x.opened)), sampleBuys: res[0].buys };
    const f = v => v === null || v === undefined ? '—' : v.toFixed(1);
    console.log(`[${tag}] ${ty}: bitiren ${finished}/${runs} · toplam medyan ${f(out.types[ty].total)} dk (min ${f(out.types[ty].totalMin)}, max ${f(out.types[ty].totalMax)}) · katalog ${cats.map(f).join(' / ')} dk · tur ${out.types[ty].rounds} · likidasyon ${out.types[ty].liqs} · açılan ${out.types[ty].opened}`);
    console.log('   duvarlar: ' + topWalls.map(([k, v, n]) => `${k} ${f(v)} dk`).join(' | '));
  }
  fs.writeFileSync(__dirname + `/sonuc-${tag}.json`, JSON.stringify(out, null, 1));
}
module.exports = { loadGame, play, TYPES, humanRound, botRound, mkCache };
