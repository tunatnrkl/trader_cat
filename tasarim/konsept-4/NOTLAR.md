# Konsept 4 — "Lofi Akşam Odası"

## Tasarım fikri (5 satır)
1. Oyun, gün batımında sakin bir "lofi" odasında geçer: mürdüm çizgili duvar, alt lambri, mauve ahşap zemin, şeftali-pembe pencere ışığı, lamba, bitki, kitap yığını.
2. Arayüz örnekteki "casual game" dilini alır ama düşük kontrastlı ve yumuşak: kalın yuvarlak paneller (20–30 px yarıçap), açık lavanta dış hat, düz alt kenar gölgesi; blur/glow/yanıp sönme yok.
3. Tek vurgu rengi "lamba sarısı" (BAŞLA, fiyat hapları, seçili kart, tabelalar); kâr yumuşak teal, zarar soluk gül + ▲/▼; nötr bilgi lavanta.
4. Psikolog bulguları uygulandı: büyük yüzde ve çizgi rengi pozisyon açıkken OYUNCUNUN ALIŞINA göre (SAT düğmesiyle aynı sayı, aynı karede hesaplanır), pozisyon yokken nötr; tur değişimi küçük ikincil satır ("tur +%x"); süre son saniyelerde kırmızıya dönmez; boss kenarı sabit ve yumuşak, siren gizli.
5. Kilitli kartlar çekici: sıradaki kilitli coin kartı altın kenarlı, "SONRAKİ COİN %x" ve ince ilerleme çubuğu gösterir; kârla kapanışta ≤450 ms "+$X" pop ve para plakasında kısa teal çerçeve, zararda nötr lavanta.

## Palet
| Rol | Renk |
|---|---|
| Duvar / çizgi | `#3B2B45` / `#37283F`, lambri `#30233A` |
| Panel / kart / kart üstü | `#46355A` (≈%92 opak) / `#54426A` / `#604C77` |
| Dış hat (açık) / iç hat | `#86719F` / `#6C5885`, gölge `#22182A` |
| Metin / ikincil / üçüncül | `#F8EBDF` / `#D3C1DC` / `#B19DBF`, koyu yazı `#2B1D30` |
| Lamba sarısı (vurgu) | `#F5C870`, alt ton `#DDA44E`, gölge `#9C6B33`, açık `#FFE3AA` |
| Şeftali / pembe (pencere, AL) | `#F3AE98`, `#E8A0B4` |
| Kâr (teal) / zarar (soluk gül) | `#86D0C3` / `#E9A9AB` |
| Ekran | `#241A2F`, çizim alanı `#2A1F37`, şeritler `#1D1526` |

## Font
Sistem yuvarlak yığını (brif): `ui-rounded, "SF Pro Rounded", "Nunito", "Varela Round", "Arial Rounded MT Bold", "Trebuchet MS", system-ui, sans-serif`, ağırlık 800–900, sayılarda `tabular-nums`. Dış Google Fonts bağlantısı kaldırıldı. Canvas yazıları (para, grafik, robot bölmeleri, logo) aynı aileyle çizilir (`K4F`). Pixel rakam fontu (TINum) artık hiçbir yerde kullanılmıyor (dosyada duruyor).

## Neler değişti
- **Çerçeve (öncelik 1):** Oda arka planı (duvar, lambri, zemin) yeniden; iki sütun büyük yuvarlak panel; para plakası iç panel + yuvarlak yazı (canvas, kontur + gölge); katalog sekmeleri hap; KATALOG/MAĞAZA tabelaları kalın yuvarlak, lamba sarısı + koyu kontur; coin kartları yuvarlak, seçili = altın kenar (eski ok kalktı), seviye = nokta (●●○); BOSS rozeti hap, yanıp sönmez; mağaza kartları örnekteki yığın düzeni (başlık / alt satır / noktalar / hap fiyat); fiyat butonu hap (yetersiz bakiyede soluk mor), kilit açma hap teal; toggle anahtar (mağaza + ayarlar); "i" yuvarlak; MAKS/SABİT/KURULU teal rozet; ANA PC / OTOMASYON segment kontrol; Bobby kartı satırları etiket üstte; robot kartları ve coin ızgarası; "daha fazla" hap.
- **Monitör:** yuvarlak kalın çerçeve (açık dış hat + alt gölge), yuvarlak ekran, CRT tarama çizgisi/vinyet kalktı, alt çene hap etiket + iki yuvarlak LED, yuvarlak ayar düğmesi (SVG dişli), sekmeler hap, tok BAŞLA (lamba), AL = şeftali, SAT = teal (kârda) / soluk gül (zararda), kaldıraç hapları, oto-tur hap.
- **Grafik (öncelik 2):** `drawChart` baştan: yuvarlak çizim alanı, çok hafif ızgara + nokta dizisi, kesik başlangıç çizgisi, pozisyon açıkken lamba sarısı "ALIŞ" çizgisi + etiket, düz yarı saydam alan dolgusu, 4 px çizgi (glow yok), yuvarlak al/sat rozetleri, hap satış etiketleri (çizilmiş ▲/▼), sabit son nokta + çok yavaş nefes halkası, hap fiyat etiketi. `hud`: büyük yüzde alışa göre + CSS üçgen ok, ikincil "tur" satırı (`#hR`), süre rengi sabit. `drawTile`: robot bölmeleri aynı dilde. Boss haber bandı yuvarlak, grafiğin üstünde (başlık okunur kalır), etiket yanıp sönmez.
- **Menü / modal / ipucu / toast (öncelik 3):** ana menü aynı odada (çizgili duvar, gün batımı penceresi, zemin, kedi ve Bobby'nin anlık görüntüsü), yuvarlak logo (canvas, glow/gradyan yok), hap butonlar (Oyna = lamba), kısa ekranlar için sıkışık düzen; ayarlar penceresi yuvarlak panel + toggle'lar + yuvarlak kapat; ipucu, toast, ödül şeritleri, öğretici balon, açılış 20-geni, final yazıları yeni dilde.
- **Atmosfer:** pencere (kedi köşesi), lamba + düz ışık konisi (Bobby köşesi), bitki ve kitap yığını (masada) — yalnız CSS katmanları.
- **Yeni metin:** `ALIŞ` → `ENTRY` (I18N.en); "tur"/"round" ikincil satırı dile göre yazılır.
- Oyun mantığı, sayılar, kayıt, id/data-* öznitelikleri değişmedi; `card/go/goU/tg/seg` şablonları aynı (görünüm CSS ile), `renderSide` kart şablonu ve `renderMod` ayar düğmeleri yeniden yazıldı.

## Bilinen eksikler
- Telefon yatayında (844x390) sahne 1600x900'den ~0.42 ölçekle küçülür; bazı ikincil etiketler hâlâ ~8 px (başlıklar ~9–10 px). Kalıcı çözüm telefona özel düzen (ör. hayvan alanlarını daraltıp ölçeği büyütmek) — yapılmadı.
- Sprite/ikonlar (coin, kilit, kemik, robot, kedi/köpek, kaplar, mama) eski pixel art; renkleri yeni palete uyarlanmadı (öncelik 4). Final sahnesi animasyonu dokunulmadı (yalnız yazı/buton stili).
- Eski CSS katmanları silinmedi, yeni blok (`<style id="k4">`) en sonda onları eziyor; kalıcı geçişte eski görsel katmanlar temizlenmeli.
- Robot bölmelerinde çok işlem olunca yüzde etiketleri üst üste binebiliyor (eskisinde de vardı).

## Doğrulama
- `smoke.js` (TI_URL=konsept-4, TI_SHOTS=tasarim/konsept-4/shots): **63/63 geçti**, konsol temiz, TR/EN ve 4 ekran boyutunda taşma yok.
- `goruntu.js` → `tasarim/konsept-4/goruntu/` 8 standart görüntü, konsol temiz. Ek kontrol (boss + haber bandı, mağaza aşağı kaydırılmış, 2 robot çalışırken, ödül/toast, telefon menü/mağaza) gözle incelendi.
- Telefon işlem anında başlıktaki yüzde ile SAT düğmesindeki yüzde aynı (`ui` sonrası `hud` aynı karede çağrılıyor).
