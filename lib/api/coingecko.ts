import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/constants';

interface TokenPrice {
  usd: number;
  usd_24h_change: number;
}

const COINGECKO_TOKEN_IDS: Record<string, string> = {
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'weth',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'usd-coin',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'tether',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'dai',
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 'wrapped-bitcoin',
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': 'uniswap',
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'maker',
  '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72': 'ethereum-name-service',
  '0xc00e94Cb662C3520282E6f5717214004A7f26888': 'compound-governance-token',
};

export async function fetchTokenPrices(
  addresses: string[]
): Promise<Record<string, TokenPrice>> {
  try {
    const ids = addresses
      .map((addr) => COINGECKO_TOKEN_IDS[addr.toLowerCase()])
      .filter(Boolean)
      .join(',');

    if (!ids) return {};

    const response = await axios.get(
      `${API_ENDPOINTS.COINGECKO}/simple/price`,
      {
        params: {
          ids,
          vs_currencies: 'usd',
          include_24hr_change: true,
        },
      }
    );

    const result: Record<string, TokenPrice> = {};
    
    addresses.forEach((addr) => {
      const id = COINGECKO_TOKEN_IDS[addr.toLowerCase()];
      if (id && response.data[id]) {
        result[addr.toLowerCase()] = {
          usd: response.data[id].usd,
          usd_24h_change: response.data[id].usd_24h_change || 0,
        };
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
}

export async function fetchEthPrice(): Promise<number> {
  try {
    const response = await axios.get(
      `${API_ENDPOINTS.COINGECKO}/simple/price`,
      {
        params: {
          ids: 'ethereum',
          vs_currencies: 'usd',
        },
      }
    );
    return response.data.ethereum?.usd || 0;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return 0;
  }
}