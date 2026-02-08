"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWalletStats } from "@/lib/rpc-client";
import type { WalletStats } from "@/lib/types";

interface UseBalanceCheckerReturn {
  stats: Map<string, WalletStats>;
  isLoading: boolean;
  fetchStats: (addresses: string[]) => Promise<void>;
  getStats: (address: string) => WalletStats | undefined;
}

/**
 * Hook for fetching and caching wallet statistics
 * Caches results for 30 seconds to avoid redundant API calls
 */
export function useBalanceChecker(): UseBalanceCheckerReturn {
  const [stats, setStats] = useState<Map<string, WalletStats>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = new Map<string, { data: WalletStats; timestamp: number }>();

  const fetchStats = useCallback(async (addresses: string[]) => {
    setIsLoading(true);

    const addressesToFetch = addresses.filter((addr) => {
      const cached = cacheRef.get(addr);
      if (!cached) return true;
      // Use cache if less than 30 seconds old
      return Date.now() - cached.timestamp > 30000;
    });

    if (addressesToFetch.length === 0) {
      // Use cached data
      const cachedStats = new Map<string, WalletStats>();
      addresses.forEach((addr) => {
        const cached = cacheRef.get(addr);
        if (cached) cachedStats.set(addr, cached.data);
      });
      setStats(cachedStats);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch fresh data for missing addresses
      for (const address of addressesToFetch) {
        const data = await fetchWalletStats(address);
        cacheRef.set(address, { data, timestamp: Date.now() });
      }

      // Combine cached and fresh data
      const allStats = new Map<string, WalletStats>();
      addresses.forEach((addr) => {
        const cached = cacheRef.get(addr);
        if (cached) allStats.set(addr, cached.data);
      });

      setStats(allStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStats = useCallback(
    (address: string): WalletStats | undefined => {
      return stats.get(address);
    },
    [stats]
  );

  return {
    stats,
    isLoading,
    fetchStats,
    getStats,
  };
}
