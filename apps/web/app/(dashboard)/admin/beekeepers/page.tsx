'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, MapPin, Box, Award } from 'lucide-react';

export default function AdminBeekeepersPage() {
  const beekeepers = [
    {
      id: 'bk-1',
      name: 'Ramesh Sharma',
      phone: '+91 98765 43210',
      region: 'Kullu Valley, Himachal Pradesh',
      kvicId: 'KVIC-HP-2024-8891',
      apiariesCount: 2,
      hivesCount: 12,
      activeBatches: 3,
      healthAvg: 94,
    },
    {
      id: 'bk-2',
      name: 'Sita Devi',
      phone: '+91 98765 43211',
      region: 'Amritsar, Punjab',
      kvicId: 'KVIC-PB-2024-1042',
      apiariesCount: 1,
      hivesCount: 6,
      activeBatches: 2,
      healthAvg: 88,
    },
    {
      id: 'bk-3',
      name: 'Anil Kumar',
      phone: '+91 98765 43212',
      region: 'Dehradun, Uttarakhand',
      kvicId: 'KVIC-UK-2025-4512',
      apiariesCount: 3,
      hivesCount: 18,
      activeBatches: 4,
      healthAvg: 91,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Enrolled Beekeepers</h1>
        <p className="text-sm text-slate-500">KVIC Honey Mission registered beekeepers and rural beekeeping collectives</p>
      </div>

      <div className="space-y-4">
        {beekeepers.map((bk) => (
          <Card key={bk.id}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-slate-900 text-base">{bk.name}</h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-800 text-xs">
                      {bk.kvicId}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {bk.region} • {bk.phone}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center text-xs">
                <div>
                  <span className="text-slate-400">Apiaries</span>
                  <p className="text-sm font-bold text-slate-800">{bk.apiariesCount}</p>
                </div>
                <div>
                  <span className="text-slate-400">Total Hives</span>
                  <p className="text-sm font-bold text-slate-800">{bk.hivesCount}</p>
                </div>
                <div>
                  <span className="text-slate-400">Health Index</span>
                  <p className="text-sm font-bold text-emerald-700">{bk.healthAvg}/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
