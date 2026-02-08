'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export function WalletConnector() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            setConnected(true);
            setAccount(accounts[0]);
          }
        } catch (err) {
          console.log('No connected account');
        }
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('Please install a Web3 wallet (MetaMask, Coinbase Wallet, etc.)');
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        setConnected(true);
        setAccount(accounts[0]);
      }
    } catch (err: any) {
      console.error('Failed to connect wallet:', err);
      if (err.code !== 4001) {
        // 4001 = user rejected request
        alert('Failed to connect wallet. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setAccount(null);
  };

  return (
    <div className="flex items-center gap-3">
      {connected && account ? (
        <>
          <div className="hidden sm:block">
            <p className="text-xs text-zinc-400">Connected</p>
            <p className="text-sm font-mono text-zinc-100 truncate">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={disconnectWallet}
            className="text-xs px-2 py-1"
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Button
          onClick={connectWallet}
          loading={isLoading}
          className="text-sm"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
}
