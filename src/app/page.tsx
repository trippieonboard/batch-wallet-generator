'use client';

import { useWalletGenerator } from '@/hooks/useWalletGenerator';
import { useDeviceType } from '@/hooks/useDeviceType';
import { GeneratorControls } from './components/GeneratorControls';
import { WalletCard } from './components/WalletCard';
import { WalletConnector } from './components/WalletConnector';

export default function Home() {
  const { wallets, isGenerating, error, generate, count } = useWalletGenerator();
  const { deviceType, isMounted } = useDeviceType();

  // Mobile view (BaseApp optimized)
  if (!isMounted || deviceType === 'mobile') {
    return (
      <main className='min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pb-20'>
        <header className='border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-40'>
          <div className='max-w-6xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between'>
            <div>
              <h1 className='text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight'>
                Wallet Generator
              </h1>
              <p className='text-xs text-zinc-400 mt-1'>Generate secure wallets on Ethereum & Base</p>
            </div>
            <div className='ml-2'>
              <WalletConnector />
            </div>
          </div>
        </header>

        <div className='max-w-6xl mx-auto px-4 py-6 sm:px-6'>
          {error && (
            <div className='mb-4 p-3 bg-red-950/50 border border-red-900 rounded-lg text-red-200 text-xs'>
              <span className='font-medium'>Error:</span> {error}
            </div>
          )}

          <div className='mb-6'>
            <GeneratorControls
              onGenerate={generate}
              isLoading={isGenerating}
              walletCount={count}
            />
          </div>

          {wallets.length === 0 && !isGenerating ? (
            <div className='h-64 flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/20'>
              <div className='text-center'>
                <div className='text-3xl mb-3'></div>
                <h3 className='text-base font-semibold text-zinc-300 mb-1'>No Wallets Generated</h3>
                <p className='text-xs text-zinc-500 max-w-sm'>Use the controls above to generate secure EVM wallets.</p>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-3'>
              {wallets.map((wallet, index) => (
                <WalletCard key={wallet.address} wallet={wallet} index={index} />
              ))}
            </div>
          )}
        </div>

        <footer className='fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50'>
          <p className='text-[8px] uppercase tracking-widest text-zinc-700 font-mono text-center'>
            by trippieonboard
          </p>
        </footer>
      </main>
    );
  }

  // Desktop view (PC optimized)
  return (
    <main className='min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pb-20'>
      <header className='border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-6 py-6 flex items-center justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-zinc-100 tracking-tight'>
              Batch EVM Wallet Generator
            </h1>
            <p className='text-sm text-zinc-400 mt-2'>Generate and manage secure wallets on Ethereum & Base</p>
          </div>
          <div>
            <WalletConnector />
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {error && (
          <div className='mb-6 p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-200 text-sm'>
            <span className='font-medium'>Error:</span> {error}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <div className='sticky top-24'>
              <GeneratorControls
                onGenerate={generate}
                isLoading={isGenerating}
                walletCount={count}
              />
            </div>
          </div>

          <div className='lg:col-span-3'>
            {wallets.length === 0 && !isGenerating ? (
              <div className='h-96 flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/20'>
                <div className='text-center'>
                  <div className='text-5xl mb-4'></div>
                  <h3 className='text-lg font-semibold text-zinc-300 mb-2'>No Wallets Generated</h3>
                  <p className='text-sm text-zinc-500 max-w-sm'>Use the controls on the left to generate secure EVM wallets in batch.</p>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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