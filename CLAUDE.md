# Trading Idle — Proje Notları

Tek dosyalık (HTML/CSS/JS, bağımlılıksız) pixel art idle trading oyunu, TR/EN. Tüm oyun `index.html` içinde.
Ayrıntılı kod haritası: `docs/kod-haritasi.md` (satır numaraları yaklaşıktır, kod değiştikçe kayar — `grep -n` ile doğrula).

## Oyun özeti
- Oyuncu coin grafiğinde dipten alıp tepeden satar; kaldıraç kâr/zararı katlar; volatilite seviyesi arttıkça grafik sakinleşir.
- 4 katalog × 5 coin = 20 coin; her kataloğun 5. coini "boss" (ani çöküş, `K.crash`).
- Bobby (köpek) ve en fazla 4 robot (Otomasyon Merkezi) otomatik işlem yapar.
- Amaç kediye mama almak; final mama dökme sahnesi (`endGame` / `playFinal`).
- Mobilde PWA, ekran yatay (dikeyde CSS ile döndürülür).

## Değişmez kurallar
- **Kayıt:** localStorage anahtarı `trading-idle-save`, sürüm alanı `v` (`defS()`). Kaydı bozmak yasak. Yeni alan eklenirse eski kayıt varsayılan değerle yüklenmeli (`loadSave` migrasyon bloğu).
- **Para BigInt:** 1 $ = 10000 birim (`D()`, `P()`, `cp()`). Para hesabında float kullanma.
- **Tek işlem formülü:** `calculateTradeResult` — oyuncu, Bobby ve robot hepsi bunu kullanır.
- **Yeni metin:** Türkçe yazılır, İngilizcesi `I18N.en`'e eklenir, gösterimde `L()` kullanılır. Not: bazı fonksiyonlarda yerel `const L` global `L()`'yi gölgeler.
- Oyun mantığı, sayılar, fiyatlar, denge ve kayıt formatı kullanıcı onayı olmadan değiştirilmez. Denge önerileri: `docs/denge-onerisi.md`.
- Görsel: kullanıcı modern, yuvarlak, "oyun gibi" bir arayüz istiyor (örnek: `docs/tasarim/ornek/`); arayüz pixel art olmak zorunda değil, hayvan sprite'ları pixel kalabilir. Göz yormayan, glow/neon yok, emoji yok. Süren yeniden tasarım: `docs/tasarim/durum.md`.

## Test
- Tarayıcı konsolunda: `runTradeTests()`, `runBobbyTests()`, `runRobotE2E()`, `runBobbyE2E()` — durumu yedekleyip geri yükler.
- URL parametreleri: `?nomenu` (menü/tanıtımı atlar), `?lang=en|tr`.
- Ayarlardaki test kipi (`S.set.test`) bakiyeyi çok yükseltir — yalnız test için.
- Playwright + Chromium ortamda kurulu; sayfa `file://.../index.html` ile açılır.
- Her değişiklikten sonra: testler geçmeli, konsol temiz olmalı, eski kayıt açılmalı, TR/EN ve telefon yatayında taşma olmamalı.

## Klasörler
- `yedek/` — yerel yedekler (git dışında; asıl yedek git geçmişi).
- `docs/` — kod haritası, denge önerisi.
- `pazarlama/` — mağaza/reklam metinleri.
