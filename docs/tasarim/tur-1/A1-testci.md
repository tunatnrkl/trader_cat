# Tur 1 / A1 — Testçi raporu

## Sonuç tablosu
| Kontrol | Sonuç |
|---|---|
| `node araclar/qa/smoke.js` (tam) | **63/63 geçti** (taşma, otomasyon, ayarlar, konsol; 4 çözünürlük × TR/EN) |
| Konsol (goruntu.js 8 ekran) | temiz (hata/uyarı yok) |
| Standart set | 8 görüntü `docs/tasarim/son/` altında (araç: `node araclar/qa/goruntu.js`) |
| Ana ekran masaüstü TR/EN | Taşma yok, yeni palet (adaçayı duvar, krem monitör, kâğıt kartlar) uygulanmış |
| İşlem anı (masaüstü + telefon) | Çalışıyor; SAT butonu mercan, BAŞLA altın |
| Otomasyon sekmesi | Çalışıyor, taşma yok |
| Ayarlar modalı | Krem kâğıt, okunur, yeni palette |
| Telefon 844x390 | Taşma yok; metinler küçük (aşağıya bak) |
| Menü (A5 kapsamı) | ESKİ lacivert/ahşap kaldı (beklenen) |

goruntu.js notu: öğretici/kilit penceresi için `S.hintOff=1`, `G.mod=''`, `SIL.hide()` (varsa), Escape ve açık modalda `#mc` tıklaması uygulanıyor. Menü ekranı `?nomenu` olmadan açılıyor.

## Hatalar
| Önem | Yer | Açıklama / tekrar |
|---|---|---|
| Düşük | Sağ pano, Bobby kartı, "AÇ/ON" anahtarı (TR: "AÇ" son harfi anahtar topuna biniyor, "AÇ:" gibi görünüyor) | Ana ekranı aç (`?nomenu`, Bobby açık kayıt). Eski tasarımda da vardı, A1'de düzelmedi. |
| Düşük | Sağ pano alt kenarı, "▼ daha fazla" rozeti | KEMİK kartının alt satırının ("20 sn / kemik...") üstüne biniyor, metin okunmuyor. Eskiden de vardı. |
| Düşük | Ayarlar modalı arkası | Modal açıkken monitör/yan paneller karanlık kahverengi perdeyle örtülü; kabul edilebilir ama sanat-yonu "yumuşak" duygusuna göre ağır. |
| Bilgi | Menü, grafik, sprite'lar, robot kartı | Eski kaldı (A2–A5): menü lacivert+ahşap+parlayan turuncu logo (sanat-yonu'na aykırı neon/glow), grafikte parlak kırmızı çizgi (`#f33` benzeri) ve kırmızı fiyat etiketi, otomasyon bölmelerinde parlak kırmızı fiyat metni ("$1.9Qa"), kalan yazılar monitörde saf siyaha yakın lacivert. |

## Eski/yeni kıyas (once/ ile)
Oda açık adaçayına, paneller yeşilimsi kâğıda döndü; monitör kasası lacivert yerine krem oldu; başlık tabelaları teal; seçili coin kartı krem. Genel olarak çok daha yumuşak. Monitör içi hâlâ koyu (beklenen, "tek koyu alan"). Zemin/kedi/Bobby sprite'ları değişmedi (A3).

## Psikologa not
1. **Renk/işaret çelişkisi (önemli):** İşlemde fiyat başlangıca göre düşükse (başlık `-%4`, çizgi kırmızı) ama alım noktasına göre kârdaysa SAT butonu `+%4.3` gösteriyor. Oyuncu "kırmızı = kayıp" sanıp satmayabilir. Çizgi/başlık rengi neye göre olmalı?
2. **Kontrast:** Ekranın üstündeki kırmızı çizgi ve kırmızı fiyat etiketi yeni yumuşak mercan paletinin yanında hâlâ sert (A2'de değişecek); şimdilik ekranın en "stresli" öğesi bu.
3. **Telefon yatayında (844x390)** küçük yazılar (Bobby kartı "SEVİYE/KALDIRAÇ", sekme etiketleri, saat/zaman rozeti) 7–8 px civarı görünüyor; parmakla ve gözle okunması zor olabilir.
4. **Boş kalan "KİLİTLİ" kartlar ve kilitli katalog sekmeleri** krem zeminde çok sönük; ilerleme motivasyonu (ne açılacak) yeterince çekici mi?
5. **Menü ekranı** bu yeni sıcak odadan sonra çok koyu ve soğuk; ilk izlenim ile oyun içi duygu arasında kopukluk var (A5 beklenecek ama menü ilk izlenim olduğu için öncelik değerlendirilebilir).

## Ne değişti / Ne test edildi / Ne riskli
- Değişti: `araclar/qa/goruntu.js` (yeni), `docs/tasarim/son/*.png` (8 dosya), bu rapor. index.html dokunulmadı.
- Test edildi: smoke 63/63, 8 ekran görüntüsü + konsol, eski/yeni görsel kıyas.
- Riskli: Ekran görüntüleri tek durumda (Katalog 1, 150$ bakiye) alındı; boss coin, çok yüksek bakiye (uzun sayılar), kilit açma modalı ve final sahnesi bu turda görsel olarak denetlenmedi.
