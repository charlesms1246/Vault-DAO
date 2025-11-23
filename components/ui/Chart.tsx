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

const COLORS = ['#00d4ff', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

export function Chart({
  data,
  type,
  dataKey,
  xKey = 'name',
  color = '#00d4ff',
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
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-sm text-gray-300">{payload[0].payload[xKey]}</p>
          <p className="text-lg font-bold text-cyber-cyan">
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
      {type === 'line' && (
        <LineChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#666" />
          <YAxis stroke="#666" />
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
      )}

      {type === 'area' && (
        <AreaChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#666" />
          <YAxis stroke="#666" />
          <RechartsTooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
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
      )}

      {type === 'bar' && (
        <BarChart {...commonProps}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          )}
          <XAxis dataKey={xKey} stroke="#666" />
          <YAxis stroke="#666" />
          <RechartsTooltip content={<CustomTooltip />} />
          {showLegend && <Legend />}
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        </BarChart>
      )}

      {type === 'pie' && (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
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