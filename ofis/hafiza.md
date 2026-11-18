# Hafıza — oturum özeti ve ölçüt puanları

## Durum (2026-11-18)
- Görsel: Adım 7 (kobalt/lacivert/altın/nane, işlem raporu kartı, bitiş sahnesi+ekranı). Kullanıcı memnun.
- Ekonomi: robot +%8 zinciri, UNLK ×1,5. Coin geçişi hâlâ hızlı (açık sorun).
- Site: main dalı eski tasarımda; birleştirme kullanıcı kararı.
- Testler: smoke 63/63 (araclar/qa/smoke.js).

## Ölçüt puanları (önceki → şimdi)
| Ölçüt | Önceki | Şimdi |
|---|---|---|
| 1 Anlamlı karar | — | 3 |
| 2 Beceri ödülü | — | 4 |
| 3 Risk-getiri | — | 3 |
| 4 İlerleme ritmi | — | 3 |
| 5 Zorluk eğrisi | — | 3 |
| 6 Aktif-otomatik | — | 3 |
| 7 Geri bildirim | — | 4 |
| 8 Çeşitlilik | — | 3 |

Kaynak: `docs/test/teshis-1.md` (Testçi, 11-18). Sim ort. 147,9 dk (Kat.1 56,7 / 31,3 / 29,2 / 30,3), iyi 104,7, Bobby-öncelikli 152,2.

## Öncelik (Teşhis 1'den)
1. Kat.1 ritmi düzensiz: toplam 56,7 dk (hedef ~30), Ember→Nova 15,5 dk duvar; kullanıcı ise ilk geçişleri "çok hızlı" buluyor → coin başına eşit ritim. **Bu oturumun tek büyük denge değişikliği.**
2. İflas kapanı ve açılış: $10 altına düşen oyuncu tura giremiyor, mama döngüsüne dönüyor; açılış metni "mamayı kaba götür" ama sürüklenen su.
3. Aktif-otomatik seçimi anlamsız: Bobby öncelikli oyuncu yalnız +4 dk fark. (Bu oturumda yalnız öneri; uygulama sonraki oturum.)
