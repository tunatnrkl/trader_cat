# Konsept 2 — "Pastel Cozy Gündüz"

## Tasarım fikri (5 satır)
1. Oyun gündüz ışığı alan sıcak bir odada geçer: krem çizgili duvar kâğıdı, nane lambri, bal rengi parke, pencerede güneş ve bulut.
2. Arayüz Animal Crossing / Stardew sıcaklığında: kalın yuvarlak nane panolar (açık iç kenar + alt düz gölge), krem kartlar, hap butonlar, açık/kapalı anahtar, ●●○ seviye noktaları.
3. Tek koyu alan monitör ekranı (yumuşak lacivert-arduvaz, göz için); kasası yuvarlak, kalın, gök mavisi; altında tok, tereyağı sarısı BAŞLA.
4. Başlıklar (MAĞAZA, KATALOG 1, menü logosu) kalın yuvarlak yazı: şeftali dolgu + koyu kahve kontur + alt gölge.
5. Duygu: stres değil merak. Glow, neon, yanıp sönen alarm yok; kâr/zarar her zaman renk + ok/işaret; kâr kısa (450 ms) "+$X" ile ödüllenir, zarar nötr gri-kahve.

## Palet (CSS `:root`, `--` değişkenleri)
| Rol | Renk |
|---|---|
| Yazı (mürekkep) / ikincil | `#5B4636` / `#8A7360` |
| Kart kremi / oluk / kenar / alt gölge | `#FFFBF3` / `#F8EEDC` / `#EEDFC6` / `#E3CEAC` |
| Nane pano / açık kenar / gölge / vurgu / koyu yazı | `#DDF0E4` / `#F4FBF6` / `#B4D7C2` / `#7CC6A3` / `#2F7458` |
| Şeftali (başlık dolgusu) / açık / koyu | `#FFB27A` / `#FFE4D2` / `#E8895A` (kontur `#7A4A2C`) |
| Gök mavisi (monitör kasası, nötr grafik çizgisi) | `#AEDCF2` / açık `#E0F2FA` / koyu `#7DBBDA` |
| Tereyağı (ana buton, fiyat hapı, seçili) | `#FFD36E` / açık `#FFEDB8` / gölge `#E6A43D` / yazı `#6B4310` |
| Kâr: açık zeminde / ekranda | `#3E9A63` / `#94DDB2` |
| Zarar: açık zeminde / ekranda | `#C0604C` / `#F4AC98` (mercan, neon değil) |
| Boss (mürdüm, zarardan ayrı) | `#C783A3` / açık `#F8E7EF` |
| Ekran / şerit / çizgi / yazı | `#24333E` / `#2C3D49` / `#3C5161` / `#EEF3EC`, ikincil `#A6BBBD` |
| Duvar / lambri / parke | `#FCF0DC`+`#F7E6CB` / `#CFE9D8` / `#EDC99B` |

## Font
Sistem yığını (dış font yok): `ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", Inter, system-ui, sans-serif`, ağırlık 700–900. Rakamlar `tabular-nums`. Canvas yazıları da aynı yığını kullanır (`K2F`). Eski gömülü pixel fontlar dosyada duruyor ama arayüzde kullanılmıyor.
Not: test ortamında (Linux) yuvarlak font yok, görüntülerde Inter görünüyor; Mac/iOS'ta SF Pro Rounded ile daha yuvarlak görünür.

## Neler değişti
**Biçim (CSS):** dosya sonuna tek bir `<style id="k2css">` katmanı eklendi (eski CSS'i ezer; eski kurallar silinmedi, mantık değişmedi).
- Oda: çizgili krem duvar, nane lambri, bal parke (sahne dışına taşar; telefonda kenar boşluğu kalmaz).
- Sol/sağ sütun: kalın yuvarlak nane pano (28 px yarıçap), içinde krem kartlar (20 px yarıçap, alt düz gölge).
- Para plakası: yuvarlak coin rozeti, büyük yuvarlak rakam (canvas, `k2Text`), ince hap ilerleme çubuğu.
- Katalog sekmeleri ve mağaza ANA PC/OTOMASYON seçimi: hap; seçili = tereyağı.
- Coin kartları: yuvarlak tabak içinde coin, fiyat hapı, nokta seviye; seçili = tereyağı kenar; boss = mürdüm kart + BOSS hap rozeti (titreme/yanıp sönme yok).
- Kilitli kartlar: soluk kesik kenar; **sıradaki coin** nane kenarlı ve hedefe ilerleme çubuğu + yüzde gösterir (kilitli içerik adı sızdırılmaz).
- Mağaza kartları: yuvarlak ikon tabağı, kalın başlık, nokta seviyeler, hap fiyat butonu (▲ + $), kilit açma = nane hap, parası yetmeyen = soluk krem hap (kırmızı yok), MAKS = nane rozet, "i" = gök mavisi yuvarlak rozet.
- Toggle: gerçek hap anahtar (beyaz yuvarlak topuz, açıkken nane).
- Bobby kartı satırları: etiket + noktalar solda üst üste, fiyat hapı sağda (10 nokta artık taşmıyor).
- Monitör: yuvarlak kalın gök mavisi kasa, yuvarlak ekran, çene hapı "TRADE-OS 3000", yuvarlak ışıklar, yuvarlak ayak; ekranda tarama çizgisi/vinyet kaldırıldı.
- Ekran içi: hap sekmeler, yuvarlak ayar düğmesi, hap kaldıraç seçimi, tok BAŞLA (iç açık kenar + 8 px alt gölge, basınca iner); AL = nane, SAT = **kârdaysa nane-yeşil, zarardaysa mercan** (alım fiyatına göre).
- Otomasyon merkezi: yuvarlak bölmeler, "+1" tereyağı daire.
- Ayarlar/bilgi penceresi, ipucu, tost, banner, kilometre taşı, öğretici balon, spot ışığı, sürükleme ipucu, final yazısı: krem yuvarlak kartlar, tereyağı kenar.
- Ana menü: gökyüzü + bulutlar, altta aynı nane lambri ve parke; "Trading Idle" kalın yuvarlak logo (canvas pixel logo yerine DOM yazısı), nane pano içinde hap butonlar, Oyna = büyük tereyağı.

**Davranışı değiştirmeyen JS (yalnız görünüm):**
- `renderSide`: yeni kart şablonu (tabak, fiyat hapı, nokta seviye, sıradaki kilitli coinin ilerlemesi). `data-i`, `data-cat` korunuyor.
- `hud`: büyük yüzde = pozisyon açıkken **SAT butonuyla aynı değer** (ui() içinde hesaplanıp `G.k2q`'da paylaşılır, aynı karede güncellenir), ▲/▼ ok ile; pozisyon yokken nötr renkte tur değişimi. Pozisyon açıkken tur değişimi küçük ikincil satır (`#hP2`, "TUR +%x").
- `drawChart`: glow/shadowBlur/gradyan yok; çizgi rengi pozisyon açıkken alım fiyatına göre (nane/mercan), yokken gök mavisi; alım fiyatı kesikli tereyağı çizgisi; al/sat işaretleri yuvarlak rozet + ok; kâr etiketleri krem hap (▲/▼ + yüzde); son fiyat yavaş "nefes alan" halka (eski hızlı yanıp sönme yok).
- `drawTile` (robot bölmeleri): aynı dil, aynı renk mantığı.
- `ui`: SAT sınıfı `sell pos/neg`; satırda `hud()` da çağrılır.
- `notifyPL`: kâr "+$X" krem hap içinde 450 ms'de yaylanarak belirir; zarar küçük, nötr gri-kahve.
- Coin ikonları (`ICONS`, `#cico`): yuvarlak pastel coin (katalog başına sarı/nane/mavi/şeftali, boss mürdüm), sol üst parlama, eski sembol yumuşak köşeli.
- `fit`: geniş ekranda (ör. telefon 844x390) sahne yatayda genişler (en çok 2000), sütunlar genişler ve içerikleri oranlı büyür (`zoom`); telefonda yazılar okunur boyda, kenar boşluğu yok. 1600x900 oranında değişiklik yok.
- `drawWalls`: pencere hep gündüz (konsept gereği).
- `toast` uyarı rengi şeftali.
- Google Fonts `<link>` kaldırıldı (brif: dış font yok).
- Yeni metin: menü alt başlığı "kedi için al-sat" → `I18N.en` "trading for the cat". Grafikteki "Hazır · turu başlat" canvas'ta dile göre.

## Bilinen eksikler / riskler
- Sprite'lar (Bobby, kedi, kaplar, mama paketi, duvar pencere/çerçeve, kulübe, robotlar, kilit/kemik gibi küçük UI ikonları) hâlâ pixel art; yeni yuvarlak arayüzle tam kaynaşmıyor (öncelik 4, zaman yetmedi).
- Final mama dökme sahnesi (`playFinal`) çizimi değişmedi; yalnız yazı stili değişti.
- Geniş ekran modu CSS `zoom` kullanır (Chrome/Safari destekli; Firefox 126+). Sütun içi sürükleyerek kaydırma hızı zoom oranında biraz farklı olabilir.
- Telefon 667x375 (16:9) oranında sahne genişlemez; oradaki küçük etiketler (~7–8 px) hâlâ küçük.
- 667x375/844x390'da sol listede 3. kart yarım görünür (liste kaydırılır).
- Eski CSS katmanları silinmedi, üstüne yazıldı (çok sayıda `!important`); seçilirse sadeleştirme turu gerekir.
