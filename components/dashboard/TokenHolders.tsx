'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AddressDisplay } from '@/components/web3/AddressDisplay';
import { useTokenHolders } from '@/lib/hooks/useTokenHolders';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';
import { Users, PieChart as PieChartIcon } from 'lucide-react';

interface TokenHoldersProps {
  tokenAddress?: `0x${string}`;
  chainId: number;
}

export function TokenHolders({ tokenAddress, chainId }: TokenHoldersProps) {
  const { distribution, isLoading } = useTokenHolders(tokenAddress, chainId);

  if (isLoading) {
    return (
      <Card>
        <Skeleton height="400px" />
      </Card>
    );
  }

  if (!distribution) {
    return (
      <Card>
        <p className="text-center text-gray-400">Token holder data unavailable</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6">Token Distribution</h3>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Holders</span>
          </div>
          <p className="text-2xl font-bold number-font">
            {formatNumber(distribution.totalHolders)}
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <PieChartIcon className="w-4 h-4" />
            <span className="text-sm">Gini</span>
          </div>
          <p className="text-2xl font-bold number-font">
            {distribution.giniCoefficient.toFixed(2)}
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <span className="text-sm">Top 10</span>
          </div>
          <p className="text-2xl font-bold number-font">
            {formatPercentage(distribution.top10Percentage, 0)}
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-400 mb-1">
            <span className="text-sm">Top 50</span>
          </div>
          <p className="text-2xl font-bold number-font">
            {formatPercentage(distribution.top50Percentage, 0)}
          </p>
        </div>
      </div>

      {/* Top Holders */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Top Holders</h4>
        <div className="space-y-2">
          {distribution.holders.map((holder, index) => (
            <div
              key={`${holder.address}-${index}`}
              className="flex items-center justify-between p-3 glass-hover rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <AddressDisplay address={holder.address} ens={holder.ens} />
              </div>
              <div className="text-right">
                <p className="font-mono font-medium">
                  {holder.balanceFormatted}
                </p>
                <p className="text-sm text-gray-400">
                  {formatPercentage(holder.percentage, 2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}