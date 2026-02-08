import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Batch Wallet Generator | Premium EVM Wallets',
  description: 'Generate premium EVM wallets for Ethereum and Base networks with advanced security features.',
  keywords: ['wallet', 'generator', 'ethereum', 'base', 'batch', 'evm'],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://batch-wallet-generator.netlify.app',
    title: 'Batch Wallet Generator',
    description: 'Generate premium EVM wallets with glass morphism design',
    images: [
      {
        url: 'https://batch-wallet-generator.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <meta name='theme-color' content='#10b981' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
      </head>
      <body>
        <div className='relative z-10 min-h-screen'>
          {children}
        </div>
      </body>
    </html>
  );
}