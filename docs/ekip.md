# Ekip — kadro ve yetkiler

Kullanıcı (2026-11-18): Yönetici kendi kararıyla işe alabilir, çıkarabilir, ekipleri bölebilir; en verimli düzen hedeflenir.

## Kadro (güncel)
| Rol | Model | Oda | Görev | Durum |
|---|---|---|---|---|
| Yönetici | Opus | Yönetici | İşi böler, dağıtır, kabul eder, commit/push, kullanıcıya rapor | aktif |
| Tasarımcı | Opus | Tasarım | Yalnız görsel (CSS, çizim, animasyon); mantığa dokunmaz | aktif |
| Yazılımcı | Sonnet | Yazılım | **Yeni ayrıldı:** mantık, ekonomi sabitleri, hata düzeltme, simülasyon | aktif |
| Psikolog A | Sonnet | Tartışma | Oyun hissi ve motivasyon | aktif |
| Psikolog B | Sonnet | Tartışma | Göz sağlığı ve ergonomi; ortak tavsiyeyi yazar | aktif |
| Rakip Analisti | Sonnet | Analiz | **Yeni işe alındı:** emsal idle oyunların tempo, maliyet eğrisi, hırs öğeleri | aktif (ilk iş: docs/rakip-analizi.md) |
| Test robotu | script | Test | smoke.js 63 kontrol + goruntu.js | aktif (ajan değil, limit harcamaz) |

## Çıkarılanlar / birleştirilenler
- 4 tasarımcılı konsept ekibi → tek tasarımcı (Tur 2, limit tasarrufu).
- Testçi ajanı → test robotu (script).
- Kod hatası düzelten "QA yazılımcısı" + "denge önerici" → Yazılımcı'da birleşti.

## Verimlilik kuralları
- Görsel iş Tasarımcı'ya, mantık/sayı Yazılımcı'ya: aynı dosyada çalışırlarsa farklı bölgelere dokunurlar.
- Psikologlar tasarımla eş zamanlı tartışır (A açar, B yanıtlar + ortak tavsiye), en fazla 2 mesaj.
- Rakip Analisti yalnız karar gerektiren sorularda çalışır (ör. tempo).
- Ofis paneli: `ofis/index.html` (yayın: claude.ai artifact). Ofiste yazılan mesajlar ofisin veritabanına düşer; Yönetici "ofisi kontrol et" denince okur.
