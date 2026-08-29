"use client";
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HiveStatusCard } from '@/components/hive/HiveStatusCard';
import { AlertCard } from '@/components/alerts/AlertCard';
import { DemoControls } from '@/components/demo/DemoControls';
import { 
  Box, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Droplet, 
  Camera, 
  Plus, 
  ArrowRight, 
  Activity, 
  Radio, 
  Sparkles 
} from 'lucide-react';

export default function BeekeeperDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-5 rounded-2xl border border-amber-200/70 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/80">
              Live Apiary Node
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              12 Hives Streaming
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Nilgiri Valley Apiary
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time IoT acoustic & thermal telemetry synchronized with Polygon smart contracts
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/beekeeper/harvest" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5" />
              <span>Log Honey Harvest</span>
            </Button>
          </Link>
          <Link href="/beekeeper/ai-analysis" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto text-xs font-bold border-amber-200 bg-white hover:bg-amber-50 text-slate-800 rounded-xl flex items-center gap-1.5 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Vision Scan</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Simulator Test Bench */}
      <DemoControls hiveId="hive_1" />

      {/* Modern KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 flex-shrink-0">
              <Box className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Total Monitored</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-2xl font-black text-slate-900">124</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+4 this mo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 flex-shrink-0">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Healthy Status</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-2xl font-black text-emerald-700">110</p>
                <span className="text-[10px] font-bold text-slate-500 font-mono">88.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 flex-shrink-0">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Requires Attention</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-2xl font-black text-amber-700">10</p>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">Inspection due</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-5 flex items-center space-x-3.5">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex-shrink-0">
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Critical Threat</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl sm:text-2xl font-black text-red-700">4</p>
                <span className="text-[10px] font-bold text-red-700 bg-red-100/80 px-1.5 py-0.5 rounded">Mite alert</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Hive Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hive Telemetry Health Overview</h2>
              <p className="text-xs text-slate-500">Live multi-sensor data feed (Temperature, Humidity, Weight, Acoustic)</p>
            </div>
            <Link href="/beekeeper/hives" className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
              <span>View All 124 Hives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            <HiveStatusCard 
              id="hive_1" 
              name="Apiary Alpha — Hive 01 (Langstroth)" 
              healthScore={95} 
              temperature={34.5} 
              humidity={55} 
              weight={45.2} 
              status="healthy" 
            />
            <HiveStatusCard 
              id="hive_11" 
              name="Apiary Beta — Hive 11 (Top Bar)" 
              healthScore={60} 
              temperature={37.2} 
              humidity={65} 
              weight={18.1} 
              status="warning" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Sensor Alerts</h2>
              <p className="text-xs text-slate-500">Edge AI & threshold triggers</p>
            </div>
            <Link href="/beekeeper/alerts" className="text-xs font-bold text-amber-700 hover:text-amber-800">
              History
            </Link>
          </div>

          <div className="space-y-3">
            <AlertCard 
              id="1" 
              title="High Internal Temperature" 
              message="Hive internal temperature reached 37.2°C, exceeding optimal brood range threshold." 
              severity="warning" 
              date={new Date().toISOString()} 
              hiveName="Apiary Beta - Hive 11" 
            />
            <AlertCard 
              id="2" 
              title="Varroa Mite Detected" 
              message="AI Computer Vision model confirms Varroa destructor presence on bottom board inspection scan." 
              severity="critical" 
              date={new Date().toISOString()} 
              hiveName="Apiary Gamma - Hive 05" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
