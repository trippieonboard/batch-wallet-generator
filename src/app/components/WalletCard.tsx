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
  const [isHovered, setIsHovered] = useState(false);
  const { getStats, fetchStats, isLoading } = useBalanceChecker();

  useEffect(() => {
    fetchStats([wallet.address]);
  }, [wallet.address, fetchStats]);

  const stats = getStats(wallet.address);
  const displayBalance = activeChain === 'ethereum' ? stats?.ethBalance : stats?.baseBalance;
  const lastTxHash = activeChain === 'ethereum' ? stats?.lastTxEth : stats?.lastTxBase;

  const getButtonStyle = (chain: string): React.CSSProperties => {
    const isActive = (chain === 'ETH' && activeChain === 'ethereum') || 
                     (chain === 'BASE' && activeChain === 'base');
    return {
      background: isActive
        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(16, 185, 129, 0.3))'
        : 'rgba(255, 255, 255, 0.05)',
      borderColor: isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.1)',
      boxShadow: isActive ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none',
    };
  };

  return (
    <div
      className='glass-card group hover:shadow-2xl'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
      }}
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex-1'>
          <h3 className='text-sm font-semibold text-gray-100 mb-2'>Wallet #{index + 1}</h3>
          <CopyableText
            text={wallet.address}
            truncate={true}
            maxLength={10}
            className='text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors'
          />
        </div>
        <div className='flex gap-2'>
          {['ETH', 'BASE'].map((chain) => (
            <button
              key={chain}
              onClick={() => setActiveChain(chain === 'ETH' ? 'ethereum' : 'base')}
              className='glass-button text-xs font-medium px-3 py-1'
              style={getButtonStyle(chain)}
            >
              {chain}
            </button>
          ))}
        </div>
      </div>

      {/* Balance Section */}
      <div className='border-t border-white/10 pt-3 mb-4'>
        {isLoading ? (
          <div className='flex items-center gap-2'>
            <Spinner className='w-3 h-3' />
            <span className='text-xs text-gray-500'>Loading...</span>
          </div>
        ) : stats ? (
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-xs text-gray-500'>Balance</span>
              <span className='font-mono font-semibold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text'>
                {displayBalance || '0'} {activeChain === 'ethereum' ? 'ETH' : 'BASE'}
              </span>
            </div>
            {lastTxHash && (
              <div className='text-xs text-gray-600'>
                <span>Last tx: </span>
                <CopyableText
                  text={lastTxHash}
                  truncate={true}
                  maxLength={10}
                  className='font-mono text-green-400 hover:text-green-300 transition-colors'
                />
              </div>
            )}
          </div>
        ) : (
          <p className='text-xs text-gray-600'>N/A</p>
        )}
      </div>

      {/* Private Key Section */}
      <div className='border-t border-white/10 pt-3'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-xs font-semibold text-gray-300'>Private Key</span>
          <button
            onClick={() => setShowKey(!showKey)}
            className='text-xs font-medium text-green-400 hover:text-green-300 transition-colors'
          >
            {showKey ? ' Hide' : ' Show'}
          </button>
        </div>
        <div className='mt-2'>
          {showKey ? (
            <CopyableText
              text={wallet.privateKey}
              className='text-xs font-mono text-gray-200 break-all p-2 bg-red-500/5 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors'
            />
          ) : (
            <div className='text-xs font-mono text-gray-500 p-2 bg-gray-900/20 rounded-lg border border-white/5 break-all select-all'>
              {maskPrivateKey(wallet.privateKey)}
            </div>
          )}
        </div>
      </div>

      {/* Shine Effect */}
      <div
        className='absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.1), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}