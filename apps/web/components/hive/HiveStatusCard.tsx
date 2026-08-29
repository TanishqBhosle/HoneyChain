import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Thermometer, Droplets, Weight, Activity } from 'lucide-react';
import { HealthScoreGauge } from './HealthScoreGauge';

interface HiveStatusCardProps {
  id: string;
  name: string;
  healthScore: number;
  temperature: number;
  humidity: number;
  weight: number;
  status: 'healthy' | 'warning' | 'critical';
}

export function HiveStatusCard({ name, healthScore, temperature, humidity, weight, status }: HiveStatusCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row border-b">
          <div className="p-6 flex-1 flex flex-col justify-center items-center border-b sm:border-b-0 sm:border-r bg-slate-50">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{name}</h3>
            <HealthScoreGauge score={healthScore} className="scale-75 origin-top" />
          </div>
          <div className="p-6 flex-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm text-slate-500">
                <Thermometer className="w-4 h-4 mr-1 text-red-500" /> Temp
              </div>
              <span className="text-xl font-medium">{temperature.toFixed(1)}°C</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm text-slate-500">
                <Droplets className="w-4 h-4 mr-1 text-blue-500" /> Hum
              </div>
              <span className="text-xl font-medium">{humidity.toFixed(1)}%</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm text-slate-500">
                <Weight className="w-4 h-4 mr-1 text-amber-500" /> Weight
              </div>
              <span className="text-xl font-medium">{weight.toFixed(1)}kg</span>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm text-slate-500">
                <Activity className="w-4 h-4 mr-1 text-emerald-500" /> Status
              </div>
              <span className="text-xl font-medium capitalize truncate">{status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
