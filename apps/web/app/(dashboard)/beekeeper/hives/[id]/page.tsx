'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Thermometer, Droplets, Scale, Activity, Bell, Sparkles } from 'lucide-react';
import { HealthScoreGauge } from '@/components/hive/HealthScoreGauge';
import { SensorChart } from '@/components/hive/SensorChart';

export default function HiveDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const sampleSensorData = [
    { timestamp: '12:00', value: 34.2 },
    { timestamp: '13:00', value: 34.8 },
    { timestamp: '14:00', value: 35.5 },
    { timestamp: '15:00', value: 36.1 },
    { timestamp: '16:00', value: 35.8 },
    { timestamp: '17:00', value: 34.9 },
    { timestamp: '18:00', value: 34.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/beekeeper/hives">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hive Details: {id}</h1>
          <p className="text-sm text-slate-500">Apiary Alpha • Langstroth • Installed March 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500 mb-2">Overall Colony Health</h3>
          <HealthScoreGauge score={95} status="HEALTHY" size="lg" />
          <p className="text-xs text-slate-400 mt-4">Calculated via IoT readings & disease markers</p>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-amber-500" /> AI Productivity & Yield Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <p className="text-xs font-medium text-amber-700">Predicted Yield</p>
                <p className="text-2xl font-bold text-amber-900 mt-1">18.5 kg</p>
                <p className="text-xs text-amber-600 mt-1">Estimated next harvest: 14 days</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <p className="text-xs font-medium text-emerald-700">Model Confidence</p>
                <p className="text-2xl font-bold text-emerald-900 mt-1">92%</p>
                <p className="text-xs text-emerald-600 mt-1">Based on flora bloom & sensor trends</p>
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded">
              💡 <strong>Recommendation:</strong> Optimum harvest window predicted between Sept 10 - Sept 14. Queen activity index is high.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SensorChart
          title="Internal Temperature (°C)"
          data={sampleSensorData}
          unit="°C"
          color="#ef4444"
          optimalRange={{ min: 33, max: 36 }}
        />
        <SensorChart
          title="Relative Humidity (%)"
          data={[
            { timestamp: '12:00', value: 52 },
            { timestamp: '13:00', value: 54 },
            { timestamp: '14:00', value: 58 },
            { timestamp: '15:00', value: 56 },
            { timestamp: '16:00', value: 55 },
            { timestamp: '17:00', value: 55 },
            { timestamp: '18:00', value: 53 },
          ]}
          unit="%"
          color="#3b82f6"
          optimalRange={{ min: 50, max: 70 }}
        />
      </div>
    </div>
  );
}
