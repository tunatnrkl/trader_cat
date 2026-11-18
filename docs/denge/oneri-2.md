# Denge önerisi 2 — Katalog 1 ritmi, iflas kapanı, aktif/otomatik

> **Güncel durum: aşağıdaki "Düzeltme 1" bölümü geçerlidir** (Yönetici Ret 1: `UNLK[0]` 150'de kalır). İlk sürümdeki `UNLK[0]=100` geri alındı.
> Durum: **Sorun 1 UYGULANDI** (`index.html`, yalnız sayı sabitleri). Sorun 2 tasarım (Yazılımcı uygulayacak). Sorun 3 yalnız öneri.
> Yedek: `yedek/index-20261118-1655.html`. Tarih: 2026-11-18. Oyun tasarımcısı (Opus).
> Geçici betikler/ham sonuçlar: `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/tasarimci/` (`olc.js`, `rapor.js`, `vars.js`, `res-*.json`, `once.txt`, `sonra.txt`).

## Ölçüm notu (önemli)
- `araclar/denge/sim.js`'in varsayılanları oyunla uyuşmuyor: `PEBCL=1` (oyunda Pebble Sv.2 ile başlar, `defS`) ve `LEVK=2` (oyunda kaldıraç fiyatı = coin × hedef kaldıraç, ×2 yok). Bu ölçümlerin hepsi **`PEBCL=2 LEVK=1`** ile yapıldı. Teşhis 1'deki 147,9 / 56,7 dk büyük olasılıkla varsayılanlarla ölçüldü; aynı dosya oyunla uyumlu ayarda 139,7 / 52,4 dk veriyor. sim.js'e dokunmadım; öneri: varsayılanları 2 ve 1 yapmak (Yönetici kararı).
- 5 koşu × 3 tip, medyan (min–maks). Aynı tohumlar (sim deterministik). Oyuncu davranışı varsayımdır (sim.js başlığı) → tüm süreler **(tahmin)**.
- Katalog süresi = kataloğun ilk coini açıldı → sonraki kataloğun ilk coini (Kat.4: Eclipse → final). Kat.1 geçişleri: Pebble→Ember→Nova→Titan→Boss1→Quasar.

## Sorun 1 — Katalog 1 ritmi (UYGULANDI)

### Teşhis (geçiş başına, önce)
Kat.1 düzensizdi: ortalama oyuncuda 6,3 / **12,2** / **10,3** / 4,6 / **17,8** dk. Duvarlar:
- Ember→Nova, Nova→Titan: ortalama oyuncu 64 dönümlü Ember'i takip edemiyor, volatilite yükseltmesi (950$) gelene kadar al-tut yapıyor; Nova'yı hiç oynamıyor, Ember'de 8x ile Titan'a kadar kalıyor.
- Boss1→Quasar: Quasar 80M (Boss1'in 400 katı) + 300M aşama kârı; para Bobby Kat.1 kaldıracından (3.2M+6.4M+12.8M+30M) sonra geliyor. İyi oyuncu bile 14,3 dk bekliyor.
- Kullanıcının "çok hızlı geçiliyor" hissi iyi oyuncuda doğru: iyi oyuncu Kat.1'in ilk 4 geçişini 2,4–3,3 dk'da yapıyor.

### Eski → yeni
| # | Sabit (index.html) | Eski | Yeni | Neden |
|---|---|---|---|---|
| 1 | `UNLK[0]` (Kat.1 açılma eşiği) | 150 | **100** | Ember/Nova/Titan/Boss1 eşiği: 150/1.8K/22.5K/300K → 100/1.2K/15K/200K |
| 2 | Kat.1 volatilite maliyeti (`COINS` satırı, `costs` → `PP*m/(k===0?20n:10n)`) | fiyat × 1 / 2,5 / 6 | fiyat × **0,5 / 1,25 / 3** | Ortalama oyuncu Ember'i yükseltip trade edebilsin (Ember 950$ → 475$). Kat.2–4 aynı |
| 3 | Bobby Kat.1 kaldıraç (`rlcost`, k=0 çarpanı) | 3.2M / 6.4M / 12.8M / 30M | **1.6M / 3.2M / 6.4M / 15M** | Boss1→Quasar duvarı |
| 4 | Bobby Kat.1 son seviye (`RC[0]`, geometrik dizinin sonu) | Lv2–10: 2.4K … 1.6M | **2.4K … 800K** (5K, 10K, 21K, 44K, 91K, 187K, 387K, 800K) | Boss1→Quasar duvarı; ilk seviye aynı |
| 5 | Quasar fiyatı (`COINS`, `k===1&&j===0?7n`) | 80M | **56M** (eşik 300M → 210M) | Boss1→Quasar ×400 sıçraması ×280'e iner. Yalnız Quasar; Zenith… aynı |
| 6 | Vortex fiyatı (`k===2`, `j===1?16n`) | 7.68Qa | **5.12Qa** | Aurora→Vortex duvarı (13,5 dk) |
| 7 | Pulsar fiyatı (`k===3`, `j===1?70n`) | 287Sx | **179Sx** | Eclipse→Pulsar duvarı (19,8 dk) |
| 8 | `UNLK[3]` (Kat.4 eşiği) | 900 | **1300** | 6–7 kısaldığı için Kat.4'ü ve iyi oyuncu toplamını geri uzatır |

Değişmeyenler (doğrulandı, sim ile sabitler karşılaştırıldı): Pebble, Aurora, Eclipse ve boss fiyatları; `RSLOT` (1.92Qa zinciri), `RACCC`, `RLEVC`, `TCC`, `OTC`, `FOOD`, Bobby Kat.2–4 (`RC[1..3]`, `rlcost` k≥1), `ROBP`, `AUTOP`, `VCM`, `VSEQ`, `FRV`. Değişiklikler yalnız `PP` (oyun fiyatı) üzerinde; `p0` aynı kaldığı için ona bağlı türetilmiş fiyatlar kaymaz.
Not: ilk denemede Quasar çarpanı yanlışlıkla Aurora'yı da (→ `RSLOT`) değiştiriyordu; düzeltildi, son sürümde Aurora 320T ve RSLOT aynı.

### Denenen adaylar (ortalama / iyi, 3–5 koşu, medyan)
| Aday | İçerik | Ort. toplam | Ort. Kat.1 | B1→Quasar | İyi toplam | Sonuç |
|---|---|---|---|---|---|---|
| önce | — | 139,7 | 52,4 | 17,8 | 89,9 | — |
| u100 | yalnız UNLK[0]=100 | 140,3 | 49,6 | 18,2 | 89,3 | Eşik tek başına zayıf (ders doğrulandı) |
| u100k | + Bobby Kat.1 kaldıraç ÷2 | 135,4 | 46,1 | 14,9 | 86,8 | Yetmez |
| c1 | + Quasar ucuz + Kat.1 vol ÷2 | 131,7 | 36,2 | 11,3 | 85,1 | Kat.1 iyi; ama Aurora da ucuzlamıştı (hata) |
| d1/d2 | Quasar 32M | 204 / 137 | 35,3 / 34,7 | 10,4 / 9,0 | 94,5 / 102,8 | **Tuzak:** Quasar→Zenith bazı koşularda 76–82 dk |
| f1 | Quasar 48M | 126,3 | 35,6 | 10,5 | 90,7 | Bobby tipinde 1/5 koşuda Quasar→Zenith 58 dk |
| **f3 (seçilen)** | Quasar 56M | **129,8** | **36,5** | 11,6 | **92,3** | 15/15 koşuda tuzak yok |

Gözlem: Quasar ucuzladıkça Kat.1 kısalıyor ama Quasar→Zenith adımı (×14) bazı koşularda kilitleniyor. 56M güvenli taraf.

### Önce / sonra (5 koşu, medyan (min–maks), dk)
| Tip | | Toplam | Kat.1 | Kat.2 | Kat.3 | Kat.4 | Mama sayısı |
|---|---|---|---|---|---|---|---|
| Ortalama | önce | 139,7 (137,4–144,3) | 52,4 (47,6–55,9) | 27,8 (24,9–29,6) | 29,0 (28,6–29,6) | 30,7 (30,4–33,0) | 48 |
| | **sonra** | **129,8 (125,3–133,8)** | **36,5 (33,1–37,8)** | 29,4 (27,8–31,9) | 30,4 (29,3–30,9) | 32,4 (31,6–33,3) | 16 |
| İyi | önce | 89,9 (82,1–96,5) | 25,4 (24,8–28,4) | 14,2 (13,1–14,8) | 19,7 (19,2–20,5) | 29,6 (19,3–36,3) | 3 |
| | **sonra** | **92,3 (81,2–95,3)** | 19,9 (16,9–21,0) | 15,5 (13,6–16,3) | 23,1 (21,5–25,0) | 32,7 (21,5–37,6) | 3 |
| Bobby-öncelikli | önce | 141,0 (138,2–144,8) | 52,4 (48,9–55,9) | 27,2 (24,8–30,2) | 30,2 (28,1–30,8) | 30,0 (29,2–31,1) | 48 |
| | **sonra** | **128,1 (124,9–132,4)** | 37,1 (33,1–40,0) | 29,2 (28,1–30,3) | 29,8 (29,2–31,6) | 31,8 (30,6–32,0) | 16 |

Kat.1 geçiş başına (dk):
| Tip | | Pebble→Ember | Ember→Nova | Nova→Titan | Titan→Boss1 | Boss1→Quasar |
|---|---|---|---|---|---|---|
| Ortalama | önce | 6,3 (6,2–7,6) | 12,2 (10,7–15,3) | 10,3 (7,5–11,7) | 4,6 (4,3–8,2) | 17,8 (14,8–18,8) |
| | **sonra** | 5,1 (5,1–5,7) | 7,1 (6,0–11,3) | 5,8 (4,1–7,0) | 4,6 (4,4–6,4) | 11,6 (10,8–13,3) |
| İyi | önce | 2,5 (2,3–3,4) | 3,3 (3,2–4,3) | 2,4 (2,2–3,5) | 3,1 (1,7–3,4) | 14,3 (14,1–14,7) |
| | **sonra** | 2,3 (1,8–2,8) | 3,5 (2,4–3,8) | 2,4 (1,9–3,3) | 2,3 (1,6–2,5) | 9,2 (8,9–10,3) |
| Bobby | önce | 6,3 (6,2–7,6) | 12,2 (10,7–15,3) | 10,3 (7,5–11,7) | 4,9 (4,3–6,7) | 18,5 (16,3–18,8) |
| | **sonra** | 5,1 (5,1–5,7) | 7,1 (6,0–11,3) | 5,8 (4,1–7,0) | 6,4 (4,6–7,3) | 11,1 (10,8–11,8) |

En uzun duvarlar (ortalama): önce Eclipse→Pulsar 19,8 · Boss1→Quasar 17,8 · Aurora→Vortex 13,5 · Ember→Nova 12,2 → sonra Eclipse→Pulsar 18,1 · Quasar→Zenith 13,1 · Boss3→Eclipse 13,0 · Boss1→Quasar 11,6 (Aurora→Vortex 9,8).

### Hedefe uyum (dürüst)
| Hedef | Sonuç |
|---|---|
| Ort. Kat.1 25–35 dk | **36,5** — 52,4'ten indi ama 1,5 dk üstünde (yakın, tutmadı) |
| Kat.1'de hiçbir geçiş >10 dk değil | Ortalama: 4/5 geçiş ≤ 7,1 (medyan); **Boss1→Quasar 11,6** tutmadı; Ember→Nova maks 11,3 (1/5 koşu). İyi: hepsi ≤ 10,3 |
| İlk geçiş ≥ 2 dk | Medyan 2,3 (iyi) / 5,1 (ortalama) tuttu; iyi oyuncuda 1/5 koşu 1,8 dk |
| Kat.2–4 her biri 25–35 (ortalama) | 29,4 / 30,4 / 32,4 **tuttu** (Bobby tipi de 29,2 / 29,8 / 31,8) |
| Toplam ort. 120–150 | 129,8 **tuttu** |
| İyi oyuncu ≥ 95 | **92,3** (önce 89,9) — tutmadı, biraz iyileşti |
| Duvar yumuşatma | Eclipse→Pulsar 19,8→18,1 (az), Aurora→Vortex 13,5→9,8, Bobby'de Vortex→Nebula 47 dk duvarı oyunla uyumlu ayarda zaten yok (2,7) |

Kalan iş (sonraki oturum adayı, ölçülmedi): Boss1→Quasar'ı 10 dk altına indirmek için Bobby Kat.1 Lv seviyeleri (RC[0]) daha ucuz ya da Quasar 48M; ama 48M'de tuzak riski var (bkz. f1). Eclipse→Pulsar hâlâ en uzun adım; iyi oyuncuda 7,6–23,4 arası iki modlu.

### Eski kayıt etkisi
- Kayıt formatı, anahtar, `v` değişmedi; yeni alan yok. Eski kayıt (yedek dosyada oluşturuldu: 3 coin açık, Ember Sv.3/kaldıraç Sv.3, Bobby Lv4, nakit 5.000$, aşama kârı 300$) yeni dosyada aynen açıldı; testler geçti.
- Kat.1 eşiği düştüğü için Kat.1'deki eski oyuncuda sıradaki coin hemen açılabilir (her kontrolde en çok 1).
- Kat.4'teki eski oyuncunun ilerleme çubuğu geri düşer (900 → 1300). Bozulma değil, algı.
- Pahalıya alınmış Kat.1 volatilite / Bobby kaldıracı için iade yok (önceki kararla aynı).

## Sorun 2 — İflas kapanı ve açılış metni (TASARIM, Yazılımcı uygular)

En küçük çözüm: **Pebble'da kurtarma turu** + metinlerin eylemle uyuşması. Kayıt alanı yok, `calculateTradeResult` aynı.

### 2a. Kurtarma turu (yalnız Pebble)
Kural: Pebble'da nakit 10$'ın altında ama en az 1$ ise oyuncu **eldeki tüm nakitle, 1x** tura girebilir. Kazanç küçük ama oyuncu oynamaya devam eder; nakit 1$'ın altındaysa yine mama.
- `start()` (~satır 2758): `S.cash<c.p` koşulu → `S.cash<(G.ci===0?D(1):c.p)`.
- `openTrade(w,lv,t,u,ll)` (~2738), yalnız oyuncu yolu (`!free`): `const st` → `let st`; `if(!free&&G.ci===0&&S.cash<st&&S.cash>=D(1)){st=S.cash;lv=1}`. Pozisyon = `st` olarak `calculateTradeResult`'a gider (fonksiyon değişmez).
- `ui()` hazır dalı (~2791): `ok` ve `dis` aynı kuralı kullanır (Pebble'da `S.cash>=D(1)`); aktif dal (~2792) AL düğmesi için de aynı.
- Oto-Tur koşuluna (`S.cash>=c.p`) **dokunma**: kurtarma turu yalnız elle başlar (otomatik kumar döngüsü olmasın).
- Bobby/robot etkilenmez (Bobby nakitsiz; robotlar kendi `stakeOf('robot')` ile).

### 2b. Metinler (TR → EN)
| Yer | Eski TR | Yeni TR | Yeni EN |
|---|---|---|---|
| BAŞLA notu, Pebble, nakit < 1$ (veya `!S.hintOff`) | `En az $10 gerek. Kedi mamasını kaba götür!` | `En az $10 gerek. Mama paketini kediye dök: $1 öde, $2 kazan.` | `At least $10 needed. Pour a food pack for the cat: pay $1, get $2.` |
| BAŞLA notu, Pebble, 1$ ≤ nakit < 10$ (yeni) | — | `Kurtarma turu: tüm nakitle ($X) 1x oynarsın. Ya da kediye mama dök.` | `Rescue round: you play all your cash ($X) at 1x. Or pour food for the cat.` |
| AL notu, kurtarma turunda (yeni) | `Pozisyon: $X (katalog fiyatı).` | `Pozisyon: $X (tüm nakit, 1x).` | `Position: $X (all cash, 1x).` |
| Mama paketi ipucu (`#foodw` `data-tip`, ~1963) | `Kedi maması: kaba sürükle, 4 sn tut, +$2.` | `Mama paketi $1. Kabın üstüne bırak, 4 sn bekle: +$2 (net +$1).` | `Food pack costs $1. Drop it on the bowl, wait 4 s: +$2 (net +$1).` |
| Tanıtım 3. adım (introCat, ~2603) küçük metin | `…Her mamada para kazanırsın; 10$ biriktirince…` | `…Paket $1, kedi yiyince $2 verir; 10$ biriktirince bilgisayarı onarabilirsin.` | `…A pack costs $1 and pays $2 when the cat eats; save $10 to fix the computer.` |

Uygulama notları:
- Mevcut `En az $10 …` notu EN'de doğru çevriliyor (Playwright: `At least $10 needed. Bring the cat food to the bowl!`); `I18N.en`'deki `'gerek. Kedi mamasını kaba götür!'` anahtarı gibi yeni parçalar eklenir. Yeni cümleler `$` içerdiği için `?lang=en` ile mutlaka bakılmalı; çevrilmezse `I18N.pat`'e kalıp eklenir (ör. `[/^Kurtarma turu: tüm nakitle \$(\S+) 1x oynarsın\. Ya da kediye mama dök\.$/,'Rescue round: you play all your cash $$1 at 1x. Or pour food for the cat.']`).
- Tanıtım "Şu mama paketini al!" zaten paket diyor; sorun "kaba götür" ve ilk alışta görülen kırmızı "-$1". Yeni ipucu bu düşüşü önceden söyler. Görsel değişiklik yok.
- Telefon yatayında yeni notların taşmasına bakılmalı (`#note`).
- Beklenen etki (tahmin): kötü oyuncu 7,04$'da tura girebilir; mama döngüsüne dönüş azalır. Sim'de bu yol modellenmedi.

## Sorun 3 — Aktif / otomatik seçimi (YALNIZ ÖNERİ, uygulanmadı)

Ölçüm: oyunla uyumlu ayarda Bobby-öncelikli oyuncu ortalamadan farksız (önce 141,0 vs 139,7; sonra 128,1 vs 129,8). Bobby'yi ucuzlatmak işe yaramıyor — denendi:
| Deneme (yeni sürüm üstüne, 3 koşu) | Bobby alım dk (bobby tipi) | Bobby tipi toplam | Ortalama toplam |
|---|---|---|---|
| şimdiki | 19,6 | 128,1 | 129,8 |
| `ROBP` 2K → 600 | 16,2 | 132,2 | 133,0 |
| + Kat.1 Bobby ara seviyeler ucuz | 16,2 | 127,8 | 136,1 |
Sonuç: sorun Bobby'nin fiyatı değil, erken seviyelerdeki **gücü** (Lv1: dönüşlerin %25'i, gecikme %49) ve elle oynamaya göre farkının küçük olması.

Öneriler (sonraki oturum, sim'le ölçülmeli):
- **A) Bobby erken seviye gücü:** `ROBF` ilk 3 değer `.25,.30,.35` → `.35,.40,.45`; `ROBD` ilk 3 `.49,.46,.43` → `.42,.40,.38`. Bobby'yi önceleyen oyuncu Kat.1–2'de belirgin hızlanır (tahmin: Bobby tipi −8…−12 dk, ortalama −3…−5 dk). Risk: iyi/ortalama farkı daralır; iyi oyuncu toplamı düşer → `UNLK[1]` ile dengelenmeli.
- **B) Aktif oyun ödülü (sayı değil, mekanik):** elle yapılan kârlı işlem aşama kârına ×1,5 sayılsın, Bobby/robot ×1. Aktif oyuncu ilerlemede, otomatik oyuncu nakitte öne geçer → gerçek seçim. Yeni kayıt alanı gerekmez (`stpAdd` çağrısında çarpan). Tahmin: iyi oyuncu Kat.1–2'de −%15, idle tercih eden +%5–10.
İkisi de kumar/aciliyet eklemez.

## Kontroller
- `node araclar/qa/smoke.js`: **63/63 geçti** (kalan 0).
- Playwright, `file:///home/user/trader_cat/index.html?nomenu`: `runTradeTests()` **GEÇTİ**, `runBobbyTests()` **GEÇTİ**, konsol hatası **0**.
- Eski kayıt: `yedek/index-20261118-1655.html` ile kayıt oluşturuldu (v49, open `111000…`, nakit 5.000$, Ember cl3/ll3, Bobby Lv4, aşama 300$) → yeni dosyada aynı değerlerle açıldı; Titan eşiği 15K$ (yeni), Quasar 56M, RSLOT `1.92Qa/2Qa/2.2Qa/2.4Qa` (değişmedi).

## Ne değişti
`index.html` 4 satır değişti + 1 yorum satırı eklendi: `COINS` fiyat satırı (Quasar/Vortex/Pulsar çarpanı, Kat.1 volatilite maliyeti ÷2) + açıklama yorumu, `RC[0]` sonu 1.6M→800K, `rlcost` Kat.1 ×2 kaldırıldı, `UNLK` [150,375,330,900] → [100,375,330,1300]. sim.js değişmedi.

## Ne test edildi
Sim 5 koşu × 3 tip önce/sonra + 9 aday tarama; smoke 63/63; runTradeTests/runBobbyTests GEÇTİ; konsol 0; eski kayıt yedekten yeni dosyaya açıldı. TR/EN taşma smoke içinde (4 ekran × 2 dil) geçti.

## Ne riskli
- Hepsi sim tahmini; gerçek oyuncu ile doğrulanmadı. Sim varsayılanları oyunla uyumsuzdu (yukarıda).
- Quasar→Zenith tuzağı: Quasar 48M ve altında bazı koşularda 58–82 dk kilit. 56M'de 15/15 koşuda yok ama sınır yakın olabilir.
- Kat.1 hedefi (36,5) ve Boss1→Quasar ≤10 tam tutmadı; iyi oyuncu 92,3 (<95).
- Kullanıcı "geçiş hızlı" demişti: iyi oyuncuda Kat.1 25,4 → 19,9 dk kısaldı (ilk 4 geçiş zaten 2–3,5 dk, değişmedi; kısalan Boss1→Quasar). Ortalama oyuncu için ritim düzeldi. Bu, kullanıcının hissine ters düşebilir → Yönetici sormalı.
- Kat.4 eşiği arttığı için Kat.4'teki eski kayıtlarda çubuk geri düşer.

## Ölçüte etkisi (tahmin)
- 4 İlerleme ritmi: 3 → **4** (Kat.1 geçişleri 4–7 dk'ya eşitlendi, mama tıklaması 48 → 16; tek uzun adım Boss1→Quasar 11,6).
- 5 Zorluk eğrisi: 3 → **3–4** (Kat.2–4 hedefte, toplam hedefte; Kat.1 1,5 dk üstünde, iyi oyuncu 92 dk).
- 3 Risk-getiri: 3 (değişmedi; Sorun 2 uygulanınca kötü oyuncu kapanı kalkar).
- 6 Aktif-otomatik: 3 (değişmedi; Sorun 3 öneri).
- 2 Beceri ödülü: iyi/ortalama oranı 0,64 → 0,71 (fark biraz daraldı, hâlâ belirgin).

---

## Düzeltme 1 (Yönetici Ret 1/3, 2026-11-18)

Ret: `UNLK[0]` 150 → 100 kabul edilmedi. Yeni kurallar: Kat.1 eşiği en az 150; duvarlar maliyetle eritilir; iyi oyuncuda Kat.1 ≥ 25 dk, ilk geçiş ≥ 2,5 dk (5 koşunun hepsinde), hiçbir geçiş öncekinden hızlı olmaz; ortalama oyuncuda Kat.1 ≤ 42 dk, hiçbir geçiş > 10 dk değil; toplam ortalama 120–150, iyi ≥ 95.

### Eski → yeni (ilk öneriye göre fark)
| Sabit | İlk öneri | Düzeltme 1 | Neden |
|---|---|---|---|
| `UNLK[0]` | 100 | **150** (eski değer) | Ret 1 |
| Kat.1 volatilite maliyeti (`PP*m/(k===0?…)`) | fiyat × 0,5 / 1,25 / 3 (÷2) | fiyat × **0,33 / 0,83 / 2** (÷3, BigInt bölme) | Ortalama oyuncu Ember/Nova'yı yükseltip trade edebilsin; iyi oyuncuyu az etkiler |
| Kat.1 kaldıraç fiyatı (`renderShop` `lc` ve `lup` `pay`, ikisi aynı) | coin × hedef kaldıraç | coin × hedef kaldıraç **× 2** (yalnız Kat.1: `*(c.cat?1:2)`) | İyi oyuncunun hızı kaldıraçtan geliyor; ilk geçişleri yavaşlatan tek maliyet bu. Kat.2–4 aynı |
| `UNLK[2]` (Kat.3) | 330 | **400** | İyi oyuncu toplamını 95'in üstüne çıkarmak için; Kat.3 ortalama 32,2 (≤ 35) |
| Kalanlar (kabul edildi) | Bobby Kat.1 kaldıraç ÷2, `RC[0]` sonu 800K, Quasar 56M, Vortex 5,12Qa, Pulsar 179Sx, `UNLK[3]` 1300 | aynı | — |

Not: Kat.1 kaldıraç fiyatı satırı kod içinde bir sayı çarpanıdır (`renderShop` ~1883 ve `lup` ~1908, iki yerde birebir aynı). Kaldıraç kartındaki ipucu metni (`Fiyat = coin fiyatı × hedef kaldıraç.`, ~1887 ve I18N ~2405) Kat.1 için artık eksik; metne dokunmadım → **Yazılımcı**: Kat.1'de "× 2" eklenmeli (TR: `Fiyat = coin fiyatı × hedef kaldıraç (Katalog 1'de × 2).` / EN: `Price = coin price × target leverage (× 2 in Catalog 1).`).

`araclar/denge/sim.js`: varsayılanlar oyunla eşlendi (Yönetici onayı): `PEBCL=2`, `LEVK=1`; ek ölçüm ayarı `LEVK1` (Kat.1 kaldıraç çarpanı, varsayılan 2 = oyundaki yeni değer). Başlığa gerekçe satırı eklendi. Oyuncu davranışı varsayımları değişmedi.

### Denenen adaylar (UNLK[0]=150 üstüne, 5 koşu, medyan)
| Aday | İçerik | Ort. Kat.1 | Ort. en uzun Kat.1 geçişi | İyi Kat.1 | İyi ilk geçiş (min) | İyi toplam | Sonuç |
|---|---|---|---|---|---|---|---|
| h0 | kabul edilen paket, UNLK[0]=150 | 36,5 | 10,2 | 19,9 | 2,8 (1,8) | 92,3 | İyi oyuncu çok hızlı |
| h1/h2 | Kat.1 fiyat merdiveni dikleşti | 36,1 / 34,0 | 11,0 / 9,5 | 19,8 / 16,8 | 3,1 (2,1) | 91,6 / 86,8 | Pahalı Boss1 Quasar'ı hızlandırıyor; h2'de Quasar→Zenith tuzağı |
| h0 + Kat.1 kaldıraç ×2 | | 46,5 | 12,1 | 24,5 | 3,9 (3,6) | 94,2 | İyi doğru, ortalama çok yavaş |
| i1 | + Kat.1 vol ÷3 | 40,6 | 10,7 | 25,0 | 3,9 (3,1) | 87,9 | Kat.1 iki tip için tuttu, iyi toplam düşük |
| j1 | i1 + Bobby RC[0] 600K + UNLK[2]=400 | 40,7 | 11,2 | 24,8 | 3,9 (3,1) | 95,2 | RC 600K yardım etmedi → alınmadı |
| **seçilen** | i1 + UNLK[2]=400 (RC 800K) | **40,6** | **10,7** | **25,0** | **3,9 (3,1)** | **97,5** | Aşağıda |

### Önce / sonra (5 koşu, medyan (min–maks), dk; "önce" = bu oturumun başı, aynı sim ayarı)
| Tip | | Toplam | Kat.1 | Kat.2 | Kat.3 | Kat.4 |
|---|---|---|---|---|---|---|
| Ortalama | önce | 139,7 (137,4–144,3) | 52,4 (47,6–55,9) | 27,8 | 29,0 | 30,7 |
| | **Düzeltme 1** | **134,8 (127,8–135,7)** | **40,6 (36,0–42,3)** | 26,9 (24,2–29,3) | 32,2 (31,8–33,3) | 31,7 (31,2–32,7) |
| İyi | önce | 89,9 (82,1–96,5) | 25,4 (24,8–28,4) | 14,2 | 19,7 | 29,6 |
| | **Düzeltme 1** | **97,5 (84,3–98,7)** | **25,0 (21,4–25,6)** | 15,9 (14,1–15,9) | 24,2 (22,0–24,7) | 31,9 (20,1–33,7) |
| Bobby-öncelikli | önce | 141,0 (138,2–144,8) | 52,4 (48,9–55,9) | 27,2 | 30,2 | 30,0 |
| | **Düzeltme 1** | **135,1 (128,5–139,8)** | 39,7 (34,1–42,3) | 29,4 (27,3–30,4) | 32,7 (32,1–33,4) | 32,1 (31,1–33,3) |

Kat.1 geçiş başına (dk):
| Tip | | Pebble→Ember | Ember→Nova | Nova→Titan | Titan→Boss1 | Boss1→Quasar |
|---|---|---|---|---|---|---|
| Ortalama | önce | 6,3 (6,2–7,6) | 12,2 (10,7–15,3) | 10,3 (7,5–11,7) | 4,6 (4,3–8,2) | 17,8 (14,8–18,8) |
| | **Düzeltme 1** | 8,5 (6,4–9,4) | 9,5 (7,2–11,9) | 6,4 (4,6–9,0) | 5,2 (5,2–6,7) | 10,7 (10,2–11,3) |
| **İyi** | önce | 2,5 (2,3–3,4) | 3,3 (3,2–4,3) | 2,4 (2,2–3,5) | 3,1 (1,7–3,4) | 14,3 (14,1–14,7) |
| | **Düzeltme 1** | **3,9 (3,1–4,2)** | **3,5 (2,9–5,4)** | **3,0 (2,7–4,0)** | **3,3 (2,0–3,9)** | **10,2 (9,9–11,6)** |
| Bobby | önce | 6,3 (6,2–7,6) | 12,2 (10,7–15,3) | 10,3 (7,5–11,7) | 4,9 (4,3–6,7) | 18,5 (16,3–18,8) |
| | **Düzeltme 1** | 8,5 (6,4–9,4) | 9,5 (7,2–11,9) | 6,4 (4,6–9,0) | 5,8 (4,3–6,3) | 10,4 (9,3–10,7) |

En uzun duvarlar (ortalama): Eclipse→Pulsar 17,8 · Boss3→Eclipse 13,0 · Aurora→Vortex 11,2 · Boss1→Quasar 10,7 (önce 19,8 / 17,8 / 13,5 / 12,2).

### Hedefe uyum
| Hedef | Sonuç |
|---|---|
| `UNLK[0]` ≥ 150 | 150 ✔ |
| İyi Kat.1 ≥ 25 | Medyan 25,0 ✔; min 21,4 (1/5 koşu altında) |
| İyi ilk geçiş ≥ 2,5 (5/5 koşu) | min 3,1 ✔ |
| İyi: hiçbir geçiş öncekinden hızlı değil | İlk 4 geçiş medyanda daha yavaş ✔ (min değerler de öncekinin üstünde: Titan→Boss1 2,0 ≥ 1,7). **Boss1→Quasar 14,3 → 10,2 hızlandı ✘** — ritim önceliği: bu, ortalama oyuncunun 17,8 dk'lık duvarı; ortalamayı ≤ 10'a yaklaştıran her maliyet iyi oyuncuyu da hızlandırıyor. İyi oyuncu bu kaybı ilk 4 geçişte geri alıyor (Kat.1 toplamı 25,4 → 25,0) |
| Ortalama Kat.1 ≤ 42 | 40,6 (maks 42,3) ✔ |
| Ortalama: hiçbir Kat.1 geçişi > 10 | 4/5 geçiş medyanda ≤ 9,5 ✔; **Boss1→Quasar 10,7 ✘** (0,7 dk üstünde); Ember→Nova 1/5 koşuda 11,9 |
| Toplam ortalama 120–150 | 134,8 ✔ (Bobby tipi 135,1) |
| İyi toplam ≥ 95 | Medyan 97,5 ✔; min 84,3 (Eclipse→Pulsar iki modlu: 6,5 ya da ~17,6) |
| Kat.2–4 25–35 (ortalama) | 26,9 / 32,2 / 31,7 ✔ |
| Tuzak (Quasar→Zenith kilidi) | 15/15 koşuda yok ✔ |

Eşik/duvar seçimi: Boss1→Quasar'ı 10 dk'nın altına indirmek için denediğim maliyet yolları (Bobby `RC[0]` 600K; daha ucuz Quasar) ya etkisizdi ya da Quasar→Zenith tuzağını açtı. Eşiğe dokunmadan ritmi önceledim: ortalama oyuncunun Kat.1 geçişleri 5,2–10,7 aralığında (önce 4,6–17,8).

### Kontroller (Düzeltme 1)
- `node araclar/qa/smoke.js`: **63/63 geçti**.
- Playwright `index.html?nomenu`: `runTradeTests` **GEÇTİ**, `runBobbyTests` **GEÇTİ**, konsol hatası **0**.
- Eski kayıt: `yedek/index-20261118-1655.html`'de oluşturulan kayıt (v49, 3 coin açık, Ember cl3/ll3, Bobby Lv4, 5.000$, aşama 300$) yeni dosyada aynen açıldı. Titan eşiği 22,5K$ (150 %), Quasar 56M, RSLOT değişmedi.
- Sorun 2 tasarımı ve Sorun 3 önerisi aynen geçerli.

### Ne değişti
`index.html`: `UNLK` = [150, 375, 400, 1300]; Kat.1 volatilite ÷3; Kat.1 kaldıraç fiyatı ×2 (`renderShop` + `lup`, iki yerde aynı ifade); kabul edilen paket (Bobby Kat.1 kaldıraç ÷2, `RC[0]` 800K, Quasar/Vortex/Pulsar) aynen. `araclar/denge/sim.js`: varsayılanlar `PEBCL=2`, `LEVK=1`, yeni `LEVK1=2` + başlık gerekçesi.

### Ne test edildi
Sim 5 koşu × 3 tip (son dosya, varsayılan ayarlarla) + 9 aday tarama; smoke 63/63; oyun içi testler geçti; konsol 0; eski kayıt açıldı.

### Ne riskli
- Hepsi sim tahmini. Kat.1 kaldıraç ×2 ipucu metni yanlış kaldı (Yazılımcı düzeltmeli).
- Kat.1 kaldıraç ×2: daha önce pahalı kaldıraç almış oyuncu etkilenmez; Kat.1'deki eski kayıtta sonraki kaldıraç adımı 2 kat pahalı görünür.
- Boss1→Quasar ortalamada 10,7 (hedef 10); iyi oyuncuda bu adım öncekinden hızlı.
- İyi oyuncu toplamı iki modlu (84–99): Eclipse→Pulsar bazen 6,5 dk.
- `UNLK[2]` 400: Kat.3'teki eski kayıtta ilerleme çubuğu geri düşer (görünüm).

### Ölçüte etkisi (tahmin)
- 4 İlerleme ritmi: 3 → **4** (Kat.1 geçişleri ortalamada 5–11 dk, iyi oyuncuda 3–4 dk + bir 10 dk adımı; mama 48 → 12).
- 5 Zorluk eğrisi: 3 → **4** (toplam 134,8, iyi 97,5, Kat.2–4 hedefte; tek sapma Boss1→Quasar +0,7).
- 2 Beceri ödülü: iyi/ortalama oranı 0,64 → 0,72; fark korunuyor.
- 3 Risk-getiri, 6 Aktif-otomatik: değişmedi (Sorun 2 ve 3 bekliyor).
