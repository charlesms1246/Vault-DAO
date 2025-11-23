'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

/**
 * Chart Component - Blood Red + Gold Theme
 * 
 * Color Usage Guidelines:
 * - Treasury Value Over Time: #eab308 (gold) - Use color="#eab308"
 * - Asset Distribution: Pie chart with red/gold gradient (automatic)
 * - Token Holder Distribution: #dc2626 (blood red) - Use color="#dc2626"
 * - Voting Power: #eab308 (gold) bars
 * - Participation Rate: #dc2626 (blood red) line
 * - Performance (positive): #22c55e (green)
 * - Performance (negative): #dc2626 (blood red)
 */

interface ChartProps {
  data: any[];
  type: 'line' | 'area' | 'bar' | 'pie';
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const COLORS = ['#dc2626', '#eab308', '#ef4444', '#fbbf24', '#b91c1c', '#ca8a04'];

export function Chart({
  data,
  type,
  dataKey,
  xKey = 'name',
  color = '#dc2626',
  height = 300,
  showGrid = true,
  showLegend = false,
}: ChartProps) {
  const commonProps = {
    data,
    margin: { top: 5, right: 20, left: 0, bottom: 5 },
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-luxury-dark-900 border-2 border-blood-red-500 rounded-none p-3 shadow-red-glow backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{payload[0].payload[xKey]}</p>
          <p className="text-lg font-bold text-gold-500 font-mono">
            {typeof payload[0].value === 'number'
              ? payload[0].value.toLocaleString()
              : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {type === 'line' ? (
        <LineChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <RechartsTooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      ) : type === 'area' ? (
        <AreaChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <RechartsTooltip content={<CustomTooltip />} />
          {showLegend && <Legend wrapperStyle={{ fontWeight: 'bold', color: '#eab308' }} />}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill="url(#colorGradient)"
          />
        </AreaChart>
      ) : type === 'bar' ? (
        <BarChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 38, 38, 0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          <RechartsTooltip content={<CustomTooltip />} />
          {showLegend && <Legend wrapperStyle={{ fontWeight: 'bold', color: '#eab308' }} />}
          <Bar dataKey={dataKey} fill={color} radius={[0, 0, 0, 0]} />
        </BarChart>
      ) : (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={{ stroke: '#eab308', strokeWidth: 1 }}
            label={({ name, percent }: any) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            dataKey={dataKey}
            style={{ fontWeight: 'bold', fontSize: '12px', fill: '#eab308' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip content={<CustomTooltip />} />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}