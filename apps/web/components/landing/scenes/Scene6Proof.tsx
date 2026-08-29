"use client";
import React from 'react';
import { MotionValue } from 'framer-motion';
import { ShieldCheck, CheckCircle2, FlaskConical, Link2 } from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene6ProofProps {
  progress: MotionValue<number>;
}

export function Scene6Proof({ progress }: Scene6ProofProps) {
  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.76, 0.80]}
      exitRange={[0.90, 0.94]}
      className="z-30 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-4xl mx-auto">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/85 via-[#fbf9f4]/50 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>06. AI + BLOCKCHAIN PROOF</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-3">
          Immutable Proof on Chain
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-6">
          Cryptographic Merkle proofs paired with government-accredited lab analysis guarantee absolute authenticity.
        </p>

        {/* Paired Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left pointer-events-auto">
          {/* Card 1: Blockchain Proof */}
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-emerald-300/80 p-4 sm:p-5 shadow-xl shadow-emerald-950/10">
            <div className="flex items-center justify-between pb-2.5 border-b border-emerald-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-black text-slate-900 font-heading">
                  BLOCKCHAIN PROOF
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                ✓ Anchored
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Batch ID:</span>
                <span className="font-mono font-bold text-slate-900">BATCH-2026-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tx Hash:</span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">0x7f8a...e9b2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Network:</span>
                <span className="font-semibold text-slate-800">Polygon L2 Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Origin:</span>
                <span className="font-semibold text-slate-800">Coorg, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Card 2: Lab Purity Test */}
          <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-300/80 p-4 sm:p-5 shadow-xl shadow-amber-950/10">
            <div className="flex items-center justify-between pb-2.5 border-b border-amber-100">
              <div className="flex items-center space-x-2">
                <FlaskConical className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black text-slate-900 font-heading">
                  LAB PURITY TEST
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                FSSAI / KVIC
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/60">
                <div className="text-[10px] text-slate-500 font-medium">Moisture</div>
                <div className="text-sm font-black text-amber-900">18.2%</div>
                <div className="text-[9px] text-slate-400">Max 20% limit</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200/60">
                <div className="text-[10px] text-slate-500 font-medium">Adulteration</div>
                <div className="text-sm font-black text-emerald-700">0.0%</div>
                <div className="text-[9px] text-emerald-600">Pure Floral</div>
              </div>
            </div>

            <div className="mt-2.5 text-[10px] text-slate-500 italic text-center">
              Passed NMR & C4 carbon isotope screening
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
}
