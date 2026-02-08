import { createPublicClient, http, formatEther } from "viem";
import { mainnet, base } from "viem/chains";
import { RPC_ENDPOINTS, BLOCKSCOUT_ENDPOINTS } from "./constants";
import type { WalletStats } from "./types";

// Create RPC clients for both chains
const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC_ENDPOINTS.ethereum),
});

const baseClient = createPublicClient({
  chain: base,
  transport: http(RPC_ENDPOINTS.base),
});

/**
 * Fetch balance from a specific RPC client
 */
async function getBalance(address: string, client: any): Promise<string> {
  try {
    const balance = await client.getBalance({ address: address as `0x${string}` });
    return formatEther(balance);
  } catch (error) {
    console.warn("Error fetching balance:", error);
    return "0";
  }
}

/**
 * Fetch last transaction date from Blockscout API
 */
async function fetchLastTransactionDate(address: string, apiEndpoint: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${apiEndpoint}?module=account&action=txlist&address=${address}&page=1&offset=1&sort=desc`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        console.warn("Blockscout rate limited (429)");
        return "Rate limited";
      }
      return null;
    }

    const data = await response.json();

    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      const timestamp = parseInt(data.result[0].timeStamp, 10);
      const date = new Date(timestamp * 1000);
      return formatRelativeTime(date);
    }

    return null; // No transactions found
  } catch (error) {
    console.warn("Error fetching last transaction:", error);
    return "Error";
  }
}

/**
 * Format date as relative time (e.g., "2 days ago")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;

  return date.toLocaleDateString();
}

/**
 * Fetch all wallet stats (balance + last transaction date)
 * Uses Promise.all for parallel requests to maximize performance
 */
export async function fetchWalletStats(address: string): Promise<WalletStats> {
  try {
    const [ethBalance, baseBalance, lastTxEth, lastTxBase] = await Promise.all([
      getBalance(address, ethClient),
      getBalance(address, baseClient),
      fetchLastTransactionDate(address, BLOCKSCOUT_ENDPOINTS.ethereum),
      fetchLastTransactionDate(address, BLOCKSCOUT_ENDPOINTS.base),
    ]);

    return {
      address,
      ethBalance,
      baseBalance,
      lastTxEth,
      lastTxBase,
      loading: false,
    };
  } catch (error) {
    console.error("Error fetching wallet stats:", error);
    return {
      address,
      ethBalance: "Error",
      baseBalance: "Error",
      lastTxEth: null,
      lastTxBase: null,
      loading: false,
      error: "Failed to fetch data",
    };
  }
}

/**
 * Batch fetch stats for multiple wallets with rate limiting
 */
export async function fetchBatchWalletStats(
  addresses: string[],
  delayMs: number = 100
): Promise<WalletStats[]> {
  const results: WalletStats[] = [];

  for (const address of addresses) {
    const stats = await fetchWalletStats(address);
    results.push(stats);

    // Add delay to avoid overwhelming the API
    if (addresses.indexOf(address) < addresses.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
