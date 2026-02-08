'use client';

import { useEffect } from 'react';
import { useWalletGenerator } from '@/hooks/useWalletGenerator';
import { GeneratorControls } from './components/GeneratorControls';
import { WalletCard } from './components/WalletCard';

export default function Home() {
  const { wallets, isGenerating, error, generate, count } = useWalletGenerator();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent) {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@farcaster/frame-sdk';
        script.onload = () => {
          if (typeof (window as any).farcaster !== 'undefined') {
            (window as any).farcaster.actions?.ready?.();
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.log('Running in standalone mode');
      }
    }
  }, []);

  return (
    <main className='min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pb-20'>
      <header className='border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-40'>
        <div className='max-w-6xl mx-auto px-4 py-6 sm:px-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight'>
             Batch EVM Wallet Generator
          </h1>
          <p className='text-sm text-zinc-400 mt-1'>Generate secure wallets instantly on Ethereum & Base</p>
        </div>
      </header>

      <div className='max-w-6xl mx-auto px-4 py-8 sm:px-6'>
        {error && (
          <div className='mb-6 p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-200 text-sm'>
            <span className='font-medium'>Error:</span> {error}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1'>
            <div className='sticky top-24'>
              <GeneratorControls
                onGenerate={generate}
                isLoading={isGenerating}
                walletCount={count}
              />
            </div>
          </div>

          <div className='lg:col-span-2'>
            {wallets.length === 0 && !isGenerating ? (
              <div className='h-96 flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/20'>
                <div className='text-center'>
                  <div className='text-4xl mb-4'></div>
                  <h3 className='text-lg font-semibold text-zinc-300 mb-2'>No Wallets Generated</h3>
                  <p className='text-sm text-zinc-500 max-w-sm'>Use the controls on the left to generate secure EVM wallets.</p>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {wallets.map((wallet, index) => (
                  <WalletCard key={wallet.address} wallet={wallet} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'>
        <p className='text-[10px] uppercase tracking-widest text-zinc-600 font-mono text-center'>
          by trippieonboard
        </p>
      </footer>
    </main>
  );
}
