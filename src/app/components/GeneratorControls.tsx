'use client';

import { useState } from 'react';
import { UI_CONFIG } from '@/lib/constants';
import { Button } from './ui/Button';

interface GeneratorControlsProps {
  onGenerate: (count: number) => void;
  isLoading: boolean;
  walletCount: number;
}

export function GeneratorControls({ onGenerate, isLoading, walletCount }: GeneratorControlsProps) {
  const [quantity, setQuantity] = useState<number>(UI_CONFIG.defaultWallets);

  const buttonText = isLoading ? 'Generating' + ' ' + quantity + ' Wallets...' : 'Generate ' + quantity + ' Wallet' + (quantity !== 1 ? 's' : '');

  return (
    <div className='card-minimal'>
      <div className='space-y-6'>
        {/* Title */}
        <div>
          <h2 className='text-lg font-semibold text-gray-900'>Generate Wallets</h2>
          <p className='text-sm text-gray-500 mt-1'>All keys generated securely on your device</p>
        </div>

        {/* Quantity Slider */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <label htmlFor='quantity' className='text-sm font-medium text-gray-700'>
              Number of Wallets
            </label>
            <span className='text-lg font-semibold text-gray-900'>{quantity}</span>
          </div>
          <input
            id='quantity'
            type='range'
            min={UI_CONFIG.minWallets}
            max={UI_CONFIG.maxWallets}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500'
          />
          <div className='flex justify-between text-xs text-gray-500 mt-2'>
            <span>{UI_CONFIG.minWallets}</span>
            <span>{UI_CONFIG.maxWallets}</span>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={() => onGenerate(quantity)}
          loading={isLoading}
          className='w-full'
        >
          {buttonText}
        </Button>

        {/* Info */}
        <div className='pt-4 border-t border-gray-200'>
          <p className='text-xs text-gray-500 leading-relaxed'>
            <span className='font-medium text-gray-700'> Security:</span> Private keys are generated only on your device and never transmitted to any server.
          </p>
        </div>
      </div>
    </div>
  );
}