'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Package, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  FlaskConical, 
  Factory, 
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function SupplyChainDashboard() {
  const stats = [
    { title: 'Batches in Transit', value: '8', delta: '+2 today', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { title: 'Pending Lab Tests', value: '3', delta: 'NABL Queue', icon: FlaskConical, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { title: 'Ready to Process', value: '5', delta: 'Purity Approved', icon: Factory, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { title: 'Verified QR Codes', value: '42', delta: 'On-Chain Minted', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  ];

  const batches = [
    {
      id: 'batch-001',
      beekeeper: 'Ramesh Kumar',
      apiary: 'Nilgiri Valley Apiary',
      honeyType: 'Mustard Flora',
      quantityKg: 150.0,
      stage: 'COLLECTED',
      location: 'Madikeri Regional Depot',
      txHash: '0x8f12...b94a',
      statusColor: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      id: 'batch-002',
      beekeeper: 'Sita Devi',
      apiary: 'Highland Forest Apiary',
      honeyType: 'Acacia Wildwood',
      quantityKg: 220.0,
      stage: 'TESTED',
      location: 'KVIC Testing Lab Mysore',
      txHash: '0x3a45...7c11',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'batch-003',
      beekeeper: 'Anil Kumar',
      apiary: 'Coorg Valley Unit',
      honeyType: 'Multifloral Blossom',
      quantityKg: 500.0,
      stage: 'PACKAGED',
      location: 'Apex Processing Plant 01',
      txHash: '0x99e1...12ef',
      statusColor: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      id: 'batch-004',
      beekeeper: 'Sunil Gowda',
      apiary: 'Brahmagiri Highlands',
      honeyType: 'Eucalyptus Raw',
      quantityKg: 340.0,
      stage: 'IN_TRANSIT',
      location: 'Southern Logistics Truck #KA-09',
      txHash: '0x44b2...88cc',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-2xl border border-amber-200/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
              Supply Chain Registry
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Polygon Amoy Mainnet Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Custody & Batch Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Immutable tracking from collection center receipt to lab purity verification, processing, and retail
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/supply-chain/quality-test" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Submit Quality Test</span>
            </Button>
          </Link>
          <Link href="/supply-chain/processing" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto text-xs font-bold border-amber-200 bg-white hover:bg-amber-50 text-slate-800 rounded-xl flex items-center gap-1.5 shadow-xs">
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              <span>Mint QR Batch</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-5 flex items-center space-x-3.5">
              <div className={`p-3 rounded-2xl border flex-shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">{stat.title}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</p>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{stat.delta}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Batches Table Card */}
      <Card className="rounded-2xl border-slate-200/80 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 sm:p-6 border-b border-slate-100 bg-white">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-slate-900">
              Active Supply Chain Batches
            </CardTitle>
            <p className="text-xs text-slate-500">Live cryptographic state recorded in smart contracts</p>
          </div>
          <Link href="/supply-chain/batches">
            <Button variant="outline" size="sm" className="text-xs font-bold border-amber-200 hover:bg-amber-50 rounded-xl">
              View All Batches
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {batches.map((batch) => (
              <div key={batch.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors">
                <div className="flex items-start space-x-3.5">
                  <div className="p-3 bg-amber-100/70 text-amber-700 rounded-2xl border border-amber-200/70 flex-shrink-0 mt-0.5">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {batch.honeyType} <span className="font-mono text-amber-700 font-bold">({batch.quantityKg} kg)</span>
                      </h4>
                      <Badge variant="outline" className={`text-[10px] font-bold ${batch.statusColor}`}>
                        {batch.stage}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Batch ID: <span className="font-mono font-semibold text-slate-700">{batch.id}</span> • Beekeeper: <span className="font-semibold text-slate-700">{batch.beekeeper}</span> ({batch.apiary})
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-slate-500" />
                        Current: <strong className="text-slate-600">{batch.location}</strong>
                      </span>
                      <span className="font-mono text-amber-700/80 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] border border-amber-100">
                        Tx: {batch.txHash}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Link href={`/supply-chain/batches/${batch.id}`}>
                    <Button size="sm" variant="ghost" className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:bg-amber-100/60 rounded-xl">
                      Manage Batch <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
