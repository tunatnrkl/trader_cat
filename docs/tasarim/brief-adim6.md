# Adım 6 Brifi — "Canlı renk" (soluk mor bitiyor)

## Kullanıcının sözü (Adım 5b sonrası)
"Canlı renkler yok. Hâlâ soluk mor var. Psikologla tartışarak tasarımı yap, arkası biraz daha koyu olsun."

## Teşhis (Yönetici)
- Bütün arayüz düşük doygunluklu, griye çalan morlardan oluşuyor: `--k-pn #2C2748`, `--k-pnl #3C3560`, `--k-rim #3E3864`, `--k-cd #3A345F`, `--k-wall #1C182D`, `--k-scr #17142A`, ikincil yazı `--k-tx2 #BDB6D8`. "Soluk mor" bu.
- Açık lavanta hapları/sekmeleri (`--k-li #CFC7EA`: "ANA PC" sekmesi, katalog "1" sekmesi, seçili kart kenarı) en çok göze batan soluk öğeler.
- Fiyat hapları koyu konturlu ve dolgusuz → ödül/para rengi yok; başlıklar (KATALOG 1, MAĞAZA) beyaz/krem → kişiliksiz.
- Kullanıcının ilk örneği (`docs/tasarim/ornek/ornek-1.jpg`) canlıydı: doygun kobalt/kraliyet mavisi çerçeveler, koyu lacivert iç zeminler, dolgun altın-turuncu başlıklar ve fiyat hapları, yeşil ilerleme çubukları, kırmızı BOSS. Kullanıcı ayrıca o turda "arka plan daha koyu" demişti.

## Yön
1. **Arka plan daha koyu:** oda/duvar neredeyse siyah lacivert (ör. #07091A–#0B0E22 arası), zemin bir ton açık. Mor kalmasın ya da çok az kalsın.
2. **Soluk mor yok:** paneller, kartlar, monitör kasası, sekmeler doygun mücevher tonlarında (örnekteki gibi kobalt/kraliyet mavisi çerçeve + koyu lacivert iç). Gri-mor tonların hepsi değişir.
3. **Canlı vurgular:** fiyat hapları altın/turuncu dolgu + koyu yazı (alınabilir olanlar; alınamayanlar daha sönük olabilir — psikologlar karar versin); başlıklar altın, koyu konturlu; seçili sekme/kart altın; ilerleme çubukları canlı yeşil/nane; BAŞLA parlak turuncu; BOSS kırmızı rozet.
4. **Canlı ama yormayan:** glow/neon yok, yanıp sönme yok; doygun renkler koyu zeminde; metin kontrastı ≥4.5:1; kâr nane ▲ / zarar kehribar ▼ (alarm kırmızısı değil).
5. Adım 5b'de yapılan masaüstü ölçüleri, odometre bakiye, mama ease-out, termal fiş ve telefon (`#stage.tel`) ölçüleri **aynen kalır**. Yalnız renk/malzeme değişir.
6. Değişmezler: mantık/sayı/fiyat/kayıt/id/data-* aynen; smoke 63/63.

## Süreç (kullanıcı: "psikologla tartışarak")
1. Psikolog A (oyun hissi) bu brif + örnek + şimdiki görüntüye bakıp somut palet önerir.
2. Psikolog B (göz sağlığı) itiraz/yanıt yazar ve **Ortak tavsiye 6**'yı (somut hex + kurallar) yazar.
3. Tasarımcı Ortak tavsiye 6'yı uygular, görüntü alır.
Hepsi `docs/tasarim/canli/tur-2.md` içinde görünür.
