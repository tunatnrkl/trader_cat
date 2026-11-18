# Adım 5 Brifi — "Olgun oyun": gerçek para hırsı hissi

## Kullanıcının geri bildirimi (Tur 2 Adım 1–4 sonrası)
- "Çok güzel olmuş." Genel düzen ve koyu oda kalıyor.
- **Ama biraz çocuk oyunu gibi.** Referans: *Scritchy Scratchy* (Lunch Money Games, 2026 Steam'de çok sevilen kazı-kazan idle oyunu; pixel art). Kullanıcının tarifi: "Oynarken oyun olduğunu hissediyorsun ama çok da oyun değil; gerçek hayatta para kazanıyormuşsun gibi bir hırs doğuran grafik."
  (Not: Ağ kısıtı nedeniyle referansın ekran görüntülerine erişilemedi; aşağıdaki ilkeler açıklamalardan ve türün bilinen özelliklerinden çıkarıldı.)
- **Masaüstü yazıları/kartlar fazla büyük** (mobil oyun gibi). Oyun bilgisayarda oynanacak → masaüstünde daha zarif/küçük; **telefonda büyük kalsın** (telefon kuralı ≥12 px sürer).
- **Kediye mama verme stamina çubuğu:** dolma efekti başta hızlı, sonra yavaş (ease-out); **toplam süre aynı**. Yalnız görsel gösterim değişir, mantık/zamanlayıcı değişmez.

## Yön: "Gece yarısı trader masası" — dünyanın içindeki gerçek nesneler
1. **Diegetik nesneler:** Arayüz yüzen yuvarlak oyun butonları gibi değil, odadaki gerçek nesneler gibi dursun: monitör ahşap/koyu bir masanın üstünde (klavye/kenar ipucu), mağaza ve katalog panelleri gerçek malzeme (koyu metal/plastik kasa, kâğıt etiket, cam) hissinde. Fiyat hapları → kâğıt fiyat etiketi / fiziksel tuş hissi.
2. **Para kahraman:** Bakiye en güçlü öğe. Para arttığında rakamlar **sayaç gibi akarak** artsın (odometre, ≤600 ms; hareket azaltmada anında). Rakamlar sabit genişlikli (tabular) — titremesin. Para ikonu gerçek madeni para/banknot hissinde.
3. **Malzeme ve ışık:** Şeker renklerinden uzaklaş: doygunluğu düşük, gerçek malzeme tonları (koyu ceviz, mat metal, kâğıt kremi, cam yeşili ekran). Köşeler daha az yuvarlak (6–10 px), konturlar ince, kalın "cartoon" alt gölgeler yerine ince gerçekçi gölge. Glow yok.
4. **Tipografi:** Olgun: başlıklarda kalın ama sıkı (condensed) sans; rakamlarda monospace/tabular. Masaüstünde ölçüler küçülsün (ör. kart başlığı ~16–18 px, ikincil ~13 px; sahne ölçeğine göre ayarla). Telefonda mevcut büyük ölçüler korunsun (media query / fit()).
5. **Tur sonu fişi** gerçek termal fiş kâğıdı gibi (kâğıt dokusu düz renkle, kesik kenar, monospace).
6. Kâr/zarar dili, tek altın vurgu, zararda alarm yok, telefon ≥12 px / ≥44 px, değişmezler (mantık/sayı/kayıt/id/data-*) aynen sürer.

## Öncelik (limit az — sırayla, yarım kalırsa notla)
1. Mama stamina ease-out (küçük, hemen).
2. Masaüstü ölçülerini küçült, telefon büyük kalsın.
3. Bakiye sayacı (odometre) + tabular rakamlar.
4. Malzeme/köşe/gölge olgunlaştırma (paneller, kartlar, butonlar, monitör+masa).
5. Fiş, fiyat etiketleri, küçük masa nesneleri (zaman kalırsa).
