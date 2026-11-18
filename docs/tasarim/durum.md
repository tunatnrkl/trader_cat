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
- Tur 1 bitti: 4 konsept + psikolog tartışması (docs/tasarim/tartisma/tur-1.md; psikologlar Lofi'yi seçti). **Kullanıcı Konsept 3 (Tok Mobil) ile devam dedi, arka plan daha koyu.** index.html = konsept-3 (smoke 63/63).
- **Tur 2 yeni süreç (kullanıcı):** tek tasarımcı (Opus high) kök index.html üzerinde adım adım; her adım sonunda danışır; 2 psikolog (A, B) o adımı tartışır, B ortak tavsiye yazar; tasarımcı uygular. Canlı kayıt: docs/tasarim/canli/tur-2.md. Psikologların Tur 1 ortak kararındaki ölçülebilir kurallar (telefon ≥12 px, dokunma ≥44 px, kontrast 4.5:1, zararda alarm yok, ▲/▼, tek altın vurgu, animasyon ≤600 ms + hareket azaltma) geçerli.
- Nabız: send_later 90 dk (bekleyen: trig_01PBqfhmEKX9u723Xk65Ddwu).
- Tur 2 ajanları (SendMessage ile devam ettir): Tasarımcı a22b9c9486af1dbe6, Psikolog A a432f9ac8d661aba8, Psikolog B ad9f8ed00eca1c624. Adım 1–3 bitti (commit), Adım 4 (telefon okunurluğu) toparlanıyor. **Kullanıcı (sabah): çok beğendi; ama çocuksu → Scritchy Scratchy gibi 'gerçek para hırsı' hissi; masaüstünde yazılar küçülsün, telefonda büyük kalsın; mama stamina ease-out.** Sonraki: Adım 5 = docs/tasarim/brief-adim5.md. Limit çok az: Adım 5'te psikolog tartışması duraklatıldı (yalnız sonunda tek kısa değerlendirme, limit kalırsa).

## Limit tasarrufu (kullanıcı: "haftalık limit çok bitmeyecek şekilde ayarla")
- Tur 1 (4 konsept, Opus high) bitince sonraki turlarda: 4 tasarımcı ama her biri DAR bir alanda (tam yeniden tasarım değil), Opus **medium**; psikologlar Sonnet **medium**, tartışma en fazla 4 mesaj; testleri Yönetici script ile çalıştırır (ayrı testçi ajanı yok).
- Turlar arka arkaya değil: bir tur bitince bir sonraki nabızda (90 dk) başlar. Gecede en fazla ~3 tur.
- Limit hatası alan ajan yeniden başlatılmaz; limit yenilenince SendMessage ile devam ettirilir.

## Günlük (en yeni üstte)
- Sabah: kullanıcı yeni tasarımı sitede gördü, beğendi; Adım 5 brifi yazıldı (olgunlaştırma).
- 05:40 Kullanıcı: Konsept 3 + koyu arka plan; tek tasarımcı + eş zamanlı psikolog tartışması. index.html konsept-3'e geçti.
- 04:58 Limit yenilendi; konsept 1/2/4 devam ettirildi; tasarruf kuralları eklendi.
- 01:30 Kullanıcı itirazı → yeni süreç (4 tasarımcı + 2 psikolog tartışması). A1 geri alındı.
- 01:07 Döngü kuruldu. Önceki görünüm `docs/tasarim/once/`.
