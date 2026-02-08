// RPC Endpoints (Public, Free)
export const RPC_ENDPOINTS = {
  ethereum: "https://cloudflare-eth.com",
  base: "https://mainnet.base.org",
};

// Blockscout API Endpoints (for transaction history)
export const BLOCKSCOUT_ENDPOINTS = {
  ethereum: "https://eth.blockscout.com/api",
  base: "https://base.blockscout.com/api",
};

// Chain IDs
export const CHAIN_IDS = {
  ethereum: 1,
  base: 8453,
};

// UI Configuration
export const UI_CONFIG = {
  minWallets: 1,
  maxWallets: 50,
  defaultWallets: 5,
  rateLimit: 100, // ms between requests to avoid spam
} as const;
