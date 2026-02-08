"use client";

import { useState, useCallback } from "react";
import { generateBatch } from "@/lib/wallet-utils";
import type { Wallet, BatchGenerationResult } from "@/lib/types";

interface UseWalletGeneratorReturn {
  wallets: Wallet[];
  isGenerating: boolean;
  error: string | null;
  generate: (count: number) => Promise<void>;
  clear: () => void;
  count: number;
}

/**
 * Hook for managing wallet generation
 * All generation happens client-side in the browser
 */
export function useWalletGenerator(): UseWalletGeneratorReturn {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (count: number) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Add a small delay for visual feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      const result: BatchGenerationResult = generateBatch(count);

      if (result.wallets.length === 0) {
        throw new Error("Failed to generate wallets");
      }

      setWallets(result.wallets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clear = useCallback(() => {
    setWallets([]);
    setError(null);
  }, []);

  return {
    wallets,
    isGenerating,
    error,
    generate,
    clear,
    count: wallets.length,
  };
}
