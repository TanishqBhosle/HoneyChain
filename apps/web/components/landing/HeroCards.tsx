"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Cpu, QrCode, Sparkles } from 'lucide-react';

export function HeroCards() {
  return (
    <>
      {/* Card 1: Hive Health (Top Left) */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-6 -left-6 sm:top-2 sm:-left-12 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-amber-900/5 max-w-[190px] sm:max-w-[210px] border border-amber-300/40 hover:border-amber-400 transition-all cursor-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              🐝 Hive H-07
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300/60">
              Live
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xs text-slate-500 font-medium">Health Index</span>
            <span className="text-xl font-extrabold text-slate-900 font-heading">
              92<span className="text-xs font-semibold text-slate-400">/100</span>
            </span>
          </div>
          <div className="w-full bg-amber-100/70 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full w-[92%]" />
          </div>
          <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            ✓ Optimal Temp (34.2°C) • Queen Active
          </div>
        </div>
      </motion.div>

      {/* Card 2: AI Screening (Top Right) */}
      <motion.div
        animate={{
          y: [6, -8, 6],
          rotate: [1, -1.5, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="absolute -top-4 -right-4 sm:top-6 sm:-right-8 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-amber-900/5 max-w-[180px] sm:max-w-[200px] border border-amber-300/40 hover:border-amber-400 transition-all cursor-default">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-amber-600" />
              AI Screening
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
              Vision V2
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-0.5">Healthy Comb</div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between">
            <span>Confidence:</span>
            <span className="font-extrabold text-amber-700">96.4%</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500 italic">
            Zero brood stress patterns detected
          </p>
        </div>
      </motion.div>

      {/* Card 3: Blockchain Proof (Bottom Left) */}
      <motion.div
        animate={{
          y: [5, -5, 5],
          rotate: [-1.5, 0.5, -1.5],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute -bottom-6 -left-4 sm:bottom-4 sm:-left-10 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-amber-900/5 max-w-[190px] sm:max-w-[210px] border border-amber-300/40 hover:border-amber-400 transition-all cursor-default">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Blockchain
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
              ✓ Verified
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 bg-amber-50/80 px-2 py-1 rounded border border-amber-200/50 mb-1 truncate">
            Tx: 0x8a9e...4f1d
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Polygon POS • Immutable Batch #2026-001
          </p>
        </div>
      </motion.div>

      {/* Card 4: Consumer QR Origin (Bottom Right) */}
      <motion.div
        animate={{
          y: [-7, 5, -7],
          rotate: [1, -1, 1],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
        className="absolute -bottom-8 -right-4 sm:bottom-2 sm:-right-8 z-20 pointer-events-auto"
      >
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-xl shadow-amber-900/5 max-w-[185px] sm:max-w-[205px] border border-amber-300/40 hover:border-amber-400 transition-all cursor-default">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              QR Verified
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
              FSSAI Passed
            </span>
          </div>
          <div className="text-xs font-bold text-slate-900">Coorg, Karnataka</div>
          <div className="text-[10px] text-slate-500">Multifloral Organic Harvest</div>
          <div className="mt-1.5 text-[10px] text-amber-800 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Direct Beekeeper Payout
          </div>
        </div>
      </motion.div>
    </>
  );
}
