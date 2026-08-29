"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Flame, Scale, Droplets, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoControlsProps {
  hiveId?: string;
  onReadingSent?: () => void;
}

export function DemoControls({ hiveId = 'hive_1', onReadingSent }: DemoControlsProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendSensorPayload = async (sensorId: string, value: number, unit: string, label: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const apiHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiHost}/api/v1/sensor-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          { sensorId, value, unit, timestamp: new Date().toISOString() }
        ]),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      setMessage(`Simulated ${label}! Recalculated Hive Health.`);
      if (onReadingSent) onReadingSent();
    } catch (err: any) {
      setMessage(`Demo trigger local event: ${label}`);
      if (onReadingSent) onReadingSent();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <CardTitle className="text-base font-bold text-amber-900">Live Demo Controller</CardTitle>
        </div>
        <CardDescription className="text-xs text-amber-700">
          Simulate live IoT sensor telemetry spikes to trigger alert generation and dynamic health score recalculation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            type="button"
            disabled={loading}
            onClick={() => sendSensorPayload('sens_temp_1', 39.5, 'C', 'Temperature Spike (39.5°C)')}
            className="bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 flex items-center justify-center space-x-1"
          >
            <Flame className="w-4 h-4" />
            <span>Temp Spike 39.5°C</span>
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={() => sendSensorPayload('sens_weight_1', 12.0, 'kg', 'Weight Drop (12.0kg)')}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs py-2 px-3 flex items-center justify-center space-x-1"
          >
            <Scale className="w-4 h-4" />
            <span>Weight Drop 12kg</span>
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={() => sendSensorPayload('sens_hum_1', 85.0, '%', 'Humidity Spike (85%)')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 flex items-center justify-center space-x-1"
          >
            <Droplets className="w-4 h-4" />
            <span>Humidity Spike 85%</span>
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={() => sendSensorPayload('sens_temp_1', 34.5, 'C', 'Optimal Reset (34.5°C)')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3 flex items-center justify-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Optimal</span>
          </Button>
        </div>

        {message && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-100/80 p-2 rounded-md">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
