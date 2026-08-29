"use client";
import React from 'react';
import { MotionValue } from 'framer-motion';
import { Flower2, MapPin, Activity, Cpu, ShieldCheck, CheckCircle2, FlaskConical } from 'lucide-react';
import { SceneContainer } from './SceneContainer';
import { BeeFlightScene } from './BeeFlightScene';
import { HoneyDropScene } from './HoneyDropScene';

interface Scene2HarvestProps {
  progress: MotionValue<number>;
}

export function Scene2Harvest({ progress }: Scene2HarvestProps) {
  // Shared identical card base class
  const cardBase = "w-full rounded-2xl bg-white/95 backdrop-blur-xl border border-amber-300/80 p-3 sm:p-3.5 shadow-lg shadow-amber-950/5 flex flex-col justify-between h-[134px] sm:h-[142px] transition-all hover:shadow-xl hover:border-amber-400 text-left";

  return (
    <>
      {/* Background Animated Droplet Dynamics (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <HoneyDropScene progress={progress} />
      </div>

      {/* Background Animated Bee Flight Dynamics (Traverses Left to Right in Foreground) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-35">
        <BeeFlightScene progress={progress} />
      </div>

      {/* Foreground Focused Content */}
      <SceneContainer
        progress={progress}
        enterRange={[0.18, 0.23]}
        exitRange={[0.37, 0.42]}
        className="z-30 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center"
      >
        <div className="flex flex-col items-center relative max-w-5xl mx-auto w-full">
          {/* Contrast Scrim */}
          <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/90 via-[#fbf9f4]/60 to-transparent blur-2xl pointer-events-none -z-10" />

          {/* Top Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/95 border border-amber-300 text-amber-950 text-[11px] font-extrabold uppercase tracking-wider mb-2 shadow-sm">
            <Flower2 className="w-3.5 h-3.5 text-amber-600" />
            <span>02. BEE & NECTAR FLOW</span>
          </div>

          {/* Primary Heading */}
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            From Forest Blossom to Sealed Jar
          </h2>

          {/* Supporting Subtitle */}
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-xl mb-4">
            Ethically harvested raw multifloral honey from Western Ghats canopy apiaries, synchronized across IoT, AI diagnosis, blockchain, and purity metrics.
          </p>

          {/* 5 Identical-Sized KPI Cards: Center Hero Card with 4 Surrounding Cards */}
          <div className="w-full max-w-5xl mx-auto pointer-events-auto">
            
            {/* Desktop / Tablet 3-Column Layout: Left (2 cards) | Center (1 Hero card) | Right (2 cards) */}
            <div className="hidden md:grid md:grid-cols-3 gap-3.5 items-center">
              
              {/* Left Column: Top-Left (Hive IoT) & Bottom-Left (Blockchain Proof) */}
              <div className="flex flex-col gap-3.5">
                {/* Card 1: Hive IoT (Top-Left) */}
                <div className={cardBase}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">🐝</span>
                      <span className="text-xs font-bold text-slate-900 tracking-wide font-heading">
                        HIVE H-07
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                      ● Healthy
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Health Score
                      </div>
                      <div className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                        92 <span className="text-[10px] font-semibold text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-600">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                    <span>Temp: <strong>34.8°C</strong></span>
                    <span>Humidity: <strong>62%</strong></span>
                    <span>Weight: <strong>41.5kg</strong></span>
                  </div>
                </div>

                {/* Card 2: Blockchain Proof (Bottom-Left) */}
                <div className={cardBase}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-900 font-heading">
                        BLOCKCHAIN PROOF
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/60">
                      ✓ Anchored
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Batch Code
                      </div>
                      <div className="text-xs sm:text-sm font-black font-mono text-slate-900">
                        BATCH-2026-001
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      0x7f8a...e9b2
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                    <span>Origin: <strong>Coorg</strong></span>
                    <span>Network: <strong>Polygon</strong></span>
                    <span>Block: <strong>#48291</strong></span>
                  </div>
                </div>
              </div>

              {/* Center Column: Card 0 (Raw Multifloral Honey - Centered in middle of the 4 cards) */}
              <div className="flex flex-col justify-center items-center">
                <div className={`${cardBase} border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/50 shadow-xl shadow-amber-950/15`}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">🍯</span>
                      <div className="text-xs font-black text-slate-900 font-heading uppercase tracking-wider">
                        RAW MULTIFLORAL
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      100% Pure Raw
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Canopy Harvest
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-950 font-heading flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" /> Coorg Apiary
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300/70">
                        Wild Flora
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-amber-200/70 flex items-center justify-between text-[9px] text-slate-700">
                    <span>Ext: <strong>Cold Pressed</strong></span>
                    <span>Moist: <strong className="text-amber-900">18.2%</strong></span>
                    <span>Filter: <strong>Micro (Raw)</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Top-Right (AI Screening) & Bottom-Right (Lab Purity Test) */}
              <div className="flex flex-col gap-3.5">
                {/* Card 3: AI Screening (Top-Right) */}
                <div className={cardBase}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded bg-blue-500/10 text-blue-600 flex items-center justify-center">
                        <Cpu className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-heading">
                        AI SCREENING
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      Edge Model
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Confidence Score
                      </div>
                      <div className="text-lg sm:text-xl font-black text-blue-900 font-heading">
                        87<span className="text-xs font-bold text-blue-600">%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-slate-400">Diagnosis</div>
                      <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Mite Free
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                    <span>Vision: <strong>ResNet-50</strong></span>
                    <span>Frames: <strong>4.2k</strong></span>
                    <span>Status: <strong className="text-emerald-600">Optimal</strong></span>
                  </div>
                </div>

                {/* Card 4: Lab Purity Test (Bottom-Right) */}
                <div className={cardBase}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                    <div className="flex items-center space-x-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900 font-heading">
                        LAB PURITY TEST
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                      FSSAI / KVIC
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Purity Rating
                      </div>
                      <div className="text-sm sm:text-base font-black text-emerald-800 font-heading">
                        100% Pure
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-slate-400">Adulteration</div>
                      <div className="text-[10px] font-bold text-emerald-700">
                        0.0% Detected
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                    <span>C4 Isotope: <strong className="text-emerald-700">Pass</strong></span>
                    <span>HMF: <strong>&lt;10mg</strong></span>
                    <span>Tests: <strong>18/18</strong></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile / Small Screen Layout (< md) */}
            <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto">
              {/* Card 0: Raw Multifloral Honey (Hero Center) */}
              <div className="sm:col-span-2">
                <div className={`${cardBase} border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/50 shadow-xl shadow-amber-950/15`}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">🍯</span>
                      <div className="text-xs font-black text-slate-900 font-heading uppercase tracking-wider">
                        RAW MULTIFLORAL
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      100% Pure Raw
                    </span>
                  </div>

                  <div className="my-1 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">
                        Canopy Harvest
                      </div>
                      <div className="text-xs sm:text-sm font-black text-amber-950 font-heading flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" /> Coorg Apiary
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300/70">
                        Wild Flora
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-amber-200/70 flex items-center justify-between text-[9px] text-slate-700">
                    <span>Ext: <strong>Cold Pressed</strong></span>
                    <span>Moist: <strong className="text-amber-900">18.2%</strong></span>
                    <span>Filter: <strong>Micro (Raw)</strong></span>
                  </div>
                </div>
              </div>

              {/* Card 1: Hive IoT */}
              <div className={cardBase}>
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm">🐝</span>
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      HIVE H-07
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                    ● Healthy
                  </span>
                </div>
                <div className="my-1 flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900">Health: 92/100</div>
                  <Activity className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                  <span>34.8°C</span>
                  <span>62% Hum</span>
                  <span>41.5kg</span>
                </div>
              </div>

              {/* Card 3: AI Screening */}
              <div className={cardBase}>
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                  <div className="flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      AI SCREENING
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    87% Conf
                  </span>
                </div>
                <div className="my-1 text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mite Free
                </div>
                <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                  <span>ResNet-50</span>
                  <span>4.2k Frames</span>
                  <span>Optimal</span>
                </div>
              </div>

              {/* Card 2: Blockchain Proof */}
              <div className={cardBase}>
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      BLOCKCHAIN
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    ✓ Anchored
                  </span>
                </div>
                <div className="my-1 font-mono text-[10px] font-bold text-slate-900">
                  BATCH-2026-001
                </div>
                <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                  <span>0x7f8a...e9b2</span>
                  <span>Polygon</span>
                </div>
              </div>

              {/* Card 4: Lab Purity Test */}
              <div className={cardBase}>
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-100/80">
                  <div className="flex items-center space-x-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      LAB PURITY
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                    100% Pure
                  </span>
                </div>
                <div className="my-1 text-xs font-bold text-emerald-700">
                  0.0% Adulteration
                </div>
                <div className="pt-1.5 border-t border-amber-100/60 flex items-center justify-between text-[9px] text-slate-600">
                  <span>C4: Pass</span>
                  <span>18/18 Tests</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </SceneContainer>
    </>
  );
}

