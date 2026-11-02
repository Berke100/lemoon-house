import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Lemoon House · Sapanca Kırkpınar havuzlu bungalov',
  description: 'Sapanca Kırkpınar’da özel ısıtmalı havuzlu ve jakuzili Lemoon House’u kaydırarak keşfedin.',
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/apple-icon.png' },
  openGraph: {
    title: 'Lemoon House · Sapanca',
    description: 'Özel ısıtmalı havuz, jakuzi ve şömine. Kırkpınar’da, göle iki dakika.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Lemoon House, Sapanca' }],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
  alternates: { canonical: '/' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#07123a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preload" as="image" href="/frames/f001.webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
