"use client";

import { useState, useEffect } from "react";
import { useBalanceChecker } from "@/hooks/useBalanceChecker";
import { CopyableText } from "./ui/CopyableText";
import { Toggle } from "./ui/Toggle";
import { Spinner } from "./ui/Spinner";
import { truncateAddress, maskPrivateKey } from "@/lib/wallet-utils";
import type { Wallet } from "@/lib/types";

interface WalletCardProps {
  wallet: Wallet;
  index: number;
}

export function WalletCard({ wallet, index }: WalletCardProps) {
  const [showKey, setShowKey] = useState(false);
  const [activeChain, setActiveChain] = useState<"ethereum" | "base">("ethereum");
  const { getStats, fetchStats, isLoading } = useBalanceChecker();

  useEffect(() => {
    // Fetch stats when component mounts
    fetchStats([wallet.address]);
  }, [wallet.address, fetchStats]);

  const stats = getStats(wallet.address);

  const balance = activeChain === "ethereum" ? stats?.ethBalance : stats?.baseBalance;
  const lastTx = activeChain === "ethereum" ? stats?.lastTxEth : stats?.lastTxBase;
  const chainName = activeChain === "ethereum" ? "Ethereum" : "Base";

  const hasTransactions =
    balance && parseFloat(balance) > 0 ? (
      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
    ) : null;

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 backdrop-blur-sm hover:bg-zinc-900/60 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-600">#{index + 1}</span>
          {hasTransactions}
        </div>
        <span className="text-xs text-zinc-500">{chainName}</span>
      </div>

      {/* Address */}
      <div className="mb-3">
        <p className="text-xs text-zinc-500 mb-1">Address</p>
        <CopyableText text={wallet.address} truncate maxLength={12} className="w-full" />
      </div>

      {/* Private Key (Masked by default) */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-zinc-500">Private Key</p>
          <button
            onClick={() => setShowKey(!showKey)}
            className="text-xs px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors text-indigo-400"
          >
            {showKey ? "Hide" : "Show"}
          </button>
        </div>
        <CopyableText
          text={wallet.privateKey}
          truncate={!showKey}
          maxLength={12}
          className="w-full"
        />
      </div>

      {/* Stats */}
      <div className="mb-3 p-3 bg-zinc-800/30 rounded border border-zinc-700">
        {isLoading && !stats ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-zinc-400">Fetching data...</span>
          </div>
        ) : stats ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Balance:</span>
              <span className="text-sm font-mono text-indigo-400">
                {balance === "Error" ? "N/A" : `${balance} ETH`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Last Tx:</span>
              <span className="text-xs font-mono text-zinc-300">
                {lastTx === "Error" ? "N/A" : lastTx || "No txs"}
              </span>
            </div>
          </>
        ) : (
          <span className="text-xs text-zinc-400">Unable to load data</span>
        )}
      </div>

      {/* Chain Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveChain("ethereum")}
          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
            activeChain === "ethereum"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          ETH
        </button>
        <button
          onClick={() => setActiveChain("base")}
          className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
            activeChain === "base"
              ? "bg-indigo-600 text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          Base
        </button>
      </div>
    </div>
  );
}
