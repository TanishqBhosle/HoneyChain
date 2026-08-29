'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, ExternalLink, QrCode } from 'lucide-react';

export default function AdminBatchesPage() {
  const batches = [
    {
      id: 'batch-001',
      beekeeper: 'Ramesh Sharma',
      honeyType: 'Mustard Flora Honey',
      quantityKg: 150.0,
      stage: 'PACKAGED',
      region: 'Kullu Valley, HP',
      date: '2026-08-28',
      txHash: '0x8f1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    {
      id: 'batch-002',
      beekeeper: 'Sita Devi',
      honeyType: 'Acacia Forest Honey',
      quantityKg: 220.0,
      stage: 'TESTED',
      region: 'Amritsar, PB',
      date: '2026-08-25',
      txHash: '0x3a4534567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    {
      id: 'batch-003',
      beekeeper: 'Anil Kumar',
      honeyType: 'Wild Multifloral Honey',
      quantityKg: 500.0,
      stage: 'DISTRIBUTED',
      region: 'Dehradun, UK',
      date: '2026-08-20',
      txHash: '0x99e134567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">National Honey Batch Ledger</h1>
        <p className="text-sm text-slate-500">Immutable ledger of all batches created across India</p>
      </div>

      <div className="space-y-4">
        {batches.map((batch) => (
          <Card key={batch.id}>
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-slate-900 text-base">{batch.honeyType} ({batch.quantityKg} kg)</h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-800 text-xs">
                      {batch.stage}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    ID: <span className="font-mono text-slate-700">{batch.id}</span> • Beekeeper: {batch.beekeeper} • Region: {batch.region} • Date: {batch.date}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Polygon Proof: {batch.txHash.slice(0, 24)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Link href={`/verify/${batch.id}:mocksignature`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    <QrCode className="w-3.5 h-3.5 mr-1" /> Verify Proof
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
