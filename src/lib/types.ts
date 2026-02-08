export interface Wallet {
  address: string;
  privateKey: string;
  publicKey?: string;
}

export interface WalletStats {
  address: string;
  ethBalance: string;
  baseBalance: string;
  lastTxEth: string | null;
  lastTxBase: string | null;
  loading?: boolean;
  error?: string;
}

export interface BatchGenerationResult {
  wallets: Wallet[];
  count: number;
  timestamp: number;
}
