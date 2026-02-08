'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/Button';

interface WalletConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export function WalletConnector({ onConnect, onDisconnect }: WalletConnectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if already connected
    const checkConnection = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const accounts = (await window.ethereum.request({
            method: 'eth_accounts',
          })) as string[];
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = (await window.ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[];
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          onConnect?.(accounts[0]);
        }
      } else {
        alert('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    onDisconnect?.();
  };

  if (!mounted) return null;

  const shortenAddress = (addr: string) => 
    addr.slice(0, 6) + '...' + addr.slice(-4);

  return (
    <div className='flex items-center gap-2'>
      {address ? (
        <>
          <div className='glass-card px-3 py-2'>
            <span className='text-sm font-mono text-green-400'>
              {shortenAddress(address)}
            </span>
          </div>
          <Button
            variant='ghost'
            onClick={disconnectWallet}
            className='text-xs px-3 py-2'
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isLoading}
          className='text-sm px-4 py-2 font-medium'
          style={{
            background: isLoading
              ? 'rgba(16, 185, 129, 0.3)'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(16, 185, 129, 0.4))',
          }}
        >
          {isLoading ? (
            <span className='flex items-center gap-2'>
              <span className='inline-block w-3 h-3 border-2 border-green-400 border-t-transparent rounded-full animate-spin' />
              Connecting...
            </span>
          ) : (
            ' Connect Wallet'
          )}
        </Button>
      )}
    </div>
  );
}