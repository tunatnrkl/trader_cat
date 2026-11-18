# Konsept 3: "Tok Mobil Oyun" (Chunky Casual)

## Tasarım fikri
1. Royal Match / Brawl Stars tarzında bir arayüz. Her şey "basılabilir" duruyor: kalın koyu mor kontur, alt kenarı kalın 3B katman, düz renkler. Glow ve bulanıklık yok.
2. Oda sıcak mor-lavanta (puantiyeli duvar, koyu mor zemin). Paneller koyu mor ve 28 px yuvarlak köşeli. Kartların açık bir üst kenarı ve koyu bir alt kenarı var.
3. Başlıklar şerit afiş olarak tasarlandı (KATALOG 1, MAĞAZA turuncu; OTOMASYON MERKEZİ turkuaz). Fiyatlar altın hap butonlarda, kilit açma butonları turkuaz. Seviyeler nokta (●●○) olarak gösteriliyor, AÇIK/KAPALI ise topuzlu toggle.
4. Butona basınca kısa "squish" oluyor (70–90 ms): buton alt kenarına iner, hafifçe yayılır. Yanıp sönen ya da nabız atan bir şey yok (boss dahil).
5. Kâr/zarar dili: pozisyon açıkken grafik çizgisi, büyük yüzde ve SAT butonu oyuncunun ALIŞ fiyatına göre aynı rengi alır (kârda nane/altın, zararda yumuşak mercan). Pozisyon yokken çizgi nötr gök mavisi, yüzde krem. Turun değişimi küçük ikincil satırda.

## Palet
| Rol | Renk |
|---|---|
| Duvar / nokta | `#7C5FC6` / `#8A6FD2` |
| Kontur (her şeyin dış hattı) | `#24154A` |
| Panel / kart / kart alt kenarı | `#3B2870` / `#4D3891` / `#2E1E5C` |
| Ekran zemini | `#1C1538` (iç grafik kartı `#221A46`) |
| Altın (fiyat, seçili, SAT kârda) | `#FFC83D`, kenar `#D88A12` |
| Turuncu (BAŞLA, şerit afiş, Oyna) | `#FF9A2E`, kenar `#C9600F` |
| Turkuaz (AL, toggle açık, kilit aç, ilerleme) | `#35CDBE`, kenar `#178F84` |
| Mercan (zarar, BOSS rozeti) | `#F08A84`, kenar `#B55862` |
| Grafik nötr çizgi | `#8FD3FF` |
| Yazı / ikincil yazı | `#FFF6E6` / `#CBBDF2` |

## Font
Sistem yığını (dış kaynak yok): `ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif`, ağırlık 800–900. Bu ortamda (Linux) Inter Black'e düşüyor. Para yazısı, menü logosu ve grafik yazıları da canvas'ta aynı yığınla çiziliyor. Google Fonts bağlantısı kaldırıldı. Pixel rakam fontları (TIDig/TINum) dosyada duruyor ama kullanılmıyor.

## Neler değişti
- **CSS:** Mevcut stillerin sonuna büyük bir "KONSEPT 3" katmanı eklendi. Oda, paneller, para plakası, katalog sekmeleri, şerit afişler, coin kartları, mağaza kartları, hap butonlar, toggle, nokta seviyeler, ilerleme hapları, Bobby kartı, robot kartları, monitör çerçevesi ve çenesi, ayak, sistem çubuğu, üst ve alt şeritler, büyük düğme (BAŞLA turuncu, AL turkuaz, SAT altın/mercan), tur özeti, haber bandı, otomasyon bölmeleri, oto-tur düğmesi, hayvan alanı etiketleri, modal ve ayarlar, ipucu, toast, afiş, kilometre taşı, öğretici balonu, bitiş ekranı ve ana menü bu katmanda yeniden tasarlandı.
- **Mağaza kartı düzeni:** Kart grid'e geçti. Başlık ve durum tam genişlikte; noktalar ile fiyat butonu en alttaki satırda. Bobby satırlarında solda etiket ve noktalar, sağda buton var.
- **JS (yalnızca görünüm):**
  - `drawChart` yeniden yazıldı: iç grafik kartı, koyu konturlu kalın çizgi, düz renkli alan dolgusu, yuvarlak al/sat rozetleri, hap kâr etiketleri, ALIŞ çizgisi, konturlu fiyat noktası ve hap fiyat etiketi. Ekran "HAZIR! BAŞLA'YA BAS" hapını gösteriyor.
  - `hud`: büyük yüzde, pozisyon açıkken SAT butonuyla aynı değeri gösteriyor. Yeni `#hPs` satırı "POZİSYON · TUR +%x" yazıyor.
  - `ui`: SAT butonuna `up`/`dn` sınıfı eklendi.
  - `notifyPL`: kârda altın "+$X" balonu çıkıyor (450 ms'ye kadar pop, toplam 1,1 sn); zararda nötr lavanta ve daha küçük.
  - `ckCash`: para yazısı yuvarlak ve konturlu.
  - `menuLogo` yeniden çizildi (TRADING altın, IDLE turkuaz). Menüde "Oyna" birincil turuncu buton.
  - `drawTile` robot bölmeleri yeni palete ve fonta geçti.
  - `renderSide`: sıradaki kilitli coin kartında ilerleme hapı ve yüzde görünüyor. Coinin adı sızdırılmıyor.
- Boss yumuşatıldı: ekranın iç kenarında sabit bir mercan çerçeve var, yanıp sönme yok. Siren sprite'ı gizlendi, haber bandındaki "SON DAKİKA" yanıp sönmüyor.
- Yeni metinler: `POZİSYON` ve `ALIŞ` → `I18N.en`. Canvas metinleri `LANG` ile seçiliyor.
- id ve data-* öznitelikleri ile oyun mantığı, sayılar ve kayıt değişmedi.

## Bilinen eksikler / riskler
- Telefonda (844x390) sahne yaklaşık 0,42 ölçekleniyor. İkincil yazılar (16–18 px sahne) ekranda yaklaşık 7–8 px'e iniyor; "≥10 px" hedefi her yerde tutmuyor. Bunu çözmek için `fit()`/sahne yerleşimine dokunmak gerekir; yapmadım.
- Sprite'lar (Bobby, kedi, coin ikonları, kaplar, kilit) hâlâ pixel art; 4. öncelik yapılmadı. Final sahnesinin yalnızca başlığı ve butonu yeni dile geçti.
- CSS eski katmanların üstüne `!important` ağırlıklı bir katman olarak eklendi; eski stiller dosyada duruyor (dosya biraz büyüdü). Temiz bir yeniden yazım sonraki tura kalabilir.
- `#mon.pc2` (Bilgisayar Sv2, artık mağazada yok) yalnızca kabaca uyarlandı.
- Bu konseptin yamaları `scratchpad/k3priv/patch.py` ile kök `index.html`'den yeniden üretilir (k3.css + chart.js).
