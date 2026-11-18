# Yeniden Tasarım Döngüsü — Durum

Kullanıcı isteği (2026-11-18): Tüm grafikleri baştan aşağı değiştir. Göz yormayan, akıcı, sıkmayan renk tonları; "oyun gibi" olsun, şu an içini daraltıyor. Kullanıcı durdurana kadar sürekli yeniden tasarla: en iyi noktaya gel, sonra baştan başla ve değişmesi gerekenleri değiştir. Psikolog testçi tasarımı yorumlayıp Yönetici'ye bildirir; Testçi psikologa not iletir.

## Değişmezler
- Oyun mantığı, sayılar, fiyatlar, denge, kayıt formatı (`trading-idle-save`) DEĞİŞMEZ.
- `runTradeTests`, `runBobbyTests`, `runBobbyE2E`, `runRobotE2E` geçmeli; konsol temiz; eski kayıt açılmalı; TR/EN ve telefon yatayında taşma yok (`node araclar/qa/smoke.js`).
- Tek dosya (index.html), bağımlılıksız, dış dosya/CDN yok.
- Stil: pixel art korunur (oyunun kimliği), ama palet/ışık/düzen/sprite'lar tamamen yenilenebilir.
- Tıklama alanları erişilebilir kalmalı (telefon yatayında parmakla basılabilir).

## Döngü
1. Görsel tasarımcı (Opus) aşamayı uygular → 2. Testçi (Sonnet): smoke + ekran görüntüleri (`docs/tasarim/son/`) + "Psikologa not" → 3. Psikolog (Sonnet): yorum, puan, öncelikli istekler → 4. Yönetici: kabul/ret, commit+push, sıradaki aşama. Tüm aşamalar bitince → yeni tur (geri bildirimlerden yeni aşama listesi).

## Tur 1 aşamaları
- [ ] A1 Sanat yönü + palet + genel CSS (arka plan, paneller, butonlar, monitör çerçevesi, tipografi) — `docs/tasarim/sanat-yonu.md`
- [ ] A2 İşlem grafiği (canvas): çizgi, ızgara, renkler, akıcılık, alım/satım işaretleri, üst bilgi
- [ ] A3 Sprite'lar: coinler, Bobby, kedi, kaplar, robotlar, duvar/raf, ikonlar
- [ ] A4 Mağaza kartları, sol coin listesi, otomasyon merkezi düzeni
- [ ] A5 Menü, tanıtım, bitiş sahnesi, toast/modal/ipucu, geçiş animasyonları

## Şu an
- Tur: 1 · Aşama: A1 · Adım: tasarımcı bitti (commit 21fa62a, smoke 63/63) → testçi çalışıyor → sonra psikolog
- A2–A5 için tasarımcının notları: A2 hud() sabit renkleri (#FFD45E,#4CD08A,#E5484D), çizgi shadowBlur + dolgu gradyanı, neon fiyat etiketi. A3 COL coin renkleri çok doygun, wallCanvas pencere/çerçeve, Bobby kabı/kulübe/#pbs enerji, sol listedeki turuncu ok. A4 "daha fazla" ipucu son kartın üstüne biniyor, robot bölme içi JS renkleri, .sc.glow/.sc.fin yanıp sönme hızlı, bölüm başlıkları küçük; kart kuralları #stage .sc önceliğini aşmalı. A5 ana menü, "yeni açıldı" penceresi, final sahnesi, eğitim karartması, SON DAKİKA yanıp sönmesi; body.soft ölü kod.
- Nabız: send_later ile 60 dk'da bir (bekleyen nabız trigger id'si: trig_01RSyPsaaJppPb5kPNwUMUZm). Yeni nabız kurmadan önce eskisini delete_trigger ile sil, id'yi buraya yaz.
- Rol şablonları: docs/tasarim/roller.md

## Günlük (en yeni üstte)
- 2026-11-18: Döngü kuruldu. Önceki görünüm `docs/tasarim/once/` altında.
