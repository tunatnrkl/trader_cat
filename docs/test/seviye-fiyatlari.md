# Seviye fiyatları — Testçi önerisi (Sonnet)

> Asıl `index.html` DEĞİŞMEDİ, commit yok. Denemeler: `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/testci2/` (`index-onceki.html` = başlangıç kopyası, `index-c1..c8.html` adaylar, `alim.js` alım yapan bot, `sim2.js` = sim.js + alım günlüğü, `sonuc-*.json`, `s_*.txt`).
> Ölçüm: oyun-içi bot 3 koşu × 12 dk (gerçek zaman, mağazadan alım YAPAR) + `sim.js` 5 koşu × 3 tip (medyan). Sim oyuncu davranışı varsayım → tüm süreler (tahmin). Bot insandan hızlı (Kat.1'de sim "iyi"den ~%35 hızlı) → sayıları sıra ve oran için kullan.
> Not: görev "en çok 2–3 aday" diyordu; 8 aday denedim (ilk 3'ü Bobby ucuzlatma yönüydü ve işe yaramadı, bkz. §3). Karşılaştırma tablosunda yalnız önce / c6 / c8 var.

## 1. Oynanış notları (geri ödeme ve his)
Bot "kar" (en ucuz), "bob" (Bobby öncelikli), "vol" (volatilite öncelikli) stratejileriyle, kasanın en çok %40'ı kadar harcayarak aldı. Geri ödeme = bedel / alım sonrası tur başı kâr artışı. Tek koşu, tur kârı gürültülü (tahmin); sim medyanıyla birlikte okunmalı.

| Seviye | Alınma anı, kasa payı | Geri ödeme (bot / sim ortalama) | His |
|---|---|---|---|
| Pebble volatilite $8,3 (Sv.2→3) | 0,5 dk, kasa $22–36 → %23–38 | 1–4 tur / 40 sn | Ucuz ve doğru; ilk alım. Kasa $106'da %8 = bedava gibi (kullanıcının gördüğü). |
| Pebble kaldıraç $40 (1x→2x) | 2–2,8 dk, kasa $106 → %38 | 4–16 tur / 85–223 sn | Pahalı hissettirir; kasanın üçte biri ama kâr artışı küçük ($12→$14–23). Karar var ama kazanç zayıf. |
| Pebble kaldıraç $80 (2x→4x) | sim: %80 kasa | 223 sn | Fazla pahalı; sim'de ortalama oyuncu en geç alıyor (10 dk). |
| Ember volatilite $33 / $83 / $200 | 2,8–4,1 dk, %14–32 | 0,1–1 tur / 20–84 sn | BEDAVA GİBİ: tur kârı $81 → $240–420. Bariz doğru, tek karar "hangisi önce" değil "hemen". |
| Ember kaldıraç $400 / $800 | 4,1–4,8 dk, %36–39 | 0,3–2 tur / 73 sn | Güçlü (tur kârı $240 → $1.578); sim'de de net iyi. |
| Nova volatilite $400 / $1.000 / $2.400 | 4,3–6,1 dk, %10–29 | gürültülü / 37–169 sn | İlki ucuz, son ikisi bot'ta verim vermedi (tur kârı düştü, coin değişimi karıştırıyor). |
| Titan volatilite $5K / $12,5K / $30K | 6,9–9,4 dk, %10–28 | 0,2–1 tur / 27–98 sn | Sağlam; bariz doğru. |
| Bobby $2.000 | bot 5,6–5,9 dk (%15–35); sim ortalama 23 dk | 1,4 tur / 109–328 sn | Açılış kapısı: toplam kazanç ≥ $3.000 gerekiyor (rev). Sim ortalama oyuncu için çok geç; kasa %53. |
| Bobby Lv2…Lv8 (2,4K→387K) | bot'ta 6–10 dk'da Lv8'e ulaştı, her biri %12–39 | sim 35–103 sn | Her stratejide alınıyor; Kat.1 Bobby seviyeleri "tek doğru" gibi, ayrım yok. |
| Bobby kaldıraç Kat.1 $1,6M…15M | sim 35 dk, %80 | 14–42 sn | İyi alım, hissedilir. |
| Bobby kaldıraç Kat.2 / 3 / 4 | sim 67 / 90 / 130 dk, %35–63 | 10 / 17 / 2 sn | BEDAVA GİBİ: 2–17 sn'de çıkıyor. Hiç karar değil. |
| Quasar volatilite $140M (2. seviye) | sim 46 dk, %68 | 283–304 sn | Pahalı; Quasar'ın ilk volatilitesi ($56M) coin fiyatının 1×'i (Kat.1'de ⅓×), kataloğa geçişte sıçrama. |
| Kat.3–4 kaldıraç (Vortex, Nebula, Cosmos, Pulsar…) | sim 82–127 dk, %19–44 | 270–494 sn | Anlamsız pahalı: sim'in 600 sn sınırına yakın, oyuncu çoğunda almaz. (Kod değişikliği gerekir, öneri.) |
| Robot (merkez, ekleme) | sim 72–77 dk, %89–95 | 242–403 sn | Pahalı ama RSLOT/UNLK değişmez kuralı. |
| Robot doğruluk (RACCC) | sim 103 dk, %17 | 78–91 sn | Sağlıklı. |
| Oto-Tur $500 | bot 4,1–5,2 dk, %8–39 | belirsiz | Bot hepsinde aldı; sim hiç almıyor (sim modelinde değer 0). |
| Oto-Tur süre (OTC), Zaman (TCC) | — | ölçülemedi | Sim hiç almadı, bot 12 dk'da buralara gelmedi. Dokunulmadı. |

Özet: hiç alınmaya değmeyen yok; "bedava gibi" olanlar Ember volatilite, Bobby kaldıraç Kat.2–4 (2–17 sn geri ödeme) ve Kat.1 Bobby seviyeleri. En pahalı/anlamsızlar Kat.3–4 kaldıraç (270–494 sn) ve Pebble kaldıraç $80 (223 sn). Bariz tek doğru: Ember/Titan volatilite.

## 2. Eski → yeni değerler
Yalnız iki fiyat satırı değişir, ikisi de fiyat sabiti. `RSLOT`, `UNLK`, `calculateTradeResult`, kayıt, BigInt yapısı değişmez.

| Sabit | Eski | Yeni | Gerekçe |
|---|---|---|---|
| Kat.1 volatilite bölen: `PP*m/(k===0?30n:10n)` | /30 (coin × 0,33 / 0,83 / 2,0) | **/27** (× 0,37 / 0,93 / 2,22) | Ember/Nova volatilitesi bedava gibi. Hafif pahalı: Pebble $8,3→$9,3, Ember $33→$37 / $83→$93 / $200→$222, Nova $400→$444 / $1.000→$1.111 / $2.400→$2.667, Titan $5K→$5,6K / $12,5K→$13,9K / $30K→$33,3K. Etki Kat.1 +0,4 dk. |
| Bobby kaldıraç Kat.2–4: `rlcost` içinde `*(k?2n:1n)` | Kat.2 $3,2T…$51,2T; Kat.3 1,02e20…1,64e21; Kat.4 2,05e26…1,05e29 | **×2** (Kat.2 $6,4T…$102,4T; Kat.3 2,05e20…3,28e21; Kat.4 4,10e26…2,10e29) | 2–17 sn geri ödeme = karar değil; ×2 ile ~20–35 sn'ye çıkar, Bobby seviyesi ile gerçek bir seçim olur. Kat.1 Bobby kaldıracı (`k===0`) aynı. |

Denenip bırakılanlar: Bobby ucuzlatma (`ROBP` 2K→1K, `RC[0]` 2,4K..800K → 1,5K..500K) — iyi oyuncuda Kat.1 hızlandırdı (iyi Kat.1 25,0→21,7) ve Bobby-öncelikli tipi ortalamadan ayırmadı → kurala aykırı, vazgeçildi. Volatilite /24 ve /22: Kat.1 ortalama 43,5–45,6 dk (hedef üstü).

## 3. Önce / sonra sim (5 koşu, medyan; sim.js varsayılanları PEBCL=2, LEVK=1)
| Tip | Sürüm | Toplam (min–maks) | Kat.1 / 2 / 3 / 4 | Kat.1 geçişleri: Ember / Nova / Titan / Boss1 / Quasar açılışı (mutlak dk; Pebble 1,3) |
|---|---|---|---|---|
| ortalama | önce | 134,8 (127,8–135,7) | 40,6 / 26,9 / 32,2 / 31,7 | 9,7 / 19,5 / 25,0 / 31,7 / 41,8 |
| | c6 (/24, ×2) | 143,2 (136,9–177,1) | 43,5 / 29,9 / 34,7 / 33,2 | 9,9 / 20,3 / 29,6 / 34,6 / 44,8 |
| | **c8 (/27, ×2) SEÇİLEN** | **139,3 (137,8–140,4)** | **41,0 / 28,9 / 33,6 / 33,3** | 9,8 / 19,0 / 26,3 / 32,3 / 42,2 |
| iyi | önce | 97,5 (84,3–98,7) | 25,0 / 15,9 / 24,2 / 31,9 | 5,2 / 8,1 / 12,0 / 15,3 / 26,3 |
| | c6 | 99,6 (97,4–101,5) | 24,3 / 14,7 / 25,6 / 32,3 | 5,2 / 8,9 / 12,2 / 15,8 / 25,5 |
| | **c8** | **99,1 (89,6–101,7)** | **25,0 / 16,1 / 25,5 / 32,1** | 4,9 / 9,5 / 12,8 / 16,6 / 26,3 |
| Bobby-öncelikli | önce | 135,1 (128,5–139,8) | 39,7 / 29,4 / 32,7 / 32,1 | 9,7 / 19,5 / 26,2 / 30,5 / 40,9 |
| | c6 | 140,2 (139,9–143,0) | 43,5 / 29,9 / 33,9 / 32,7 | 9,9 / 20,3 / 29,6 / 34,6 / 44,8 |
| | **c8** | **139,8 (139,3–147,1)** | **41,0 / 32,5 / 33,8 / 32,9** | 9,8 / 19,0 / 26,3 / 31,9 / 42,2 |

Diğer adaylar (toplam ortalama / iyi / Bobby): c1 Bobby ucuz 136,2 / 96,3 / 135,6; c2 c1+vol/22 136,3 / 95,0 / 139,9; c3 yalnız vol/22 140,4 / 87,0 / 140,7 (iyi 95'in altı); c4 vol/24+×2+RC[0] ucuz 139,8 / 95,1 / 144,2; c5 c4+ROBP 1K 137,9 / 87,5 / 142,9; c7 vol/24+×4 146,5 / 102,6 / 144,0.

Kontrol (kurallar):
- Ortalama toplam 120–150: 139,3 ✓. İyi ≥ 95: 99,1 ✓. Katalog başına (ortalama) 25–42: 41,0 / 28,9 / 33,6 / 33,3 ✓.
- İlk geçiş ≥ 3 dk: iyi Pebble→Ember 4,9−1,3 = 3,6 dk ✓ (önce 3,9; 0,3 dk fark sim gürültüsü içinde). Kat.1'de Ember, Nova, Titan, Boss1 geçişleri iyide aynı ya da yavaş; Quasar açılışı 26,3 = 26,3 ✓. Ortalamada hepsi önceye göre aynı ya da +0,6–1,3 dk yavaş.
- İyi oyuncu Kat.2 (16,1) hâlâ 25 altında: bu değişikliğin konusu değil, eski sorun (Kat.2 hızlı), ayrı iş.
- Robot ekleme fiyatları, UNLK değişmedi.

Kritik dürüstlük: **Bobby-öncelikli tip ortalamadan fark etmiyor (139,8 vs 139,3, +0,5 dk; hedef ±5 dk TUTMADI).** Sebep: sim'de Bobby tipi yalnız otomasyon ağırlığı ×3 olan aynı greedy oyuncu; Bobby açılış kapısı (toplam kazanç $3.000) iki tipte de ~23 dk'da açılıyor. Bobby fiyatlarını ucuzlatmak (c1, c2) tipler arası farkı büyütmedi (−0,6 / +3,6, gürültü) ve iyi oyuncuyu hızlandırdı. Bu fiyat ayarıyla tutmuyor; kapının kendisi (ROBP, toplam kazanç eşiği) ve sim'in Bobby tipi modeli ayrı karar gerektirir.

## 4. Asıl `index.html`'e uygulanacak satır değişiklikleri
Her ikisi de `index.html`'de bir kez geçiyor (grep ile doğrulandı).

1) COINS satırı (`const COINS=[]; … costs=…`, ~1382):
- Eski parça: `PP*m/(k===0?30n:10n)`
- Yeni parça: `PP*m/(k===0?27n:10n)`

2) `rlcost` satırı (~1433):
- Eski parça: `COINS[k*5+4].p0*BigInt(Math.pow(2,rk)*2)*2n*(k===2?8n:k===3?2n:1n))`
- Yeni parça: `COINS[k*5+4].p0*BigInt(Math.pow(2,rk)*2)*2n*(k===2?8n:k===3?2n:1n)*(k?2n:1n))`

(Satır içi yorum: `/* … */` sonuna "seviye-fiyatları 2026-11-19: Kat.1 vol /27, Bobby kaldıraç Kat.2–4 ×2" eklenebilir.) Sim `loadGame` bu iki satırı doğrudan okur; `node araclar/denge/sim.js index.html 5 sonra` ile doğrulanabilir.

## 5. Dört başlık
**Ne değişti.** Yalnız öneri: 2 sayı satırı (Kat.1 volatilite /30→/27; Bobby kaldıraç Kat.2–4 ×2). Asıl dosya ve kayıt dokunulmadı.

**Ne test edildi.** 3 bot koşusu × 12 dk (alım yapan, `?nomenu&lang=tr`, konsol temiz `errs=[]`); sim 5 koşu × 3 tip, 8 aday; `index-c8.html` üzerinde `runTradeTests()` ve `runBobbyTests()` `ok=true`, konsol hatası 0. Eski kayıt, TR/EN ve telefon yatayı bu denemede AÇILMADI (yalnız sabit sayı değiştiği için risk düşük, uygulamada bakılmalı).

**Ne riskli.** (1) Sim oyuncu davranışı varsayım; bot superhuman, tek koşu. (2) Pahalı alımlar (Kat.3–4 kaldıraç 270–494 sn, Pebble kaldıraç $80) bu değişiklikle çözülmedi; çözüm kod değişikliği ister (`lc` formülü iki yerde: `renderShop` ve `lup` işleyicisi), önermem yalnız bu turda. (3) Bobby kapısı ($3.000 toplam kazanç, ortalama oyuncuda 23 dk) ve Bobby tipi ayrımı çözülmedi. (4) Bobby kaldıraç ×2 geç oyunu +%2–3 uzatır (toplam 135→139 dk içinde ~yarısı bu). (5) İyi oyuncu toplamı 99,1: 95 sınırına 4 dk pay var.

**Ölçüte etkisi.** 1 Anlamlı karar: 3 → 3 (tahmin; Bobby kaldıraç Kat.2–4 artık bedava değil, ama Ember volatilite hâlâ bariz). 3 Risk-getiri: 3 → 3 (kaldıraç fiyatına dokunulmadı). 6 Aktif-otomatik: 3 → 3, Bobby tipi ±0,5 dk, hedef ±5 tutmadı; bu alanda fiyat tek başına yetmiyor, Bobby kapısı + tip modeli gerek (tahmin).
