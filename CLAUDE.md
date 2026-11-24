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
- Kayıt formatı ve anahtarı asla bozulmaz. Sayı/fiyat/denge değişikliği: kullanıcı (2026-11-18) Yöneticiye yetki verdi; değişikliği Oyun tasarımcısı yapar, önce yedek, sonra ölçüm (sim + testçi), oturumda en fazla bir büyük denge değişikliği. Günlük: `ofis/karar-gunlugu.md`. Denge notları: `docs/denge-onerisi.md`.
- GitHub kaydı: `araclar/surum.sh "mesaj" dosyalar…` (Sürüm sorumlusu): yalnız geliştirme dalı; index.html değiştiyse smoke geçmeden kaydetmez.
- Ofis görevleri (artifact veritabanı `gorevler`): ofiste yönetici görev verir → çalışan (sample) çıktı üretir (`cikti`, `oneriler`) → yönetici inceler (`onaylandi`/`revize`/`ret`). Gerçek döngüde önce `onaylandi` görevler öncelik sırasıyla oyuna uygulanır (son karar Yöneticide), sonra durum `bitti` + not yazılır. Ekonomi sabitleri ofise `durum/ekonomi` ile verilir; sabit değişince güncelle.
- Yönetici çalışma düzeni ve hafıza: `ofis/` (hafiza, ogrenilenler, karar-gunlugu, oyuncu-geri-bildirimi, ajan-performansi). Oturum başında oku.
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
