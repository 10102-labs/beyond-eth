import type { Metadata } from 'next';
import './globals.css';

const description =
  'A growing collection of permanent ENS sites, built to outlast their authors. Curated by 10102. Self-sovereign Computing on Ethereum.';

export const metadata: Metadata = {
  metadataBase: new URL('https://beyond.eth.limo'),
  title: 'Beyond by 10102',
  description,
  icons: { icon: '/img/favicon.png' },
  openGraph: {
    title: 'Beyond by 10102',
    description,
    url: 'https://beyond.eth.limo',
    siteName: 'Beyond',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Beyond by 10102', description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
