'use client';

import { useState, useEffect } from 'react';
import { useBalanceChecker } from '@/hooks/useBalanceChecker';
import { CopyableText } from './ui/CopyableText';
import { Spinner } from './ui/Spinner';
import { maskPrivateKey } from '@/lib/wallet-utils';
import type { Wallet } from '@/lib/types';

interface WalletCardProps {
  wallet: Wallet;
  index: number;
}

export function WalletCard({ wallet, index }: WalletCardProps) {
  const [showKey, setShowKey] = useState(false);
  const [activeChain, setActiveChain] = useState<'ethereum' | 'base'>('ethereum');
  const { getStats, fetchStats, isLoading } = useBalanceChecker();

  useEffect(() => {
    fetchStats([wallet.address]);
  }, [wallet.address, fetchStats]);

  const stats = getStats(wallet.address);

  const ethButtonClass = activeChain === 'ethereum'
    ? 'px-2 py-1 rounded text-xs font-medium transition-colors bg-blue-600 text-white'
    : 'px-2 py-1 rounded text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200';

  const baseButtonClass = activeChain === 'base'
    ? 'px-2 py-1 rounded text-xs font-medium transition-colors bg-blue-600 text-white'
    : 'px-2 py-1 rounded text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200';

  const displayBalance = activeChain === 'ethereum' ? stats?.ethBalance : stats?.baseBalance;
  const lastTxHash = activeChain === 'ethereum' ? stats?.lastTxEth : stats?.lastTxBase;

  return (
    <div className='group card-minimal hover:shadow-md animate-in'>
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <h3 className='text-sm font-semibold text-gray-900 mb-2'>Wallet #{index + 1}</h3>
          <CopyableText
            text={wallet.address}
            truncate={true}
            maxLength={10}
            className='text-xs font-mono text-gray-600 hover:text-gray-900'
          />
        </div>
        <div className='flex gap-1'>
          <button
            onClick={() => setActiveChain('ethereum')}
            className={ethButtonClass}
          >
            ETH
          </button>
          <button
            onClick={() => setActiveChain('base')}
            className={baseButtonClass}
          >
            BASE
          </button>
        </div>
      </div>

      {/* Balance Section */}
      <div className='border-t border-gray-200 pt-4 mb-4'>
        {isLoading ? (
          <div className='flex items-center gap-2'>
            <Spinner className='w-4 h-4' />
            <span className='text-xs text-gray-500'>Loading balance...</span>
          </div>
        ) : stats ? (
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-xs text-gray-600'>Balance</span>
              <span className='font-mono font-medium text-gray-900'>{displayBalance || '0'} {activeChain === 'ethereum' ? 'ETH' : 'BASE'}</span>
            </div>
            {lastTxHash && (
              <div className='text-xs text-gray-500'>
                <span>Last tx: </span>
                <CopyableText
                  text={lastTxHash}
                  truncate={true}
                  maxLength={12}
                  className='font-mono text-blue-600 hover:text-blue-700'
                />
              </div>
            )}
          </div>
        ) : (
          <p className='text-xs text-gray-500'>N/A</p>
        )}
      </div>

      {/* Private Key Section */}
      <div className='border-t border-gray-200 pt-4'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-gray-700'>Private Key</span>
          <button
            onClick={() => setShowKey(!showKey)}
            className='text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors'
          >
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className='mt-3'>
          {showKey ? (
            <CopyableText
              text={wallet.privateKey}
              className='text-xs font-mono text-gray-700 break-all select-all p-2 bg-gray-50 rounded border border-gray-200'
            />
          ) : (
            <div className='text-xs font-mono text-gray-600 p-2 bg-gray-50 rounded border border-gray-200 break-all select-all'>
              {maskPrivateKey(wallet.privateKey)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}