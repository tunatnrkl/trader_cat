# Teşhis 2 — iki değişiklikten sonra (Testçi, Sonnet)

> Kod değişmedi, commit yok. Ölçülen: `3b8d5b6` (Kat.1 ritmi) + `1d83bdf` (kurtarma turu). Betikler: `/tmp/claude-0/-home-user-trader-cat/a538f2c1-40e5-543b-bf48-f5168a138070/scratchpad/testci/` (`p8.js` rastgele, `p9.js` iyi, çıktılar `o8_*.txt`, `o9_good.txt`, `sim2.txt`).
> Yöntem: taze kayıt, `?nomenu&lang=tr`; sayfa içi bot. İyi = %0,4 dönüş izler, açılan ve alınabilen en pahalı coine geçer (10 dk). Rastgele = rastgele al/sat, kurtarma turunu kendiliğinden kullanır, nakit yetmezse mama döngüsüne düşer (13 dk). Bot insandan hızlıdır (iyi bot 10 dk'da 2113 tıklama = ~3,5/sn, tahmin: insan bunun çok altında). Botlar mağazadan hiçbir şey almadı (volatilite, kaldıraç, Bobby, robot yok).

## 1. 8 ölçüt: Teşhis 1 → Teşhis 2
| Ölçüt | T1 → T2 | Kanıt |
|---|---|---|
| 1 Anlamlı karar | 3 → 3 | Bot mağaza almadığı için yeni karar ölçülmedi; kurtarma turunda 1x zorunlu (karar yok). Sim'de Kat.1 volatilite ucuzladı ama oyuncu için seçim sayısı değişmedi (tahmin). |
| 2 Beceri ödülü | 4 → 4 | 10 dk'da iyi kasa $1.167 (Ember/Nova'ya geçti), rastgele 13 dk'da $1,72 ve 0 coin açık. Fark büyük kaldı; sim iyi/ortalama süre oranı 0,72 (97,5/134,8). |
| 3 Risk ve getiri | 3 → 3 | Rastgele oyuncu artık kilitlenmiyor (50 tur, 51 kurtarma turu, 3 mama döngüsü) ama hiç ilerlemiyor; ceza yumuşadı, risk-getiri bağı yok. Nova'da -$34,5 (Nova'ya girip -%2,9) gibi tek tur kayıpları küçük. |
| 4 İlerleme ritmi | 3 → 3 | İyi bot: Ember 2,6 dk, Nova 5,6 dk; Titan çubuğu 10. dk'da 2.988 / 22.500 (%13). Rastgele: 13 dk'da 17,7 / 150 (%12). Uzun hedef yine görünmüyor (tahmin). |
| 5 Zorluk eğrisi | 3 → 3 | Sim Kat.1 52,4 → 40,6 (ortalama), 25,4 → 25,0 (iyi), 52,4 → 39,7 (Bobby); hedef ~30. İyi oyuncu toplam 89,9 → 97,5 (hedefe yaklaştı), ortalama 139,7 → 134,8. |
| 6 Aktif/otomatik | 3 → 3 | Bobby-öncelikli 141,0 → 135,1; ortalamadan farkı +1,3 → +0,3 dk: Bobby seçmek hâlâ hız kazandırmıyor (ya da kaybettirmiyor). Elle denenmedi. |
| 7 Geri bildirim | 4 → 4 | Metin değişiklikleri ("$1 öde, $2 al") görsel olarak yeniden kontrol edilmedi; 1 kafa karışıklığı çözüldü (aşağıda). Konsol temiz. |
| 8 Çeşitlilik | 3 → 3 | 13 dk'da rastgele oyuncu tek coinde (Pebble), iyi oyuncu 3 coin gördü; tur hâlâ 15 sn, yeni mekanik yok. |

## 2. Sorunlar
**Çözüldü / iyileşti**
- Eski "$10 altında tura giremiyorum" kilidi: rastgele oyuncu mamaya ilk 4 dk'da hiç düşmedi (T1: 4 kez), 13 dk'da toplam 3 kez (7,4 / 11,0 / 12,4. dk). Açılışta $2 ile kurtarma turu oynandı; 35 sn'lik açılış mama döngüsü gerekmedi (iyi bot ilk turu 0 mamayla oynadı).

**Yeni ve kalan**
- sıkıldım / takıldım — rastgele oyuncu 13 dk'da Ember'i açamadı: kasa 0–3,7 $ arasında dolaşıyor, 50 turun tamamı kurtarma turu (1x, tüm nakit), ilerleme 17,7 / 150. Kurtarma turu soft-lock'u çözdü ama kötü oyuncuyu sürekli $1–3'te tutuyor (10 $ eşiğine hiç çıkmadı).
- sıkıldım — iyi oyuncu Ember→Nova 3,0 dk, Nova→Titan çubuğu 10. dk'da %13 (2.988 / 22.500); mağaza alınmadan Titan'a gitmek çok uzun (tahmin: gerçek oyuncu volatilite/kaldıraç alıp hızlanır).
- gereksiz tıkladım — iyi bot 10 dk'da 2.113 tık (tur başı ~54); oyuncu elle bunu yapamaz, Oto-Tur/Bobby'ye ihtiyaç duyar (tahmin).
- kafam karıştı — coin seçimi: nakit coin fiyatının hemen altı/üstündeyken (Nova $1.200, kasa $1.166–1.210) bot Ember ve Nova arasında 4 kez gidip geldi; gerçek oyuncu için de "hangi coin" göstergesi yok (tahmin; botun seçim kuralından kaynaklanabilir).
- takıldım — sim Eclipse→Pulsar 17,8 dk ve boss3→Eclipse 13,0 dk (ortalama); Kat.1 duvarı küçüldü ama Kat.4 duvarı baskın.
- sıkıldım — Bobby-öncelikli sim süresi ortalamayla aynı (135,1 / 134,8): Bobby alımı hissedilir fark yaratmıyor.

## 3. Süre tablosu (sim.js, 5 koşu, varsayılan ayar, medyan)
| Tip | Önce toplam (Kat.1) | Şimdi toplam (min–maks) | Kat.1 / 2 / 3 / 4 dk |
|---|---|---|---|
| ortalama | 139,7 (52,4) | 134,8 (127,8–135,7) | 40,6 / 26,9 / 32,2 / 31,7 |
| iyi | 89,9 (25,4) | 97,5 (84,3–98,7) | 25,0 / 15,9 / 24,2 / 31,9 |
| Bobby-öncelikli | 141,0 (52,4) | 135,1 (128,5–139,8) | 39,7 / 29,4 / 32,7 / 32,1 |
- Duvarlar (ortalama): Eclipse→Pulsar 17,8; boss3→Eclipse 13,0; Quasar→Zenith 12,2; Ember→Nova 11,9.
- Gerçek oynanış (bot): iyi — Ember 2,6 dk, Nova 5,6 dk, kasa 1. dk $58 / 2. dk $107 / 3. dk $259 / 4. dk $349 / 10. dk $1.167. Rastgele — kasa 4. dk $1,7, hiç coin açmadı (13 dk). İlk koşuda (coin geçişi bozuk bot, Pebble'da kaldı) iyi bot 4. dk $214, 13 dk $829, Ember 2,96 dk.
- Neden 10–15 dk tam oynanmadı: iyi bot 10 dk, rastgele 13 dk oynadı; Kat.1'in sonu (Nova→Titan) sim'de ~40 dk, botun mağaza almaması nedeniyle 25 dk+ sürer ve süre sınırı aşılırdı.

## 4. Şimdiki en kötü 3 sorun
1. Kötü/orta oyuncu Pebble'da sıkışıyor: 13 dk'da 0 coin, kasa $0–4, 50 tur kurtarma (1x, tüm nakit). Kurtarma turu 10 $ eşiğine çıkış yolu vermiyor.
2. Kat.1 hâlâ ~40 dk (hedef ~30) ve ortalama toplam 134,8; iyi oyuncu 97,5 dk ile hedef 120–150'nin altında: beceri farkı süre bandını aşıyor.
3. Aktif/otomatik seçimi anlamsız: Bobby-öncelikli 135,1 ≈ ortalama 134,8; Kat.4'te Eclipse→Pulsar 17,8 dk ve boss3→Eclipse 13,0 dk tıkanıyor.

## 5. Test
- `runTradeTests()`: ok=true, "Tüm işlem testleri GEÇTİ".
- `runBobbyTests()`: ok=true, "Bobby testleri GEÇTİ (elle ve robot da aynı sonucu verdi)".
- Konsol hatası/uyarısı: 0 (iki bot koşusunda `errs=[]`).
- Ölçüm zayıflığı: botlar satın alma yapmıyor; kurtarma turu yalnız rastgele botla denendi; Bobby/robot elle oynanmadı; tek koşu/tip (gerçek oynanış); sim oyuncu davranışı varsayım. `index.html`, kayıt formatı değişmedi.
