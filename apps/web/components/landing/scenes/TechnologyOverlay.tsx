"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Activity, Cpu, ShieldCheck, CheckCircle2, Lock, Sparkles, Layers } from 'lucide-react';

interface TechnologyOverlayProps {
  progress: MotionValue<number>;
}

export function TechnologyOverlay({ progress }: TechnologyOverlayProps) {
  // Reveal window: 0.72 - 0.94
  const overlayOpacity = useTransform(progress, [0.70, 0.76, 0.93, 0.98], [0, 1, 1, 0]);

  // Card 1: Hive Health (Left-Top)
  const card1X = useTransform(progress, [0.72, 0.78], [-40, 0]);
  const card1Opacity = useTransform(progress, [0.72, 0.78], [0, 1]);
  const card1Scale = useTransform(progress, [0.72, 0.78], [0.9, 1]);

  // Card 2: AI Screening (Right-Top)
  const card2X = useTransform(progress, [0.75, 0.81], [40, 0]);
  const card2Opacity = useTransform(progress, [0.75, 0.81], [0, 1]);
  const card2Scale = useTransform(progress, [0.75, 0.81], [0.9, 1]);

  // Card 3: Blockchain & Traceability (Left-Bottom)
  const card3Y = useTransform(progress, [0.79, 0.85], [30, 0]);
  const card3Opacity = useTransform(progress, [0.79, 0.85], [0, 1]);
  const card3Scale = useTransform(progress, [0.79, 0.85], [0.9, 1]);

  // Card 4: Quality Standard (Right-Bottom)
  const card4Y = useTransform(progress, [0.82, 0.88], [30, 0]);
  const card4Opacity = useTransform(progress, [0.82, 0.88], [0, 1]);
  const card4Scale = useTransform(progress, [0.82, 0.88], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity: overlayOpacity }}
      className="absolute inset-0 pointer-events-none flex items-center justify-center p-4 sm:p-8 z-20"
    >
      <div className="w-full max-w-5xl h-full max-h-[580px] relative">
        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

        {/* Card 1: Hive Health (Top Left) */}
        <motion.div
          style={{
            x: card1X,
            opacity: card1Opacity,
            scale: card1Scale,
          }}
          className="absolute top-2 left-2 sm:top-6 sm:left-4 max-w-[280px] w-full rounded-2xl bg-white/85 backdrop-blur-xl border border-amber-300/60 p-4 shadow-xl shadow-amber-950/10 pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-2 border-b border-amber-100/80">
            <div className="flex items-center space-x-2">
              <span className="text-base">🐝</span>
              <span className="text-xs font-bold text-slate-800 tracking-wide font-heading">
                HIVE H-07
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
              ● Healthy
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Health Score
              </div>
              <div className="text-2xl font-black text-slate-900 font-heading">
                92 <span className="text-xs font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-amber-100/60 flex items-center justify-between text-[10px] text-slate-600">
            <span>Temp: <strong>34.8°C</strong></span>
            <span>Humidity: <strong>62%</strong></span>
            <span>Weight: <strong>41.5kg</strong></span>
          </div>
        </motion.div>

        {/* Card 2: AI Screening (Top Right) */}
        <motion.div
          style={{
            x: card2X,
            opacity: card2Opacity,
            scale: card2Scale,
          }}
          className="absolute top-2 right-2 sm:top-6 sm:right-4 max-w-[280px] w-full rounded-2xl bg-white/85 backdrop-blur-xl border border-blue-200/80 p-4 shadow-xl shadow-blue-950/10 pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-2 border-b border-blue-100/80">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 font-heading">
                AI SCREENING
              </span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Edge Model
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-500 font-medium">Confidence Score</div>
              <div className="text-2xl font-black text-blue-900 font-heading">
                87<span className="text-sm font-bold text-blue-600">%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Diagnosis Status</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3 h-3" /> Mite Free
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-blue-100/60 text-[10px] text-slate-500 italic">
            Automated image verification complete
          </div>
        </motion.div>

        {/* Card 3: Traceability & Blockchain (Bottom Left) */}
        <motion.div
          style={{
            y: card3Y,
            opacity: card3Opacity,
            scale: card3Scale,
          }}
          className="absolute bottom-2 left-2 sm:bottom-6 sm:left-4 max-w-[300px] w-full rounded-2xl bg-white/85 backdrop-blur-xl border border-emerald-300/60 p-4 shadow-xl shadow-emerald-950/10 pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100/80">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800 font-heading">
                BLOCKCHAIN PROOF
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300/60">
              ✓ Anchored
            </span>
          </div>

          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Batch Code:</span>
              <span className="font-mono font-bold text-slate-900">BATCH-2026-001</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Tx Hash:</span>
              <span className="font-mono text-[11px] text-emerald-700 font-semibold">0x7f8a...e9b2</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Origin:</span>
              <span className="font-semibold text-slate-800">Coorg, Karnataka</span>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Quality Standard (Bottom Right) */}
        <motion.div
          style={{
            y: card4Y,
            opacity: card4Opacity,
            scale: card4Scale,
          }}
          className="absolute bottom-2 right-2 sm:bottom-6 sm:right-4 max-w-[280px] w-full rounded-2xl bg-white/85 backdrop-blur-xl border border-amber-300/60 p-4 shadow-xl shadow-amber-950/10 pointer-events-auto"
        >
          <div className="flex items-center justify-between pb-2 border-b border-amber-100/80">
            <div className="flex items-center space-x-2">
              <span className="text-base">🧪</span>
              <span className="text-xs font-bold text-slate-800 font-heading">
                LAB PURITY TEST
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              FSSAI / KVIC
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/50">
              <div className="text-[10px] text-slate-500">Moisture</div>
              <div className="text-sm font-bold text-amber-900">18.2%</div>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/50">
              <div className="text-[10px] text-slate-500">Adulteration</div>
              <div className="text-sm font-bold text-emerald-700">0.0%</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
