"use client";
import React from 'react';
import { MotionValue } from 'framer-motion';
import { Activity, Thermometer, Droplet, Scale, Radio } from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene3HiveProps {
  progress: MotionValue<number>;
}

export function Scene3Hive({ progress }: Scene3HiveProps) {
  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.28, 0.32]}
      exitRange={[0.42, 0.46]}
      className="z-30 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-3xl mx-auto">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/85 via-[#fbf9f4]/50 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
          <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>03. HIVE INTELLIGENCE</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-3">
          Real-Time Hive Telemetry
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-6">
          Autonomous solar IoT sensors track hive thermal regulation, acoustics, and weight gains 24/7 to protect colony health.
        </p>

        {/* The Prominent Single Hive Card */}
        <div className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-amber-300/80 p-5 sm:p-6 shadow-2xl shadow-amber-950/15 text-left pointer-events-auto">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-amber-100/80">
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl">🐝</span>
              <div>
                <div className="text-sm font-black text-slate-900 font-heading tracking-wide">
                  HIVE H-07
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Western Ghats Apiary • Node #041
                </div>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Optimal Vitality
            </span>
          </div>

          {/* Health Score Spotlight */}
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-yellow-300/10 border border-amber-200/80 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-amber-900 font-extrabold uppercase tracking-wider">
                Colony Health Score
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-950 font-heading mt-0.5">
                92 <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          {/* 4 Sensor Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
                <Thermometer className="w-3 h-3 text-red-500" /> Temp
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-1">34.8°C</div>
              <div className="text-[9px] text-emerald-600 font-medium">Optimal brood</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
                <Droplet className="w-3 h-3 text-blue-500" /> Humidity
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-1">62%</div>
              <div className="text-[9px] text-emerald-600 font-medium">Ideal curing</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
                <Scale className="w-3 h-3 text-amber-500" /> Weight
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-1">41.5kg</div>
              <div className="text-[9px] text-amber-700 font-medium">+1.8kg flow</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
                <Radio className="w-3 h-3 text-purple-500" /> Frequency
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-1">240 Hz</div>
              <div className="text-[9px] text-emerald-600 font-medium">Calm queen</div>
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
