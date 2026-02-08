'use client';

import { useWalletGenerator } from '@/hooks/useWalletGenerator';
import { GeneratorControls } from './components/GeneratorControls';
import { WalletCard } from './components/WalletCard';
import { WalletConnector } from './components/WalletConnector';
import { useState, useEffect } from 'react';

export default function Home() {
  const { wallets, isGenerating } = useWalletGenerator();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className='relative w-full min-h-screen'>
      {/* Header */}
      <header className='glass-card m-6 sticky top-6 z-50 mb-8'>
        <div className='flex items-center justify-between'>
          <div data-animated>
            <h1 style={{ animationDelay: '100ms' }} className='text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'>
              Batch Wallet Generator
            </h1>
            <p style={{ animationDelay: '200ms' }} className='text-sm text-gray-400 mt-1'>
              Premium EVM Wallet Generation with Glass Morphism
            </p>
          </div>
          <div style={{ animationDelay: '300ms' }} data-animated>
            <WalletConnector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className='px-6 pb-12'>
        <div className='grid grid-cols-5 gap-6'>
          {/* Controls */}
          <div style={{ animationDelay: '400ms' }} data-animated className='col-span-1'>
            <GeneratorControls isGenerating={isGenerating} />
          </div>

          {/* Wallets Grid */}
          <div className='col-span-4'>
            {wallets.length > 0 ? (
              <div className='grid grid-cols-3 gap-4 auto-rows-max'>
                {wallets.map((wallet, idx) => (
                  <div
                    key={idx}
                    style={{ animationDelay: 400 + idx * 50 + 'ms' }}
                    data-animated
                  >
                    <WalletCard wallet={wallet} index={idx} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{ animationDelay: '500ms' }}
                data-animated
                className='glass-card h-64 flex flex-col items-center justify-center text-center'
              >
                <div className='text-6xl mb-4 opacity-50'></div>
                <h2 className='text-xl font-semibold text-gray-200 mb-2'>No Wallets Yet</h2>
                <p className='text-gray-400 text-sm'>Generate wallets using the controls panel</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}