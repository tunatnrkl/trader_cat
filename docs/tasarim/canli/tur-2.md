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
