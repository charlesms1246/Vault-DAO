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
    id: 'nouns',
    name: 'Nouns DAO',
    description: 'A community-owned brand that makes a positive impact by funding ideas and fostering creativity.',
    logo: '/logos/nouns.svg',
    token: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    tokenSymbol: 'NOUNS',
    tokenDecimals: 0,
    governor: '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
    treasury: ['0x0BC3807Ec262cB779b38D65b38158acC3bfedE10'],
    snapshot: 'nouns.eth',
    chain: CHAINS.MAINNET,
    tags: ['NFT', 'CC0', 'Governance'],
    website: 'https://nouns.wtf',
    twitter: 'nounsdao',
  },
  {
    id: 'uniswap',
    name: 'Uniswap DAO',
    description: 'Decentralized trading protocol, guaranteed liquidity for millions of users and hundreds of Ethereum applications.',
    logo: '/logos/uniswap.svg',
    token: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    tokenSymbol: 'UNI',
    tokenDecimals: 18,
    governor: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
    treasury: ['0x1a9C8182C09F50C8318d769245beA52c32BE35BC'],
    snapshot: 'uniswap',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'DEX', 'Governance'],
    website: 'https://uniswap.org',
    twitter: 'Uniswap',
  },
  {
    id: 'ens',
    name: 'ENS DAO',
    description: 'Ethereum Name Service - Decentralized naming for wallets, websites, & more.',
    logo: '/logos/ens.svg',
    token: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    tokenSymbol: 'ENS',
    tokenDecimals: 18,
    governor: '0x323A76393544d5ecca80cd6ef2A560C6a395b7E3',
    treasury: ['0xFe89cc7aBB2C4183683ab71653C4cdc9B02D44b7'],
    snapshot: 'ens.eth',
    chain: CHAINS.MAINNET,
    tags: ['Infrastructure', 'Naming', 'Governance'],
    website: 'https://ens.domains',
    twitter: 'ensdomains',
  },
  {
    id: 'compound',
    name: 'Compound Finance',
    description: 'An algorithmic, autonomous interest rate protocol built for developers.',
    logo: '/logos/compound.svg',
    token: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    tokenSymbol: 'COMP',
    tokenDecimals: 18,
    governor: '0xc0Da02939E1441F497fd74F78cE7Decb17B66529',
    treasury: ['0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B'],
    snapshot: 'comp-vote.eth',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'Lending', 'Governance'],
    website: 'https://compound.finance',
    twitter: 'compoundfinance',
  },
  {
    id: 'maker',
    name: 'MakerDAO',
    description: 'Decentralized credit platform on Ethereum that supports Dai, a stablecoin whose value is pegged to USD.',
    logo: '/logos/maker.svg',
    token: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    tokenSymbol: 'MKR',
    tokenDecimals: 18,
    treasury: ['0x9e1585d9CA64243CE43D42f7dD7333190F66Ca09'],
    snapshot: 'vote.makerdao.com',
    chain: CHAINS.MAINNET,
    tags: ['DeFi', 'Stablecoin', 'Governance'],
    website: 'https://makerdao.com',
    twitter: 'MakerDAO',
  },
];