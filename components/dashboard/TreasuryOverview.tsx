'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { CountUp } from '@/components/animations/CountUp';
import { useTreasury } from '@/lib/hooks/useTreasury';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

interface TreasuryOverviewProps {
  treasuryAddresses: `0x${string}`[];
  chainId: number;
}

export function TreasuryOverview({ treasuryAddresses, chainId }: TreasuryOverviewProps) {
  const { treasury, isLoading } = useTreasury(treasuryAddresses, chainId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <Skeleton height="80px" />
          </Card>
        ))}
      </div>
    );
  }

  if (!treasury) {
    return (
      <Card>
        <p className="text-center text-gray-400">Failed to load treasury data</p>
      </Card>
    );
  }

  const stats = [
    {
      label: 'Total Value',
      value: treasury.totalValue,
      format: 'currency',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-gold-500',
      bgColor: 'bg-luxury-dark-900 border-2 border-gold-500',
      cardVariant: 'glow-gold' as const,
    },
    {
      label: '24h Change',
      value: treasury.change24h,
      format: 'percentage',
      icon: treasury.change24h >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />,
      color: treasury.change24h >= 0 ? 'text-green-400' : 'text-blood-red-500',
      bgColor: treasury.change24h >= 0 ? 'bg-luxury-dark-900 border-2 border-green-500' : 'bg-luxury-dark-900 border-2 border-blood-red-500',
      cardVariant: treasury.change24h >= 0 ? ('default' as const) : ('glow-red' as const),
    },
    {
      label: 'Assets',
      value: treasury.assets.length,
      format: 'number',
      icon: <Wallet className="w-6 h-6" />,
      color: 'text-luxury-gray-400',
      bgColor: 'bg-luxury-dark-900 border-2 border-luxury-gray-500',
      cardVariant: 'default' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full" variant={stat.cardVariant}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-luxury-gray-400 mb-2 uppercase tracking-wider font-bold">{stat.label}</p>
                <div className="text-3xl font-bold number-font">
                  {stat.format === 'currency' && (
                    <CountUp
                      value={stat.value}
                      prefix="$"
                      decimals={0}
                      className={stat.color}
                    />
                  )}
                  {stat.format === 'percentage' && (
                    <span className={stat.color}>
                      {formatPercentage(stat.value)}
                    </span>
                  )}
                  {stat.format === 'number' && (
                    <CountUp value={stat.value} className={stat.color} />
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-none ${stat.bgColor} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}