"use client";
import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { 
  BrainCircuit, 
  Scan, 
  Activity, 
  CheckCircle2, 
  Thermometer, 
  Droplets, 
  Scale, 
  Volume2, 
  Wifi,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene4TechOverlayProps {
  progress: MotionValue<number>;
}

export function Scene4TechOverlay({ progress }: Scene4TechOverlayProps) {
  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.62, 0.67]}
      exitRange={[0.81, 0.86]}
      className="z-30 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-5xl mx-auto w-full">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/90 via-[#fbf9f4]/60 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-100/95 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider mb-2 sm:mb-3 shadow-sm">
          <BrainCircuit className="w-3.5 h-3.5 text-amber-600" />
          <span>04. AI VISION & LIVE TELEMETRY</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-2xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-1 sm:mb-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
          On-Device AI & Real-Time Telemetry
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-2xl mb-4 sm:mb-5">
          Edge neural models scan brood frames in milliseconds for instant disease detection, while ESP32 acoustic and thermal nodes continuously monitor colony vitality.
        </p>

        {/* High-Tech 2-Column Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 w-full max-w-5xl text-left pointer-events-auto items-stretch">
          
          {/* Left Panel: Edge AI Vision Diagnostic Viewfinder (7 Cols on desktop) */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl border border-amber-300/90 p-3.5 sm:p-4 shadow-2xl shadow-amber-950/10 flex flex-col justify-between text-slate-900 relative overflow-hidden">
            {/* Ambient Warm Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-amber-100 relative z-10">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Scan className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black font-heading tracking-wide text-slate-900 flex items-center gap-1.5">
                    EDGE VISION DIAGNOSIS
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    YOLOv8-Honey • Frame #14 (Brood C-4)
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 bg-amber-50/90 border border-amber-200/80 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-amber-900">
                <span className="text-emerald-700 font-bold">14ms</span>
                <span className="text-amber-400">•</span>
                <span>On-Device</span>
              </div>
            </div>

            {/* Simulated Live Comb Viewport (Matching Warm Theme) */}
            <div className="relative my-2.5 rounded-xl bg-gradient-to-b from-amber-50/90 via-amber-100/40 to-amber-50/90 border border-amber-200/80 h-36 sm:h-44 flex items-center justify-center overflow-hidden shadow-inner">
              {/* Hexagon / Dot Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(#d97706 1.2px, transparent 1.2px)`,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Scanning Laser Beam */}
              <motion.div
                animate={{ y: [-70, 70, -70] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_8px_#f59e0b] pointer-events-none"
              />

              {/* Bounding Box 1: Capped Brood */}
              <div className="absolute top-3 left-4 border border-emerald-400 bg-white/95 backdrop-blur-md rounded-lg p-1.5 shadow-md shadow-amber-950/5">
                <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-800 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Brood Pattern: 98.4%</span>
                </div>
                <div className="text-[8px] text-slate-600 font-medium">Uniform Capping</div>
              </div>

              {/* Bounding Box 2: Varroa Mite Free */}
              <div className="absolute bottom-3 right-4 border border-blue-400 bg-white/95 backdrop-blur-md rounded-lg p-1.5 shadow-md shadow-amber-950/5">
                <div className="flex items-center gap-1 text-[9px] font-bold text-blue-800 font-mono">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  <span>Varroa Scan: 0 Detected</span>
                </div>
                <div className="text-[8px] text-slate-600 font-medium">Mite Negative (Clean)</div>
              </div>

              {/* Center Target Reticle */}
              <div className="relative flex flex-col items-center justify-center pointer-events-none">
                <div className="w-10 h-10 border border-dashed border-amber-500/70 rounded-full flex items-center justify-center animate-spin-slow">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
                <div className="mt-1 text-[9px] font-mono font-bold text-amber-950 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded border border-amber-300 shadow-sm">
                  SECTOR C-04 • FOCUSED
                </div>
              </div>
            </div>

            {/* Diagnostic Footer Banner */}
            <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px] relative z-10">
              <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Diagnosis: Thriving Colony (Score 92/100)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Model: MobileNetV4-Hive
              </span>
            </div>
          </div>

          {/* Right Panel: Bio-Acoustic & IoT Telemetry Matrix (5 Cols on desktop) */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-2xl border border-amber-300/90 p-3.5 sm:p-4 shadow-2xl shadow-amber-950/10 flex flex-col justify-between text-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-amber-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black font-heading tracking-wide text-slate-900">
                    HIVE TELEMETRY STREAM
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Node ESP32-S3 • Hive H-07
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* 4 Rich Sensor Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 my-2.5">
              
              {/* Sensor 1: Bio-Acoustics */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-amber-900 uppercase">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-amber-600" /> Acoustic Hum
                  </span>
                  <span className="text-[8px] text-emerald-700 font-mono">242 Hz</span>
                </div>
                {/* Audio Equalizer Bars Animation */}
                <div className="flex items-end justify-between h-5 my-1 px-1">
                  {[40, 70, 95, 60, 85, 50, 75, 45].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
                      transition={{
                        duration: 0.8 + (i % 3) * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1 bg-amber-500 rounded-full"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="text-[8px] font-semibold text-slate-600">
                  Swarm Risk: <strong className="text-emerald-700">&lt;3% (Calm)</strong>
                </div>
              </div>

              {/* Sensor 2: Brood Temperature */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-amber-900 uppercase">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-rose-500" /> Core Temp
                  </span>
                </div>
                <div className="my-1">
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-heading leading-tight">
                    34.8<span className="text-xs font-semibold text-slate-500">°C</span>
                  </div>
                  <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>
                <div className="text-[8px] font-semibold text-slate-600">
                  Target: 34.5°C–35.5°C
                </div>
              </div>

              {/* Sensor 3: Hive Humidity */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-amber-900 uppercase">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" /> Humidity
                  </span>
                </div>
                <div className="my-1">
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-heading leading-tight">
                    62<span className="text-xs font-semibold text-slate-500">%</span>
                  </div>
                  <div className="w-full bg-blue-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div className="text-[8px] font-semibold text-slate-600">
                  Nectar Curing: <strong className="text-blue-700">Active</strong>
                </div>
              </div>

              {/* Sensor 4: Load Cell Weight */}
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-bold text-amber-900 uppercase">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-600" /> Hive Weight
                  </span>
                </div>
                <div className="my-1">
                  <div className="text-lg sm:text-xl font-black text-slate-900 font-heading leading-tight">
                    41.5<span className="text-xs font-semibold text-slate-500">kg</span>
                  </div>
                  <div className="text-[8px] font-bold text-emerald-700 font-mono mt-0.5">
                    ▲ +1.4 kg nectar today
                  </div>
                </div>
                <div className="text-[8px] font-semibold text-slate-600">
                  Flow Rate: <strong className="text-emerald-700">+220g/hr</strong>
                </div>
              </div>

            </div>

            {/* Telemetry Link Footer */}
            <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-600" /> LoRaWAN 868MHz • RSSI -68dBm
              </span>
              <span className="font-mono text-emerald-700 font-bold">Batt: 94% ⚡</span>
            </div>
          </div>

        </div>
      </div>
    </SceneContainer>
  );
}
