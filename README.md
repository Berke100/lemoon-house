# Lemoon House — kaydırmalı sanal tur sitesi

Next.js 15 · React 19 · Tailwind CSS · GSAP ScrollTrigger

## Çalıştırma
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statik çıktı: out/ klasörü
```
`out/` klasörü herhangi bir statik barındırmaya (Vercel, Netlify, cPanel) yüklenebilir.
Vercel'de projeyi içe aktarmanız yeterli.

## Yapı
- `lib/content.jsx` — tüm içerik tek yerde: metinler, odalar ve fotoğraflar, olanaklar, kurallar, puanlar, iletişim bilgileri
- `app/page.jsx` — sayfa düzeni
- `app/globals.css` — renkler (güneş sarısı #F9B318, kobalt #1546D9, sıcak bej #EDECE6) ve stiller
- `lib/site.js` — kaydırmalı tur, odadan odaya galeri, menü, rezervasyon, iletişim ve belge pencereleri
- `components/LegalDocs.jsx` — kurumsal belgeler (gizlilik, iptal-iade, mesafeli satış, banka, ödeme bildirimi)
- `public/frames/` — tur videosunun 241 karesi
- `public/gallery/` — oda fotoğrafları (`k/` klasörü küçük önizlemeler)

Yeni fotoğraf eklemek için dosyayı `public/gallery/` (ve 640 px genişliğinde bir kopyasını `public/gallery/k/`) içine koyup `lib/content.jsx` içindeki `ROOMS` listesinde ilgili odaya ekleyin.

## Tur videosunu değiştirmek
```bash
ffmpeg -i yeni-tur.mp4 -vf "scale=1080:-2" -c:v libwebp -quality 68 public/frames/f%03d.webp
```
Kare sayısı değişirse `lib/site.js` içindeki `FRAME_COUNT` değerini güncelleyin.

## Bağlanması gerekenler
- Rezervasyon: Airbnb ilanına bağlı (`AIRBNB_URL`, `app/page.jsx`). Seçilen tarih ve misafir sayısı Airbnb'ye aktarılır.
- İletişim formu: `initContact` bir e-posta/form servisine bağlanmalı.
- Instagram ve WhatsApp bağlantıları eklenecek. İletişim bilgileri `app/page.jsx` içindeki `CONTACT` sabitinde.
