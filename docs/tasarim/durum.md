# Yeniden Tasarım Döngüsü — Durum

## Kullanıcı isteği
- 2026-11-18 (1): Tüm grafikleri baştan aşağı değiştir; göz yormayan, akıcı, sıkmayan; oyun gibi olsun; kullanıcı durdurana kadar sürekli yeniden tasarla.
- 2026-11-18 (2) — DÜZELTME: "Sadece renkleri değiştiriyorsun; tasarım (biçim) değişsin." Örnek: `docs/tasarim/ornek/ornek-1.jpg`. 4 tasarımcı çalışsın; 2 psikolog testçi aralarında konuşup tartışsın, tartışmalar kullanıcıya görünür olsun (`docs/tasarim/tartisma/`). Tasarımda daha yüksek efor.
- İlk renk-only deneme (A1, commit 21fa62a) geri alındı; index.html tasarım öncesi hâline döndü (97b1e92 içeriği).

## Değişmezler
- Oyun mantığı, sayılar, fiyatlar, denge, kayıt formatı DEĞİŞMEZ; id ve data-* öznitelikleri korunur.
- `TI_URL=... node araclar/qa/smoke.js` 63/63; TR/EN, telefon yatayında taşma yok.
- Tek dosya, bağımlılıksız. Arayüz pixel art olmak zorunda değil (kullanıcı örneği modern yuvarlak arayüz); hayvan sprite'ları pixel kalabilir.
- Brif: `docs/tasarim/brief.md`.

## Döngü (her tur)
1. 4 tasarımcı (Opus, high) paralel, her biri kendi kopyasında: `tasarim/konsept-N/index.html` → `goruntu/` (8 görüntü) + `NOTLAR.md`.
2. 2 psikolog (A: oyun hissi & motivasyon, B: göz/zihin sağlığı & ergonomi) 4 konsepti tartışır: `docs/tasarim/tartisma/tur-N.md` (açılış → itiraz → yanıt → ortak karar: kazanan + diğerlerinden alınacak fikirler + en önemli düzeltmeler).
3. Yönetici: kazananı `index.html`'ye alır (smoke 63/63), commit+push, `docs/tasarim/son/` güncellenir.
4. Yeni tur: 4 tasarımcı kazanan üzerinden 4 farklı iyileştirme varyantı/alan yapar → tekrar tartışma → birleştir. Kullanıcı durdurana kadar.

## Şu an
- Tur 1: 4 konsept yapılıyor (1 Gece Arcade—örneğe yakın, 2 Pastel Cozy Gündüz, 3 Tok Mobil Oyun, 4 Lofi Akşam Odası). Sonra psikolog tartışması.
- Nabız: send_later 90 dk (bekleyen: trig_01PBqfhmEKX9u723Xk65Ddwu). Yeni nabız kurmadan önce eskisini delete_trigger ile sil, id'yi buraya yaz.
- Konsept 3 bitti (63/63). Konsept 1, 2, 4 saat 03:xx'te 5 saatlik limite takıldı; 04:58'de SendMessage ile devam ettirildi.

## Limit tasarrufu (kullanıcı: "haftalık limit çok bitmeyecek şekilde ayarla")
- Tur 1 (4 konsept, Opus high) bitince sonraki turlarda: 4 tasarımcı ama her biri DAR bir alanda (tam yeniden tasarım değil), Opus **medium**; psikologlar Sonnet **medium**, tartışma en fazla 4 mesaj; testleri Yönetici script ile çalıştırır (ayrı testçi ajanı yok).
- Turlar arka arkaya değil: bir tur bitince bir sonraki nabızda (90 dk) başlar. Gecede en fazla ~3 tur.
- Limit hatası alan ajan yeniden başlatılmaz; limit yenilenince SendMessage ile devam ettirilir.

## Günlük (en yeni üstte)
- 04:58 Limit yenilendi; konsept 1/2/4 devam ettirildi; tasarruf kuralları eklendi.
- 01:30 Kullanıcı itirazı → yeni süreç (4 tasarımcı + 2 psikolog tartışması). A1 geri alındı.
- 01:07 Döngü kuruldu. Önceki görünüm `docs/tasarim/once/`.
