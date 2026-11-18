# Ekip — kadro ve yetkiler

Kullanıcı (2026-11-18): Yönetici kendi kararıyla işe alabilir, çıkarabilir, ekipleri bölebilir; en verimli düzen hedeflenir.

## Kadro (güncel — yaşayan ofis promptu, 2026-11-18)
| Rol | Model · Güç | İş |
|---|---|---|
| Yönetici | Opus | Tek amaç oynanış zevki; 8 ölçüt; teşhis→öncelik→çözüm→uygulama→ölçüm |
| Oyun tasarımcısı | Opus · high | Ekonomi, sayılar, süre, katalog ritmi, boss, kaldıraç/volatilite, Bobby/robot dengesi (sayıları o değiştirir) |
| Görsel tasarımcı | Opus · medium | Arayüz netliği, animasyon, okunurluk |
| Yazılımcı | Opus · medium | Kod, mekanik, hata düzeltme |
| Ses ve müzik | Sonnet · medium | Geri bildirim sesleri, müzik, tempo |
| Metin | Sonnet · medium | Oyun içi mesajlar, ipuçları, TR/EN |
| Testçi (oyuncu) | Sonnet · medium | Oyunu oynar, 8 ölçüte puan verir |
| Kod araştırmacısı | Haiku · low | Kodda yer bulma, basit kontroller |
| Psikolog A / B (danışman) | Sonnet · medium | Yalnız görsel kararlarda kısa tartışma |
| Test robotu | script | smoke.js 63 kontrol + goruntu.js |

Kural: aynı dosyaya dokunan roller (Yazılımcı, Görsel, Ses) paralel çalışmaz.

## Çıkarılanlar / birleştirilenler
- Rakip Analisti: ilk işi (docs/rakip-analizi.md) bitti, ayrıldı; gerekirse yeniden alınır.
- 4 tasarımcılı konsept ekibi → tek tasarımcı (Tur 2, limit tasarrufu).
- Testçi ajanı → test robotu (script).
- Kod hatası düzelten "QA yazılımcısı" + "denge önerici" → Yazılımcı'da birleşti.

## Verimlilik kuralları
- Görsel iş Tasarımcı'ya, mantık/sayı Yazılımcı'ya: aynı dosyada çalışırlarsa farklı bölgelere dokunurlar.
- Psikologlar tasarımla eş zamanlı tartışır (A açar, B yanıtlar + ortak tavsiye), en fazla 2 mesaj.
- Rakip Analisti yalnız karar gerektiren sorularda çalışır (ör. tempo).
- Ofis paneli: `ofis/index.html` (yayın: claude.ai artifact). Ofiste yazılan mesajlar ofisin veritabanına düşer; Yönetici "ofisi kontrol et" denince okur.
