# Yeniden Tasarım Brifi (Tur 1 — 4 konsept)

## Kullanıcının isteği (kendi sözleriyle özet)
"Tasarım değişsin dedim, sadece renkleri değiştiriyorsun. Baştan aşağı TÜM grafikleri değiştir: göz yormayan, akıcı, sıkmayan; oyun gibi olsun. Şu an oyuna bakınca içim daralıyor." Örnek görsel: `docs/tasarim/ornek/ornek-1.jpg` (yalnızca ÖRNEK — yön göstersin, birebir kopya şart değil).

**Renk değişikliği tek başına iş sayılmaz.** Biçim, düzen, tipografi, butonlar, kartlar, ikonlar, monitör, grafik, menü — hepsi değişmeli.

## Örnekten çıkan dil (referans)
- Modern mobil "casual game" arayüzü: kalın, yuvarlak köşeli paneller (≈14–20 px yarıçap), açık renkli kalın dış hat, katmanlı derinlik (düz renk + alt kenar gölgesi; bulanık glow yok).
- Kalın, yuvarlak, okunaklı başlık fontu (MAĞAZA, KATALOG 1) — dolgun turuncu/altın, koyu kontur.
- Hap (pill) şeklinde fiyat butonları; açık/kapalı anahtar (toggle); seviye göstergesi noktalar (●●○), ince yuvarlak ilerleme çubukları.
- Seçili kart altın kenar; BOSS rozeti; kilitli kartlar net.
- Monitör: yuvarlak köşeli kalın çerçeve, yuvarlak ikon butonlar (? ve ayar), büyük tok "BAŞLA" butonu.
- Hayvan sprite'ları (Bobby, kedi) pixel art kalabilir; arayüz pixel olmak zorunda değil.

## Değişmezler (çiğnenirse iş reddedilir)
- Oyun mantığı, sayılar, fiyatlar, denge, kayıt formatı (`trading-idle-save`, BigInt) DEĞİŞMEZ.
- Olay işleyicilerin dayandığı `id`'ler ve `data-*` öznitelikleri (data-a, data-cat, data-i, data-view, data-m, data-set, data-feed, data-l …) korunur. Render fonksiyonlarındaki HTML şablonları (card, go, goU, tg, renderShop, renderSide, menuRender …) yeniden yazılabilir — davranış aynı kalmak şartıyla.
- Tek dosya, bağımlılıksız: dış font/CDN/resim yok. Font için sistem yığınları: `ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif` + font-weight 800–900. (İstersen canvas/SVG ile ikon çiz.)
- Emoji yok. Telefon yatayında (844x390, 667x375) her şey sığmalı, dokunma hedefleri ≥ ~32 px, yazılar ≥ ~10 px.
- TR ve EN'de taşma yok. Yeni metin → `I18N.en` + `L()`.
- Testler: `TI_URL=file://<senin kopyan> TI_SHOTS=<klasör> node araclar/qa/smoke.js` tam geçmeli (63/63).

## Psikolog bulguları (önceki turdan, uygula)
- Kâr/zarar rengi oyuncunun ALIM fiyatına göre (pozisyon açıkken); pozisyon yokken nötr. Başlıktaki büyük yüzde ile SAT butonu aynı şeyi söylesin; tur başına değişim küçük ikincil bilgi.
- Sert neon kırmızı/yeşil yok; kâr/zarar renk + ok/işaret. Glow yok. Yanıp sönen alarm/aciliyet baskısı yok (boss dahil, yumuşak).
- Ödül hissi: kârla kapanışta kısa (≤450 ms) tatmin edici "+$X" geri bildirimi; zararda cezalandırmayan nötr ton.
- Kilitli kartlar çekici: hedef/ilerleme görünür.
- Ana menü oyunun içiyle aynı dilde olsun.

## Öncelik sırası (zaman yetmezse buna göre)
1. Genel çerçeve: oda/arka plan, sol ve sağ paneller, kartlar, tabelalar, butonlar, sekmeler, toggle, seviye noktaları, para plakası, monitör çerçevesi ve alt düğmeler.
2. İşlem grafiği (canvas `#cv`, `drawChart`, `hud`) ve robot bölmeleri (`drawTile`).
3. Ana menü, ayarlar/modal, ipucu, toast, kilit açma penceresi.
4. Sprite/ikon yenileme (coin ikonları, kaplar, duvar penceresi vb.), final sahnesi.
