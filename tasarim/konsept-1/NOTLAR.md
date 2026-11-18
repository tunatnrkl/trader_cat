# Konsept 1 — "Gece Arcade"

## Tasarım fikri (5 satır)
1. Örnek görseldeki dile sadık: periwinkle duvar, indigo zemin, koyu lacivert yuvarlak paneller, açık mavi kalın kenar + koyu dış hat.
2. Derinlik yalnız düz renk + alt kenar gölgesi + sağ-alta düz gölgeyle verilir (ışık sol üst); bulanık glow, neon, yanıp sönme yok.
3. Tek yuvarlak kalın yazı ailesi; başlıklar altın, koyu konturlu (KATALOG 1, MAĞAZA, TRADING IDLE).
4. Etkileşim dili: altın hap fiyat butonu, nane yeşili anahtar, nokta seviye göstergesi (●●○), ince yuvarlak ilerleme çubukları, tok BAŞLA butonu.
5. Renk anlamı tek: kâr/zarar rengi ALIM fiyatına göre; pozisyon yokken grafik nötr mavi. Zarar cezalandırmayan nötr ton.

## Palet
| Rol | Renk |
|---|---|
| Duvar / zemin / zemin kenarı | `#8C92C6` / `#4A4683` / `#6762A6` |
| Panel / kart / kart kenarı | `#1E2757` / `#253166` / `#36448A` |
| Panel kenarı (açık mavi) / dış hat | `#5570C0` / `#151A3D` |
| Altın (başlık, fiyat hapı) / koyu kenar | `#F3BD4E` / `#A66C1F` |
| BAŞLA turuncu | `#F2A841` (alt kenar `#B9701F`) |
| Kâr (nane) / zarar (yumuşak mercan) / nötr çizgi | `#63CF9C` / `#EE907F` / `#8FB0F5` |
| AL butonu (gök mavisi) | `#6CB4EC` |
| Boss (gül) | zemin `#36224D`, kenar `#C7708A` |
| Metin / ikincil | `#EEF1FF` / `#AEB8E2` |

## Font
Sistem yığını (dış font yok): `ui-rounded, "SF Pro Rounded", Nunito, "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", Inter, system-ui, sans-serif`, ağırlık 800–900, sayılarda `tabular-nums`. Monitörde yalnız "TRADE-OS" etiketleri gömülü pixel fontta (arcade dokunuşu). Google Fonts bağlantısı kaldırıldı.

## Neler değişti
- **Çerçeve (öncelik 1):** `<style id="k1">` katmanı (head sonu) tüm arayüz CSS'ini yeniden tanımlar: oda/zemin, sol-sağ büyük paneller, para plakası (canvas'ta yuvarlak altın yazı: `cashTxt`), katalog sekmeleri (hap), başlık tabelaları, coin kartları (seçili = altın kenar, boss = gül, yanıp sönmez), mağaza kartları (ızgara düzen: ikon | başlık/durum/noktalar | hap buton), altın hap `go`/`goU`, anahtar `tg`, `seg` → noktalar (10'dan çok parçada ince çubuk), Bobby kartı (etiket + çubuk + buton ızgarası), robot kartları, sekmeler, kaydırma ipucu, hayvan alanı etiketleri, enerji çubuğu.
- **Monitör:** yuvarlak kalın çerçeve, yuvarlak ekran, yuvarlak ikon butonlar, altın "TRADE-OS 3000" hapı, nane LED'ler, dekoratif sarı/kırmızı yuvarlak düğmeler, yuvarlak ayak; tarama çizgisi ve vinyet kaldırıldı.
- **Grafik (öncelik 2):** `drawChart`/`hud` yeniden yazıldı: yuvarlak çizim alanı, koyu konturlu kalın çizgi, glow yok; çizgi rengi alım fiyatına göre (pozisyon yokken nötr), alım fiyatı kesikli çizgisi, yuvarlak hap fiyat etiketi, ▲/▼'lü al-sat rozetleri, yavaş "nefes alan" nokta (animasyon azaltılınca sabit). Başlıktaki büyük yüzde = SAT butonundaki yüzde (pozisyon kâr/zararı, ▲/▼); tur değişimi küçük nötr ikincil satır (`#hP2`). Süre son 3 sn'de kırmızıya dönmez. SAT butonu kârda nane, zararda nötr açık gri (`sell pos/neg`).
- **Robot bölmeleri:** `drawTile` renk/fontları yeni dile; bölmeler yuvarlak, glow yok.
- **Menü/modal/bildirim (öncelik 3):** ana menü aynı odada (duvar + zemin + pixel Bobby ve kedi), logo canvas'ta yuvarlak altın yazı (gradyan/glow yok), lacivert panel, turuncu "Oyna" + mavi hap butonlar. Ayarlar penceresi, ipucu, toast, banner, milestone, konuşma balonu, açılış (#pop) yeni dilde. Kâr/zarar uçan etiketi: kârda nane hap ≤420 ms zıplama, zararda nötr küçük hap.
- **Kilitli coin:** sıradaki kilitli kartta "SIRADAKİ %x" + ilerleme çubuğu (yalnız yüzde; ad sızmaz). Yeni metin `SIRADAKİ` → EN `NEXT` (`I18N.en`).
- **Boss:** kırmızı yanıp sönen kenar ve siren kaldırıldı; sabit gül kenar, sakin haber bandı (yanıp sönen "SON DAKİKA" yok).
- **Öncelik 4 (az):** duvar penceresi çerçevesi indigo. Hayvan ve coin sprite'ları değişmedi.
- id ve data-* öznitelikleri, oyun mantığı, sayılar, kayıt formatı dokunulmadı.

## Bilinen eksikler
- Telefon (scale ≈ 0.42) ölçeğinde bazı ikincil etiketler (kartlardaki durum satırı, "SIRADAKİ", eksen yazıları) ≈ 9–9.5 px; birincil yazılar ≥ 10 px. Dokunma hedefleri ≈ 18–20 px görünür + görünmez dikey genişletme; 32 px hedefine tam ulaşmıyor.
- Bobby kartında EN "Catalog 1" dar ekranda kısalabiliyor (…).
- "▼ daha fazla" kaydırma ipucu, altındaki kartın bir kısmını örtüyor.
- Monitör altındaki sarı/kırmızı yuvarlaklar yalnız süs (işlevsiz).
- Coin ikonları, kilit ikonu, kaplar, kulübe pixel art olarak kaldı; final sahnesi yalnız yazı/buton stiliyle uyarlandı.
- `.go`/`.sw` dokunma alanı genişletmesi yalnız dikey (yatay genişletme taşma testini bozuyordu).
- Gerçek cihazda `ui-rounded` (iOS) / Roboto (Android) ile genişlik farkı test edilmedi; testler Chromium + Inter ile.

## Doğrulama
- `smoke.js` → 63/63 (konsol temiz, eski kayıt, TR/EN, 4 ekran boyutunda taşma yok).
- `goruntu.js` → 8 görüntü `goruntu/` altında, konsol temiz.
