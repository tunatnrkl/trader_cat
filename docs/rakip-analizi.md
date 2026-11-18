# Rakip / emsal analizi — coin geçiş temposu ve "hırs"

> Durum: ÖNERİ. `index.html`'e dokunulmadı. 8 web araması yapıldı; bulunamayan değer "bilinmiyor" yazıldı (uydurma yok).
> Not: arama sonuçlarında bazı sitelerin güvenilirliği düşük (fan/aggregator); onlar tabloya alınmadı.

## 1. Oyun başına özet

| Oyun | İlk kilit açma | Kilitler arası | Maliyet çarpanı | Toplam süre | Hırs öğesi |
|---|---|---|---|---|---|
| Scritchy Scratchy (Steam, 18.03.2026) | bilinmiyor | bilinmiyor (kataloglar kademeli açılır) | bilinmiyor | bilinmiyor (HowLongToBeat sayısı alınamadı) | Kazı-kazan: kart al, kazı, Final Chance kartı, prestij (Jack Points), yetenek ağacı; Luck yükseltmesi |
| Cookie Clicker | bilinmiyor | yükseltmeler bina adedine bağlı: 1, 5, 25, 50, 100, 150, 200 (kaynaklar 15 eşiğinde ayrışıyor) | bina başına x1,15 (wiki) | bilinmiyor | sürekli artan CpS, altın kurabiye, ilerleyen bina listesi |
| AdVenture Capitalist | bilinmiyor | bilinmiyor | x1,07 (Limonata) – x1,15 (Gazete) – x1,14 (Car Wash) arası, işe göre | bilinmiyor | yönetici (otomasyon), milyar/trilyon sayıları, melek yatırımcı prestiji |
| Idle Miner Tycoon | bilinmiyor | yeni maden: yeterli nakitle satın alma | bilinmiyor (kaynak bulunamadı) | bilinmiyor | yönetici + süper yönetici, görev kilometre taşları, süper nakit |
| Realm Grinder | bilinmiyor | bilinmiyor | bilinmiyor | medyan 4,9 sa, ortalama 131,9 sa (tek kaynak, uzun kuyruk) | iki prestij katmanı (Abdication / Reincarnation), fraksiyonlar |
| Universal Paperclips | bilinmiyor | 3 faz; faz süreleri bilinmiyor | bilinmiyor | yaklaşık 4–10 sa (tahminler dağınık; hız koşusu 11 sa 20 dk) | faz değişimi (anlatı), güven/işlem puanı beklemeleri |
| Borsa/kripto temalı idle | arama sonuç vermedi | bilinmiyor | bilinmiyor | bilinmiyor | bilinmiyor |
| **Bizim oyun** | 1. dk (Pebble) | 7–30 dk (denge simülasyonu) | coin fiyatı x10–13 (Pebble→Ember x40, katalog arası x100–333) | ~147 dk orta oyuncu | kediye mama, final sahnesi |

Genel kural (tek geliştirici kaynakları, standart değil): ilk yükseltme ~60 sn, ilk otomasyon ~3 dk, 5 dk'dan uzun anlamlı bekleme oyuncuyu kaybettirir.
Matematik kaynağı (Pecorella): maliyet üstel, gelir (bina adedi x çarpanlar) doğrusal-üstel; denge "maliyet büyümesi gelirden hızlı" olmalı. Tam tablo (kon.gg/idle-math-spreadsheets) okunamadı.

## 2. Teşhis: eşik neden %4–9 etki etti?

- `denge-onerisi.md` (c): Kat.1'de duvar *kâr eşiği* değil *nakit*; `UNLK`'u tek başına değiştirmek 112 → 113 dk bıraktı. Eşik x1,5 olunca da aynı mantık: aşama kârı paralel birikiyor.
- Kat.2–4'te Bobby + robot + kaldıraç kârı katladığı için aşama kârı hızla dolar; eşiğin yüzdesi artsa da kâr/sn de artar. Eşik, gelirle birlikte büyüyen bir şeye karşı sabit oran olduğu için süreyi doğrusal uzatır ama oyuncu gücü üstel büyür (rakiplerde bu yüzden çarpan 1,07–1,15 ile gelirin altında tutulur).
- Sonuç: geçiş süresini kâr oranı (eşik) ile ayarlamak zayıf kaldıraç; süreyi *beceri ve otomasyondan bağımsız* belirleyen bir taban gerekir.

## 3. Bizim oyun için 3 somut öneri (hepsi onay bekler)

1. **Katalog içi ara hedefler (en sağlıklı, ana öneri).** Her coinin açılış eşiği 3 basamağa bölünsün (örn. %33 / %66 / %100). Her basamak küçük, somut bir ödül açsın (kaldıraç yuvası, volatilite seviyesi indirimi, rozet, kasa kilometre taşı). Cookie Clicker'daki "1/5/25/50/100 adet" ritmine benzer. Gerekçe: süre uzamaz bile olsa her 2–4 dk'da bir hedef olur; "çok hızlı geçiyorum" hissi coin başına 3 mini-kutlamaya bölünür, hırs artar. Tek başına süreyi uzatmaz, 2 ile birlikte kullanılmalı.
2. **Tur başına aşama kârı tavanı (süreyi gerçekten uzatan taban).** Bir turda aşama kârına en çok eşiğin ~%X'i (öneri: %8–12) sayılsın; fazlası nakit olarak kalır, sadece ilerleme çubuğuna yazılmaz. Gerekçe: kaldıraç, Bobby, robot ne kadar güçlenirse güçlensin coin başına en az 1/X tur (X=%10 → 10 tur x 15 sn = ~2,5 dk + işlem boşlukları) gerekir. Beceriden bağımsız taban, oyuncu gücü üstel büyürken eşiğin kaybolmasını önler. Hangi X'te toplam kaç dk olacağı simüle edilmedi (bilinmiyor); sim şart. Kayıt formatı değişmez (aşama kârı zaten `S.stp`), açık coinler açık kalır.
3. **"Hırs" katmanı (kozmetik/his, denge dokunmaz).** (a) Büyük kâr anında kısa "rekor" vurgusu ve oturum/ömür boyu en iyi işlem listesi; (b) portföy/kasa değeri büyük sayı olarak sürekli görünür (AdCap, Scritchy tarzı); (c) sıradaki coine kalan kısmı gösteren belirgin ilerleme çubuğu + "bir sonraki ödül" ön izlemesi; (d) nadir "boğa dalgası" olayı (kısa süreli x2 kâr, tur sınırlı). Çocuksu olmaması için sade ses/animasyon, glow/neon ve emoji yok (CLAUDE.md). Scritchy'nin hırsı kart-başı kumar hissi + prestij; bizde karşılığı Boss coin çöküş/tepe riski olabilir (varsayım).

### Yavaşlatma yolu karşılaştırması

| Yol | Etki | Yan etki | Karar |
|---|---|---|---|
| Eşik (%) | Ölçüldü: +%4–9 | Oyuncu gücü üstel büyüdüğü için etkisi söner | Tek başına yetersiz |
| Kâr oranı (kaldıraç/Bobby kazancını kısmak) | Güçlü ama oyun mantığını bozar, yükseltmeler anlamsızlaşır | "Para kazanma hırsı" yerine hayal kırıklığı | Önerilmez |
| Coin fiyatı | Kat.1'de etkili (nakit duvarı); Kat.2–4'te robotlar nakitle geçer | Final fiyatı/Bobby/robot dengesini kaydırır, kayıt etkisi | Yalnız Kat.1 için, 2. adım sonrası |
| Ara hedefler | Süreyi tek başına uzatmaz | Algıyı ve ritmi düzeltir | Evet, 2 ile birlikte |
| Tur başı kâr tavanı | Süreye beceriden bağımsız taban koyar | Ekran açıklaması gerekir | Evet, ana yavaşlatıcı |

Önerilen sıra: 2 (tavan, simülasyonla X seç) → 1 (ara hedefler) → 3 (his katmanı). Yeni metinler Türkçe yazılıp `I18N.en`'e eklenir.

## 4. Kaynaklar

- Scritchy Scratchy genel bilgi: https://www.timeextension.com/games/nintendo-switch-2/scritchy-scratchy , https://www.dekudeals.com/items/scritchy-scratchy , https://insider-gaming.com/complete-scritchy-scratchy-achievement-list-how-to-get-all-achievements/
- AdVenture Capitalist katsayıları: https://adventure-capitalist.fandom.com/wiki/Businesses
- AdVenture Capitalist tasarım dersleri: https://www.globalgamesforum.com/ctv/idle-game-design-lessons-from-developing-adventure-capitalist
- Cookie Clicker maliyet/yükseltme: https://cookieclicker.wiki.gg/wiki/Buildings , https://cookieclicker.fandom.com/wiki/Building
- Universal Paperclips süre: https://en.wikipedia.org/wiki/Universal_Paperclips , https://www.grouvee.com/games/272890-universal-paperclips/
- Realm Grinder: https://realm-grinder.fandom.com/wiki/Shop , https://nodal.gg/game/realm-grinder-610080
- Idle Miner Tycoon: https://www.appgamer.com/idle-miner-tycoon/strategy-guide/how-to-unlock-super-managers , https://www.bluestacks.com/blog/game-guides/idle-miner-tycoon/idt-beginner-guide-en.html
- Idle oyun matematiği (Pecorella): https://gamedeveloper.com/design/the-math-of-idle-games-part-i , https://gamedeveloper.com/disciplines/the-math-of-idle-games-part-ii , https://gamedeveloper.com/design/the-math-of-idle-games-part-iii
- Tempo kuralları (tek geliştirici görüşü): https://dev.to/aguier/i-built-7-idle-games-in-30-days-what-i-learned-about-incremental-design-5d3f
- İç kaynak: `docs/denge-onerisi.md` (c) duyarlılık ve "Kullanıcı kararı (2026-11-18)".
