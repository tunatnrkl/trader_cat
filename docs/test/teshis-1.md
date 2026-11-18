# Teşhis 1 — oyuncu gözüyle 8 ölçüt (Testçi, Sonnet)

> Kod değişmedi. Yöntem: Playwright'ta `?nomenu&lang=tr`, taze kayıt; sayfa içi bot (grafik fiyatını 100 ms'de bir okur, %0,4 dönüş görünce al/sat) = "iyi", rastgele tıklayan bot = "kötü". Bot insandan hızlıdır (tur başına ~17 tıklama); sayılar üst sınırdır (tahmin). Betikler: `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/testci/`.

## 1. Puan tablosu
| Ölçüt | Puan | Kanıt |
|---|---|---|
| 1 Anlamlı karar | 3 | Pebble'da kaldıraç 1x, tek karar "al/sat zamanı"; 4 dk iyi oyunda 278 tıklama, hepsi aynı karar; satın alma seçimi (Bobby/robot/volatilite) ilk 4 dk'da hiç sorulmadı. |
| 2 Beceri ödülü | 4 | Tur başı ort. kazanç iyi +$14,6 (15 tur) vs rastgele +$0,22 (14 tur); 4 dk sonunda kasa $242 vs $18 (kazanç ~13x). Sim'de fark yalnız 1,41x (104,7 vs 147,9 dk). |
| 3 Risk ve getiri | 3 | Kötü oyuncu 1. turda $10'dan $7,04'e düştü ve bir sonraki tura giremedi; boss turunda 1x'te -%95 (Kat.2 boss) ve -%53 (Kat.1 boss) gördüm; Pebble/Ember'de 1x'te riskin tadı yok. |
| 4 İlerleme ritmi | 3 | Kısa hedef net (tur sonu +$), orta hedef çubuk "88,3 / 1.800" iyi; uzun hedef (final mama $) ilk saatte görünmüyor (tahmin: sol panelde yalnız sıradaki coin çubuğu var). |
| 5 Zorluk eğrisi | 3 | Sim ortalama 147,9 dk ama Kat.1 56,7 dk (hedef ~30); iyi oyuncu 104,7 dk (hedef 120–150'nin altında); Bobby-öncelikli koşuda Vortex→Nebula 47 dk bekleme. |
| 6 Aktif/otomatik | 3 | Bobby/robotu elle oynamadım (yalnız sim). Sim: Bobby-öncelikli oyuncu 152,2 dk, ortalamadan yalnız +4 dk; Bobby alımı hızı neredeyse hiç değiştirmiyor. Gerçek his ölçülmedi. |
| 7 Geri bildirim | 4 | Grafikte ▲/▼ işaretleri ve "-%55,6" etiketleri, "15. sn'de otomatik satılır", "Satıldı: +$0.7", boss'ta "Boss coininde kaldıraç kullanılamaz" notu; zayıf: aşağıdaki mama/su karışıklığı. |
| 8 Çeşitlilik | 3 | 20 coin ama tur hep 15 sn, aynı al/sat döngüsü; boss tek farklı an (ekranda ~3. sn çöküş, sonra düz çizgi). Yeni mekanik/olay yok (tahmin: 1–2 saatlik oyunda ikinci katalogdan sonra yenilik hissi düşer). |

## 2. Sorun listesi
- takıldım — açılış: $2 → $10 için kediye 8 su/mama döngüsü; ölçülen 34,7 s (iki koşuda 34,8 ve 35,1 s), her döngü 4 s basılı tutma + sürükleme, net +$1.
- kafam karıştı — açılış notu "Kedi mamasını kaba götür!" der, ama sürüklenen şey su (`#foodw`) ve ilk bırakışta $1 düşüyor ($2 → $1); mama çuvalı (`S.food=0`) görünmüyor. Metin ile eylem uyuşmuyor.
- takıldım — kötü oyuncu: 1. turda $10 → $7,04 olunca BAŞLA kapalı ("Yetersiz bakiye"); kurtulmak için tekrar mama döngüsü. Rastgele bot 4 dk'da 4 kez mamaya döndü (~$1/6 s).
- gereksiz tıkladım — iyi oyuncu Pebble'da 4 dk'da 278 tıklama (tur başı 16–17); fazla işlem kâr katlamıyor, Oto-Tur/Bobby ihtiyacı burada hissediliyor. İnsan bu tempoyu tutamaz (tahmin).
- sıkıldım — Ember'e geçince bile (açıldığında) Pebble'da kalan oyuncu ~$13–28/tur kazanıyor; bot coin değiştirmedi, gerçek oyuncuda coin geçişi net değil (ölçülmedi).
- sıkıldım — Kat.1 hedef 30 dk, sim 56,7 dk; "Ember→Nova" 15,5 dk bekleme, ilerleme çubuğu ($88/1.800) 4 dk'da %5.
- takıldım — sim, Bobby-öncelikli oyuncu: Vortex→Nebula 47 dk (en uzun duvar); Eclipse→Pulsar 19–20 dk iyi/ortalama/Bobby üç tipte de en uzun üç duvardan biri.
- sıkıldım — boss turu: çöküş ~3. sn'de, kalan 12 sn düz çizgi/bekleme (tek örnek ekran görüntüsü, `c9.png`).
- kafam karıştı — boss'ta 1x kilidi "Kaldıraç sabit" ve volatilite "SABİT" görünür ama oyuncu neden riskin değişmediğini yalnız ipucundan öğreniyor (küçük).
- gereksiz tıkladım — tur bitince "YENİ TUR" için her seferinde ek tık (Oto-Tur $500 kilidi ilk saatte uzak).

## 3. Süre tablosu (sim.js, 5 koşu, medyan)
| Tip | Toplam (min–maks) | Kat.1 / 2 / 3 / 4 dk | En uzun duvarlar |
|---|---|---|---|
| ortalama | 147,9 (145,9–157,6) | 56,7 / 31,3 / 29,2 / 30,3 | Eclipse→Pulsar 19,8; Quasar→Zenith 16,6; boss1→Quasar 16,3 |
| iyi | 104,7 (96,9–109,8) | 34,5 / 18,3 / 24,8 / 29,3 | Eclipse→Pulsar 19,2; boss1→Quasar 15,7 |
| Bobby-öncelikli | 152,2 (146,3–193,9) | 55,2 / 33,0 / 29,5 / 30,0 | Vortex→Nebula 47,0; Eclipse→Pulsar 19,4 |
- İyi/ortalama süre oranı 0,71 (iyi oyuncu %29 daha hızlı). Gerçek bot ölçümü (ilk 4 dk): iyi kasa $242, rastgele $18 → tur başı kazanç oranı ~66x (14,6/0,22), 4 dk toplam ~13x. Sim yalnız 1,4x; ilk dakikalarda beceri farkı çok büyük, sonra otomasyon farkı sıkıştırıyor (tahmin).
- Not: sim'deki oyuncu davranışı varsayımdır (kod başlığında yazıyor).

## 4. En kötü 3 sorun (etki sırası)
1. Kat.1 yaklaşık 2x uzun (56,7 dk vs ~30) ve Ember→Nova bekleme 15,5 dk; yeni oyuncunun en çok bırakacağı yer.
2. Kötü oyuncu $10 altına düşünce tura giremeyip mama döngüsüne dönüyor (+$1/6 s); açılış mama metni de su sürüklemeyle uyuşmuyor. İlk 35 s ve her kötü tur sonrası kafa karıştırıcı/yavaş.
3. Beceri farkı erken oyunda çok büyük (~66x/tur) ama orta oyunda sim'de 1,4x; iyi oyuncu 104,7 dk ile hedefin altında, Bobby-öncelikli seçim neredeyse hiç hız kazandırmıyor (+4 dk): aktif/otomatik dengesi anlamlı bir seçim sunmuyor.

## 5. Test
- `runTradeTests()`: ok=true, "Tüm işlem testleri GEÇTİ".
- `runBobbyTests()`: ok=true, "Bobby testleri GEÇTİ (elle ve robot da aynı sonucu verdi)".
- Konsol hatası/uyarısı (pageerror, console error/warn, requestfailed): 0 (tüm koşularda `errs=[]`).
- Zayıf yerler: bot insandan hızlı; yalnız 4–5 dk gerçek oynanış (hedef 10–15 dk); katalog ziyaretlerinde tüm coinler cl=1 (en volatil, 34–66 dönüm noktası) enjekte edildi, 1x kaldıraç, 2 tur; Bobby/robot elle denenmedi; `index.html` ve kayıt formatı değişmedi.
