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
