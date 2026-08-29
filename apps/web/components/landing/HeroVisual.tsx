"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HeroCards } from './HeroCards';
import { HoneyFlowPath } from './HoneyFlowPath';
import { Database, Cpu, ShieldCheck, QrCode, Sparkles, Check, ArrowDown } from 'lucide-react';

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-xl mx-auto flex items-center justify-center p-4 sm:p-8 select-none">
      {/* Background Amber Glow Orb */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-300/30 to-amber-500/10 blur-3xl pointer-events-none -z-10" />

      {/* SVG Trace Line */}
      <HoneyFlowPath />

      {/* Central Interactive Glass Core Hub */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-3xl bg-white/80 backdrop-blur-2xl p-6 shadow-2xl shadow-amber-950/10 border border-amber-300/50"
      >
        {/* Core Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/30">
              🍯
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                HONEY CHAIN NETWORK
              </div>
              <div className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Consensus Active
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-1 rounded-md border border-amber-200/60">
            BATCH #001
          </span>
        </div>

        {/* Central Vertical Flow Nodes */}
        <div className="py-4 space-y-3">
          {/* Node 1: IoT Telemetry */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/40 hover:bg-amber-50 transition">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                🐝
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">IoT Hive Sensor Stream</div>
                <div className="text-[10px] text-slate-500">34.2°C • 61% RH • 42.8kg</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>

          <div className="flex justify-center -my-1 text-amber-400">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>

          {/* Node 2: AI Health Classifier */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/40 hover:bg-blue-50 transition">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Edge AI Comb Analysis</div>
                <div className="text-[10px] text-slate-500">Confidence 96.4% • Mite Clean</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
              Screened
            </span>
          </div>

          <div className="flex justify-center -my-1 text-amber-400">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>

          {/* Node 3: Blockchain Hash */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/40 hover:bg-emerald-50 transition">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Immutable Smart Contract</div>
                <div className="text-[10px] font-mono text-slate-500">0x7f8a...e9b2 (KVIC Verified)</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Anchored
            </span>
          </div>
        </div>

        {/* Core Footer Metric */}
        <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-medium">Consumer Verification:</span>
          <span className="font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
            <QrCode className="w-3 h-3 text-amber-700" />
            Verified Origin
          </span>
        </div>
      </motion.div>

      {/* Floating Surrounding Glass Cards */}
      <HeroCards />
    </div>
  );
}
