'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Box, 
  Package, 
  Activity, 
  ShieldAlert, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminOverviewPage() {
  const stats = [
    { title: 'Enrolled Beekeepers', value: '48', delta: '+6 this week', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { title: 'Active Smart Hives', value: '184', delta: '98.2% uptime', icon: Box, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { title: 'Total Traced Honey', value: '14,250 kg', delta: '100% On-Chain', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { title: 'Polygon Network Events', value: '1,280', delta: 'Gas Optimized', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Admin Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-2xl border border-amber-200/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
              National Honey Mission Oversight
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              State Node Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            KVIC National Registry Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Autonomous audit verification, geographic origin mapping & anti-adulteration analytics
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/admin/beekeepers" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Manage Beekeepers</span>
            </Button>
          </Link>
          <Link href="/admin/batches" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto text-xs font-bold border-amber-200 bg-white hover:bg-amber-50 text-slate-800 rounded-xl flex items-center gap-1.5 shadow-xs">
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Ledger</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
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

      {/* Regional & Quality Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-slate-200/80 shadow-xs">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-amber-600" /> Regional Production Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Karnataka & Nilgiris (Wild & Multifloral)</span>
                <span className="text-amber-700 font-mono">5,400 kg (38%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full w-[38%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Himachal Pradesh (Acacia Flora)</span>
                <span className="text-amber-700 font-mono">4,800 kg (34%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full w-[34%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-800">Punjab & Haryana (Mustard Flora)</span>
                <span className="text-amber-700 font-mono">4,050 kg (28%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full w-[28%] transition-all duration-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center">
              <Award className="w-4 h-4 mr-2 text-emerald-600" /> Quality Certification & Lab Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3.5">
            <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-900">Lab Purity Certification Rate</p>
                <p className="text-2xl font-black text-emerald-950 mt-0.5">97.8%</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Passed NMR & C4 carbon sugar purity checks</p>
              </div>
              <Badge className="bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs">
                FSSAI / NABL
              </Badge>
            </div>

            <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-900">Average Hive Health Index</p>
                <p className="text-2xl font-black text-blue-950 mt-0.5">88.4 / 100</p>
                <p className="text-[11px] text-blue-700 mt-0.5">Across 184 active IoT sensor stream nodes</p>
              </div>
              <Badge className="bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs">
                Optimal
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
