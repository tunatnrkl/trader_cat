# Adım 7 Brifi — Fiş, bitiş, sıkı mağaza, robot titremesi

## Kullanıcının sözü (Adım 6 sonrası)
- "Bu grafikler çok güzel olmuş." Çocuk oyunu oranı: önce 4/10, şimdi 7/10 (iyi). **Hedef 6/10:** çok az ciddileştir, çok az fark edilsin. Renkler/canlılık AYNEN kalır.
- **Tur sonu kâr/zarar tablosu** (işlem bitince çıkan fiş) oyunun temasına uygun olsun (şu an krem termal fiş — yeni kobalt/lacivert/altın dile uymuyor).
- **Bilgisayarda mağaza öğeleri dikeyde daha sıkı** olsun; çok boşluk var (yalnız `#stage:not(.tel)`; telefon aynen).
- **Oyun bitiş animasyonu** oyunun grafiklerine uygun olsun: dökülen mama ve gelen hayvanlar iyi; ama **mama kabı** ve **bitiş ekranı** zayıf — oyun bittikten sonra bir şeyler olmalı.
- **Otomasyon Merkezi:** robotlar al/sat yaparken bölmelerdeki grafikler/öğeler yer değiştiriyor (hareket ediyor) → düzelt; işlem sırasında yerleşim sabit kalsın.

## Yön
1. **Fiş → "işlem raporu" kartı:** kobalt çerçeveli lacivert panel, altın başlık (KÂR! / ZARAR), rakamlar tabular; kâr nane ▲, zarar kehribar ▼; fiş hissi istenirse ince kesikli ayraçlar kalabilir ama renkler temadan. Kısa giriş animasyonu ≤450 ms, hareket azaltmada anında.
2. **Ciddiyet 7→6 (çok az):** renklere dokunma. Yalnız ince ayar: başlık konturları biraz incelsin, alt basamak 1 px azalsın, birkaç köşe 2 px küçülsün, ikincil yazılar 800→700. Kullanıcı farkı zor fark etmeli.
3. **Mağaza (masaüstü):** kartlar arası boşluk, kart iç dolgusu ve başlık–içerik aralığı azalsın; daha çok öğe ekrana sığsın. Dokunma/okunurluk kuralları telefonda sürer.
4. **Bitiş:** mama döküldükten sonra kap gerçekten dolsun (taşan tepe, birkaç tane yere düşen mama), hayvanlar yesin/mutlu olsun (kalp yok/emoji yok; piksel animasyon). Ardından tema dilinde bir **bitiş ekranı**: başlık, toplam oyun süresi, toplam işlem/kâr gibi oyunda zaten var olan istatistikler, en iyi işlem (varsa), ve oyunda zaten var olan düğmeler (yeni oyun / devam vb.). Yeni kayıt alanı EKLEME; yalnız var olan verileri göster.
5. **Robot bölmeleri:** al/sat anında değişen yazı genişliği, satır sayısı, yükseklik ya da canvas boyutu yüzünden kayma varsa sabit genişlik/yükseklik ve tabular rakam ile sabitle.

## Değişmezler
Mantık/sayı/fiyat/kayıt/id/data-* aynen (ekonomi değişiklikleri ayrı ele alınacak). Adım 6 paleti, Adım 5b ölçüleri, telefon ölçüleri, odometre, mama ease-out aynen. Glow/neon/emoji/yanıp sönme yok. Smoke 63/63.

## Süreç
Psikolog A ve B bu brifi tartışır → `docs/tasarim/canli/tur-2.md` "Ortak tavsiye 7". Tasarımcı bu sırada önce **madde 5 (robot titremesi)** ve **madde 3 (mağaza)** ile başlar; sonra Ortak tavsiye 7'yi okuyup 1, 2, 4'ü yapar.
