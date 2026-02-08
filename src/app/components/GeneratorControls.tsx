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

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-6 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">Generate Wallets</h2>
          <p className="text-sm text-zinc-400">All keys generated securely on your device</p>
        </div>

        {/* Quantity Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="quantity" className="text-sm font-medium text-zinc-300">
              Number of Wallets
            </label>
            <span className="text-lg font-mono text-indigo-400">{quantity}</span>
          </div>
          <input
            id="quantity"
            type="range"
            min={UI_CONFIG.minWallets}
            max={UI_CONFIG.maxWallets}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            disabled={isLoading}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
            <span>{UI_CONFIG.minWallets}</span>
            <span>{UI_CONFIG.maxWallets}</span>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={() => onGenerate(quantity)}
          loading={isLoading}
          className="w-full text-base py-3"
        >
          Generate {quantity} Wallet{quantity !== 1 ? 's' : ''}
        </Button>

        {/* Stats */}
        {walletCount > 0 && (
          <div className="pt-2 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Generated: <span className="text-indigo-400 font-mono">{walletCount}</span>
            </p>
          </div>
        )}
      </div>

      <style>{`
        input.slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #818cf8;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(129, 140, 248, 0.5);
        }

        input.slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #818cf8;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(129, 140, 248, 0.5);
          border: none;
        }
      `}</style>
    </div>
  );
}
