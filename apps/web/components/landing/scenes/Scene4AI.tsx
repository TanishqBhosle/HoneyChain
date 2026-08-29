"use client";
import React from 'react';
import { MotionValue } from 'framer-motion';
import { Cpu, CheckCircle2, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene4AIProps {
  progress: MotionValue<number>;
}

export function Scene4AI({ progress }: Scene4AIProps) {
  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.44, 0.48]}
      exitRange={[0.58, 0.62]}
      className="z-30 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-3xl mx-auto">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/85 via-[#fbf9f4]/50 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-300 text-blue-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>04. AI HEALTH MONITORING</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-3">
          AI-Assisted Colony Health Monitoring
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-6">
          Edge neural computer vision models screen brood frames on-device to catch varroa mites and colony stress before symptoms spread.
        </p>

        {/* The Prominent Single AI Card */}
        <div className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-blue-200/90 p-5 sm:p-6 shadow-2xl shadow-blue-950/15 text-left pointer-events-auto">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-blue-100/80">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 font-heading tracking-wide">
                  AI VISION SCREENING
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Edge Neural Model v2.4 • On-Device
                </div>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200 shadow-sm">
              Frame #14 Analysis
            </span>
          </div>

          {/* AI Confidence & Status Spotlight */}
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-400/5 border border-blue-200/70 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-blue-900 font-extrabold uppercase tracking-wider">
                Diagnosis Confidence
              </div>
              <div className="text-3xl sm:text-4xl font-black text-blue-950 font-heading mt-0.5">
                87<span className="text-base font-bold text-blue-600">%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Colony Status</div>
              <div className="text-sm sm:text-base font-black text-emerald-600 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> Mite Free
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Varroa negative</div>
            </div>
          </div>

          {/* Diagnostic Checks Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Brood Pattern Density
              </span>
              <span className="font-bold text-slate-900">98% Solid & Uniform</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Queen Cell Activity
              </span>
              <span className="font-bold text-slate-900">Active & Laying</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] text-emerald-900 font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Recommendation: Colony thriving. Schedule next routine scan in 14 days.</span>
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
