'use client';

import { useState, useCallback } from 'react';
import { useWalletGenerator } from '@/hooks/useWalletGenerator';
import { Button } from './ui/Button';

interface GeneratorControlsProps {
  isGenerating: boolean;
}

export function GeneratorControls({ isGenerating }: GeneratorControlsProps) {
  const [count, setCount] = useState(5);
  const { generate } = useWalletGenerator();

  const handleGenerate = useCallback(async () => {
    await generate(count);
  }, [count, generate]);

  const sliderBackground = 'linear-gradient(to right, rgba(16, 185, 129, 0.5) 0%, rgba(16, 185, 129, 0.5) ' + (count / 100) * 100 + '%, rgba(255, 255, 255, 0.1) ' + (count / 100) * 100 + '%, rgba(255, 255, 255, 0.1) 100%)';

  return (
    <div className='glass-card sticky top-24 h-fit'>
      <h2 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
        <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
        Generator
      </h2>

      {/* Count Slider */}
      <div className='space-y-3 mb-6'>
        <label className='text-sm font-medium text-gray-300'>
          Wallets: <span className='text-green-400 font-bold'>{count}</span>
        </label>
        <input
          type='range'
          min='1'
          max='100'
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className='w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500'
          style={{
            background: sliderBackground,
          }}
        />
        <div className='flex justify-between text-xs text-gray-500'>
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className='w-full glass-button primary font-semibold py-2 mb-4 relative overflow-hidden group'
        style={{
          background: isGenerating
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.2))'
            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(16, 185, 129, 0.5))',
        }}
      >
        <span className='relative z-10 flex items-center justify-center gap-2'>
          {isGenerating ? (
            <>
              <span className='inline-block w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin' />
              Generating...
            </>
          ) : (
            <>
              <span></span>
              Generate Wallets
            </>
          )}
        </span>
      </Button>

      {/* Info */}
      <div className='space-y-2 text-xs text-gray-400 border-t border-white/10 pt-4'>
        <p className='flex items-start gap-2'>
          <span className='text-green-400 mt-0.5'></span>
          <span>Generate up to 100 wallets per batch</span>
        </p>
        <p className='flex items-start gap-2'>
          <span className='text-green-400 mt-0.5'></span>
          <span>Each wallet includes address &amp; private key</span>
        </p>
        <p className='flex items-start gap-2'>
          <span className='text-green-400 mt-0.5'></span>
          <span>Secure generation on your device</span>
        </p>
      </div>
    </div>
  );
}