'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
}

const INITIAL_DATA: TickerItem[] = [
  {
    id: 'eth',
    label: 'ETH',
    value: '$3,245.67',
    change: 2.34,
  },
  {
    id: 'tvl',
    label: 'Total TVL',
    value: '$1.2B',
    change: 5.67,
  },
  {
    id: 'daos',
    label: 'Active DAOs',
    value: '247',
    change: 4.86,
    changeLabel: '+12',
  },
  {
    id: 'gas',
    label: 'Gas',
    value: '23 Gwei',
    change: -15.2,
  },
];

function TickerItemComponent({ item }: { item: TickerItem }) {
  const isPositive = item.change >= 0;

  return (
    <div className="flex items-center gap-3 px-6">
      <span className="text-xs text-luxury-gray-400 uppercase font-bold tracking-wider whitespace-nowrap">
        {item.label}
      </span>
      <span className="text-sm font-mono font-bold text-white whitespace-nowrap">
        {item.value}
      </span>
      <div
        className={`flex items-center gap-1 text-xs font-bold font-mono ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span className="whitespace-nowrap">
          {item.changeLabel || `${isPositive ? '+' : ''}${item.change.toFixed(2)}%`}
        </span>
      </div>
      <span className="text-luxury-gray-500">•</span>
    </div>
  );
}

export function LiveTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>(INITIAL_DATA);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData((prevData) =>
        prevData.map((item) => {
          // Simulate random price changes
          const randomChange = (Math.random() - 0.5) * 2;
          const newChange = parseFloat((item.change + randomChange).toFixed(2));

          // Update values based on item type
          let newValue = item.value;
          if (item.id === 'eth') {
            const currentPrice = parseFloat(item.value.replace(/[$,]/g, ''));
            const newPrice = currentPrice * (1 + randomChange / 100);
            newValue = `$${newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
          } else if (item.id === 'gas') {
            const currentGas = parseInt(item.value);
            const newGas = Math.max(10, Math.floor(currentGas + (Math.random() - 0.5) * 5));
            newValue = `${newGas} Gwei`;
          } else if (item.id === 'daos') {
            const currentCount = parseInt(item.value);
            const newCount = currentCount + (Math.random() > 0.7 ? 1 : 0);
            newValue = newCount.toString();
            const diff = newCount - 247;
            return {
              ...item,
              value: newValue,
              change: newChange,
              changeLabel: diff > 0 ? `+${diff}` : diff.toString(),
            };
          }

          return {
            ...item,
            value: newValue,
            change: newChange,
          };
        })
      );
      setKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate data for seamless infinite scroll
  const duplicatedData = [...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="h-12 bg-luxury-dark-800 border-b-2 border-luxury-gray-500 overflow-hidden relative">
      <motion.div
        key={key}
        className="flex items-center h-full"
        animate={{
          x: [0, -33.33 + '%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {duplicatedData.map((item, index) => (
          <TickerItemComponent key={`${item.id}-${index}`} item={item} />
        ))}
      </motion.div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-luxury-dark-800 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-luxury-dark-800 to-transparent pointer-events-none" />
    </div>
  );
}
