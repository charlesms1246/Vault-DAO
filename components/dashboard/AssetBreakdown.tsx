'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Chart } from '@/components/ui/Chart';
import { Skeleton } from '@/components/ui/Skeleton';
import { useTreasury } from '@/lib/hooks/useTreasury';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface AssetBreakdownProps {
  treasuryAddresses: `0x${string}`[];
  chainId: number;
}

export function AssetBreakdown({ treasuryAddresses, chainId }: AssetBreakdownProps) {
  const { treasury, isLoading } = useTreasury(treasuryAddresses, chainId);

  if (isLoading) {
    return (
      <Card>
        <Skeleton height="400px" />
      </Card>
    );
  }

  if (!treasury || treasury.assets.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-400">No assets found</p>
      </Card>
    );
  }

  const chartData = treasury.assets.map((asset) => ({
    name: asset.symbol,
    value: asset.value,
    percentage: asset.percentage,
  }));

  return (
    <Card>
      <h3 className="text-xl font-bold mb-6 uppercase tracking-wider">Asset Breakdown</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <Chart
            data={chartData}
            type="pie"
            dataKey="value"
            height={300}
          />
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          {treasury.assets.map((asset, index) => {
            const colors = ['bg-blood-red-500', 'bg-gold-500', 'bg-blood-red-700', 'bg-gold-700'];
            const borderColors = ['border-blood-red-500', 'border-gold-500', 'border-blood-red-700', 'border-gold-700'];
            return (
              <div
                key={`${asset.symbol}-${index}`}
                className="flex items-center justify-between p-4 glass-hover rounded-none border-2 border-luxury-gray-500 hover:border-gold-500 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-none ${colors[index % colors.length]} border-2 ${borderColors[index % borderColors.length]}`}
                  />
                  <div>
                    <p className="font-bold uppercase tracking-wider">{asset.symbol}</p>
                    <p className="text-sm text-luxury-gray-400 font-mono">
                      {asset.balanceFormatted}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold number-font text-gold-500">
                    {formatCurrency(asset.value)}
                  </p>
                  <p className="text-sm text-luxury-gray-400">
                    {formatPercentage(asset.percentage, 1)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}