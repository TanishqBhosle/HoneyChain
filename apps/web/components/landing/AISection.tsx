"use client";
import React, { useState } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { 
  BrainCircuit, 
  Scan, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Sparkles,
  Camera,
  RefreshCw
} from 'lucide-react';

export function AISection() {
  const [analyzing, setAnalyzing] = useState(false);

  const triggerRescan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <section id="ai" className="py-24 md:py-32 relative overflow-hidden bg-[#fbf9f4] border-b border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive AI Screening Visual Card */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-300/60 bg-white/95 shadow-2xl shadow-amber-950/10 relative overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-amber-100 mb-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm">
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-heading">
                        Edge Vision Screening Model
                      </h3>
                      <p className="text-xs text-slate-500">Comb Pattern & Brood Analysis v2.4</p>
                    </div>
                  </div>
                  <button
                    onClick={triggerRescan}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1.5 transition border border-amber-200/60"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
                    <span>Rescan</span>
                  </button>
                </div>

                {/* Comb Scan Visual Representation */}
                <div className="relative rounded-2xl bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 h-56 sm:h-64 flex items-center justify-center overflow-hidden border border-amber-900/40 p-4">
                  {/* Hexagon Pattern Grid */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(#f59e0b 1.5px, transparent 1.5px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Laser Scan Line Effect */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse" style={{ top: '45%' }} />

                  {/* Bounding Box 1: Healthy Capped Brood */}
                  <div className="absolute top-10 left-12 border-2 border-emerald-400 bg-emerald-500/10 rounded-lg px-2 py-1 flex items-center gap-1 text-[10px] text-emerald-300 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Capped Brood: Normal (98%)
                  </div>

                  {/* Bounding Box 2: Detected Anomaly */}
                  <div className="absolute bottom-12 right-12 border-2 border-amber-400 bg-amber-500/20 rounded-lg p-2 text-left max-w-[170px] shadow-lg animate-pulse">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300 font-mono mb-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      Possible Indicator
                    </div>
                    <div className="text-[9px] text-amber-100 leading-tight">
                      Cell irregularity noticed in sector C-4
                    </div>
                  </div>

                  <div className="text-center z-10">
                    <Camera className="w-8 h-8 text-amber-400/80 mx-auto mb-2" />
                    <span className="text-xs font-mono text-amber-200/90 bg-black/40 px-3 py-1 rounded-full border border-amber-500/30">
                      FRAME #04 • COMB SECTOR BETA
                    </span>
                  </div>
                </div>

                {/* AI Screening Classification Box */}
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        AI SCREENING RESULT
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 font-heading">
                        Possible stress indicator
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Confidence
                      </span>
                      <span className="text-lg font-black text-amber-700 font-heading">
                        87%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-amber-200/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full w-[87%]" />
                  </div>

                  <div className="flex items-start space-x-2 text-xs text-slate-700 pt-1">
                    <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <span className="font-semibold text-slate-900">Recommended Action:</span> Inspect hive brood frame #04 and monitor worker flight frequency over the next 24 hours.
                    </p>
                  </div>
                </div>

                {/* Responsible AI Disclaimer */}
                <p className="mt-3 text-[10px] text-slate-400 italic text-center">
                  * Note: AI outputs are screening aids designed to assist beekeeper decisions, not definitive veterinary diagnoses.
                </p>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
                Early Intervention
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 leading-tight">
                AI that helps beekeepers see earlier.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base text-slate-600 leading-relaxed">
                Beekeepers can snap high-resolution photos during routine frame inspections. Our lightweight on-device vision model screens for visual patterns associated with Varroa mite clustering, chalkbrood, and queen cell formation before colonies are compromised.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    🔍 Optical Density & Comb Health Profiling
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluates capped versus uncapped brood ratios to quantify queen laying vigor across seasons.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200/60 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    📱 Offline Edge Inference
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Runs directly in the mobile browser or field terminal even when apiary cell reception is unavailable.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
