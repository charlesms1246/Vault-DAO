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
      <h3 className="text-xl font-bold mb-6">Asset Breakdown</h3>
      
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
          {treasury.assets.map((asset, index) => (
            <div
              key={asset.symbol}
              className="flex items-center justify-between p-4 glass-hover rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `hsl(${(index * 360) / treasury.assets.length}, 70%, 60%)`,
                  }}
                />
                <div>
                  <p className="font-medium">{asset.symbol}</p>
                  <p className="text-sm text-gray-400 font-mono">
                    {asset.balanceFormatted}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold number-font">
                  {formatCurrency(asset.value)}
                </p>
                <p className="text-sm text-gray-400">
                  {formatPercentage(asset.percentage, 1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}