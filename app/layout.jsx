import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/hanken-grotesk/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

export const metadata = {
  title: 'Lemoon House · Sapanca Kırkpınar havuzlu bungalov',
  description: 'Sapanca Kırkpınar’da özel ısıtmalı havuzlu ve jakuzili Lemoon House’u kaydırarak keşfedin.',
  icons: { icon: 'icon.svg' },
  openGraph: {
    title: 'Lemoon House · Sapanca',
    description: 'Özel ısıtmalı havuz, jakuzi ve şömine. Kırkpınar’da, göle iki dakika.',
    images: ['gallery/havuz.webp'],
    locale: 'tr_TR',
    type: 'website',
  },
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
        <link rel="preload" as="image" href="frames/f001.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
