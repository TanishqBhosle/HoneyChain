'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Box, Plus, Thermometer, Droplets, Scale, Activity, ArrowRight } from 'lucide-react';
import { HealthScoreGauge } from '@/components/hive/HealthScoreGauge';

export default function HivesListPage() {
  const [hives, setHives] = useState([
    {
      id: 'hive-1',
      name: 'Hive 01',
      apiary: 'Apiary Alpha',
      species: 'Apis cerana indica',
      status: 'ACTIVE',
      healthScore: 95,
      healthStatus: 'HEALTHY',
      temp: 34.5,
      hum: 55.0,
      weight: 45.2,
      activity: 88,
    },
    {
      id: 'hive-2',
      name: 'Hive 02',
      apiary: 'Apiary Alpha',
      species: 'Apis mellifera',
      status: 'ACTIVE',
      healthScore: 92,
      healthStatus: 'HEALTHY',
      temp: 35.1,
      hum: 58.0,
      weight: 42.8,
      activity: 84,
    },
    {
      id: 'hive-3',
      name: 'Hive 05',
      apiary: 'Apiary Beta',
      species: 'Apis cerana indica',
      status: 'WARNING',
      healthScore: 60,
      healthStatus: 'WARNING',
      temp: 37.8,
      hum: 68.0,
      weight: 38.1,
      activity: 52,
    },
    {
      id: 'hive-4',
      name: 'Hive 12',
      apiary: 'Apiary Beta',
      species: 'Apis cerana indica',
      status: 'CRITICAL',
      healthScore: 42,
      healthStatus: 'CRITICAL',
      temp: 39.2,
      hum: 75.0,
      weight: 31.4,
      activity: 35,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Hives</h1>
          <p className="text-sm text-slate-500">Real-time telemetry and health monitoring across all colonies</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hives.map((hive) => {
          const badgeColor =
            hive.healthStatus === 'HEALTHY'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : hive.healthStatus === 'WARNING'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-red-50 text-red-700 border-red-200';

          return (
            <Card key={hive.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">{hive.name}</CardTitle>
                  <p className="text-xs text-slate-500">{hive.apiary} • {hive.species}</p>
                </div>
                <Badge variant="outline" className={badgeColor}>
                  {hive.healthStatus}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center py-2">
                  <HealthScoreGauge score={hive.healthScore} status={hive.healthStatus} size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-2 border-t pt-3 text-center">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="flex items-center justify-center text-xs text-slate-400">
                      <Thermometer className="w-3 h-3 mr-1 text-red-500" /> Temp
                    </span>
                    <p className="text-sm font-bold text-slate-800">{hive.temp}°C</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="flex items-center justify-center text-xs text-slate-400">
                      <Droplets className="w-3 h-3 mr-1 text-blue-500" /> Hum
                    </span>
                    <p className="text-sm font-bold text-slate-800">{hive.hum}%</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="flex items-center justify-center text-xs text-slate-400">
                      <Scale className="w-3 h-3 mr-1 text-amber-500" /> Weight
                    </span>
                    <p className="text-sm font-bold text-slate-800">{hive.weight}kg</p>
                  </div>
                </div>

                <Link href={`/beekeeper/hives/${hive.id}`} className="block pt-2">
                  <Button variant="outline" className="w-full text-xs">
                    View Live Analytics <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
