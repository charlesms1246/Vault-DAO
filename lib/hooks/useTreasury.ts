'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TreasuryData, TreasuryAsset } from '@/types';
import { getPublicClient } from '@/lib/viem';
import { ERC20_ABI } from '@/lib/contracts/erc20';
import { fetchTokenPrices, fetchEthPrice } from '@/lib/api/coingecko';
import { formatTokenBalance } from '@/lib/utils/formatters';
import { REFRESH_INTERVALS, TOKEN_ADDRESSES } from '@/lib/constants';

const COMMON_TOKENS = [
  { address: TOKEN_ADDRESSES.USDC, symbol: 'USDC', decimals: 6 },
  { address: TOKEN_ADDRESSES.USDT, symbol: 'USDT', decimals: 6 },
  { address: TOKEN_ADDRESSES.DAI, symbol: 'DAI', decimals: 18 },
  { address: TOKEN_ADDRESSES.WETH, symbol: 'WETH', decimals: 18 },
  { address: TOKEN_ADDRESSES.WBTC, symbol: 'WBTC', decimals: 8 },
];

export function useTreasury(treasuryAddresses: `0x${string}`[], chainId: number = 1) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['treasury', treasuryAddresses, chainId],
    queryFn: async () => {
      const client = getPublicClient(chainId);
      const assets: TreasuryAsset[] = [];

      // Fetch ETH balance
      for (const address of treasuryAddresses) {
        const ethBalance = await client.getBalance({ address });
        const ethPrice = await fetchEthPrice();

        if (ethBalance > 0n) {
          assets.push({
            symbol: 'ETH',
            name: 'Ethereum',
            address: '0x0000000000000000000000000000000000000000',
            balance: ethBalance.toString(),
            balanceFormatted: formatTokenBalance(ethBalance, 18),
            decimals: 18,
            price: ethPrice,
            value: parseFloat(formatTokenBalance(ethBalance, 18)) * ethPrice,
            percentage: 0, // Will calculate later
          });
        }

        // Fetch ERC20 token balances
        for (const token of COMMON_TOKENS) {
          try {
            const balance = await client.readContract({
              address: token.address as `0x${string}`,
              abi: ERC20_ABI,
              functionName: 'balanceOf',
              args: [address],
            });

            if (balance > 0n) {
              const formattedBalance = formatTokenBalance(balance, token.decimals);
              assets.push({
                symbol: token.symbol,
                name: token.symbol,
                address: token.address,
                balance: balance.toString(),
                balanceFormatted: formattedBalance,
                decimals: token.decimals,
                price: 0, // Will fetch prices next
                value: 0,
                percentage: 0,
              });
            }
          } catch (err) {
            console.error(`Error fetching ${token.symbol} balance:`, err);
          }
        }
      }

      // Fetch token prices
      const tokenAddresses = assets.map((a) => a.address).filter((a) => a !== '0x0000000000000000000000000000000000000000');
      const prices = await fetchTokenPrices(tokenAddresses);

      // Update prices and calculate values
      assets.forEach((asset) => {
        if (asset.symbol !== 'ETH') {
          const priceData = prices[asset.address.toLowerCase()];
          if (priceData) {
            asset.price = priceData.usd;
            asset.value = parseFloat(asset.balanceFormatted) * priceData.usd;
            asset.change24h = priceData.usd_24h_change;
          }
        }
      });

      // Calculate total value and percentages
      const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
      assets.forEach((asset) => {
        asset.percentage = (asset.value / totalValue) * 100;
      });

      // Sort by value
      assets.sort((a, b) => b.value - a.value);

      const treasuryData: TreasuryData = {
        totalValue,
        assets,
        change24h: 0, // TODO: Calculate from historical data
        change7d: 0,
        lastUpdated: Date.now(),
      };

      return treasuryData;
    },
    refetchInterval: REFRESH_INTERVALS.TREASURY,
  });

  return {
    treasury: data,
    isLoading,
    error,
    refetch,
  };
}