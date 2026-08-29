'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface DataPoint {
  time?: string;
  timestamp?: string;
  value: number;
}

interface SensorChartProps {
  title: string;
  data: DataPoint[];
  type?: 'temperature' | 'humidity' | 'weight';
  unit?: string;
  color?: string;
  optimalRange?: { min: number; max: number };
}

export function SensorChart({ title, data, type = 'temperature', color: customColor, unit }: SensorChartProps) {
  const colorMap = {
    temperature: '#ef4444',
    humidity: '#3b82f6',
    weight: '#f59e0b',
  };

  const color = customColor || colorMap[type] || '#f59e0b';
  const formattedData = data.map((d) => ({
    time: d.time || d.timestamp || '',
    value: d.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                formatter={(val: any) => [`${val} ${unit || ''}`, title]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: color }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
