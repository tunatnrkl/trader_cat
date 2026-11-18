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
- Tur: 1 · Aşama: A1 · Adım: tasarımcı başlatıldı

## Günlük (en yeni üstte)
- 2026-11-18: Döngü kuruldu. Önceki görünüm `docs/tasarim/once/` altında.
