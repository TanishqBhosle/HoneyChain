"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BatchTimeline } from '@/components/batch/BatchTimeline';
import { QRCodeDisplay } from '@/components/batch/QRCodeDisplay';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function BatchDetail({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const events = [
    { id: '1', title: 'Harvested', description: 'Raw honey extracted from Apiary Alpha', date: '2023-10-01T10:00:00Z', actor: 'Demo Beekeeper', status: 'completed' as const, icon: '🐝' },
    { id: '2', title: 'Collected', description: 'Transported to regional center', date: '2023-10-02T14:30:00Z', actor: 'Logistics Team', status: 'completed' as const, icon: '📦' },
    { id: '3', title: 'Quality Tested', description: 'Lab verification passed (Moisture: 17%, HMF: 12mg/kg)', date: '2023-10-04T09:15:00Z', actor: 'Quality Inspector', status: 'completed' as const, icon: '🔬' },
    { id: '4', title: 'Processed', description: 'Filtered and settled', date: '2023-10-05T11:00:00Z', actor: 'Processing Facility', status: 'current' as const, icon: '🏭' },
    { id: '5', title: 'Packaged', description: 'Bottled into 500g jars', date: '', actor: 'Packaging Dept', status: 'pending' as const, icon: '🍯' },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Batch #{params.id}</h1>
          <p className="text-slate-500 mt-1">Acacia Honey • 250kg</p>
        </div>
        <div className="space-x-3">
          <Badge variant="warning">In Processing</Badge>
          <Button>Process Next Step</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <BatchTimeline events={events} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <QRCodeDisplay value={`https://honeychain.app/verify/${params.id}`} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
