# Sanat Yönü — "Sakin Oda" (Tur 1, A1)

Bu belge sonraki tüm aşamaların (grafik, sprite, kart, menü) uyacağı rehberdir. Kod: `index.html` içindeki `A1 (Tur 1): SAKİN ODA` CSS bloğu, renkler `:root` altında `--k-*` değişkenleri.

## Duygu hedefi
- Sıcak, sakin, davetkâr bir "cozy game" odası: akşamüstü ışığı alan küçük bir çalışma köşesi, kedi ve köpekle.
- Stres değil merak: para kazanmak heyecanlı, kaybetmek cezalandırıcı değil. Ekranda bağıran renk, sürekli yanıp sönen şey yok.
- Hiyerarşi: oda (açık, yumuşak) → panolar (bir ton koyu) → kâğıt kartlar (açık krem) → monitör (tek koyu alan, oyunun kalbi).

## Palet (18 ana renk; her rengin yalnız burada tanımlı açık/koyu tonları kullanılır)
| Ad | HEX | Kullanım |
|---|---|---|
| ink | `#3B2F2A` | Tüm dış hatlar, tabela yazı gölgesi, buton yazısı (siyah yerine sıcak koyu kahve) |
| tx / tx2 | `#4A3B32` / `#6E5C4D` | Kâğıt üstünde birincil / ikincil metin |
| paper / paper2 / paperL | `#F6EDDA` / `#E8DCC2` / `#FFF8EA` | Kart zemini / oluk, kilitli, pasif / ışık alan kenar, seçili kart |
| line / trough | `#D6C7A8` / `#9C8A73` | Ayırıcı çizgi / çubuk oluğu, pasif buton kenarı |
| wall / wall2 | `#C9D6C0` / `#C2D0B9` | Adaçayı duvar ve seyrek ince dikey çizgisi |
| board (L/D) | `#B3C6AC` (`#C6D5BF` / `#94AA8D`) | Sütun panoları, lambri |
| wood (L/D) | `#B47D50` (`#D29E6C` / `#8A5A38`) | Zemin, para plakası, lambri pervazı |
| teal (L/D) | `#7DB8AE` (`#A9D3CA` / `#3F7D77`) | Seçim, aktif sekme, açık anahtar, başlık tabelası (koyu), bilgi ikonu |
| gold (L/D) | `#E8B655` (`#F3D08A` / `#B8853A`) | Para, alınabilir buton, ana BAŞLA düğmesi, dolu seviye çubuğu |
| up / upT | `#7FC29B` / `#2F7A4E` | Kâr: koyu zeminde / kâğıt üstünde metin |
| dn / dnT | `#E58E7C` / `#A4473A` | Zarar, yetersiz para: koyu zeminde / kâğıt üstünde metin |
| warn | `#E39A4A` | Uyarı (enerji azaldı vb.) |
| boss / bossL | `#A34F5E` / `#F2DEDA` | Boss kartı, boss rozeti (zarardan ayrı: mürdüm/vişne) |
| scr / scr2 / scrL | `#1E2B33` / `#26363F` / `#3A4E57` | Monitör ekranı, ekran şeritleri, ekran içi çizgi/kenar |
| stx / stx2 | `#DCE6E0` / `#8FA7A8` | Ekran metni birincil / ikincil |
| bez (L/D) | `#E3D8C0` (`#F3EBD8` / `#C4B699`) | Krem retro monitör kasası ve ayağı |

Yeni renk eklemeden önce bu tabloya bak; gerekiyorsa önce buraya ekle, sonra `:root`'a `--k-` adıyla koy.

## Kontrast kuralları
- Metin: kâğıt üstünde tx 9.2:1, tx2 5.5:1; ekranda stx 11:1, stx2 5.7:1 (WCAG AA). Saf beyaz `#FFF` ve saf siyah `#000` metin/zemin olarak kullanılmaz.
- Renkli zemin üstündeki yazı her zaman ink (`#3B2F2A`): altın 7:1, teal 6.6:1, kâr 7:1, zarar 6:1.
- Doygunluk düşük-orta; neon (ör. `#4dffb8`, `#ff4d4d`) yok. Parlak renk yalnız küçük ve önemli yerlerde (para, ana düğme).
- Kâr/zarar asla yalnız renkle anlatılmaz: ▲/▼ ok, +/− işareti, "AL/SAT" metni birlikte. Kırmızı-yeşil yerine yeşil (açık, mavimsi) ve mercan (sıcak) seçildi; parlaklıkları da farklı.

## Işık, piksel, kenar, gölge
- Işık sol üstten: üst/sol iç kenar 3 px açık ton, alt/sağ iç kenar 3 px koyu ton.
- Dış hat 2 px ink (monitör 3 px); köşeler kesik (eksenel box-shadow), yuvarlak köşe yok.
- Gölge düz ve sağ-alta: `3px 3px 0 rgba(59,47,42,.22)`. Bulanık gölge, parlama (glow), radyal gradyan, vinyet yok.
- Desen yalnız sert geçişli ve seyrek (duvar çizgisi 48 px, zemin tahtası 160 px). 8 px damalı gibi yoğun desen yok.
- Piksel ölçeği: arayüz 2–3 px'lik adımlarla; sprite'lar tam sayı ölçekte (`image-rendering:pixelated`).

## Tipografi
- Mevcut gömülü pixel fontlar korunur: `TIDig` (metin), `TINum` (sayılar), yedek `Pixelify Sans`/`VT323`.
- Başlık tabelası: krem yazı + 2 px ink gölge. Kart içi: gölgesiz düz yazı. Ekran: tek renk, gölgesiz.

## Hareket
- Kısa (120–450 ms), `steps()` ile piksel hissi; sürekli yanıp sönme yalnız gerçekten dikkat isteyen tek öğede ve yavaş (≥ 2 s döngü).
- Boss kartı/ekranı titremez; boss uyarısı sabit kenar şeridi + yavaş nefes.
- "Animasyonları azalt" (`body.rm`) her yeni animasyonu kapatmalı.

## Sonraki aşamalara notlar
- A2 grafik: zemin `scr`; çizgi kâr `up`, zarar `dn`; ızgara `scrL` düşük opaklık; parlama/gölge bulanığı yerine 1–2 px düz hale.
- A3 sprite: dış hat ink `#3B2F2A`, gölge tonu malzemenin koyu tonu; neon coin renkleri (`COL`) bu paletin doygunluğuna çekilmeli.
- A4 kartlar: kâğıt kart sistemi hazır; boşluk ve bilgi yoğunluğu düzenlenecek.
- A5 menü/tanıtım/final: menü hâlâ eski lacivert/ahşap; bu palete taşınacak.
