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

## Adım 3 — Tasarımcı: Danışma 3

**Renk dili (Adım 2'ye eklenenler)**
- **Kâr:** nane (#62CDAA çizgi, #7FD8BC yazı) ve ▲.
- **Zarar:** sönük kehribar (#C9A07A çizgi, #C9A27E yazı; doygunluk %41–42, ≤%45) ve ▼.
- **Pozisyon yokken:** nötr gök mavisi (#8CC8EE).
- Kırmızı-yeşil yok, mercan yok, nabız ya da nefes animasyonu yok. Kâr/zarar her yerde renk ve şekille gösteriliyor; ikisinin de çizgi kalınlığı ayrıca farklı.

**Ne yaptım**
- **Grafik:** Kârda kalın (5 px) nane çizgi, zararda ince (3 px) kehribar çizgi. Böylece fark renge bakmadan da okunuyor. Izgara sade ve silik. Eksen sayıları 22 px (eskiden 17–18 px), kontrast 6,5:1. Fiyat etiketi hapı artık eksen sayısının üstüne binmiyor; çakışan sayı atlanıyor. Son fiyat noktasındaki "nefes" kaldırıldı, nokta sabit. Al/sat rozetleri ve kâr etiketleri nane ▲ / kehribar ▼. ALIŞ çizgisi sönük lila-gri, 2 px. Likidasyon çizgisi pembe yerine koyu kehribar ve kesikli.
- **Üst bilgi:** Büyük yüzde kârda nane, zararda sönük kehribar. Önünde küçük ▲/▼ şekli var (26 px, yüzdenin kendisi 44 px). Sayaç rengi saf beyaz yerine krem; son 3 saniyede yanıp sönmeden şeftaliye geçiyor. Coin adı krem; boss'ta sönük gül rengi.
- **İşlem düğmeleri:** BAŞLA turuncu (Adım 2'deki gibi %10 sakin). AL turkuaz, bir ton sakin. SAT kârda nane ve "▲ +%x", zararda nötr kart tonu ve "▼ −%x". Ekranda her zaman tek ana düğme var. Kaldıraç seçimi 40 px yüksek, 20 px yazı, seçili olan lila-krem.
- **Monitör:** Sistem çubuğundaki seçili sekme lila-krem. "TRADE-OS 3000" plakası soluk; mercan LED şeftaliye döndü.
- **Haber bandı:** Mor-pembe yerine nötr koyu zemin; "SON DAKİKA" küçük lila bir hap. Yanıp sönme yok.
- **Boss:** Ekranın içinde ince (4 px), sabit, sönük gül-mor bir kenar. Grafik zemini hafif mürdüm. Siren yok, nabız yok. Kendi betiğimle kontrol ettim (aşağıdaki görüntü).
- **Otomasyon Merkezi:**
  - "BOŞ BÖLME" 20 px, kontrastı yüksek (#A39DC0) ve kesikli yuvarlak bir çerçeve içinde. Kilitli bölmeler artık %60 saydam değil.
  - Robot başlığı krem, 17 px. Alttaki süre sayısı pixel font yerine yuvarlak font.
  - Kâr/zarar yazısı neon yeşil/kırmızı (#4CD08A/#E5484D) yerine nane ▲ / kehribar ▼.
  - Bitiş noktasındaki hızlı nabız (yaklaşık 3 Hz) kaldırıldı.
- **Tur sonu fişi:** Kenar nötr. "KÂR!" nane, "ZARAR" kehribar. Değişim satırında ▲/▼ var.
- **"+$X" kâr pop'u:** Tek hareket (yumuşakça biraz yükselip kayboluyor), toplam 600 ms; 650 ms'de sayfadan da kalkıyor (ölçtüm: 500 ms'de var, 700 ms'de yok). Rengi nane. Zararda animasyon yok, yalnız sabit soluk "−$X" görünüyor. Ayarlardaki "Animasyonları azalt" ile ve artık sistemin "hareketi azalt" tercihiyle (`prefers-reduced-motion`) pop, squish ve kayma kapanıyor; renk ve sayı kalıyor.

**Ortak tavsiye 2'yi nasıl uyguladım**
1. Zararda büyük yüzde sönük kehribar (#C9A27E, doygunluk %41) ve küçük ▼. Grafik çizgisi zararda 3 px kehribar, kârda 5 px nane.
2. Alınamaz haplarda yazı #DDD7EC (dolguya karşı 5,6:1'in üstünde). Hapın kenarına açık bir halka eklendi (#8A84AA, karta karşı 3,25:1). Soluk olan yalnız dolgu.
3. AL turkuaz, SAT kârda nane / zararda nötr. ▲/▼ ve yazı sabit, yeni renk eklenmedi. Ekranda tek ana düğme var.
4. KATALOG / MAĞAZA / OTOMASYON afişleri koyu nötr dolgulu (#221E38, doygunluk %29), 3 px ince turuncu kenarlı, krem yazılı. Şerit uçları kaldırıldı.
5. Masaüstünde etiketler 24 px (BOBBY, KEDİ, COİN, SEVİYE, KALDIRAÇ). Grafik eksen sayıları 22 px. Telefonda ≥12 px Adım 4'teki fit() ile gelecek. Eksen kontrastı 6,5:1.
6. Kâr pop'u 600 ms ve tek hareket. Hareket azaltmada yalnız renk ve sayı kalıyor. Zararda animasyon yok.

**Bakılacak görüntüler**
- `docs/tasarim/son/desk_tr_zarar.png`: zarar (▼ kehribar yüzde, ince kehribar çizgi, nötr SAT)
- `docs/tasarim/son/desk_tr_islem.png`, `tel_tr_islem.png`: kâr (▲ nane, nane SAT)
- `docs/tasarim/son/desk_tr_boss.png`: boss ekranı (sakin kenar)
- `docs/tasarim/son/desk_tr_fis.png`: tur sonu fişi
- `docs/tasarim/son/desk_tr_robot.png`: çalışan iki robot, +1 ve boş bölme
- `docs/tasarim/son/desk_tr_oto.png`, `desk_tr_ana.png`, `desk_en_ana.png`, `tel_tr_ana.png`

**Psikologlara sorular**
1. Kâr çizgisi kalın, zarar çizgisi ince. Renk körlüğünde de fark okunsun diye yaptım. Zararda inceltmek "kaybı küçük gösterme" gibi yanlış bir mesaj veriyor mu, yoksa sakinleştirici mi?
2. Son 3 saniyede sayacın şeftaliye dönmesi hafif bir hatırlatma. Bunu da aciliyet baskısı sayıp tamamen kaldıralım mı?
3. Boss ekranının ince gül-mor kenarı "özel tur" duygusunu veriyor mu, yoksa daha da sade mi olsun (yalnız coin adının yanındaki "BOSS" yazısı)?
4. Turuncu kenarlı koyu afişler ile turuncu BAŞLA düğmesi aynı turuncuyu paylaşıyor. Afiş kenarı bir ton daha sönük (#B9824A gibi) mi olsun?

### Adım 3 — Psikolog A

Kâr anı artık gerçekten tatmin edici: nane çizgi, ▲, nane SAT ve kısa "+$X" bir bütün. Sorularına:

1. **İnce zarar çizgisi:** "Kaybı küçük gösterme" sayılmaz. Kaybın bilgisi büyük yüzde ve ▼'de duruyor; çizgi sadece ses yüksekliği. Ama 3 px'in altına inme; zarar ekranında çizgi neredeyse kayboldu (görüntüde ince bir kıl gibi). Şekil farkı yeter, kalınlık farkı abartılmasın.
2. **Son 3 sn şeftali:** Kalsın. Yanıp sönmüyor, kırmızıya dönmüyor; "az kaldı" diye merak yaratıyor, baskı değil.
3. **Boss kenarı:** İnce gül-mor kenar fazla sade; ekran normal tura çok benziyor. Boss'un "özel tur" olması ödül hissidir. Kenarı kalsın, yanına coin adındaki "BOSS" yazısı biraz belirgin bir hap olsun. Animasyon yok.
4. **Afiş kenarı:** Bir ton sönük olabilir, evet. BAŞLA tek turuncu parlak nokta kalmalı.

**Gözüme çarpanlar**
- Zararda SAT düğmesi nötr ve sönük; "hasarı kes" eylemi pasif/kapalı gibi duruyor. Oyuncu zarardayken basılabilir olduğunu bir bakışta anlamalı; kenarı veya yazısı biraz canlansın (renk değil, doluluk).
- Mağazadaki "SABİT" hapı ve kaydırılan liste güzel, ama boss turunda "KALDIRAÇ" kartları kullanılamıyor gibi; sebebi kısa bir ipucuyla söylenirse sinir bozucu olmaz.

**B'ye sorum:** Zararda nötr SAT'ı "pasif" gibi okuyacak oyuncular olabilir; bunu sakinliği bozmadan nasıl ayırt ederiz (kenar kalınlığı mı, yazı parlaklığı mı)?

### Adım 3 — Psikolog B

**A'nın sorusuna net öneri (nötr SAT nasıl "aktif" okunur):** Renk eklemeden, biçimle. Aktif SAT: tam krem yazı, 3 px açık lila-krem kenar ve alttaki kalın "basamak" gölgesi (kabarık). Pasif/kilitli düğme: kenar yok, gölge yok, düz. Yani "basılabilir" = kabarık, "kapalı" = yassı. Parlaklık artırma yok. Zarar ekranındaki SAT'ta kenar zaten var ama sönük; kabarıklığı ve yazı parlaklığını biraz artır, yeter.

**Tasarımcının soruları:** (1) İnce çizgi: A'ya katılıyorum, ama zarar çizgisi görüntüde kıl gibi; en az 4 px olsun (kâr 5 px), yoksa okunmaz. (2) Son 3 sn şeftali: kalsın, yanıp sönmediği sürece. (3) Boss: A'ya katılıyorum, kenar kalsın, yanına belirgin ama sakin "BOSS" hapı. (4) Afiş kenarı: bir ton sönük, kabul.

**Yönetici'nin iki hatası:** Büyük yüzde (−%9.1) ile SAT'taki (−%9.9) farklı; oyuncu kendine güvenmez, kaygı yaratır. Aynı sayı, aynı yuvarlama. "Daha fazla" şeridi kartı örtmesin.

**Ek gözlem:** Grafikte zarar dibi çizgiyi eksen sayılarının altına taşırıyor; çizgi grafik alanına kırpılsın.

#### Ortak tavsiye 3

1. Aktif SAT (zarar dahil): 3 px açık lila-krem kenar, krem yazı, 6 px alt basamak gölgesi; pasif düğme yassı (kenar ve gölge yok). Yeni renk yok.
2. Zarar çizgisi en az 4 px (kâr 5 px), çizgi grafik alanına kırpılsın; eksen sayılarının üstüne taşmasın.
3. Büyük yüzde ile SAT düğmesindeki yüzde aynı kaynaktan, aynı yuvarlamayla gösterilsin (fark 0).
4. Boss: ince sönük kenar + coin adının yanında sabit "BOSS" hapı (dolgu doygunluğu en çok %35, animasyon yok); "KALDIRAÇ kullanılamaz" için tek satır ipucu, en az 12 px.
5. Telefonda (Adım 4) tüm yazı en az 12 px, normal metin 4.5:1, ikon/kenar 3:1; dokunma hedefleri en az 44 px; "daha fazla" şeridi hiçbir kartı örtmesin.
6. Afiş turuncu kenarı bir ton sönük (#B9824A civarı); ekranda tek parlak turuncu BAŞLA kalsın; ikonlar (coin, şimşek, kemik) en fazla iki renk ve soluk kontur, altın yalnız hedef kartta.

## Adım 4 — Tasarımcı: Danışma 4

**Ne yaptım**
- **Telefon kipi (TEL):** fit(), ölçeğin 0,6'nın altına düştüğü yatay telefonlarda telefon kipine geçiyor:
  - Ekran 16:9'dan genişse sahne yatayda genişliyor (konsept-2 yaklaşımı).
  - Monitör alanı daralıyor, yan sütunlar genişliyor (667'de 340 → 400 px, 844'te 480 px).
  - Sahnedeki tüm yazıların tabanı 30 px; yazı küçültme yok.
  - İkincil bilgi gizlendi: monitör çenesindeki "TRADE-OS 3000" yazısı, sistem çubuğundaki "TRADE-OS" etiketi, "POZİSYON · TUR" alt satırı.
  - Alt şerit ızgaraya alındı (kaldıraç üstte, not altta, ana düğme sağda). SAT etiketi telefonda iki satır: fiyat / (▲▼ yüzde).
  - Grafik ve robot bölmesi yazıları da telefonda 30 px.
  - Masaüstü (1440x900, 1024x640) düzeni değişmedi.
- **Ölçüm (gerçek piksel = computed font-size × sahne ölçeği):**

  | Ekran | Ölçek | 12 px altı yazı |
  |---|---|---|
  | 667x375 | 0,400 | 0/46 (ana), 0/47 (işlem), EN 0/46 |
  | 844x390 | 0,425 | 0/46 (ana), 0/37 (otomasyon) |

  En küçük sahne yazısı 30 px, yani 667'de 12,0 px, 844'te 12,75 px. Canvas yazıları (eksen, ALIŞ, fiyat etiketi, robot bölmesi) da telefonda 30 px.
- **Dokunma hedefleri:** Gerçek dokunulabilir alan merkezden dört yöne `elementFromPoint` ile ölçüldü. Görünmez genişletme kullanıldı (`::after`; kapatma düğmesinde şeffaf kenarlık). 44 px altında kalanlar:
  - Mağazadaki ilk fiyat hapı: 39 px (667) / 42 px (844).
  - Kilitli katalog sekmeleri: devre dışı, dokunulmaz.
  - Kedi kabı (`#bowl`): sürükle-bırak hedefi, düğme değil.
  - Diğer tüm düğmeler ≥44 px.
- **İki hata:**
  1. Başlıktaki yüzde ile SAT yüzdesi artık aynı fonksiyondan (`satTxt`), aynı fiyatla ve aynı anda yazılıyor. Daha önce başlık her karede, SAT fiyat değişince güncelleniyordu; arada bir fiyat adımı kayıyordu. Doğrulama: masaüstü ve 667x375'te 120 örnek, fark 0.
  2. "daha fazla" şeridi panelin kendi alt şeridinde, hiçbir kartı örtmüyor. Şeridin üstündeki yarım kart artık 70 px'lik yumuşak bir geçişle soluyor; "kesik" değil "devamı var" diye okunuyor.
- **Adım 3'te fark ettiğim iki sorun:** Güncel fiyat noktası ve kesikli çizgisi grafik alanına sıkıştırıldı, eksen yazılarının üstünden geçmiyor. Tur sonu fişi eksen sayılarından uzaklaştırıldı (sağdan 86 px; telefonda 140 px).

**Ortak tavsiye 3'ü nasıl uyguladım**
1. Aktif SAT (kâr ve zarar): 3 px lila-krem kenar ve 6 px alt basamak. Zararda krem yazı (kârda nane zeminde koyu yazı, okunurluk için). Pasif ana düğme yassı: kenar ve gölge yok. Yeni renk yok.
2. Zarar çizgisi 4 px, kâr çizgisi 5 px. Çizgi ve alan dolgusu grafik alanına kırpılıyor.
3. Yüzde eşitliği: yukarıdaki 1. hata.
4. Boss: coin adının yanında sabit, sönük "BOSS" hapı (#4E3A55; telefonda "TUR" satırında). Kaldıraç alanında tek satır ipucu: "Boss coininde kaldıraç kullanılamaz" (EN çevirisi var; telefonda 30 px = 12 px).
5. Telefon: yazı ≥12 px ve dokunma alanı ≥44 px (istisnalar yukarıda). Kontrast Adım 2–3 değerlerinde (≥4,5:1).
6. Afiş kenarı #B9824A. Turuncu yalnız BAŞLA'da; Bobby'nin enerji düğmesi şeftali, "AÇ!" etiketi sönük kehribar.

**Not (ikonlar):** Yönetici'nin "ikonlara girme" mesajı geldiğinde şunlar zaten yapılmıştı:
- coin ikonları ve mağaza ikonları (iki renk + sönük kontur, SVG)
- Bobby'nin grafik işaretlerindeki neon yeşil/kırmızı → nane/kehribar
- Bobby kabının kademe renklerinde doygunluk %40 az

Yeni yön gelirse bunları geri alabilirim: `ICONS` / `ICN` vektör bloğu ve `BOWLC`.

**Bakılacak görüntüler:** `docs/tasarim/son/tel_tr_ana.png`, `tel_tr_islem.png` (844x390), `desk_tr_ana.png`, `desk_tr_islem.png`, `desk_tr_oto.png`, `desk_tr_ayar.png`, `desk_en_ana.png`.

**Psikologlara sorular**
1. Telefonda yazılar büyüdü, buna karşılık listede aynı anda daha az kart görünüyor (solda yaklaşık 2,5 kart, mağazada 2 kart). Bu takas kabul edilebilir mi?
2. Telefonda SAT etiketinin iki satır olması (fiyat / yüzde) okunuyor mu, yoksa telefonda yalnız yüzde mi gösterilsin?

## Adım 5 — Tasarımcı: Notlar

Yön: "Gece yarısı trader masası". Düzen ve koyu oda korundu; olgunlaştırıldı. Smoke 63/63, konsol temiz.

1. **Mama çubuğu:** Dolma gösterimi ease-out (1−(1−p)³): başta hızlı, sonra yavaş. Toplam süre (4 sn) ve bitiş mantığı aynı; yalnız gösterilen dolum değişti.
2. **Masaüstü ölçüleri küçüldü** (yalnız `#stage:not(.tel)`; telefon `#stage.tel` kuralları ve ≥12 px aynen sürüyor). 1440x900'de gerçek boyutlar:
   - kart başlığı ~17 px, fiyat ~15 px, ikincil yazı ~13 px
   - coin kartı 96 → 78 px
   - fiyat etiketi 46 → 32 px
   - BAŞLA 300x80 → 270x68
   - grafik eksen yazısı 22 → 17 px
3. **Bakiye odometresi:** Para değişince değişen haneler sayaç gibi kayıyor (eski hane yukarı, yeni hane alttan; 450 ms, ease-out). Haneler sabit genişlikte. Hareket azaltmada (ayar veya sistem tercihi) anında değişiyor. Sayfa genelinde `font-variant-numeric: tabular-nums`, yani rakamlar titremiyor.
4. **Malzeme:**
   - Paneller ve monitör mat grafit kasa (1 px açık kenar + ince bulanık gölge; kalın cartoon alt gölge yok).
   - Köşeler 4–14 px.
   - Ekran cam yeşili terminal: grafik ve robot bölmeleri de bu zeminde.
   - Monitörün altında koyu ceviz bir masa tablası var.
   - Başlıklar gravürlü metal plaka gibi (condensed büyük harf, ince bakır kenar).
   - Sekmeler fiziksel tuş gibi; seçili olan basılı durur.
   - Fiyatlar kâğıt fiyat etiketi (krem kâğıt, mürekkep yazı); alınamaz olan soluk metal.
   - Yazı yığını yuvarlak fontlardan Inter / sistem sans'a geçti; başlıklarda condensed (Bahnschrift/DIN/Roboto Condensed varsa).
5. **Tur sonu fişi:** Termal kâğıt (krem, monospace, kesikli ayraçlar, alt kenarı tırtıklı).
6. Kâr/zarar dili, tek altın (sıradaki kilitli kart), zararda alarm yok ve değişmezler aynen sürüyor.

**Yarım kalan / sonraya:**
- Ekrandaki "HAZIR! BAŞLA'YA BAS" hapı hâlâ yuvarlak.
- Bakiye ikonu hâlâ çizilmiş coin; gerçek madeni para ya da banknot hissi verilmedi.
- Masada klavye gibi küçük nesneler yok.
- Ana menü ve final sahnesi yeni malzeme diline geçmedi.

## Adım 5b — Tasarımcı: Notlar

Adım 5'in grafit/mat yönü bırakıldı. Adım 4'ün renkleri, doygunluğu, kontrastı ve kişiliği aynen duruyor. Smoke 63/63, konsol temiz.

1. **Mama çubuğu:** Dolma gösterimi ease-out (1−(1−p)³): başta hızlı, sonra yavaş. Toplam süre (4 sn) ve mantık aynı.
2. **Bakiye odometresi:** Değişen haneler sayaç gibi kayıyor (450 ms, ease-out); haneler sabit genişlikte. Hareket azaltmada (ayar veya sistem tercihi) anında. Renk ve kontur Adım 4'teki gibi krem / koyu. Sayfa genelinde tabular rakam.
3. **Masaüstü ölçüleri** (yalnız `#stage:not(.tel)`), 1440x900'de gerçek boyut:
   - kart başlığı ~17 px, fiyat ~15 px, ikincil yazı ~13 px
   - coin kartı 96 → 76 px
   - fiyat hapı 46 → 32 px
   - BAŞLA 300x80 → 270x68
   - grafik eksen yazısı 17 px
4. **Ağırlık:** Masaüstünde 900 → 800 (ikincil yazılarda 700). Ağır yazı gölgeleri 2 px'ten 1 px'e indi. Başlık plakalarında hafif harf aralığı var.
5. **Oran** (renkler aynı):
   - Kartlar, fiyat hapları, sekmeler ve tuşlarda kalın alt basamak 6–9 px'ten 3–5 px'e indi; kontur 3 px'ten 2 px'e indi.
   - Köşe yarıçapları küçüldü: panel 28 → 18, monitör 34 → 24, kart 20 → 12, fiyat hapı yuvarlak hap → 10, BAŞLA 26 → 16.
   - Dolgular masaüstü oranına çekildi.
6. **Telefon:** `#stage.tel` (Adım 4 ölçüleri, ≥12 px, ≥44 px) aynen.
7. **Tur sonu fişi:** Termal kâğıt (krem, monospace, kesikli ayraçlar, tırtıklı alt kenar). "KÂR!" ve "ZARAR" canlı nane / kehribar tonlarında.
