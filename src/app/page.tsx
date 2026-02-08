'use client';

import { useWalletGenerator } from '@/hooks/useWalletGenerator';
import { GeneratorControls } from './components/GeneratorControls';
import { WalletCard } from './components/WalletCard';
import { WalletConnector } from './components/WalletConnector';

export default function Home() {
  const { wallets, isGenerating, error, generate, count } = useWalletGenerator();

  return (
    <main className='min-h-screen bg-white'>
      {/* Header */}
      <header className='border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40'>
        <div className='max-w-7xl mx-auto px-8 py-6 flex items-center justify-between'>
          <div className='animate-in'>
            <h1 className='text-4xl font-light tracking-tight text-gray-900'>
              Batch EVM Wallet Generator
            </h1>
            <p className='text-sm text-gray-500 mt-2'>Generate and manage secure wallets on Ethereum & Base</p>
          </div>
          <div className='animate-slide-in'>
            <WalletConnector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-8 py-12'>
        {/* Error Message */}
        {error && (
          <div className='mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-in'>
            <span className='font-medium'>Error:</span> {error}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
          {/* Control Panel */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 animate-scale-in'>
              <GeneratorControls
                onGenerate={generate}
                isLoading={isGenerating}
                walletCount={count}
              />
            </div>
          </div>

          {/* Wallets Grid */}
          <div className='lg:col-span-4'>
            {wallets.length === 0 && !isGenerating ? (
              <div className='h-96 flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/50 animate-in'>
                <div className='text-center'>
                  <div className='text-6xl mb-6 opacity-20'></div>
                  <h3 className='text-xl font-light text-gray-700 mb-2'>No Wallets Generated Yet</h3>
                  <p className='text-sm text-gray-500'>Use the controls on the left to generate secure EVM wallets</p>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-scale-in'>
                {wallets.map((wallet, index) => {
                  const delay = index * 50;
                  return (
                    <div key={wallet.address} className='animate-in' style={{ animationDelay: delay + 'ms' }}>
                      <WalletCard wallet={wallet} index={index} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='border-t border-gray-200 bg-gray-50/50 mt-20'>
        <div className='max-w-7xl mx-auto px-8 py-8 text-center text-xs text-gray-400'>
          <p className='tracking-widest'>by trippieonboard</p>
        </div>
      </footer>
    </main>
  );
}