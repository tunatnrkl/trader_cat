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
- Nabız: send_later 60 dk (bekleyen: trig_01RSyPsaaJppPb5kPNwUMUZm). Yeni nabız kurmadan önce eskisini delete_trigger ile sil, id'yi buraya yaz.

## Günlük (en yeni üstte)
- 01:30 Kullanıcı itirazı → yeni süreç (4 tasarımcı + 2 psikolog tartışması). A1 geri alındı.
- 01:07 Döngü kuruldu. Önceki görünüm `docs/tasarim/once/`.
