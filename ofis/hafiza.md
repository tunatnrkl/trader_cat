# Hafıza — oturum özeti ve ölçüt puanları

## Durum (2026-11-18)
- Görsel: Adım 7 (kobalt/lacivert/altın/nane, işlem raporu kartı, bitiş sahnesi+ekranı). Kullanıcı memnun.
- Ekonomi: robot +%8 zinciri; oneri-2 Düzeltme 1 (UNLK [150,375,400,1300], Kat.1 volatilite ⅓, Kat.1 kaldıraç ×2, Bobby Kat.1 kaldıraç ÷2, Quasar/Vortex/Pulsar ucuz). İyi oyuncunun ilk 4 geçişi yavaşladı (2,5→3,9 dk ilk).
- Kurtarma turu: Pebble'da $1–10 nakitle 1x (yalnız bilgisayar onarıldıktan sonra, yalnız elle).
- GitHub: araclar/surum.sh (Sürüm sorumlusu) smoke geçmeden kaydetmez.
- Site: main dalı eski tasarımda; birleştirme kullanıcı kararı.
- Testler: smoke 63/63 (araclar/qa/smoke.js).

## Ölçüt puanları (Teşhis 1 → Teşhis 2)
| Ölçüt | Önceki | Şimdi |
|---|---|---|
| 1 Anlamlı karar | 3 | 3 |
| 2 Beceri ödülü | 4 | 4 |
| 3 Risk-getiri | 3 | 3 |
| 4 İlerleme ritmi | 3 | 3 |
| 5 Zorluk eğrisi | 3 | 3 |
| 6 Aktif-otomatik | 3 | 3 |
| 7 Geri bildirim | 4 | 4 |
| 8 Çeşitlilik | 3 | 3 |

Kaynak: `docs/test/teshis-1.md`, `docs/test/teshis-2.md`. Sim (doğru ayar) ortalama 139,7→134,8 dk (Kat.1 52,4→40,6), iyi 89,9→97,5, Bobby 141,0→135,1. Puan değişmedi: gelişme 1–5 ölçeğinde eşiği geçmedi.

## Sonraki oturum önceliği (Teşhis 2'den)
1. Kötü/orta oyuncu Pebble'da sıkışıyor: kurtarma turu kilidi çözdü ama $10'a çıkış yok (rastgele 13 dk'da $1,72).
2. Kat.1 hâlâ ~40 dk (hedef ~30); iyi oyuncu 97,5 dk (hedef 120–150 altı); Kat.4 Eclipse→Pulsar 17,8 dk.
3. Bobby seçimi anlamsız (seviye fiyatı çalışması da çözmedi: sebep Bobby kapısı ~$3.000 / ~23. dk ve sim Bobby modeli; Kat.3–4 kaldıraç 270–494 sn geri ödeme, lc formülü kod işi) (135,1 vs 134,8): oneri-2 Sorun 3 (Bobby erken güç ya da elle işlem ×1,5) — bu bir büyük denge değişikliği.

## Öncelik (Teşhis 1'den, bu oturumda ele alındı)
1. Kat.1 ritmi düzensiz: toplam 56,7 dk (hedef ~30), Ember→Nova 15,5 dk duvar; kullanıcı ise ilk geçişleri "çok hızlı" buluyor → coin başına eşit ritim. **Bu oturumun tek büyük denge değişikliği.**
2. İflas kapanı ve açılış: $10 altına düşen oyuncu tura giremiyor, mama döngüsüne dönüyor; açılış metni "mamayı kaba götür" ama sürüklenen su.
3. Aktif-otomatik seçimi anlamsız: Bobby öncelikli oyuncu yalnız +4 dk fark. (Bu oturumda yalnız öneri; uygulama sonraki oturum.)
