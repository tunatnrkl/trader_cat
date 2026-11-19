# Tur 2 / Adım 8 — Güvenli alan, telefon mağaza sıkı, tam tur gözden geçirme

Kaynak: kullanıcı iPhone yatay ekran görüntüsü (Dynamic Island sol panele biniyor, mağaza kartlarında boşluk çok, katalog listesinde üst kart yarım kesik, VOLATİLİTE ikon/yazı hizası farklı).
Palet ve kimlik (Adım 6/7) aynen. Yalnız CSS + `fit()` içinde konumlama (mantık, sayı, fiyat, kayıt, id, data-* değişmedi).
Yedek: `yedek/index-20261119-0955.html`. Görüntüler: `adim-8/once/`, `adim-8/sonra/`.

Gezilen ekranlar: menü, tanıtım, bilgisayar onarımı, oyun, işlem, mağaza ve "daha fazla", Bobby, Otomasyon Merkezi, ayarlar, bilgi penceresi, ipucu, tur sonu raporu, boss, bitiş sahnesi.
Boyutlar: 844×390, 932×430, 667×375, 874×402 (iPhone 16 Pro), dikey 402×874 (döndürülmüş kip), 1440×900, 1280×720. TR + EN.

## Bulunan sorunlar (ekran → sorun → düzeltme)

| # | Ekran | Sorun | Düzeltme |
|---|---|---|---|
| 1 | Tüm oyun (iPhone) | Sol panel Dynamic Island'ın altına giriyor; alttaki ana ekran çizgisi BAŞLA/YENİ TUR ve hayvanlarla çakışıyor | Güvenli alan: `env(safe-area-inset-*)` → `--sal/--sar/--sat/--sab`. `fit()` sahneyi bu alanın ortasına sığdırıyor (iki yan da: ada solda ya da sağda olabilir). Zemin dışarı taşmaya devam ediyor, kenarda boş şerit görünmüyor. |
| 2 | Dikeyde döndürülmüş kip | Ada fiziksel üstte, ana ekran çizgisi fiziksel altta; döndürünce oyunun sol/sağ kenarına denk geliyor | `html.rot` için eşleme: oyunun solu = env üst, sağı = env alt, üstü = env sağ, altı = env sol. Görüntü: `sonra/tel402x874_dikey-dondurulmus_guvenli-alan.png` |
| 3 | Menü, bitiş metni, bildirim (tam ekran katmanlar) | Güvenli alanı bilmiyordu | `#menu` iç boşluğu, `v1.0` etiketi, `#endt` ortası, `#toast` üstü güvenli alana göre |
| 4 | Bitiş sahnesi (mama dökme) | Yürüyen hayvanlar ve mama yığını ekranın en altına, ana ekran çizgisinin altına çiziliyordu | Zemin çizgisi `innerHeight - güvenli alt` ile sınırlandı (çizim kodunda tek değer) |
| 5 | Menü (tüm telefonlar) | "TRADING" logosu üstten, "Çıkış" alttan kesiliyordu | Kısa ekranda (`html.kisa`, yükseklik < 520) logo solda, düğmeler sağda; hepsi sığıyor |
| 6 | Mağaza (telefon) | Kartlar dikeyde çok boş: başlık, alt yazı, noktalar ve 80 px fiyat düğmesi alt alta | Fiyat düğmesi alt yazının yanına (sağ sütun, 68 px), iç boşluk az; kart ~%30 kısa. 844'te ekranda 2 kart + bir sonraki başlık görünüyor |
| 7 | Mağaza VOLATİLİTE/KALDIRAÇ | İkon tüm kartın ortasında, başlık üstte → hizalar farklı | İkon başlık + alt yazı satırlarıyla birlikte ortalanıyor; noktalar yazı sütununda |
| 8 | Mağaza (667×375, dar) | "Pebble · 1x", "Kedi Maması" 2–3 satıra kırılıyor, "Robo t 0/4", "kurul u" sözcük ortasından bölünüyordu | Dar telefonda (`#stage.tel.dar`) alt yazı tam genişlik, düğme noktaların yanında; sözcük ortasından bölme kaldırıldı |
| 9 | Mağaza (EN) | "AUTOMATION CENTER" ve "Installed" sığmıyordu | Başlık sağ boşluğu bilgi düğmesi kadar (52 px); düğmesi olmayan (MAKS/KURULU/SABİT) kartta alt yazı tam genişlik |
| 10 | Katalog listesi | Kaydırınca üst kart başlığın altında yarım kesik duruyor | Kaydırma kartın başına oturuyor (`scroll-snap` proximity) + üst/alt kenarda kısa yumuşak geçiş (kesik kenar sert görünmüyor) |
| 11 | Katalog kartı (telefon) | İç boşluk fazla | Kart yüksekliği 116 → 104 sahne px (yazı boyu aynı) |
| 12 | Tur sonu raporu (telefon) | Açılış/Son/Değişim değerleri ~8 px, okunmuyordu | Değerler etiketle aynı boy (telefon ≥12 px kuralı) |
| 13 | Üst şerit, boss (667×375) | "Kedi Maması" → "Kedi Ma…" kesiliyordu; işlemde "Pebble" de kesilebiliyordu | Dar telefonda şerit boşlukları az, sağ/sol içerik kadar yer alıyor; ad tam görünüyor |

Kalan / dokunulmayan:
- İpucu balonu (`#tip`) açılış animasyonu sırasında taşma ölçümüne takılıyor (eski davranış, oturduktan sonra metin tam). Görsel sorun yok.
- Masaüstü 1280×720'de her şey küçük ama tutarlı (masaüstü ölçüsü kullanıcı isteğiyle küçük).
- Bakiye odometresi geçişte son hanede ince çizgi gösterebiliyor (animasyon karesi); bu adımda dokunulmadı.

## Güvenli alan testi
Gerçek iPhone yok; `env()` değerleri `html` üzerinde CSS değişkeniyle taklit edildi (`--pl/--pr/--pt/--pb`, fiziksel kenarlar). Kırmızı şerit = güvenli olmayan alan, siyah hap = ada, beyaz çizgi = ana ekran çizgisi.
- `once/tel874_guvenli-alan_ada-sol.png`: eski sürüm, sol panel adanın altında.
- `sonra/tel874_guvenli-alan_ada-sol.png` (59 sol / 34 alt): hiçbir panel adaya ve çizgiye girmiyor.
- `sonra/tel874_guvenli-alan_iki-yan.png` (59 / 59 / 21 — gerçek iPhone yatay değerleri).
- `sonra/tel402x874_dikey-dondurulmus_guvenli-alan.png` (dikey, 59 üst / 34 alt).
- `sonra/tel874_menu_guvenli-alan.png`, `sonra/tel874_bitis_guvenli-alan.png`.

## Ne değişti
- `index.html`: yeni CSS bloğu "TUR 2 / ADIM 8" (son `<style>`), `fit()` güvenli alanı okuyup sahneyi ortalıyor (+ `safeA()` yardımcı, `kisa`/`dar` sınıfları, `--lw/--lh`), bitiş sahnesi zemin çizgisi güvenli alt sınırda. Mantık, sayı, fiyat, kayıt, id, data-* aynı.

## Ne test edildi
- `node araclar/qa/smoke.js` 63/63 (runTradeTests, runBobbyTests, runBobbyE2E, runRobotE2E dahil; konsol temiz; eski kayıt; TR/EN taşma 1440/1024/844/667).
- Kendi tur betiğim: 14 ekran × 5 boyut TR, 4 ekran × 3 boyut EN, güvenli alan 3 durum; konsol hatası 0.
- Ada/çizgi çakışması görüntüyle kontrol edildi (yukarıdaki dosyalar).

## Ne riskli
- `env()` gerçek iPhone'da denenmedi (taklit ile). iOS yatayda iki yana da 59 px verdiği için telefonda oyun biraz küçülür (~%13 genişlik); kenarlarda zemin/oda görünür.
- Döndürülmüş kipte eşleme yön varsayımına dayanıyor (oyun saat yönünde 90° döner; mevcut koddaki dönüşle aynı).
- `:has()` seçicisi (Safari 15.4+, Chrome 105+): eski tarayıcıda yalnız EN "Installed" kartı eski düzende kalır.
- `fit()` artık `left/top` satır içi yazıyor; sahne konumunu başka yerden değiştiren kod yok (kontrol edildi).

## Ölçüte etkisi
- 7 Geri bildirim netliği: tur sonu raporu değerleri telefonda okunur oldu, mağaza kartında fiyat düğmesi ve alt yazı yan yana (göz daha az geziyor), coin adı üst şeritte kesilmiyor. Tahmin 4 → 6.
- Genel okunurluk: menü kesilmiyor, sözcükler bölünmüyor, katalog kartı yarım kalmıyor; iPhone'da ada/çizgi çakışması yok.
- Diğer ölçütler: renk/kimlik aynı, dokunma hedefleri (fiyat düğmesi 68 sahne px + görünmez genişletme) ≥44 px gerçek korunuyor; düşüş beklenmiyor.
