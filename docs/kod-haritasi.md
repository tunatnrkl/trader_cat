# Trading Idle: Kod Haritası

Kaynak: `/home/user/trader_cat/index.html` (1955 satır, ~299 KB). Yalnızca okundu, proje dosyası değiştirilmedi.
Not: Satır numaraları `grep -n` / `sed -n` ile doğrulanmıştır. Tahmin içeren maddeler "doğrulanmadı" olarak işaretlidir.

## Dosya yapısı

| Bölüm | Satır aralığı | İçerik |
|---|---|---|
| `<head>` + CSS | 2–447 | `<style>` 14–442, telefon/rotasyon CSS'i 442–447 |
| HTML gövdesi | 448–480 | Sahne, sütunlar, mağaza, menü, final, modal, toast |
| Script 1 | 481–509 | Rotasyon (yatay zorlama) ve viewport hilesi (`innerWidth` descriptor override, 488–494) |
| Script 2 | 510–1955 | Oyunun tamamı (`"use strict"`, 510–511) |
| Saf (pure) bölüm | 514–574 | `/*PURE-START*/` ... `/*PURE-END*/`: ekonomi, işlem hesabı, grafik, Bobby planı |

Dikkat: `"use strict"` satır 510 ve 511'de iki kez yazılı (zararsız).

### Önemli HTML id'leri
- Sahne/sütunlar: `stage`, `left`, `right`, `tabs`, `list`, `sign`, `shop`, `shopc`, `stabs`
- Sol panel: `cashp`, `cashv`, `cbar`, `cnx`, `foodp`, `foodw`, `foodbag`, `bonebtn`, `dogc`, `dbowl`, `kennel`, `pbar`, `ptime`, `bbub`, `pac`, `fbone`, `sackw`, `sackc`
- Monitör: `mon`, `screen`, `cv` (grafik canvas), `hT` (süre), `hP` (% değişim), `hN` (coin adı), `lvr` (kaldıraç butonları), `led`, `mlab`, `note`, `news`, `newst`, `rcpt`, `receipt`
- Tur kontrol: `autob` (otomatik tur butonu), `auto` (Otomasyon Merkezi), `agrid`, `gear`, `gear2` (ayarlar)
- Sahne sonu: `end`, `fx`, `endblack`, `endt`, `endmsg`, `endtime`, `again`
- Menü/overlay: `menu`, `mlogo`, `mwood`, `mpanel`, `mver`, `sil`, `pop`, `fl`, `spot`, `sdim`, `bigsack`, `toast`, `tip`, `modal`, `mt`, `mc`, `mb`, `fl2`, `robsec`, `shint`, `catp`, `catw`, `catc`, `wallR`, `bowl`, `bowlc`, `pour`, `dbar`, `purr`
- Dinamik id'ler: `rc${r}`, `ra${r}`, `re${r}`, `rh${r}` (robot satırları, 1265), `tc${i}`

## 1. Ekonomi verileri

- **Para birimi (BigInt):** `SUF` (satır 515), `D(m,s)` = BigInt, `1$ = 10000 birim` (satır 517–518). `P("10K")` string→BigInt. `cp(u)` biçimlendirme (519–524), `fm`, `sg`, `pcs`, `fa` (1507 civarı).
- **Kayıt anahtarı:** `KEY='trading-idle-save'` (897). `defS()` (896) varsayılan durum, `v:49` sürüm.
- **Coin tanımı `DEF`:** 4 katalog × 5 coin (satır 525–530). Her coin: `[ad, fiyat, seviye maliyetleri]`. Her katalogda 5. eleman "Kedi Maması" (boss). Fiyatlar: K1 Pebble 10 → Kedi Maması 200K; K2 Quasar 4M → 400B; K3 Aurora 20T → 100Qi; K4 Eclipse 10Sx → 1No.
- **`COINS` (532–534):** `DEF`'den türetilir. Alanlar: `i, cat, k, n, boss, p` (BigInt fiyat), `p0` (baz fiyat), `pf` (Number), `costs` (volatilite yükseltme maliyetleri, boss'ta `[]`), `max`, `base`, `c` (renk). Katalog çarpanı `[1,2e6,8e12,6.4e19]`, coin çarpanı `×10` / `×24` / `×45` (satır 533).
- **Renkler:** `COL` (531). **Katalog sabitleri:** `CF`, `CM=[1,4,16,64]` (kaldıraç/katalog çarpanı), `VOLN`, `VCM=[15,40,100]` (volatilite maliyet çarpanı, 533).
- **Açılış eşiği `UNLK`:** `[150n,...]` (1 coin için 1,5 × fiyat NET kâr). `checkOpen()` (929–937) uygular. Yorum: "her katalog ~33 dk".
- **Final kartı eşiği `FRV=51800n`** (satır 936–937 çevresi).
- **Volatilite seviyesi:** `VSEQ(i)` (`i%5===4` ise `[64]`, `i%5===0` ise `[32,16,8]`, diğer `[64,32,16,8]`), `NPT(i)` = seviyeye göre dönüm noktası sayısı (908 civarı, `S.cl[i]`). Maks seviye coin başına `c.max`.
- **Kaldıraç:** `LMAX(ci)` = boss ise 1, değilse 4 (1039). Coin kaldıraç seviyesi `S.ll[ci]`; `lc = c.p × 2^ll × 2` (`lup` eylemi, 1005 civarı). Kaldıraç değerleri `2^(ll-1)`: 1x…64x (`renderLev`, 969).
- **Yükseltme maliyet tabloları (BigInt, `RMP` ile yuvarlanır):**
  - Bobby sahiplenme `ROBP = P('2K')` (1051 civarı; mağaza `rb` eylemi, satır 1008 ve 1011'de "rb").
  - Bobby seviye `RC[k]` (BMAXL'e göre) — `RC` satır 1000-ish blok, `BMAXL=[10,10,10,40]`, `BMAXR=[5,6,6,11]` (566–567).
  - Bobby kaldıraç `rlcost(k,rk)` (satır 571 civarı), `RLC` (593 civarı).
  - Bobby kemik seviyesi `BONEC` (`bup`), kapasite `CAPC` (`cpup`): 9 değer, `bl<10`, `bc<10`.
  - Bobby enerji tablosu `EB=[20,28,40,...,500]` (kemik başına sn), `CB=[60,90,...,3000]` (kapasite sn). `LVM` = [10,30,90].
  - Oto-Tur: `AUTOP=P('500')` (`bau`), seviyeler `OTC` (`aup`, 4 kademe), `OTD=[4,3,2,1,.5]`.
  - Zaman Kapsülü: `TCC[k]` (Sv2..Sv6, `tcu`), oyun hızı `spd()` = `S.tcOn ? S.tc : 1` (1872).
  - Bilgisayar Sv2 `PC2P = RMP(P('1.5M'))` (`pc2`), Süper PC `SPCP = P('500B')` (`spc`, Otomasyon Merkezi).
  - Robotlar: `RSLOT` (ekleme fiyatı, `radd`), `RACCC` (doğruluk yükseltme, `racc`), `RLEVC` (kaldıraç yükseltme, `rkal`; satır 588), `RMAX=4` (en fazla 4 robot).
  - Final mama `FOOD = COINS[19].p × 1600n × 16n` (`fb` eylemi); final kartı `FRV`.
- **Ödül sınıfları:** `reward(tier,...)` (921) → `sfx(tier)` A/B/C ve `banner` (B) veya `milestone` (C). `tier` yükseltme sonrası 'A' / 'B' / 'C' olarak atanır (mağaza handler, 1005–1020).
- **Robot doğruluk tablosu:** `RERR=[54,52,...,22]` (`raErr(a)`), robot gecikme/yakalama `rD(a)` (.30→.10), `rF(a)` (.55→.90) (1275 civarı).
- **Bobby gizli sapma (ROBD/ROBF):** `ROBD=[.49,...,.12]`, `ROBF=[.25,...,.85]`, `BOBS=.04` (566). Arayüzde gösterilmez (yorumda belirtilmiş).
- **Sapma (hata) tablosu:** `mkErr`, `ERRC`, `errOf(ci,L)` (574–577 civarı; PURE bölümü içinde).

## 2. İşlem hesabı, kaldıraç, grafik

- **`calculateTradeResult(buyU, sellU, lev, stakeU)`** (554): tek resmi formül. `delta = stake × lev × (sell−buy)/buy`; `delta ≤ −stake` ise likidasyon (`liq=true`, `delta=−stake`). Döndürür: `{chg, pct, delta, liq, value}`. Tüm işlem yolları (`settle`, `rSettle`, testler) bunu kullanır.
- **`stakeOf(w, ci)`** (1827): pozisyon = `COINS[ci].p × STAKE[w]`; `STAKE={player:1,bobby:1,robot:1}` (1826; tek ayar yeri).
- **`openTrade(w, lv, t, u, ll)`** (1830): oyuncu (`free=false`) için nakitten düşer, `S.cash < st` ise `null` döner. Bobby/robot için `free=true`. `G.tl` listesine ekler.
- **`settle(tr, why, t, u)`** (1831): kapatır; oyuncuda `S.cash += value`, serbest işlemde `S.cash += delta` (negatif olamaz). `S.hist` kaydı, `G.msg`, `notifyPL`, `save()`.
- **`buy()`** (1835): elle alım (`openTrade('Sen', G.lev, ...)`).
- **Fiyat yolu:**
  - `genT(L)` (543): zaman dönüm noktaları, AR(1) log-normal, toplam 15 sn.
  - `genK(ci, N, cl)` (544): fiyat dönüm noktaları `K` (log-fiyat). `SKEWT` (537), `lerpN`. `K.amp` (ci%5===0 ise AMP/2). `K.crash` (katalog sonundaki coinlerde %25 olasılıkla, 1,5–13,5 sn arası, `D` oranı .6–.9).
  - `gauss()` (542): Box-Muller.
  - `segAt(T,t)` (550): ikili arama.
  - `ratioAt0(K,t)` (555): smoothstep ile interpolasyon, `K.amp` ile ölçek.
  - `ratioAt(K,t)` (557): çöküş sonrası ani düşüş; `crash.t` sonrası %40 düşüş 0,25 sn, sonra `(1−u)^8` ile ~%0,2'ye.
  - `priceU(t)` (1823): `G.p0 × ratioAt(G.K, t)`. `setPrice(t)` (1824).
- **Boss çöküşü:** `crashEv(K, ev)` (559): çöküş anından önce alımları siler, `tc+0.2` anında zorunlu satış ekler.
  - `genK` içinde `ci%5===4` ise olasılıkla `K.crash` atanır (boss coin = her katalogun 5. coini).
  - Haber: `frame()` içinde `G.K.crash` → `showNews()` (1415).
- **Likidasyon kontrolü:** `liqd(tr,u)` (1829), `frame()` içinde her karede `settle(...,'liq')`.
- **Kare döngüsü (oyuncu turu):** `start()` (1847) → `frame()` (1853) → `finish()` (1859, 15 sn sonra).
- **Hız:** `G.sp = spd()`, `15000/G.sp` ms. Zaman Kapsülü seviyesi `S.tc` (2–6x).
- **Grafik çizimi:** `drawChart(now)` (1898), `sizeCv` (1895), `drawTile`/`buildGrid` (1282–1286) (ayrı alan).
- **Genel mikro-yardımcılar (doğrulanmadı):** `ready()` (1847 civarı), `hud()` (1937).
- **Tur başı ajan planı:** `robotPlan()` (1842) = `crashEv(G.K, botPlan(...))` ile `G.ev` (olaylar `{t,k:'b'|'s'}`).

## 3. Bobby ve robot sistemi

### Bobby (köpek, tek kişi)
- **Sahiplenme:** mağaza `rb` eylemi (1008/1011 civarı) → `S.rob=1`, `S.en=CB[0]/2`.
- **Enerji:** `updEn()` (1381 öncesi, ~1044–1046 civarı) — `S.en` azalır (yalnız `S.rob && S.robOn && G.st==='active'`), `CB[S.bc-1]` ile sınırlı.
- **`bobOn()`**: `S.rob && S.robOn && S.en>0`.
- **Besleme (kemik):** `feed(e, fromX, fromY)` (1366): kemik ANINDA `EB[S.bl-1]` kadar enerji verir (kapasiteyle sınırlı), animasyon ayrı (`boneFly`, 1362). Kemik `#bonebtn`: tıkla veya sürükle (1369–1373). Kedi `#dogc` hedef.
- **Otomatik işlem:** `botStep()` (1843): `G.ev` olaylarını `G.tn`'e kadar işler; `b` olayında `openTrade('R', ll, e.t, u, ll)`, `s` olayında `settle(G.rbp,'bot',...)`. `ll = 2^(S.rl[cat]-1)` (Bobby kaldıracı, katalog bazında).
- **Bobby durum makinesi:** `bobTick()` (1381), 120 ms aralık. `bobBubble`, `bobEvt`, `setBob(mood, ms)` (1045), `bobUI()` (1068).
- **Bobby testleri:** `runBobbyTests`, `runBobbyE2E` (aşağıda, Bölüm 9).

### Robotlar (Otomasyon Merkezi)
- **Kayıt yapısı:** `S.rb = [{ci, a, v, h, e}]`. `a` doğruluk (1–10), `v` kaldıraç seviyesi (1–6, `2^(v-1)`), `h` son 8 sonuç, `e` üstel ortalama kâr. `RMAX=4` robot.
- **Robot tur motoru:** `robStart(r, now)` (1243 civarı) → `RBT[r] = {ci, K, t0, sp, ev, tr, pl, tl}`. Robot yalnızca açık, boss olmayan coinde işlem yapar (`S.rci`).
- **Tick:** `robTick()` (1249), `setInterval(robTick,100)` (1258 civarı). Olayları işler, likidasyonu kontrol eder (`rLiqT`, 1247), `robEnd` ile tur sonunu kaydeder.
- **Alım/satım:** `rOpen(r, rt, t, uo)` (1243): `stakeOf('robot', ci)` nakitten düşer; `rSettle(rt, t, liq, uo)` (1245): `calculateTradeResult` ile nakde yazar.
- **Robot plan:** `robStart` içinde `crashEv(K, botPlan(K, rD(R.a), rF(R.a), raErr(R.a)/100))`.
- **Robot satın alma/yükseltme:** `robAct(a,t)` (1274): `radd` (robot ekle, `RSLOT[n]`), `racc` (doğruluk, `RACCC[R.a-1]`), `rkal` (kaldıraç, `RLEVC[R.v-1]`), `rbt` (robot açık/kapalı), `rcs` (coin seçimi). `renderRobots()` (1260), `robUI()` (1269).
- **Yönetim görünümü:** `S.view==='auto'` (Otomasyon Merkezi sekmesi), `setView(v)` (1307), `applyPC()` (1311). `S.spc` açılmadan görünmez.

### Biçim doğrulukları
- Testler (Bölüm 9) "elle, Bobby, robot aynı sonucu verir" iddiasını doğrular.

## 4. Kayıt (save/load)

- **Anahtar:** `KEY = 'trading-idle-save'` (897).
- **Yükleme:** `loadSave()` (898–910, IIFE).
  - Sıra: `KEY` → `ti-v11` → `ti-v10` (mig=1) → `ti-v9`.
  - Ayrıştırma: BigInt sentinel `"123n"` → BigInt (`rv` reviver).
  - Kabul koşulu: `typeof j.cash==='bigint' && j.v >= (mig?9:11)`.
  - Sürüm dönüşümleri: `ov<42`, `ov<14`, `ov<15`, `ov<16` (her biri `S.rb`, `S.cl`, `S.rl`, `S.rlv`, `S.tot` vb. kırpar/yeniden hesaplar). `RMAX` fazlası robotlar `RSLOT` ile nakde çevrilir.
  - `catch` boş; hata sessiz yutulur.
- **Kaydetme:** `save()` (911): `JSON.stringify` + BigInt→`"123n"`. Hata yutulur.
- **Sıfırlama:** `resetAll()` (1200): `defS()` ile, `save()`; robot durumu `RBT`/`RBW` temizlenir (v43 sarmalayıcı, ~1609 civarı).
- **Sürüm alanı:** `defS().v = 49` (896). Son migrasyon `ov<42` bloğunda.
- **Dil:** `localStorage 'ti-lang'` (1532 setLang, 1947 okuma).
- **Eski anahtarlar (yalnız okuma):** `ti-v9`, `ti-v10`, `ti-v11`.
- **Yedek dosya:** `/home/user/trader_cat/yedek/index-20261117-2314.html` (299419 bayt, ana dosyayla aynı boyut; içerik farkı karşılaştırılmadı).

## 5. Ana döngü / tick / render

- **Oyuncu kare döngüsü:** `frame()` (1853) → `ui()` + `draw()`. `requestAnimationFrame(frame)`.
- **Grafik döngüsü:** `cvLoop(now)` (1939–1940): `requestAnimationFrame`, `sizeCv()`, `drawChart(now)`, `hud()`. `S.view==='auto'` iken çizim atlanır.
- **Sayaç:** `setInterval(...,1000)` (1942): `S.ptm` (oynama süresi, ms).
- **Robot tick:** `setInterval(robTick, 100)` (1258).
- **Bobby tick:** `bobTick` (120 ms, 1381).
- **Ana UI yenileme:** `function ui()` (1876). Sürücüsü: `renderSide`, `renderLev`, `renderShop`, `renderRobots`, `robUI`, `bobUI`, `checkOpen`, `cashKick`, `applyPC`. `ui` çoklu sarmalanmış: 1604, 1650, 1689, 1769, 1790, 1793, 1808 (her biri öncekini çağırır; `preScreen()` 1688).
- **Kare içi sınırlar:** `RLAST` 250 ms.
- **Tur kontrolü:** `start()` (1847), `finish()` (1859), `ready()`.
- **Oto-tur:** `autoToggle()` (1601), `updAutoB()` (1603).
- **Başlatma:** satır 1946–1955: dil, `menuInit`, `menuRender` (oyun menüyle duraklar, `PAUSED=true`), `setView('main')`, `ready()`, `sackIntro(false)` (S.food varsa), final sahnesi (`S.over`).
- **Duraklatma:** `PAUSED` / `PAUSE_AT` (satır 511). Ana menüde ve ayar penceresi açıkken süre dolmaz.

## 6. Arayüz

### Mağaza kartları
- `card(k, ic, title, state, sg2, btn, tp, cls)` (974): `.sc` kutu, `INFOT` bilgi ikonu.
- `go(a, cost, ok)` (975): satın alma butonu `data-a`, `data-dis` yetersizlikte. `$` ile `cp(cost)`.
- `goU(a, cost, ok)` (977): ilk açılış kilit butonu (`.unl`).
- `tg(a, on)` (980): AÇIK/KAPALI anahtar (`.sw`).
- `seg(n, m)` (953): segmentli bar. `vseg`, `lockN(k, title)`.
- `renderShop()` (983 civarı): tüm kartların HTML'i; `key` ile değişim kontrolü (SH önbelleği).
- **Satın alma dispatcher:** `$('#shop').onclick` (1005–1020). `data-a` değerleri: `cup, lup, rb, rlup, rlev, bup, cpup, bau, au, aup, tct, tcu, pc2, spc, radd/racc/rbt/rcs/rkal` (robAct), `fb`. `data-feed` mama (`feed`), `data-bobc` Bobby bilgi kutusu.

### Sekmeler ve sol panel
- `renderSide()` (957): katalog sekmeleri `#tabs` (`data-cat`), coin listesi `#list` (`data-i`, `data-info`), kilitli coinler `ICN.lock`. `#list` tıklama (1020 sonrası): `G.ci`, `G.lev = 2^(ll-1)`, `ready()`.
- `setView(v)` (1307): `main` / `auto` (Ana PC / Otomasyon Merkezi). `#stabs` tıklama (1651).

### Modal, menü, bitiş sahnesi
- **Ayarlar/modal:** `G.mod` (`'s'` ayarlar, `'i'` bilgi, `'h'`?) — `renderMod()` (1813), `openTrade`... `#modal` (469). Ayarlar anahtarları `tg()` ile: `data-set="test"` (1814) dahil.
- **Ana menü:** `menuLogo()` (1553, piksel yazı `TRADING IDLE`), `menuInit()` (1561), `menuRender()` (1563, `data-m="play"`), `menuShow()`/`menuHide()` (1569–1570). Klavye gezinmesi: `MENU={screen,idx}` (1552).
- **Bitiş:** `endGame()` (1098): `S.over=1`, zamanlayıcıları temizler, `save()`, `playFinal(false)`. `finalText()` (1099): `FINALMSG` + oyun süresi. `showEndText(instant)` (1100). `playFinal(skip)` (1108): çuval/mama ile final animasyonu. `#again` düğmesi `resetAll`.
- **Final mama:** `sackIntro(bool)` (1331). `S.food` açık ise açılışta çalışır.
- **Tur sonu özeti:** `showReceipt()` (1204), `hideReceipt()` (1212), `#rcpt`, `#receipt`.
- **Spot/karartma:** `spot()`, `spotClear()`, `spotNext()` (1315–1317), `spotNow(get,msg)` (1592). `#spot`, `#sdim`, `SPQ` (1314).
- **Toast/ipucu:** `toast(t,bad)` (914), `tipShow` (1543), `tipHide` (1542).
- **Haber bandı:** `showNews()` (1415), `#news`, `#newst`.
- **Kedi/Bobby:** `introCat()` (1692), `silDraw` (1730), `silFocus`, `silNext`. Kedi "SİL" ekranı `#sil`/`#silc`.

## 7. I18N ve L() çeviri sistemi

- **Sözlük:** `const I18N = { en: {...}, pat: [...] }` (1492). `I18N.en` tam metin eşlemesi; `I18N.pat` regex kalıpları (`$1`, `$2` yakalama grupları).
- **Dil seçimi:** `LANG` (`'tr'` varsayılan, 511); ilk açılışta `?lang=` → `S.set.lang` → `localStorage 'ti-lang'` → `navigator.language` (1947). `setLang(l, doSave)` (1532).
- **Çeviri fonksiyonu `L(s)`** (1526): TR ise değişmez; EN ise tam eşleşme, sonra `I18N.pat`, aksi halde orijinal. Boşluklar korunur.
- **DOM çevirisi:** `trNode(n)` (1528) text node'ları çevirir; `trTree(root)` (1529); `TROBS` MutationObserver (1530) yeni eklenen düğümleri ve değişen metinleri izler. `_orig` (WeakMap'a benzer) orijinal Türkçe metni saklar.
- **Takma ad:** `TT(s)` = `L(s)` (1586).
- **Çeviri kapsamı:** Kod içinde doğrudan `'...'` yazılan metinler `L()` ile geçer; `renderShop`, `renderSide`, `renderMod` gibi çizimler `L()` kullanır. `hud()` (1937) `L(c.n)` kullanır. Tam kapsam doğrulanmadı.
- **Yerel gölgelemeler:** `const L=` tanımları (544, 1293, 1811, 1899) fonksiyon içi yerel değişkendir ve global `L()` fonksiyonunu gölgeler. Bu fonksiyonların içinde `L(...)` çağrısı yapılırsa hata çıkar. Bu çağrılar bu kod tabanında yapılıyor mu, doğrulanmadı.

## 8. Ses

- **Müzik motoru:** `MUS` (1610) `{ctx, next, step, bar, tm, last, bpm:96}`. Frekans `MF(n)` (1619) = `440×2^((n−69)/12)`.
  - `mTone` (1612), `mNoise` (1613), `mKick` (1614), `mMeow` (1615), `mBark` (1618), `mPad` (1623), `mNote` (1624).
  - `musTick()` (1625): 60 ms aralıklı planlayıcı (`setInterval(musTick,60)`, `musStart` içinde).
  - `musStart()` (1641): `AudioContext` oluşturur, ilk kullanıcı etkileşiminde (`pointerdown`/`keydown`, 1647) tetiklenir.
  - `musSync()` (1644): `S.set.mus` ile `suspend`/`resume`.
  - `musFast()` (1611): boss yaklaşınca tempo artışı (`k===3` veya katalog kapalı).
- **Efekt motoru:** `SX` (1655) `{ctx, out}`. `sxCtx()` (1656), `sxTone` (1657), `sxNoise` (1658), `sfx2(k)` (1659) — `k`: `unlock`, `crt`, `meow` vb.
- **Eski efekt motoru:** `tone(f,d,t,v,dl)` (917), `sfx(tier)` (918, `S.set.snd`), `sfx2` yeni. `sfx('A'|'B'|'C'|'X')`.
- **Ayar anahtarları:** `S.set.snd` (efekt), `S.set.mus` (müzik) (1648 civarı varsayılan 1).

## 9. Testler

Hepsi `window.*` ile açık (1449, 1471):

- **`runTradeTests()`** (1425): `TRADE_CASES` 6 vaka `[alış, satış, kaldıraç, beklenen%]`. Her biri üç yolda (elle `openTrade('Sen')` + `settle`, Bobby `openTrade('R', ..., lev)`, robot `rOpen`/`rSettle`) çalışır; para (`S.cash` farkı) ve yüzde beklentiyle karşılaştırılır. `console.table`. Test sırasında `_tBackup`/`_tRestore` ile durum korunur, `S.set.snd=0`. Bağımsız nakit `1e6` kullanır.
- **`runRobotE2E(lev=16, ci=1)`** (1440): tek robot, gerçek grafik (`genK`, `crashEv`, `botPlan`), gerçek `rOpen`/`rSettle`/likidasyon. Kâr yüzdesini `calculateTradeResult` ile karşılaştırır. Sonuç `console.table`.
- **`runBobbyTests()`** (1453): `BOBBY_CASES` 6 vaka `[fiyat, alış, satış, kaldıraç, beklenen%, beklenen para]`. Her vakada `openTrade`/`rOpen` yolları eşlenir (nakit 1e7). Beklenen para `SC = COINS[ci].p/p0` ile ölçeklenir.
- **`runBobbyE2E(ci=1, lv=8)`** (1463): gerçek `botStep` ile 0–15 sn arası tüm turu çalıştırır (adım 0,01 sn). `settle` sarmalanır; her işlem `log`'a yazılır. Toplam bakiye değişimi işlemlerin toplamına eşit mi diye kontrol eder.
- **Dikkat:** Bu testler `S.cash` değerini 1e6–1e9 olarak değiştirir ve `_tRestore` ile geri alır. Hata durumunda `finally` çalışır.
- **Sayfa kısayolu:** `?nomenu` ile menü atlanır (1692, 1704, 1708, 1741, 1756, 1766, 1802, 1947). Testler için kullanılır.

## 10. CSS ve HTML yapısı

- **CSS (14–442):** bölümler `/* --- ... --- */` ile işaretli:
  - 14–20: kolon/ana yapı; 44–82: sahne; 83–91: alt paneller (sol mama, sağ kedi); 92–111: mağaza (mantar pano); 112–131: paneller; 132–137: sistem çubuğu; 138–143: Otomasyon Merkezi; 144–151: robot deposu; 152–163: karartma + spot; 164–168: bölüm başlıkları; 169–186: ARAYÜZ KONFORU "Yumuşak"; 187–202: Bobby paneli; 203–207: haber bandı; 208–212: sayı fontu (5x7 piksel); 213–219: boss ekranı kırmızı kenar; 220–249: sanat/palet; 250–278: butonlar ve ipuçları; 279–295: ANA MENÜ; 296–…: grup kutuları, renk.
- **Telefon/rotasyon (442–447):** yatay oyun, dikeyde 90° döndürme (`html.rot`, `#rot`).
- **HTML gövdesi (448–480):**
  - `#stage` (sahne) içinde `#left` (sol panel), `#scene` (455), `#mon` (monitör, 458), `#screen` (459), `#cv` (460), `#right` (472), `#end` (476), `#menu` (477), `#sil` (478), `#pop` (479), `#fl` (480), `#toast`, `#tip`.
- **Dinamik ekleme:** `#modal` `#stage` içine taşınır (1586 civarı), `#auto` `#screen` içine taşınır (1597 civarı).

## 11. Hile ve geliştirici kancaları (QA için kritik)

1. **Test kipi (`S.set.test`) — para enjeksiyonu:** `ui()` (1876) içinde `if (S.set.test && S.cash < D(500000,'No'))` ise `S.cash`, `S.lc`, `S.stp`, `S.tot` değerlerini `D(1000000,'No')` seviyesine yükseltir. Açma anahtarı ayarlar penceresinde `data-set="test"` (1814). Bu kip açıkken oyuncu sınırsız para alır. Ayrıca `lc` ve `tot` de artırıldığı için açılma ve kazanç takibi etkilenir.
2. **`window.*` açık fonksiyonlar (1449, 1471, 1148):**
   - `window.runTradeTests`, `window.runRobotE2E`, `window.runBobbyTests`, `window.runBobbyE2E`.
   - `window.__fin` (1148) ve `__finGo` (1147): final sahnesini tetikler (ayrıntısı okunmadı, doğrulanmadı).
   - `window.menuShow`, `window.menuHide` (1572).
3. **`?nomenu` URL parametresi:** ana menüyü, tanıtım ekranını (`introCat`), mama sahnesini atlar. QA için hızlandırır.
4. **`?lang=en|tr`:** dil zorlar (1947).
5. **Zaman hızlandırma:** Zaman Kapsülü (`S.tc` 2–6x, `S.tcOn`) oyun saatini hızlandırır (spd()). Gerçek satın alma gerektirir.
6. **Konsol üzerinden doğrudan durum değişimi:** `S` (global `let`) — `let S` modül kapsamında değil, script düzeyinde. Tarayıcı konsolunda `S` erişilebilir (ayrıca `G`, `COINS`, `save`, `loadSave`). Bu iki satırdan çıkarım, doğrulanmadı (script `"use strict"` ile çalışıyor, `let` global lexical scope'tadır, konsolda erişilebilir).
7. **Bobby/robot "gizli" değerler:** `ROBD`, `ROBF`, `RERR`, `ERRC`, `BOBS` arayüzde gösterilmez (yorum). QA için kaynak değerleri buradan okunur.
8. **localStorage silme:** `resetAll()` (1200) "Her şeyi sıfırla" butonunun işlevi (`S=defS(); save()`).

## Doğrulanmadı / bulunamadı

- `ui()` (1876) gövdesinin tamamı okunmadı; yalnız ilk satırları ve yardımcı çağrı listesi.
- `sackIntro`, `renderMod`, `bobBubble`, `setBob`, `robUI` içleri ayrıntılı okunmadı.
- `RC` (Bobby seviye maliyet dizisi) ile `RLC`, `TCC`, `OTC` değerlerinin tam sayısal çıktısı hesaplanmadı (formüllere dayalı: `sig2` ve `RMP` ile yuvarlanır).
- `window.__fin` ve `__finGo` (1147–1148) için davranış ayrıntısı okunmadı.
- `yedek/` yedek dosyası ile ana dosya arasında içerik farkı karşılaştırılmadı (yalnız boyut aynı: 299419 bayt).
- `L()` gölgelenmesinin çağrı düzeyinde gerçekten bir hataya yol açıp açmadığı test edilmedi.
- Testler çalıştırılmadı (yalnızca okundu).

## Ne değişti / Ne test edildi / Ne riskli

**Ne değişti:** Hiçbir proje dosyası değiştirilmedi. Yalnız bu harita `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/kod-haritasi.md` olarak yazıldı.

**Ne test edildi:** Kodun kendisi okundu; `runTradeTests`, `runBobbyTests`, `runRobotE2E`, `runBobbyE2E` çalıştırılmadı.

**Ne riskli:**
- `S.set.test` kipi, açıkken para enjeksiyonu yapar; üretimde açılabilir olduğu için QA sonuçları bu kipe bağlı olabilir.
- `window.__fin`/`__finGo` gibi geliştirici kancaları yayında açık.
- Oyun durumu tek `localStorage` anahtarında ve BigInt ile JSON dönüşümünde tutulur; sürüm migrasyonları (`ov<42` gibi) karmaşık ve test edilmemiş olabilir.
- `"use strict"` iki kez yazılı (zararsız); `const L` yerel gölgelemesi (544, 1293, 1811, 1899) çağrı yerlerinde hataya yol açabilir.
- Çok uzun satırlar (base64 görseller, 8 KB üzerinde satırlar) düzenlemeyi ve diff okumayı zorlaştırır.
