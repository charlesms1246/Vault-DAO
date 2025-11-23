import { DAOConfig } from '@/types';

// Chain configurations
export const CHAINS = {
  MAINNET: 1,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  BASE: 8453,
  POLYGON: 137,
} as const;

export const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum',
  42161: 'Arbitrum',
  10: 'Optimism',
  8453: 'Base',
  137: 'Polygon',
};

// Common token addresses on Mainnet
export const TOKEN_ADDRESSES = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  SNAPSHOT: 'https://hub.snapshot.org/graphql',
  COINGECKO: 'https://api.coingecko.com/api/v3',
  ETHERSCAN: 'https://api.etherscan.io/api',
  SAFE: 'https://safe-transaction-mainnet.safe.global/api/v1',
} as const;

// Refresh intervals (ms)
export const REFRESH_INTERVALS = {
  TREASURY: 60000, // 1 minute
  PROPOSALS: 30000, // 30 seconds
  PRICES: 60000, // 1 minute
  HOLDERS: 300000, // 5 minutes
} as const;

// Format options
export const CURRENCY_FORMAT = {
  USD: {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ETH: {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  },
} as const;

// Featured DAOs
export const FEATURED_DAOS: DAOConfig[] = [
  {
    id: 'lido',
    name: 'Lido DAO',
    description: 'Liquid staking solution for Ethereum. Stake ETH and receive stETH while maintaining liquidity and participating in DeFi.',
    logo: '/logos/lido.svg',
    token: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
    tokenSymbol: 'LDO',
    tokenDecimals: 18,
    governor: '0x2e59A20f205bB85a89C53f1936454680651E618e',
    treasury: ['0x3e40D73EB977Dc6a537aF587D48316feE66E9C8c'],
    snapshot: 'lido-snapshot.eth',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'Liquid Staking', 'Ethereum'],
    website: 'https://lido.fi',
    twitter: 'lidofinance',
    discord: 'https://discord.gg/lido',
  },
  {
    id: 'apecoin',
    name: 'ApeCoin DAO',
    description: 'Community token for the APE ecosystem, powering culture, gaming, and entertainment in Web3.',
    logo: '/logos/apecoin.svg',
    token: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
    tokenSymbol: 'APE',
    tokenDecimals: 18,
    governor: '0x9e6D8B9F3A85a5D5C2B43e6E5DB7b3e4c0bF3fDd',
    treasury: ['0x2e59A20f205bB85a89C53f1936454680651E618e'],
    snapshot: 'apecoin.eth',
    chain: CHAINS.MAINNET,
    tags: ['NFT', 'Gaming', 'Metaverse'],
    website: 'https://apecoin.com',
    twitter: 'apecoin',
    discord: 'https://discord.gg/apecoin',
  },
  {
    id: 'gitcoin',
    name: 'Gitcoin DAO',
    description: 'Building and funding digital public goods through quadratic funding, grants, and community-driven development.',
    logo: '/logos/gitcoin.svg',
    token: '0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F',
    tokenSymbol: 'GTC',
    tokenDecimals: 18,
    governor: '0xDbD27635A534A3d3169Ef0498beB56Fb9c937489',
    treasury: ['0x57a8865cfB1eCEf7253c27da6B4BC3dAEE5Be518'],
    snapshot: 'gitcoindao.eth',
    chain: CHAINS.MAINNET,
    tags: ['Public Goods', 'Impact', 'Grants'],
    website: 'https://gitcoin.co',
    twitter: 'gitcoin',
    discord: 'https://discord.gg/gitcoin',
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum DAO',
    description: 'Layer 2 scaling solution for Ethereum using Optimistic Rollup technology, governed by ARB token holders.',
    logo: '/logos/arbitrum.svg',
    token: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    tokenSymbol: 'ARB',
    tokenDecimals: 18,
    governor: '0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9',
    treasury: ['0xF3FC178157fb3c87548bAA86F9d24BA38E649B58'],
    snapshot: 'arbitrumfoundation.eth',
    chain: CHAINS.ARBITRUM,
    tags: ['Layer 2', 'Scaling', 'Infrastructure'],
    website: 'https://arbitrum.foundation',
    twitter: 'arbitrum',
    discord: 'https://discord.gg/arbitrum',
  },
  {
    id: 'optimism',
    name: 'Optimism Collective',
    description: 'Ethereum Layer 2 with Optimistic Rollup technology, building a sustainable and equitable future through retroactive public goods funding.',
    logo: '/logos/optimism.svg',
    token: '0x4200000000000000000000000000000000000042',
    tokenSymbol: 'OP',
    tokenDecimals: 18,
    governor: '0xcDF27F107725988f2261Ce2256bDfCdE8B382B10',
    treasury: ['0x2501c477D0A35545a387Aa4A3EEe4292A9a8B3F0'],
    snapshot: 'opcollective.eth',
    chain: CHAINS.OPTIMISM,
    tags: ['Layer 2', 'Ethereum', 'Public Goods'],
    website: 'https://optimism.io',
    twitter: 'optimism',
    discord: 'https://discord.gg/optimism',
  },
  {
    id: 'aave',
    name: 'Aave DAO',
    description: 'Decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers.',
    logo: '/logos/aave.svg',
    token: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    tokenSymbol: 'AAVE',
    tokenDecimals: 18,
    governor: '0xEC568fffba86c094cf06b22134B23074DFE2252c',
    treasury: ['0x25F2226B597E8F9514B3F68F00f494cF4f286491'],
    snapshot: 'aave.eth',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'Lending', 'Money Markets'],
    website: 'https://aave.com',
    twitter: 'aave',
    discord: 'https://discord.gg/aave',
  },
  {
    id: 'curve',
    name: 'Curve DAO',
    description: 'Decentralized exchange optimized for stablecoin trading with low slippage and minimal fees.',
    logo: '/logos/curve.svg',
    token: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    tokenSymbol: 'CRV',
    tokenDecimals: 18,
    governor: '0x40907540d8a6C65c637785e8f8B742ae6b0b9968',
    treasury: ['0xeCb456EA5365865EbAb8a2661B0c503410e9B347'],
    snapshot: 'curve.eth',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'DEX', 'Stablecoins'],
    website: 'https://curve.fi',
    twitter: 'curvefinance',
    discord: 'https://discord.gg/rgrfS7W',
  },
];