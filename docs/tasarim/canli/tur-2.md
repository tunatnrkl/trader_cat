# Tur 2 — Canlı tasarım odası

Kullanıcı kararı (2026-11-18 sabah): Konsept 3 (Tok Mobil) ile devam; **arka plan daha koyu**. Tek tasarımcı (güçlü model) çalışır; 2 psikolog tasarım SÜRERKEN tartışır, tasarımcı her adımda onlara danışır. Tasarım ve tartışma birlikte biter.

Katılımcılar:
- **Tasarımcı** — tüm görsel tasarımı yapar, her adımın sonunda "Danışma" yazar.
- **Psikolog A** — oyun hissi ve motivasyon.
- **Psikolog B** — göz ve zihin sağlığı (yorgunluk, stres, okunurluk); her turda ortak tavsiyeyi toparlar.

Akış: Tasarımcı adımı uygular → "Danışma N" (ne yaptı, ekran görüntüleri, 2–4 soru) → A görüşü → B yanıtı + "Ortak tavsiye N" → Tasarımcı tavsiyeyi uygulayıp sonraki adıma geçer.

Plan (adımlar): 1) Koyu arka plan + oda; 2) Sol panel + mağaza kartları; 3) Monitör + grafik + işlem butonları; 4) Sprite/ikon + ödül animasyonları + telefon okunurluğu; 5) Menü + final + son cila.

---

## Adım 1 — Tasarımcı: Danışma 1

**Ne yaptım**
- **Oda koyulaştı, doygunluk kısıldı.** Parlak lavanta duvar (#7C5FC6) yerine "gece oyun odası" tonu geldi: koyu mürdüm-lacivert duvar #1C182D (doygunluk yaklaşık %47'den %30'a indi). Puantiye neredeyse görünmüyor (#201B33). Zemin duvardan biraz daha sıcak bir mürdüm (#1A1426) ve ince bir süpürgelik çizgisi var. Tam siyah da tam beyaz da yok; yazı rengi #F4EEE3, K3 katmanındaki bütün `#fff`'ler de bu krem tona çevrildi.
- **Katmanlar net:** duvar (en koyu) → panel #2C2748 → kart #3A345F → seçili kart #443D6E. Koyu kontur koyu duvarda kayboluyordu; bu yüzden panellere, monitöre, ayarlar penceresine ve menü kutusuna duvardan açık bir dış kenar (#3E3864) ekledim. Altlarındaki kalın koyu "basamak" gölgesi duruyor.
- **Monitör sakinleşti:** doygun mor çerçeve (#5B3FB0) yerine kart tonunda, mat bir çerçeve (#36305A) var. Ekran, grafik kartı, sistem çubuğu, alt şerit ve robot bölmeleri aynı paletin koyu tonlarına geçti (grafiğin çizimine dokunmadım).
- **Bobby ve kedi köşesi:** Kahverengi pixel ahşap çerçeveler kaldırıldı. Kedinin üstünde yuvarlak köşeli, konturlu yeni bir pencere var: gece gökyüzü, ay ve sönük yıldızlar. Gündüz saatlerinde gökyüzü mat mavi oluyor; koyu odada parlak bir "delik" açmasın diye bilerek soluk tutuldu. Bobby'nin köşesinde küçük bir pati resmi var; konuşma balonuyla çakışmasın diye sağa taşındı. Hayvan sprite'ları pixel art olarak kaldı.
- **Başlık afişleri bir ton yumuşadı:** KATALOG/MAĞAZA şeritleri parlak turuncu yerine daha sakin bir turuncu (#E58F4C), OTOMASYON MERKEZİ şeridi daha sakin bir turkuaz. BAŞLA düğmesi parlak turuncu kaldı; böylece ekranın birincil düğmesi o olarak öne çıkıyor.
- **Ölçümler:** ikincil yazının karta karşı kontrastı 5.8:1 civarında, panele karşı 7:1'in üstünde; ana yazıda 10:1'in üstünde. Oyun mantığına, sayılara, kayda, id'lere ve data-* özniteliklerine dokunulmadı. Smoke 63/63, konsol temiz.

**Bakılacak görüntüler**
- `docs/tasarim/son/desk_tr_ana.png`: oda, paneller, pencere, pati resmi
- `docs/tasarim/son/desk_tr_islem.png`: işlem sırasında (zararda; SAT hâlâ mercan, bu Adım 3'te ele alınacak)
- `docs/tasarim/son/tel_tr_ana.png`, `tel_tr_islem.png`: telefon yatay görünüm (kârda)
- `docs/tasarim/son/desk_tr_oto.png`, `desk_tr_ayar.png`, `desk_tr_menu.png`, `desk_en_ana.png`

**Psikologlara sorular**
1. Arka plan bu koyulukta mı kalsın (duvar parlaklığı yaklaşık %14), yoksa bir kademe açılsın ya da koyulaşsın mı? Panel ile duvar arasındaki ayrım (açık dış kenar + kademe farkı) uzun oturumda yeterli mi?
2. Koyu zeminde turuncu BAŞLA ile altın fiyat hapları daha çok parlıyor. BAŞLA'yı birincil düğme olarak bu parlaklıkta bırakalım mı, yoksa tüm vurguları (altın, turkuaz, turuncu) %10 kadar mı kısalım?
3. Pencere: gece görünümü ve soluk gündüz gökyüzü "sakin oda" hissine katkı veriyor mu, yoksa göz için dikkat dağıtıcı mı? Oda için başka bir öğe ister misiniz (ör. yumuşak bir lamba ışığı; glow olmadan düz bir renk lekesi olarak)?
4. Zarardaki mercan SAT düğmesini ve "aynı ekranda en fazla bir altın öğe" kuralını Adım 2–3'te ele alacağım. Bu adımda öne alınması gereken bir şey var mı?

### Adım 1 — Psikolog A

Önce iyi haber: bu hâl "gece oyun odası" hissini veriyor ve içim daraltmıyor. Panel kademeleri okunuyor, Pebble kartının altın kenarı gözü doğru yere götürüyor. Sorularına sırayla:

1. **Koyuluk:** Bu seviyede kalsın. Daha açık yaparsan "oda" hissi azalır, daha koyu yaparsan paneller yapışık görünür ve oyun ağırlaşır. Panel-duvar ayrımı bana yeterli geldi; son kararı B'nin uzun oturum yorumuna bırakıyorum.
2. **Vurgular:** BAŞLA parlak kalsın. Oyunun tek "evet, bas!" düğmesi o; onu kısarsan her tur başlangıcındaki istek düşer. Kısılacak olan altın fiyat hapları, özellikle ikisi birden yan yana duruyorsa. Hedef: ekranda tek büyük parlak nokta, o da BAŞLA (ya da SAT).
3. **Pencere:** Katkısı var, kediye bir "evi" veriyor; soluk tutman doğru. Lamba için evet, ama sadece düz renkli, sabit küçük bir leke olsun. Odaya kişilik katan şey bu.
4. **Öne alınacak şey:** Zarardaki mercan SAT butonu. Pembe, parlak ve dolu; zarar anında ekranın en gürültülü öğesi o. Bu "pes ettirir" ya da stres yapar. Adım 3'ü beklemeden en azından rengini kısmanı isterim.

**Gözüme çarpanlar**
- Zarar ekranında üç parlak şey yarışıyor: pembe SAT, sarı kesikli ALIŞ çizgisi ve sarı fiyat hapları.
- Kilitli kartın ilerleme çubuğu ("%12") küçük ve soluk; merak buradan doğuyor, biraz daha görünür olmalı.
- Bobby'nin "AÇ!" rozeti turuncu ve küçük ama dikkat çekiyor; güzel, kalsın.

**B'ye sorum:** Koyu zeminde BAŞLA'nın parlaklığı sence 30–45 dakikalık oturumda yorucu olur mu, yoksa tek parlak nokta olduğu sürece sorun yok mu?

### Adım 1 — Psikolog B

**A'nın sorusuna net cevap:** BAŞLA'nın parlaklığı 30-45 dakikada yormaz; çünkü yorgunluğu parlak bir nokta değil, birçok parlak noktanın aynı anda yarışması yapar. Şartlar: tek olması, boyutunun büyümemesi ve yanıp sönmemesi. Tur başlayınca BAŞLA'nın yerini SAT aldığı için ekranda zaten tek ana düğme kalıyor; bu iyi bir tasarım.

**A ile katıldığım yerler:** Koyuluk seviyesi doğru (duvar %14 civarı, kontrast panelde yeterli); pencere ve düz renkli lamba lekesi sakinleştirir; mercan SAT acilen kısılmalı. Küçük bir itirazım: A "BAŞLA hiç kısılmasın" diyor, ben turuncuyu doygunlukta bir kademe (yaklaşık %8-10) indirmeyi öneririm; parlaklığı değil, doygunluğu. Düğme yine ekranın en çıkıntılı öğesi olur, ama koyu zeminde gözde iz bırakmaz.

**Zarar ekranına bakınca:** Sarı kesikli ALIŞ çizgisi, sarı başlık "Pebble", sarı fiyat hapları ve pembe SAT aynı anda parlıyor; bu ekranın asıl stres kaynağı. Telefonda KALDIRAÇ, BOBBY, KEDİ, COİN gibi küçük etiketler soluk ve 12 px altında görünüyor. Tasarımcının 4. sorusu: bu adımda SAT'ın rengi ve altın/sarı öğe sayısı öne alınsın.

#### Ortak tavsiye 1

1. Zarardaki SAT düğmesi mercan/pembe yerine nötr kart tonu (panel #3A345F civarı, yazı krem) olsun; yalnız küçük ▼ ve sayı kalsın. Dolgu doygunluğu en çok %35.
2. Altın fiyat hapları ($25, $20, $2,400) dolgusunu mat/sönük yap (doygunluk yaklaşık %30-40 azalt) ve yalnızca alınabilir olduğunda canlansın; böylece aynı anda en fazla bir parlak sarı öğe (Pebble seçili kart kenarı) kalır.
3. ALIŞ kesikli çizgisi sarıdan sönük krem/açık gri-mora geçsin; kalınlık 1.5-2 px, etiketi (ALIŞ) küçük kalsın.
4. BAŞLA/SAT turuncusunda doygunluğu yaklaşık %8-10 azalt; boyut ve konum aynı kalsın, animasyon/yanıp sönme yok.
5. Telefonda tüm etiketler (KALDIRAÇ, BOBBY, KEDİ, COİN, SEVİYE) en az 12 px, kontrast en az 4.5:1; kilitli kartın "%12" ilerlemesi en az 12 px ve çubuk yüksekliği en az 6 px olsun (A'nın merak isteği).
6. Odaya düz renkli, sabit, küçük bir lamba lekesi eklenebilir (parlaklığı duvardan en fazla bir kademe açık, glow ve animasyon yok).

## Adım 2 — Tasarımcı: Danışma 2

**Renk dili (her rengin tek bir anlamı var)**
- **Altın:** yalnızca "sıradaki hedef". Sol listede sıradaki kilitli coin kartının ince (3 px) ve sabit kenarı. Ekrandaki tek altın bu.
- **Şeftali:** para ve alınabilir fiyat (fiyat hapları, coin fiyat yazısı).
- **Lila-krem:** seçili olan (coin kartı halkası, katalog sekmesi, ANA PC/OTOMASYON sekmesi, kaldıraç "1x").
- **Turkuaz:** açık / ilerleme / kilit açma (toggle, ilerleme çubukları, kilit açma hapı).
- **Soluk:** alınamaz (soluk mor hap, açık gri yazı).

**Ne yaptım**
- **Sol panel:** Bakiye artık altın değil, krem; hedef satırı ("0 / 1,200") ikincil renkte ve 22 px. Seçili katalog sekmesi ve seçili coin kartı lila-krem. Coin fiyatları şeftali-krem. Sıradaki kilitli kartta ince altın kenar ve büyük turkuaz "%12" (28 px) var; çubuk 14 px (telefonda yaklaşık 6 px). Diğer kilitli kartların kilidi daha soluk.
- **Mağaza:** Fiyat hapları alınabilirken canlı şeftali (46 px yüksek, 21 px yazı), alınamazken soluk. Hapta mercan "yetersiz" yazısı kalmadı. 6'dan fazla seviyesi olan ürünlerde (Bobby SEVİYE 1/10, KEMİK) noktalar yerine ince turkuaz ilerleme hapı var; noktalar artık fiyat hapının altına taşmıyor. Bobby kartında etiket tam satıra geçti, altında ilerleme ve buton yan yana. "Katalog 1" artık kesilmiyor.
- **"▼ daha fazla":** Panelin içinde kendi alt şeridine yerleşti, hiçbir kartı örtmüyor. Liste altta yumuşakça soluyor (maske; glow değil). Sona kaydırınca şerit gizleniyor.
- **Etiketler (telefona hazırlık):** COİN/BOBBY başlıkları, SEVİYE/KALDIRAÇ/ENERJİ satırları, BOBBY/KEDİ etiketleri ve monitördeki KALDIRAÇ 28 px sahne boyutunda. Bugünkü telefon ölçeğinde (0,425) bu yaklaşık 11,9 px ediyor. Adım 4'teki fit() iyileştirmesiyle ≥12 px olacak. Kontrast panele karşı 7,5:1, koyu etiket hapında 9,9:1.
- **Eski bir doygunluk artırıcı kaldırıldı:** Sağ panelde eski bir katmandan kalma `saturate(1.15)` filtresi vardı ve mağazayı gizlice %15 daha doygun gösteriyordu.
- **Hata düzeltmesi:** EN'de ana düğme "AL · $9" / "SAT · …" diye Türkçe kalıyordu. Artık "BUY · …" / "SELL · …".

**Ortak tavsiye 1'i nasıl uyguladım**
1. **Zararda SAT:** Nötr kart tonu (#3A345F, doygunluk %29), krem yazı, yalnız küçük "▼ −%x". Kârda nane yeşili (#5BC49A) ve "▲ +%x". İkisi de altın değil, yanıp sönmüyor.
2. **Fiyat hapları:** Altın değil. Alınabilirken sakin şeftali (#E9B596, doygunluk ~%62; eski altın %100'dü), alınamazken soluk. Tavsiyedeki "tek parlak sarı = seçili kart" yerine Yönetici'nin ve Tur 1 Ortak Karar'ın kuralını uyguladım: tek altın sıradaki kilitli kartta, seçili kart lila-krem. Monitördeki altınlar da kaldırıldı: coin adı krem, "TRADE-OS 3000" plakası soluk, kaldıraç 1x lila, tur özeti kenarı nötr, "+1 ROBOT EKLE" şeftali.
3. **ALIŞ çizgisi:** Sönük lila-gri (#A89FC8), 2 px, kesikli. Etiket küçük koyu hap, açık lila yazı.
4. **Turuncu:** Doygunluk %10 azaldı (#FF9A2E → #F59A38; kenar ve üst ışık da buna göre). Boyut ve konum aynı.
5. **Telefon etiketleri:** 28 px sahne boyutu (bugün yaklaşık 11,9 px). Kontrast ≥7:1. Kilitli kartın %'si 28 px, çubuğu 14 px (telefonda yaklaşık 6 px). Tam 12 px Adım 4'te fit() ile tamamlanacak.
6. **Lamba:** Bobby köşesinin duvarında düz renkli, sabit bir aplik. Işık lekesi duvardan tam bir kademe açık (#221D37 / duvar #1C182D); glow ve animasyon yok. Eski pati resmi kaldırıldı; köşe sadeleşti, balonla çakışma da bitti. Kedinin penceresi "daha fazla" hapına yer açmak için biraz aşağı indi.

**Henüz yapılmadı (Adım 3)**
- Zarardayken büyük yüzde (−%24) ve grafik çizgisi hâlâ mercan. Tur 1'deki karar "zarar = turuncu/kehribar" diyordu.
- Robot bölmelerindeki "BOŞ BÖLME" yazısı soluk.

**Bakılacak görüntüler**
- `docs/tasarim/son/desk_tr_ana.png`: tek altın (Kilitli %12), lila seçili, şeftali haplar, lamba, "daha fazla" şeridi
- `docs/tasarim/son/desk_tr_islem.png` ve `tel_tr_islem.png`: nötr SAT ▼ (zararda), sönük ALIŞ çizgisi
- `docs/tasarim/son/tel_tr_ana.png`: telefon yatay görünüm
- `docs/tasarim/son/desk_tr_oto.png`: şeftali "+1 ROBOT EKLE", soluk hap
- `docs/tasarim/son/desk_en_ana.png`: EN

**Psikologlara sorular**
1. Kârdaki SAT nane yeşili (▲), AL ise turkuaz. Bu iki ton yeterince ayrışıyor mu, yoksa AL'ı BAŞLA gibi turuncu mu yapalım (BAŞLA → AL aynı birincil renk, SAT kâr nane / zarar nötr)?
2. 28 px etiketler masaüstünde biraz "kalın" duruyor (KALDIRAÇ, SEVİYE 1/10). Masaüstünde 24 px'e inip telefonda fit() ile ≥12 px'i sağlamak kabul edilebilir mi?
3. Şeftali haplar ile turuncu KATALOG/MAĞAZA afişleri yakın tonlarda. Afişleri daha nötr bir tona (ör. koyu kart üstünde krem yazı ve ince turuncu kenar) almak ister misiniz?
4. Altın neden seçili kartta değil de sıradaki kilitli kartta? Tur 1 kuralı ve Yönetici böyle istedi. Psikolog A'nın "merak" isteğine de uyuyor. Seçili kartın lila-krem halkası yeterince "seçili" okunuyor mu?

### Adım 2 — Psikolog A

Çok daha sakin ve okunur oldu; ekranda artık tek altın var ve göz oraya gidiyor. Sorularına:

1. **AL / SAT rengi:** Ayrışıyorlar, ama AL'ı turuncu yapma. Turuncu "tur başlat" demek; AL ile aynı olursa oyuncu "yeni tur mu, alım mı" diye bir an duraklar. Mevcut turkuaz AL, nane SAT kalsın; SAT'taki ▲ zaten ikinci ipucu.
2. **Etiketler:** Masaüstünde 24 px'e inmek kabul; "oyun gibi" kalınlığı korunsun, telefon hakkı fit() ile verilsin.
3. **Afişler:** Turuncu afişler şeftali hapla yarışıyor. Afişleri biraz daha koyu/nötr tut ama turuncu kenarı bırak; afiş "oyun" kimliğimiz.
4. **Seçili kart:** Lila-krem halka okunuyor, yeter.

**Sapma (altın = sıradaki kilitli kart):** Katılıyorum, hatta daha iyi. Altın "ödül" demektir; ödülü seçili karta değil hedefe vermek merakı besler. Büyük turkuaz "%12" ile birlikte tam bir "az kaldı" sinyali.

**Gözüme çarpanlar**
- Zarar anı hâlâ en zayıf halka: büyük yüzde ve çizgi mercan kalırsa tasarımın sakin dili bozulur; Adım 3'te öncelik bu olsun.
- Kâr anı çok güzel (nane SAT + ▲), ama ödül hissi hâlâ sadece renk; kapanışta kısa "+$X" pop'u eksik.

**B'ye sorum:** Altın kenarlı kart, büyük turkuaz "%12" ve BAŞLA aynı bakışta üç vurgu oluşturuyor; sana göre bu yük fazla mı, yoksa her biri ayrı bölgede olduğu için sorun yok mu?

### Adım 2 — Psikolog B

**A'nın sorusuna net cevap:** Üçü aynı bakışta görünse de yük fazla değil, çünkü farklı bölgelerde ve farklı işlevde: altın kenar sol altta sessiz, turkuaz "%12" onun içinde (aynı öğenin parçası sayılır), BAŞLA monitörde. Asıl şart: yanıp sönme yok ve "%12" 28 px'ten büyümesin. Tur başlayınca BAŞLA kaybolduğu için çatışma zaten kısa sürüyor.

**Tasarımcıya:** (1) AL/SAT: A'ya katılıyorum, AL turuncu olmasın. Ayrım yalnız renkle değil ▲ ve metinle de sürüyor; renk körlüğü açısından nane/turkuaz çifti tek başına zayıf, o yüzden ▲ ve "SAT/AL" yazısı kalmalı. (2) 24 px masaüstü: kabul. (3) Afişler: A'yla aynı; koyu, nötr, turuncu ince kenar. (4) Seçili kart: lila-krem halka okunuyor. Altın = hedef sapması: katılıyorum, hatta Tur 1 kararından daha doğru.

**Gözüme çarpan:** Tur 1'de zararda turuncu/kehribar demiştik; sen nötr yaptın, bence daha iyi. Büyük zarar yüzdesi de aynı nötr kalsın; kehribar yalnız çizgide, ince kalsın. Telefonda alınamaz fiyat hapları ($25 soluk gri) kontrastı sınırda; fiyat bilgisi olduğu için okunmalı. Yeni saturate temizliği için teşekkürler, iyi yakalama.

#### Ortak tavsiye 2

1. Zarar anında büyük yüzde (−%2.4) mercan olmasın: krem veya sönük kehribar (#D9A66B civarı, doygunluk en çok %45), yanında ▼; grafik çizgisi zararda ince (2-3 px) kehribar, kârda nane; ikisi arasında şekil/işaret farkı kalsın.
2. Alınamaz fiyat hapları dahil tüm fiyat yazısı en az 4.5:1 kontrast, hap kenarı en az 3:1; soluk yalnız dolgu olsun, yazı değil.
3. AL turkuaz, SAT kârda nane, zararda nötr; her ikisinde ▲/▼ ve yazı sabit. Yeni renk ekleme; BAŞLA/SAT/AL aynı anda en fazla bir tanesi ekranda.
4. KATALOG/MAĞAZA/OTOMASYON afişleri koyu nötr dolgu + ince turuncu kenar; dolgu doygunluğu en çok %35.
5. Masaüstünde etiketler 24 px, telefonda fit() sonrası en az 12 px; grafik eksen sayıları (10.2, 0s...) da en az 12 px ve 4.5:1.
6. "+$X" kâr pop'u: en çok 600 ms, tek bir hareket, "hareketi azalt" tercihinde yalnız renk+sayı; zararda hiçbir animasyon (titreme, kırmızı flaş) olmasın.
