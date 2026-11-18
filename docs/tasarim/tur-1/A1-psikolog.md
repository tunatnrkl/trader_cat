# Tur 1 / A1 — Psikolog testçi raporu

Bakılanlar: `once/` (5 görüntü), `son/` (8 görüntü; Yönetici'nin dondurulmuş kopyası `tur-1/A1-goruntu/` ile bayt bayt aynı olduğu doğrulandı, yani değerlendirme A1 durumuna aittir), `sanat-yonu.md`, `A1-testci.md`. Tek durumda (Katalog 1, 150$) alınmış görüntülerden yorum; hareket, ses ve gerçek oyun akışı gözlenemedi.

## Puan tablosu (1–10, yüksek = iyi)
| Ölçüt | Eski | Yeni | Gerekçe |
|---|---|---|---|
| Göz yorgunluğu (parlaklık/kontrast/doygunluk) | 4 | 7 | Lacivert+turuncu+neon yeşil/kırmızı kontrastı kalktı, oda açık ve mat; ama açık oda ortasında büyük koyu ekran hâlâ en parlak/kontrastlı nokta (A2'de kırmızı çizgi sert). |
| Renk duygusu (sakinlik vs. daralma) | 3 | 8 | Adaçayı duvar, krem kasa, teal tabela "daralma" şikâyetini doğrudan çözüyor; sıcak ve davetkâr. |
| Görsel hiyerarşi / bilişsel yük | 5 | 7 | Oda → pano → kart → ekran sırası okunuyor ve BAŞLA altını tek çağrı noktası; ama sağ panoda hâlâ çok satır (Volatilite, Kaldıraç, Bobby, Kemik) ve 3 küçük fiyat rozeti yarışıyor. |
| "Oyun gibi" sıcaklık / eğlence | 5 | 8 | Cozy oda, kedi-köpek, pencere artık uyumlu; eksik: sprite'lar eski paletin doygunluğunda, menü ayrı bir oyun gibi. |
| Ödül / geri bildirim hissi | 5 | 6 | Pastel palet kazanç anını yumuşattı ama "kutlama" yok: kâr yeşili ince ve sönük, SAT butonu zarar/kâr durumunda hep mercan; kâr anında altın/teal bir tepki görünmüyor (A2/A4 konusu). |
| Okunurluk (telefon dahil) | 6 | 6 | Masaüstünde kâğıt üstü koyu metin belirgin iyileşti; telefonda (844x390) 7–8 px etiketler aynen kaldı, daha açık zemin küçük yazıyı biraz kurtarıyor ama sorun çözülmedi. |
| Renk körlüğü uyumu | 4 | 7 | Kırmızı-yeşil yerine mavimsi yeşil + mercan, ▲/▼ ve +/− birlikte; açıkça iyileşti. Kalan risk: çizgi rengi tek başına kâr/zarar taşıyor (bkz. istek 1). |
| Kumar / stres tetikleyicileri (alarm, yanıp sönme, baskı) | 4 | 6 | Panellerde kırmızı alarm yok, parlama kalktı; ancak ekranın içi (kırmızı çizgi, kırmızı fiyat etiketi, "15 sn'de otomatik satılır" metni, büyük negatif yüzde) ve menüdeki parlayan logo hâlâ gerilim üretiyor. |
| **Ortalama** | **4.6** | **6.9** | A1 kapsamı için güçlü ilerleme; kalan düşük puanlar A2/A5 bölgelerinde. |

## En önemli 5 değişiklik isteği (öncelik sırasıyla)

1. **[A2 — kritik] İşlem sırasında kâr/zarar renk-işaret çelişkisini kaldır.** Ekranda gördüğüm: telefon görüntüsünde başlık `-%2.9` (kırmızı), çizgi kırmızı, ama SAT butonu `+%14.8`; masaüstünde başlık `-%4`, buton `+%4.3`. Oyuncu "kırmızı = kayıp" sanıp kâr varken satmaz ya da tersini yapar; bu en büyük bilişsel yük/güven kırıcı. Öneri: çizgi rengi, büyük yüzde (üst sağ) ve fiyat etiketi **alım noktasına göre** (oyuncunun gerçek kâr/zararı) boyansın; "turun başlangıcına göre" değişim istenirse küçük, nötr (`stx2`) renkte yazılsın. İşlem açık değilken (BAŞLA öncesi) nötr kalsın. Aynı sayı iki yerde farklı gösterilmesin (başlıkta tek kaynak, butonda aynısı).
2. **[A2] Ekrandaki sert kırmızıyı sanat yönüne çek.** Çizgi `#f33` benzeri parlak kırmızı ve fiyat etiketi yerine paletteki `dn` (`#E58E7C`) / `up` (`#7FC29B`), 2 px düz çizgi, bulanıklık/parlama yok; çizgi altı dolgu çok düşük opaklık. Mümkünse zarar tarafı için yalnız çizgi tonu değişsin, etiket zemini `scr2` + `dn` yazı olsun. Bu sayede ekran, kasasının dışındaki sakin odayla uyumlu olur.
3. **[A5 — ilk izlenim, öne alınabilir] Menüyü sıcak odaya taşı.** Menü şu an lacivert zemin, parlayan turuncu-yeşil gradyanlı logo, ahşap panel; oyuncunun ilk gördüğü ekran şikâyet edilen "daralma" hissinin kaynağı olarak kalıyor ve oyunun içiyle kopukluk yaratıyor (gerçek bir "ilk 5 saniye" riski). Öneri: adaçayı/krem zemin, logoda gradyan ve glow yok (düz altın + 2 px ink gölge), butonlar altın/teal; mümkünse menü arka planında oda silueti (kedi/köpek).
4. **[A1 düzeltme — küçük] Telefon yatayında küçük yazıları büyüt.** Etiket yazıları (SEVİYE/KALDIRAÇ/ENERJİ, "20 sn / kemik", sekme etiketleri, ZAMAN, "KİLİTLİ") 7–8 px; hedef minimum yaklaşık 10 px CSS (ya da ≥ 1.25× oran) ve metin rengi `tx` (ikincil `tx2`'yi küçük boyutta kullanma). Dokunma hedefleri (sekmeler, AÇ anahtarı, kemik ikonu) en az ~32 px yükseklik. Yer sığmıyorsa bilgi azaltılsın (ör. Bobby kartında yalnız seviye+kaldıraç etiketi), font küçültülmesin.
5. **[A4 + A1 küçük] Ödül hissini ve kilitli kart cazibesini artır.** (a) Kâr kapanışında kısa (≤ 450 ms, `steps()`), sakin bir geri bildirim: para plakası üstünde `up` renkli "+$X" yükselişi veya altın bir parıltı karesi; zarar kapanışında ceza vermeyen nötr "−$X" (kırmızı alarm yok, ses/titreşim yok). (b) "KİLİTLİ" kartları krem üstünde sönük: ikincil metne "Katalog 2: $X'ten sonra" gibi bir hedef/ilerleme çubuğu ve hafif altın kenar ekle (merak, ilerleme motivasyonu); kilitli katalog sekmelerinde kilit ikonunun yanına küçük rakam. A1 kapsamındaki parça: kilitli kartlara hedef metni eklemek.

(Ek küçük gözlem, ayrı istek değil: "daha fazla" rozeti ve KEMİK alt satırı üst üste biniyor, "AÇ" anahtarı topu yazıyı kesiyor; testçi de buldu. Düşük önem, A1 düzeltme turunda temizlenebilir.)

## Testçiye yanıt

1. **Kâr/zarar rengi neye göre?** **Alım noktasına göre (oyuncunun gerçek kâr/zararı).** Gerekçe: oyuncu kararı "şimdi satarsam ne olur?" sorusundan verir; renk de bu sorunun cevabı olmalı. Tur başına göre renk, kâr varken kırmızı gösterip erken/geç satmaya yol açar ve güveni sarsar (BAŞLA öncesi ve işlem açılmadan önce nötr). Tur başlangıcına göre değişim ancak ikincil, nötr renkli ve etiketli bilgi ("turdan:") olabilir. Buton ve başlık aynı sayıyı göstermeli; renk yalnız işaretle de desteklenmeli (▲/▼, +/−).
2. **Kırmızı çizgi / fiyat etiketi:** Katılıyorum, şu an ekranın en stresli öğesi; A2'nin birinci önceliği (istek 2). Ayrıca alt satırdaki "15 sn'de otomatik satılır" metni sabit kalmalı, sayacın yanıp sönmesi veya renk değiştirmesi (aciliyet baskısı) olmamalı; son 3 saniyede bile yalnız yavaş bir nefes yeter.
3. **Telefon yazı boyutu:** Haklısın; 7–8 px kabul edilemez. A1 düzeltme turuna alınsın (istek 4), A2 yeniden yazarken grafik etiketleri (eksen sayıları, 10.2/10.1) için de aynı minimum geçerli olsun.
4. **KİLİTLİ kartlar:** Evet, fazla sönük; amaç "ne kazanacağım" merakı olmalı. Hedef/maliyet metni ve ince altın kenar öneriyorum (istek 5b). Mevcut "Kilitli" yalnız bir yasak gibi okunuyor.
5. **Menü önceliği:** Katılıyorum, ilk izlenim olduğu için A5'i en azından ayrı bir "menü hızlı geçiş" olarak öne almayı öneririm (istek 3). Menü hâlâ parlayan logo/glow ile sanat yönüne aykırı.

Sonraki turda özellikle bakmasını istediklerim: (a) işlem anında başlık yüzdesi, çizgi rengi ve SAT butonu yüzdesinin aynı kaynaktan ve tutarlı çıkması, aynı durumda 3 farklı senaryoda (alım noktasının üstünde/altında, tur başlangıcının üstünde/altında; 4 kombinasyon); (b) boss coin ekranı (çöküş anı) ve çok uzun sayılar (Qa/Sx) 844 px ekranda taşıyor mu; (c) "animasyonları azalt" açıkken kâr/zarar geri bildirimi; (d) renk körlüğü simülasyonu (deuteranopi/protanopi) ile çizgi ve butonların ayırt edilebilirliği; (e) ses kapalıyken geri bildirimin yeterliliği.

## Genel karar
**KABUL (A1 için).** Palet, oda, paneller, butonlar ve monitör kasası kullanıcının "içim daralıyor" şikâyetini büyük ölçüde çözdü (renk duygusu 3→8, ortalama 4.6→6.9); kalan sorunların çoğu A2/A5 kapsamında. A1'e küçük düzeltmeler taşınsın (istek 4 telefon yazı boyutu, istek 5b kilitli kart metni, "AÇ" topu ve "daha fazla" rozeti örtüşmesi); bunlar kabulü engellemez. En kritik madde (istek 1, renk-işaret çelişkisi) A2'ye zorunlu girdi olarak aktarılmalı; ve menü (istek 3) için A5 öne alınması Yönetici'nin değerlendirmesine bırakılır.

## Ne değişti / Ne test edildi / Ne riskli
- **Değişti:** Yalnız bu rapor (`docs/tasarim/tur-1/A1-psikolog.md`) eklendi; index.html ve diğer dosyalara dokunulmadı.
- **Test edildi:** 5 eski + 8 yeni ekran görüntüsünün görsel incelemesi, sanat-yonu ve testçi raporuyla kıyas; puanlama yalnız statik görüntülerden.
- **Riskli:** Hareket/animasyon, ses, uzun oyun oturumu yorgunluğu, boss ve final ekranı, kayıtlı çok yüksek bakiye durumu görülmedi; renk körlüğü simülasyonu araçla yapılmadı (yalnız palet mantığı üzerinden yorum). Puanlar öznel uzman yargısıdır, gerçek oyuncu testiyle doğrulanmalı.
