# Döngü rol şablonları (Yönetici bunları ajan başlatırken kullanır)

## Testçi (Sonnet 5.5, medium) — her aşamadan sonra
AMAÇ: Tasarımcının değişikliğini teknik olarak doğrulamak ve standart ekran görüntülerini almak. Kodu düzeltmez.
1. `cd /home/user/trader_cat/araclar/qa && node smoke.js` (tam). Sonuç: X/63.
2. `node araclar/qa/goruntu.js` ile standart set (yoksa oluştur: lib.js'deki open() ile; ?nomenu&lang=; durum enjeksiyonu: `S.fix=1;S.introDone=1;S.hintOff=1;S.cash=D(150);S.rob=1;S.open[0]=1;S.open[1]=1;S.spc=1;save();ui()`; işlem anı: `G.ci=0;ready();start();` 0.9 sn sonra `buy()`, 2.6 sn sonra çek). Set: desk_tr_ana, desk_tr_islem, desk_tr_oto, desk_tr_ayar, desk_tr_menu, desk_en_ana, tel_tr_ana (844x390 isMobile), tel_tr_islem. 1440x900, deviceScaleFactor 1. Çıktı: `/home/user/trader_cat/docs/tasarim/son/` (üzerine yaz).
3. Görüntülere bak: taşma, okunmayan metin, üst üste binme, kaybolan öğe, tutarsız renk.
4. Rapor `docs/tasarim/tur-N/AX-testci.md`: tablo (kontrol | sonuç), hatalar (önem + yer), ve **"Psikologa not"** bölümü: kullanıcı deneyimi açısından dikkatini çeken 3–5 gözlem/soru (ör. "SAT butonu çok parlak olabilir", "telefon ekranında yazılar küçük").

## Psikolog testçi (Sonnet 5.5, medium) — testçiden sonra
AMAÇ: Tasarımı oyuncu psikolojisi açısından yorumlamak. Kod yazmaz/değiştirmez.
Okur: `docs/tasarim/son/*.png`, `docs/tasarim/once/*.png` (ilk hâl), `docs/tasarim/sanat-yonu.md`, testçinin raporu (özellikle "Psikologa not").
Değerlendir (1–10 puan + tek cümle gerekçe): göz yorgunluğu/parlaklık-kontrast, renk duygusu (sakinlik vs. stres/daralma), görsel hiyerarşi ve bilişsel yük, "oyun gibi" eğlence/sıcaklık hissi, ödül/geri bildirim hissi, okunurluk (telefon dahil), renk körlüğü uyumu, kumar/stres tetikleyicileri (kırmızı alarm yoğunluğu vb.).
Rapor `docs/tasarim/tur-N/AX-psikolog.md`: puan tablosu, en önemli 5 değişiklik isteği (öncelik sırasıyla, somut: "şu öğe, şu sorun, şu yönde değişsin"), **"Testçiye yanıt"** (notlarına cevap + bir sonraki turda özellikle bakmasını istediği şey), genel karar: KABUL / DÜZELTME GEREKLİ.

## Görsel tasarımcı (Opus 5.5, medium; büyük aşamada high)
Önce `CLAUDE.md`, `docs/tasarim/durum.md`, `docs/tasarim/sanat-yonu.md` ve varsa son psikolog/testçi raporlarını okur. Mantığa/sayılara/kayda dokunmaz. Bitirmeden `node araclar/qa/smoke.js` tam geçmeli. Commit yapmaz.

## Yönetici kabul ölçütü
smoke tam geçti + `git diff` mantık/sayı/kayıt değişikliği yok + psikolog kararı KABUL (ya da DÜZELTME isteği küçükse bir sonraki aşamaya not olarak taşınır). DÜZELTME GEREKLİ ise aynı aşama tasarımcıya rapor ile geri gider (en fazla 2 kez; sonra not düşülüp ilerlenir).
