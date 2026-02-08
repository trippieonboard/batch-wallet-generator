import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Batch EVM Wallet Generator',
  description: 'Generate EVM wallets and check balances on Ethereum and Base',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body className={inter.className + ' bg-zinc-950 text-zinc-200 min-h-screen antialiased selection:bg-indigo-500/30'}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: 'if (typeof window !== "undefined") { console.log("Web3 provider available:", !!window.ethereum); }',
          }}
        />
      </body>
    </html>
  );
}
