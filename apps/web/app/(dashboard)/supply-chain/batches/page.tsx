'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, ArrowRight, ExternalLink } from 'lucide-react';

export default function BatchesListPage() {
  const batches = [
    {
      id: 'batch-001',
      beekeeper: 'Ramesh Sharma',
      honeyType: 'Mustard Flora',
      quantityKg: 150.0,
      stage: 'COLLECTED',
      location: 'Collection Center Alpha',
      txHash: '0x8f1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    {
      id: 'batch-002',
      beekeeper: 'Sita Devi',
      honeyType: 'Acacia Forest',
      quantityKg: 220.0,
      stage: 'TESTED',
      location: 'Quality Testing Lab Delhi',
      txHash: '0x3a4534567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
    {
      id: 'batch-003',
      beekeeper: 'Anil Kumar',
      honeyType: 'Multifloral',
      quantityKg: 500.0,
      stage: 'PACKAGED',
      location: 'Processing Plant 01',
      txHash: '0x99e134567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Honey Batches</h1>
          <p className="text-sm text-slate-500">Every batch tracked from hive extraction to consumer retail packaging</p>
        </div>
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
                    <h3 className="font-semibold text-slate-900 text-base">{batch.honeyType}</h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-800">
                      {batch.stage}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Batch ID: <span className="font-mono text-slate-700">{batch.id}</span> • Beekeeper: {batch.beekeeper} • Total: {batch.quantityKg} kg
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-1 flex items-center">
                    Polygon Proof: {batch.txHash.slice(0, 18)}...
                    <ExternalLink className="w-3 h-3 ml-1 text-slate-400 inline" />
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Link href={`/verify/${batch.id}:mocksignature`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Consumer QR View
                  </Button>
                </Link>
                <Link href={`/supply-chain/batches/${batch.id}`}>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                    Update Custody <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
