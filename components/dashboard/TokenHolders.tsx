'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
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
      <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">Token Distribution</h3>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-none border-2 border-blood-red-500/30">
          <div className="flex items-center gap-2 text-luxury-gray-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-bold">Holders</span>
          </div>
          <p className="text-2xl font-bold number-font text-gold-500">
            {formatNumber(distribution.totalHolders)}
          </p>
        </div>
        <div className="glass p-4 rounded-none border-2 border-blood-red-500/30">
          <div className="flex items-center gap-2 text-luxury-gray-400 mb-1">
            <PieChartIcon className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-bold">Gini</span>
          </div>
          <p className="text-2xl font-bold number-font text-gold-500">
            {distribution.giniCoefficient.toFixed(2)}
          </p>
        </div>
        <div className="glass p-4 rounded-none border-2 border-blood-red-500/30">
          <div className="flex items-center gap-2 text-luxury-gray-400 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold">Top 10</span>
          </div>
          <p className="text-2xl font-bold number-font text-blood-red-500">
            {formatPercentage(distribution.top10Percentage, 0)}
          </p>
        </div>
        <div className="glass p-4 rounded-none border-2 border-blood-red-500/30">
          <div className="flex items-center gap-2 text-luxury-gray-400 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold">Top 50</span>
          </div>
          <p className="text-2xl font-bold number-font text-blood-red-500">
            {formatPercentage(distribution.top50Percentage, 0)}
          </p>
        </div>
      </div>

      {/* Top Holders */}
      <div>
        <h4 className="text-lg font-bold mb-4 uppercase tracking-wider bg-luxury-dark-900 border-2 border-blood-red-500 p-3 rounded-none">Top Holders</h4>
        <div className="space-y-2">
          {distribution.holders.map((holder, index) => (
            <div
              key={`${holder.address}-${index}`}
              className="flex items-center justify-between p-3 glass-hover rounded-none border-2 border-luxury-gray-500 hover:border-gold-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {index < 3 ? (
                  <Badge variant="gold" className="w-8 h-8 flex items-center justify-center p-0">
                    {index + 1}
                  </Badge>
                ) : (
                  <div className="w-8 h-8 rounded-none bg-luxury-dark-900 flex items-center justify-center text-sm font-bold border-2 border-luxury-gray-500 text-luxury-gray-400">
                    {index + 1}
                  </div>
                )}
                <AddressDisplay address={holder.address} ens={holder.ens} />
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-gold-500">
                  {holder.balanceFormatted}
                </p>
                <p className="text-sm text-luxury-gray-400">
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