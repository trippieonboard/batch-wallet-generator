"use client";

import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import type { Wallet, BatchGenerationResult } from "./types";

/**
 * Generate a single wallet with private key and address
 * This function is cryptographically secure and uses browser's crypto.getRandomValues()
 */
export function generateSingleWallet(): Wallet {
  try {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);

    return {
      address: account.address,
      privateKey: privateKey,
      publicKey: account.publicKey,
    };
  } catch (error) {
    console.error("Error generating single wallet:", error);
    throw new Error("Failed to generate wallet");
  }
}

/**
 * Generate a batch of EVM wallets with independent private keys
 * All generation happens client-side (in the browser) for maximum security
 *
 * @param count - Number of wallets to generate (1-50)
 * @returns Array of generated wallets with addresses and private keys
 */
export function generateBatch(count: number): BatchGenerationResult {
  const validCount = Math.max(1, Math.min(count, 50));

  const wallets: Wallet[] = [];

  for (let i = 0; i < validCount; i++) {
    try {
      const wallet = generateSingleWallet();
      wallets.push(wallet);
    } catch (error) {
      console.error(`Error generating wallet #${i + 1}:`, error);
    }
  }

  return {
    wallets,
    count: wallets.length,
    timestamp: Date.now(),
  };
}

/**
 * Mask a private key for display (show first 4 + last 4 chars)
 */
export function maskPrivateKey(key: string): string {
  if (key.length <= 8) return "••••••••";
  return key.substring(0, 4) + "•".repeat(key.length - 8) + key.substring(key.length - 4);
}

/**
 * Truncate address for display (show first 6 + last 4 chars)
 */
export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
}

/**
 * Check if a value is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
