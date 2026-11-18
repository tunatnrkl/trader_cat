# Denge önerisi — fiyat / süre

> Durum: **ÖNERİ.** `index.html`'de hiçbir şey değiştirilmedi. Tüm maddeler kullanıcı onayı bekliyor.
> Ölçüm tarihi: 2026-11-17 · Ölçülen dosya: `index.html` (commit `556b818`, satır numaraları bu sürüme göre).
> Simülasyon betiği ve ham çıktılar: `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/denge/` (`sim.js`, `sonuc-*.json`). Geçici klasördür; saklanması istenirse repo'ya taşınmalı.

## (a) Özet (5 satır)

1. **Toplam süre hedefte, dağılım değil:** ortalama oyuncu finale **~127 dk** (hedef 120–150 dk) ama kataloglar **74 / 18 / 22 / 13 dk** (hedef ~30'ar).
2. **Sorun 1 — Katalog 1 çok uzun:** Pebble 10$ → Ember 400$ (×40 sıçrama; diğer basamaklar ×10–13). Ember'e para yetiştirmek ve Ember→Nova ~30 dk sürüyor. Açılma eşiğini (`UNLK`) düşürmek tek başına işe yaramıyor (test edildi): duvar *kâr eşiği* değil, *nakit* (giriş fiyatı).
3. **Sorun 2 — Katalog 2–4 çok kısa (13–22 dk):** Bobby kaldıracı ve robotlar devreye girince ilerleme patlıyor; son katalog (final dahil) 13 dk.
4. **Sorun 3 — Pebble 32 dönüm noktasında ortalama oyuncu için oynanmaz:** erken gelir trade'den değil kediye mama dökmekten (+1$/5,5 sn) geliyor; mama tıklaması modelden çıkarılırsa Katalog 1 **112 dk**'ya çıkıyor (anlamsız tıklama/bekleme).
5. **Öneri (7 değer, kayıt formatı değişmez):** Katalog 1 fiyatları ÷4, Pebble yeni oyunda Volatilite Sv.2 ile başlar, volatilite ve kaldıraç maliyetleri ucuzlar, `UNLK` = 100/250/220/600 → ortalama **137 dk, kataloglar 47 / 26 / 32 / 27 dk**. Katalog 1 hâlâ hedefin ~17 dk üstünde (bkz. karar sorusu 6).

## Yöntem (kısa)

- Simülasyon oyunun **kendi kodunu** çalıştırır: `index.html` içindeki `/*PURE-START*/ … const BONEC` bloğu ile `UNLK`, `FRV`, `VSEQ` satırları Node `vm` içinde yüklenir. Grafik (`genK`, `ratioAt`), boss çöküşü (`K.crash`, `crashEv`), Bobby/robot planı (`botPlan`, `ROBD/ROBF`, `errOf`, `rD/rF/raErr`) ve tüm fiyatlar birebir oyundan gelir. Öneri sürümü, aynı 7 değişiklik uygulanmış bir **kopya** (`oneri.html`) üzerinde koşturuldu.
- Kurallar koddan: pozisyon = coin fiyatı; aşama kârı yalnız kârlı işlemlerden (+) birikir, açılışta sıfırlanır; Bobby yalnız oyuncunun turunda, aynı grafikte, nakitsiz işlem yapar; robotlar arka planda 15+1 sn'lik turlarla, nakitle; final: nakit ≥ 14.7No ve toplam net kazanç ≥ 1,5 × 14.7No.
- **Varsayımlar (tahmin, koddan değil):**
  - İnsan oyuncu da oyunun `botPlan`'ı ile modellendi; parametreleri insan sınırından türetildi: gecikme = tepki süresi ÷ ortalama bacak süresi, yakalanan dip oranı = 15 sn ÷ işlem temposu ÷ dip sayısı. Grafik takip edilemeyecek kadar hızlıysa (gecikme > %45) oyuncu al-tut yapar.
  - Ortalama: tepki 0,40 sn, 3 sn'de bir işlem, en çok dip oranı %60, hata %15, tur arası 2,5 sn. İyi: 0,25 sn, 2 sn, %80, %5, 1,5 sn. Bobby-öncelikli: ortalama beceri, otomasyon alımlarını 3 kat daha çekici bulur.
  - Kediye mama: 5,5 sn'de +1$ net (+1$ aşama kârı); oyuncu trade bundan az kazandırıyorsa mama döker. Giriş (bilgisayar onarımı) 75 sn; her satın alma 2 sn.
  - Satın alma kararı: bir alımın kazanç hızına katkısı Monte Carlo ile (60 tur) ölçülür; kendini ≤10 dk'da ödeyen en iyi alım yapılır; oynanan coinin fiyatı kadar nakit yedekte tutulur.
  - Kemik/kapasite yükseltmeleri ve Bobby besleme süresi modellenmedi (gelire etkisi yok, Bobby hep tok varsayıldı). Offline kazanç oyunda yok.
- Her oyuncu tipi için 5 oyun, **medyan** verildi (min–max ayrıca). Kullanıcının istediği 5 tipten "hatalı" ve "elle-öncelikli" limit tasarrufu için (yönetici talimatı) koşturulmadı.
## (b) Mevcut değerler (index.html, satır numaralı)

Para birimi BigInt, 1$ = 10000 birim. Aşağıdaki fiyatlar oyunun kendi koduyla hesaplandı (Playwright ile sayfa açılıp sabitler okundu: `constants.json`).

### Coinler (satır 527–535; fiyat formülü 534)

`DEF` (527–531) yalnız katalog 1 taban fiyatlarını kullanır; gerçek fiyat = taban × katalog çarpanı × 4 (Pebble hariç) × katalog 3–4 ek çarpanı (satır 534). Bu yüzden `DEF`'teki "100", "4M" gibi yazılar oyundaki fiyat değildir.

| # | Coin | Kat. | Fiyat | Açılma şartı (aşama kârı = fiyat × %150) | Volatilite sv. maliyeti (fiyat × 1,5 / 4 / 10) | Kaldıraç 2x/4x/8x maliyeti (fiyat × 4/8/16) |
|---|---|---|---|---|---|---|
| 0 | Pebble | 1 | 10 | başta açık | 15 / 40 | 40 / 80 / 160 |
| 1 | Ember | 1 | 400 | 600 | 600 / 1.6K / 4K | 1.6K / 3.2K / 6.4K |
| 2 | Nova | 1 | 4.8K | 7.2K | 7.2K / 19.2K / 48K | 19.2K / 38.4K / 76.8K |
| 3 | Titan | 1 | 60K | 90K | 90K / 240K / 600K | 240K / 480K / 960K |
| 4 | Boss 1 | 1 | 800K | 1.2M | sabit (64 dönüm) | yok (1x) |
| 5 | Quasar | 2 | 80M | 120M | 120M / 320M | … |
| 6 | Zenith | 2 | 800M | 1.2B | | |
| 7 | Omega | 2 | 9.6B | 14.4B | | |
| 8 | Helios | 2 | 120B | 180B | | |
| 9 | Boss 2 | 2 | 1.6T | 2.4T | | |
| 10 | Aurora | 3 | 320T | 480T | | |
| 11 | Vortex | 3 | 7.7Qa | 11.5Qa | | |
| 12 | Nebula | 3 | 92.2Qa | 138Qa | | |
| 13 | Cosmos | 3 | 1.2Qi | 1.7Qi | | |
| 14 | Boss 3 | 3 | 30.7Qi | 46.1Qi | | |
| 15 | Eclipse | 4 | 10.2Sx | 15.4Sx | | |
| 16 | Pulsar | 4 | 287Sx | 430Sx | | |
| 17 | Singularity | 4 | 3.4Sp | 5.2Sp | | |
| 18 | Infinity | 4 | 43Sp | 64.5Sp | | |
| 19 | Boss 4 | 4 | 573Sp | 860Sp | | |
| — | FİNAL Kedi Maması | — | **14.7No** (= Boss 4 × 25.600) | nakit ≥ fiyat ve toplam net kazanç ≥ fiyat × 1,5 | | |

Fiyat basamakları (sonraki coin / önceki coin): Pebble→Ember **×40**, katalog içi diğerleri ×10–13, boss→sonraki katalog ×100 / ×200 / ×333, Boss 4→Final ×25.600.

### Kilit açma ve ilerleme

| Değer | Satır | Mevcut |
|---|---|---|
| `UNLK` (açılma eşiği, fiyatın %'si, katalog başına) | 927 | `[150n,150n,150n,150n]` |
| Aşama kârı `S.stp`: yalnız kârlı işlemler (+), zarar düşmez; her açılışta 0'a döner (fazlası silinir) | 1752, 1757, 1777 | — |
| Kediye mama: +2$ nakit (su 1$), aşama kârına +1$ | 1095, 1780 | — |
| Bilgisayar onarımı: 5$ aşama kârı | 1750 | `FIXT=D(5)` |
| Final fiyatı `FOOD` | 596 | `COINS[19].p*1600n*16n` = 14.7No |
| Final görünürlüğü: nakit ≥ FOOD ve toplam net kazanç ≥ 1,5 × FOOD | 1325, 1328 | — |
| `FRV` (mağazadaki final kartı ön eşiği, pratikte finalGuide önce açar) | 928, 1000 | `51800n` |
| Offline kazanç | — | **yok** (robotlar `performance.now` ile, yalnız sayfa açıkken) |

### Grafik / tur

| Değer | Satır | Mevcut |
|---|---|---|
| Tur süresi | 1850 (`start`) | 15 oyun sn |
| Pozisyon büyüklüğü (elle, Bobby, robot) | 1826–1827 | coin fiyatı × 1 |
| Volatilite (dönüm noktası) dizisi | 912 | ilk coin 32→16→8, diğerleri 64→32→16→8, boss sabit 64 |
| +%100 tepe şansı / ~-%50 çöküş şansı (coin sırasına göre artar) | 544 | tepe %6→%50, çöküş %2→%30; her volatilite sv. tepe +%10, çöküş −%10 |
| Boss ani çöküşü | 556–559 | turların %25'inde, 1,5–13,5 sn arasında; fiyat −%40 ani, sonra ~%0,2'ye iner; Bobby/robot çöküşte satar |
| Oyuncu kaldıracı en fazla | 1039 (`LMAX`) | 8x (boss 1x) |

### Bobby (köpek)

| Değer | Satır | Mevcut |
|---|---|---|
| Sahiplenme | 596 (`ROBP`) | 2.000$ (görünür: toplam kazanç ≥ 3.000$) |
| Seviye sayısı / kaldıraç seviyesi | 565 | `BMAXL=[10,10,10,40]`, `BMAXR=[5,6,6,11]` (16x / 32x / 32x / 1024x) |
| Seviye fiyatları `RC` | 582–584 | Kat.1: 2.4K→1.6M · Kat.2: 42M→118B · Kat.3: 688T→1.8Qi · Kat.4: 6.7Sx→280Oc (40 sv.) |
| Kaldıraç fiyatları `rlcost` | 585 | Kat.1: 3.2M / 6.4M / 12.8M / 30M · Kat.2: 3.2T→51.2T · Kat.3: 102Qi→1.6Sx · Kat.4: 205Sp→105Oc |
| Zamanlama/isabet `ROBD/ROBF`, gizli sapma `ERRC` | 564, 572–573 | — |
| Enerji: kemik başına sn `EB`, kapasite `CB` | 598 | 20→500 sn, 60→3000 sn; besleme ücretsiz (tık) |
| Kemik/kapasite yükseltme `BONEC/CAPC` | 599 | 7.5K→830Sx / 6K→740Sx |
| Bobby yalnız oyuncunun turu sırasında, aynı grafikte işlem yapar; nakit gerekmez | 1843–1844 | — |

### Otomasyon

| Değer | Satır | Mevcut |
|---|---|---|
| Oto-Tur `AUTOP` / süre seviyeleri `OTC`, bekleme `OTD` | 596 | 500$ · 37M / 2.5T / 160Qa / 5.6Sx · 4/3/2/1/0,5 sn |
| Zaman Kapsülü `TCC` (2x…6x) | 595 | 81.9Sx / 1.2Sp / 19.2Sp / 296Sp / 4.6Oc |
| Otomasyon Merkezi `SPCP` | 587 | 500B (görünür: toplam ≥ 750B) |
| Robot yuvası `RSLOT` (4 robot) | 588 | 1.9Qa / 184Qi / 61.4Sx / 1.7Sp |
| Robot doğruluk `RACCC` (10 sv.) | 588 | 6.4Qa → 19.6No |
| Robot kaldıraç `RLEVC` (32x'e kadar) | 588 | 734Oc / 1.5No / 2.9No / 5.9No / 11.7No |
| Robot tur aralığı | 1254 | tur bitince 1 sn/spd bekleme |

## (c) Simülasyon sonuçları — MEVCUT değerler

Katalog süresi = kataloğun ilk coininin açılması → sonraki kataloğun ilk coininin açılması (Katalog 4: Eclipse → final mama alımı). Katalog 1, oyunun başından sayılır.

| Oyuncu tipi | Kat. 1 | Kat. 2 | Kat. 3 | Kat. 4 (+final) | **Toplam** (min–max) | Hedef |
|---|---|---|---|---|---|---|
| Ortalama | **74** | 18 | 22 | 13 | **127** (122–134) | 30/30/30/30 · 120–150 |
| Çok iyi | 30 | 16 | 16 | 13 | **78** (74–94) | |
| Bobby-öncelikli | **75** | 18 | 22 | 13 | **129** (122–133) | |

Coin açılma dakikası (medyan):

| Coin | Ortalama | Çok iyi |
|---|---|---|
| Pebble / Ember / Nova / Titan / Boss 1 | 1 / 19 / 50 / 66 / 70 | 1 / 9 / 20 / 25 / 28 |
| Quasar / Zenith / Omega / Helios / Boss 2 | 76 / 83 / 87 / 89 / 91 | 32 / 36 / 40 / 43 / 45 |
| Aurora / Vortex / Nebula / Cosmos / Boss 3 | 93 / 105 / 107 / 109 / 112 | 48 / 53 / 57 / 59 / 61 |
| Eclipse / Pulsar / Singularity / Infinity / Boss 4 | 114 / 120 / 121 / 122 / 123 | 64 / 69 / 71 / 73 / 74 |
| **Final mama** | **127** | **78** |

**Duvarlar (ilerlemenin durduğu yerler, ortalama oyuncu):**
- **Ember → Nova: ~30 dk.** Nova 4.8K$; oyuncu hem 7.2K aşama kârı hem 4.8K nakit biriktirmeli, Ember yükseltmeleri (volatilite 6.2K, kaldıraç 11.2K toplam) de aynı paradan.
- **Pebble → Ember: ~17 dk.** Ember 400$ (Pebble'ın 40 katı). Ortalama oyuncu Pebble'da (32 dönüm noktası) al-tut yapıyor (tur başına ~%5); para çoğunlukla kediye mama dökerek geliyor (ortalama oyunda ~58 mama).
- **Nova → Titan: ~16 dk.**
- Katalog 2–4'te hiçbir aralık 12 dk'yı geçmiyor; Bobby (ort. 47. dk'da alınıyor) ve Otomasyon Merkezi (ort. 92. dk) sonrası coinler 1–5 dk arayla açılıyor → bu kataloglarda "her coinle oynama" hissi kayboluyor.

Duyarlılık (önemli): Kedi maması geliri modelden çıkarılırsa (oyuncu yalnız trade ederse) mevcut sürümde ortalama oyuncu Kat. 1'i **112 dk**, toplamı **166 dk** bitiriyor (çok iyi: 42 dk / 88 dk). Yani erken oyun gerçekte mamaya ne kadar tıklandığına çok bağlı.

Ara denemeler (yalnız ortalama oyuncu, mama geliri modellenmeden): yalnız `UNLK` değişikliği (`[50,300,300,300]`) Kat. 1'i 112 → **113 dk** bıraktı (iyileştirmedi) — duvarın nakit/fiyat kaynaklı olduğunu gösteren test budur. Kat. 1 fiyatlarını ÷4 yapmak 112 → 106 dk, + Pebble Sv.2 başlangıcı 97 dk, + ucuz volatilite/kaldıraç 83 dk.

## (d) Öneri: eski → yeni

Hepsi yalnız sabit/formül değeri; kayıt formatı değişmez. Final fiyatı, Bobby, robot, Oto-Tur, Zaman Kapsülü fiyatları **değişmiyor**.

| # | Ne | Eski | Yeni | Gerekçe (ölçüm) |
|---|---|---|---|---|
| 1 | Katalog 1 coin fiyatları | Pebble 10 · Ember 400 · Nova 4.8K · Titan 60K · Boss 800K | Pebble 10 · Ember **100** · Nova **1.2K** · Titan **15K** · Boss **200K** | Pebble→Ember ×40 sıçraması ×10'a iner (diğer basamaklar gibi). Kat. 2–4 fiyatları aynı kalır. |
| 2 | Pebble başlangıç volatilitesi (yalnız yeni oyun) | Sv.1 = 32 dönüm noktası | **Sv.2 = 16** dönüm noktası | 32 dönümde ortalama oyuncu trade edemiyor, mama tıklıyor. Sv.3 (8) yine alınabilir; mağaza anlatımı geçerli kalır. |
| 3 | Volatilite yükseltme maliyeti | fiyat × 1,5 / 4 / 10 | fiyat × **1 / 2,5 / 6** | Coin başına toplam 15,5× → 9,5× fiyat; her yeni coinde "yükseltme parası biriktirme" beklemesi kısalır. |
| 4 | Oyuncu kaldıraç maliyeti (2x / 4x / 8x) | fiyat × 4 / 8 / 16 | fiyat × **2 / 4 / 8** | Toplam 28× → 14× fiyat. Örn. Ember 8x'e kadar: 11.2K → 1.4K (yeni fiyatla). |
| 5 | Açılma eşiği `UNLK` (sonraki coin fiyatının %'si, aşama kârı) | %150 / %150 / %150 / %150 | **%100 / %250 / %220 / %600** | Kat. 1 kısalır; Kat. 2–4 (13–22 dk) uzar. Kat. 4 eşiği yüksek çünkü final alımı zaten hızlı bitiyor. |
| 6 | Kaldıraç kartı açıklaması | "Fiyat = coin fiyatı × hedef kaldıraç × 2." | "Fiyat = coin fiyatı × hedef kaldıraç." | Madde 4 ile tutarlılık (metin; EN çevirisi bu cümle için yok). |

Örnek açılma şartları (aşama kârı): Ember 600 → **100** · Nova 7.2K → **1.2K** · Titan 90K → **15K** · Boss 1 1.2M → **200K** · Quasar 120M → **200M** · Zenith 1.2B → **2B** · Aurora 480T → **704T** · Vortex 11.5Qa → **16.9Qa** · Eclipse 15.4Sx → **61.4Sx** · Pulsar 430Sx → **1.7Sp** · Boss 4 860Sp → **3.4Oc**.

## (e) Simülasyon sonuçları — YENİ değerler

Aynı model, aynı tohumlar; değişiklikler `oneri.html` kopyasına uygulanarak koşturuldu.

| Oyuncu tipi | Kat. 1 | Kat. 2 | Kat. 3 | Kat. 4 (+final) | **Toplam** (min–max) | Önce |
|---|---|---|---|---|---|---|
| Ortalama | **47** | 26 | 32 | 27 | **137** (130–141) | 74/18/22/13 · 127 |
| Çok iyi | 23 | 15 | 17 | 16 | **73** (70–83) | 30/16/16/13 · 78 |
| Bobby-öncelikli | **47** | 27 | 32 | 28 | **139** (130–145) | 75/18/22/13 · 129 |

Coin açılma dakikası (medyan):

| Coin | Ortalama | Çok iyi |
|---|---|---|
| Pebble / Ember / Nova / Titan / Boss 1 | 1 / 7 / 18 / 28 / 33 | 1 / 4 / 7 / 9 / 12 |
| Quasar / Zenith / Omega / Helios / Boss 2 | 48 / 61 / 68 / 71 / 73 | 24 / 29 / 33 / 35 / 36 |
| Aurora / Vortex / Nebula / Cosmos / Boss 3 | 76 / 92 / 95 / 97 / 100 | 39 / 44 / 46 / 48 / 51 |
| Eclipse / Pulsar / Singularity / Infinity / Boss 4 | 107 / 127 / 129 / 131 / 132 | 57 / 64 / 66 / 68 / 69 |
| **Final mama** | **137** | **73** |

Hedefe uyum:
- Toplam 137 dk → **hedef aralığında** (120–150). Kat. 2, 3, 4: 26 / 32 / 27 dk → **hedefte** (~30).
- Kat. 1: 47 dk → **hedefin ~17 dk üstünde** (önce 74). Kalan en uzun aralıklar artık katalog içinde dağınık: Boss 1 → Quasar ~15 dk, Quasar → Zenith ~15, Aurora → Vortex ~16, Eclipse → Pulsar ~17 dk. Ortak örüntü: **her kataloğun ilk coini → ikinci coin** en yavaş adım (ilk coinlerin genliği kodda yarıya indirilmiş ve 3 volatilite seviyesi var; satır 549, 912). Bu bir sonraki ayar noktası, bu öneride ölçülmedi.
- İmkânsız katalog yok (15/15 oyunun hepsi bitti). Çok iyi oyuncu 73 dk'da bitiriyor; en kısa katalogu 15 dk (bkz. risk 3).
- Kediye mama sayısı (ortalama oyun) 58 → 48; likidasyon 1 → 4 (kaldıraç ucuzladığı için daha erken ve sık kullanılıyor).

## Kayıt uyumu

Değişikliklerin hiçbiri kayıt formatını değiştirmez; `v` alanı, BigInt alanları ve `loadSave` göçü aynı kalır. Playwright ile test edildi: mevcut sürümde oluşturulan bir orta-oyun kaydı (3 coin açık, aşama kârı 5K) öneri kopyasında hatasız açıldı; açık coinler, seviyeler, nakit ve aşama kârı korundu.

| Değişiklik | Eski kayda etkisi |
|---|---|
| Kat. 1 fiyatları ÷4 | Açık coinler açık kalır. Kat. 1'deki oyuncu için coinler ucuzlar (zarar yok). Aşama kârı yeni eşiği geçmişse sıradaki coin hemen açılır (her kontrolde en fazla 1 coin). |
| Pebble Sv.2 başlangıç (`defS`) | Yalnız yeni oyun / "Her şeyi sıfırla" etkilenir; eski kayıtta `cl` kayıttan gelir. |
| Volatilite / kaldıraç ucuzlaması | Alınmış seviyeler korunur. Daha önce pahalıya alanlara **iade yok** (karar sorusu 5). |
| `UNLK` Kat. 2–4 artışı | Orta-oyundaki oyuncunun "aşama kârı / gerekli" barı geriye düşmüş görünür (ör. Zenith için 1.2B yerine 2B). Bozulma yok, sadece ilerleme yüzdesi düşer. |
| Oyun içi testler | `runTradeTests()` ve `runBobbyTests()` öneri kopyasında da GEÇTİ (Bobby testi fiyat oranını `p/p0`'dan kendisi hesaplıyor). |

## (f) Riskler

1. **Model varsayımı:** İnsan oyuncu davranışı (tepki süresi, işlem temposu, al-tut eşiği, mama tıklama hızı) tahmindir. En hassas yer Kat. 1: mevcut sürüm için mama geliri modelde varken 74 dk, yokken 112 dk. Gerçek oyuncu testiyle (en az 2–3 kişi, Kat. 1 süresi) doğrulanmalı.
2. **Kat. 1 hâlâ uzun (47 dk).** Ek kısaltma (ör. `UNLK[0]` daha düşük ya da ilk coinlerin genliği) simüle edilmedi; rakam vermiyorum.
3. **Çok iyi oyuncu 73 dk'da bitiriyor** (önce 78). Hedef ortalama oyuncu için kuruldu; iyi oyuncu için oyun kısa kalabilir.
4. **Ucuz kaldıraç + "zarar aşama kârını düşürmez" kuralı** (satır 1777): yüksek kaldıraçla kumar oynayan oyuncu kaybetse de ilerler. Likidasyon sayısı arttı (1 → 4). "Hatalı oyuncu" tipi limit nedeniyle koşturulmadı → bu risk ölçülmedi.
5. **Bobby Kat. 1 fiyatları değişmedi** (`RC[0]` 2.4K → 1.6M, `rlcost` 3.2M → 30M; satır 582–585). Kat. 1 coinleri ucuzladığı için Bobby yükseltmeleri göreli olarak 4 kat pahalı. Simülasyonda Bobby yine alındı (ortalama 29. dk), ama Bobby'nin Kat. 1 kaldıraçları (3.2M+) Boss 1'den (200K) çok pahalı kalıyor.
6. **Kat. 2–4 eşik artışı orta-oyun kayıtlarında barı geri düşürür** (bozulma değil, algı).
7. **Örneklem küçük:** tip başına 5 oyun, karar Monte Carlo'su 60 tur. Min–max aralıkları tabloda.
8. **Eş zamanlı değişiklik:** ölçüm sırasında `index.html`'ye QA commit'i (`556b818`, metin/arayüz) geldi; ekonomi satırlarını etkilemedi, satır numaraları bu commit'e göre doğrulandı. Uygulamadan önce `grep -n` ile tekrar doğrulayın.
9. Kod yorumları eskir: satır 526 ("Seviye maliyeti = fiyat × [0.75,…]") ve satır 927 yorumu ("%150", "her katalog ~33 dk") güncellenmeli.

## (g) Karar soruları

1. Katalog 1 coin fiyatları 4'te 1'e insin mi (Ember 400 → 100, Nova 4.8K → 1.2K, Titan 60K → 15K, Boss 1 800K → 200K)? **Evet / Hayır**
2. Yeni oyunda Pebble Volatilite Sv.2 (16 dönüm noktası) ile başlasın mı? **Evet / Hayır**
3. Volatilite yükseltmeleri fiyat × 1,5/4/10 yerine × 1/2,5/6 olsun mu? **Evet / Hayır**
4. Oyuncu kaldıracı fiyat × 4/8/16 yerine × 2/4/8 olsun mu? **Evet / Hayır**
5. Daha önce pahalıya yükseltme almış oyunculara fark iadesi: **A) iade yok (önerilen, basit)** / **B) fark nakit olarak iade (kayıt göçü kodu gerekir)**
6. Açılma eşikleri `UNLK` = %100 / %250 / %220 / %600 olsun mu? **Evet / Hayır** — ve Kat. 1'in 47 dk kalması: **A) kabul, gerçek oyuncu testinden sonra bak** / **B) ikinci tur simülasyonla Kat. 1'i 30 dk'ya indirecek ek öneri iste**
7. "Zarar aşama kârını düşürmez" kuralı (kumar riski) ayrıca ölçülsün mü ("hatalı oyuncu" tipiyle)? **Evet / Hayır**

## Uygulama notu (yazılımcı için, birebir)

Yalnız onaylanan maddeler uygulanır. Satırlar commit `556b818`'e göredir; her `eski` metin dosyada **tam bir kez** geçer (doğrulandı). Bu 7 değişiklik uygulanmış kopya Playwright'ta hatasız açıldı, oyun içi testler geçti.

| Karar | Satır | Eski metin (birebir) | Yeni metin (birebir) |
|---|---|---|---|
| 3 | 533 | `VCM=[15n,40n,100n]` | `VCM=[10n,25n,60n]` |
| 1 | 534 | `PP=(k===0&&j===0)?P0:P0*4n*` | `PP=k===0?P0:P0*4n*` |
| 2 | 896 (`defS`) | `cl:COINS.map(()=>1)` | `cl:COINS.map((c,i)=>i===0?2:1)` |
| 6 | 927 | `const UNLK=[150n,150n,150n,150n];` | `const UNLK=[100n,250n,220n,600n];` |
| 4 | 982 (`renderShop`, gösterilen fiyat) | `c.p*BigInt(Math.pow(2,ll)*2)` | `c.p*BigInt(Math.pow(2,ll))` |
| 4 | 986 (kaldıraç kartı ipucu) | `Fiyat = coin fiyatı × hedef kaldıraç × 2.` | `Fiyat = coin fiyatı × hedef kaldıraç.` |
| 4 | 1007 (`lup` satın alma, ödenen fiyat) | `c.p*BigInt(Math.pow(2,S.ll[ci])*2)` | `c.p*BigInt(Math.pow(2,S.ll[ci]))` |

Notlar:
- 982 ve 1007 **birlikte** değişmeli (biri gösterilen, biri ödenen fiyat); yoksa ekranda yazan ile kesilen para farklı olur.
- Madde 1 (satır 534) yalnız Katalog 1'i etkiler: `k===0` dalı. `p0` değişmez; `rlcost` ve `RC` `p0`/sabit kullandığından Bobby fiyatları değişmez. Kat. 1 coinlerine bağlı türetilmiş fiyatlar (volatilite, kaldıraç) otomatik ÷4 olur.
- Kayıt göçü gerekmez; `S.v` artırmaya gerek yok (karar 5-B seçilirse gerekir).
- Yorum güncellemesi (isteğe bağlı): satır 927 yorumundaki "%150" ve "her katalog ~33 dk" → yeni değerler; satır 526 maliyet yorumu.
- Uygulama sonrası: `runTradeTests()`, `runBobbyTests()` konsolda GEÇTİ olmalı; eski kayıt açılmalı; `?lang=en` ile kaldıraç kartı metni kontrol edilmeli.
