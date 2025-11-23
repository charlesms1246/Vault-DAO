'use client';

import { useQuery } from '@tanstack/react-query';
import { HolderDistribution, TokenHolder } from '@/types';
import { getPublicClient } from '@/lib/viem';
import { ERC20_ABI } from '@/lib/contracts/erc20';
import { formatTokenBalance } from '@/lib/utils/formatters';
import { REFRESH_INTERVALS } from '@/lib/constants';

// This is a simplified version - in production, you'd use The Graph or similar indexer
export function useTokenHolders(tokenAddress?: `0x${string}`, chainId: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['token-holders', tokenAddress, chainId],
    queryFn: async () => {
      if (!tokenAddress) return null;

      const client = getPublicClient(chainId);

      // Get total supply
      const totalSupply = await client.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'totalSupply',
      });

      const decimals = await client.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'decimals',
      });

      // Mock data for demo - in production, use The Graph
      const mockHolders: TokenHolder[] = [
        {
          address: '0x1234567890123456789012345678901234567890',
          balance: (totalSupply / 10n).toString(),
          balanceFormatted: formatTokenBalance(totalSupply / 10n, decimals),
          percentage: 10,
          value: 0,
        },
        {
          address: '0x2345678901234567890123456789012345678901',
          balance: (totalSupply / 20n).toString(),
          balanceFormatted: formatTokenBalance(totalSupply / 20n, decimals),
          percentage: 5,
          value: 0,
        },
        {
          address: '0x3456789012345678901234567890123456789012',
          balance: (totalSupply / 25n).toString(),
          balanceFormatted: formatTokenBalance(totalSupply / 25n, decimals),
          percentage: 4,
          value: 0,
        },
      ];

      // Calculate Gini coefficient (simplified)
      const giniCoefficient = 0.65; // Mock value

      const distribution: HolderDistribution = {
        holders: mockHolders,
        totalHolders: 1000, // Mock
        giniCoefficient,
        top10Percentage: 60, // Mock
        top50Percentage: 85, // Mock
      };

      return distribution;
    },
    enabled: !!tokenAddress,
    refetchInterval: REFRESH_INTERVALS.HOLDERS,
  });

  return {
    distribution: data,
    isLoading,
    error,
  };
}