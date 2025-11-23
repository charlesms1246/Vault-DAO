// Core DAO Configuration
export interface DAOConfig {
  id: string;
  name: string;
  description: string;
  logo: string;
  token: `0x${string}`;
  tokenSymbol?: string;
  tokenDecimals?: number;
  governor?: `0x${string}`;
  treasury: `0x${string}`[];
  snapshot?: string;
  safe?: `0x${string}`;
  chain: number;
  tags: string[];
  website?: string;
  twitter?: string;
  discord?: string;
}

// Treasury Data
export interface TreasuryAsset {
  symbol: string;
  name: string;
  address: `0x${string}`;
  balance: string;
  balanceFormatted: string;
  decimals: number;
  price: number;
  value: number;
  percentage: number;
  logo?: string;
  change24h?: number;
}

export interface TreasuryData {
  totalValue: number;
  assets: TreasuryAsset[];
  change24h: number;
  change7d: number;
  lastUpdated: number;
}

// Governance
export interface Proposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: 'active' | 'closed' | 'pending';
  author: string;
  space: string;
  scores: number[];
  scores_total: number;
  quorum: number;
  votes: number;
  link: string;
}

export interface Vote {
  id: string;
  voter: string;
  choice: number | number[];
  vp: number;
  created: number;
  proposal: Proposal;
}

// Token Holders
export interface TokenHolder {
  address: string;
  balance: string;
  balanceFormatted: string;
  percentage: number;
  value: number;
  ens?: string;
}

export interface HolderDistribution {
  holders: TokenHolder[];
  totalHolders: number;
  giniCoefficient: number;
  top10Percentage: number;
  top50Percentage: number;
}

// Gnosis Safe
export interface SafeTransaction {
  safe: string;
  to: string;
  value: string;
  data: string;
  operation: number;
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: number;
  executionDate: string | null;
  submissionDate: string;
  modified: string;
  blockNumber: number | null;
  transactionHash: string | null;
  safeTxHash: string;
  executor: string | null;
  isExecuted: boolean;
  isSuccessful: boolean | null;
  ethGasPrice: string | null;
  gasUsed: number | null;
  fee: string | null;
  origin: string | null;
  dataDecoded: any | null;
  confirmationsRequired: number;
  confirmations: SafeConfirmation[];
  signatures: string | null;
}

export interface SafeConfirmation {
  owner: string;
  submissionDate: string;
  transactionHash: string | null;
  signature: string;
  signatureType: string;
}

// Activity Feed
export interface ActivityItem {
  id: string;
  type: 'transaction' | 'vote' | 'proposal' | 'delegation';
  timestamp: number;
  title: string;
  description: string;
  actor: string;
  link?: string;
  value?: string;
  status?: 'pending' | 'success' | 'failed';
}

// Chart Data
export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label: string;
}

// User Preferences
export interface UserPreferences {
  favoriteDAOs: string[];
  defaultChain: number;
  currency: 'USD' | 'ETH';
  notifications: boolean;
}

// API Response Types
export interface CoinGeckoPriceResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

export interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  isError: string;
}

export interface SnapshotProposalsResponse {
  proposals: Proposal[];
}

export interface SnapshotVotesResponse {
  votes: Vote[];
}