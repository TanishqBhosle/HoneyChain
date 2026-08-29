"use client";
import React, { useState } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Smartphone, 
  ArrowRight,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function QRSection() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verified'>('idle');

  const startScanSimulation = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
    }, 1800);
  };

  const resetScan = () => {
    setScanState('idle');
  };

  const sampleToken = 'BATCH-2026-001';

  return (
    <section id="qr" className="py-24 md:py-32 relative overflow-hidden bg-cream-50/90 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
              Consumer Trust Layer
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 mt-4 leading-tight">
              From hive to your table with a single scan.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Every jar features a tamper-proof QR passport. Try the interactive verification simulator below to experience what consumers see.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Left: Realistic Honey Package Mockup Card */}
          <div className="lg:col-span-6 flex justify-center">
            <ScrollReveal direction="up" delay={0.2} className="w-full max-w-sm">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-500/10 via-white to-amber-100/30 border-2 border-amber-300 shadow-2xl shadow-amber-900/10 text-center">
                
                {/* Gold Seal Header */}
                <div className="mx-auto w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-xl shadow-lg shadow-amber-500/40 mb-4">
                  🍯
                </div>

                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 mb-1">
                  RAW & UNFILTERED
                </div>
                <h3 className="text-xl font-extrabold font-heading text-slate-900 tracking-tight mb-1">
                  PURE MULTIFLORAL HONEY
                </h3>
                <div className="text-xs font-semibold text-amber-900 flex items-center justify-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  Coorg, Karnataka, India
                </div>

                {/* QR Code Container with Glowing Frame */}
                <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-inner max-w-[180px] mx-auto mb-4 relative group">
                  <div className="flex justify-center">
                    <QRCodeSVG
                      value={`https://honeychain.org/verify/${sampleToken}`}
                      size={140}
                      level="H"
                      includeMargin={false}
                      fgColor="#78350f"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Product Metadata */}
                <div className="text-[11px] text-slate-600 space-y-1 mb-4">
                  <div>
                    <span className="font-semibold text-slate-800">Harvest Date:</span> 12 August 2026
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Batch:</span> HC-COORG-2026-001
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>KVIC & BLOCKCHAIN VERIFIED</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right: Live Interactive Phone Simulator */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" delay={0.3}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-300/60 bg-white/95 shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-amber-100 mb-6">
                  <div className="flex items-center space-x-2.5">
                    <Smartphone className="w-5 h-5 text-amber-600" />
                    <h4 className="text-sm font-extrabold font-heading text-slate-900 uppercase tracking-wider">
                      Live Consumer Scan Terminal
                    </h4>
                  </div>
                  {scanState === 'verified' && (
                    <button
                      onClick={resetScan}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Scan</span>
                    </button>
                  )}
                </div>

                {/* Interactive Simulator State Machine */}
                <AnimatePresence mode="wait">
                  
                  {/* State 1: Ready to Scan */}
                  {scanState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-amber-100/80 text-amber-700 mx-auto flex items-center justify-center text-2xl shadow-inner">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <div>
                        <h5 className="text-base font-bold text-slate-900 font-heading">
                          Simulate Consumer Smartphone Scan
                        </h5>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                          Click below to simulate how instant cryptographic verification resolves on mobile without any app install.
                        </p>
                      </div>
                      <button
                        onClick={startScanSimulation}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/25 transition active:scale-95 flex items-center gap-2 mx-auto"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Scan Honey Jar QR</span>
                      </button>
                    </motion.div>
                  )}

                  {/* State 2: Scanning / Resolving On-Chain */}
                  {scanState === 'scanning' && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="w-16 h-16 rounded-2xl border-4 border-amber-500 border-t-transparent animate-spin" />
                        <Sparkles className="w-6 h-6 text-amber-600 absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 font-heading">
                          Verifying Smart Contract Signatures...
                        </h5>
                        <p className="text-xs font-mono text-amber-700 mt-1">
                          Querying Polygon POS Block #4912250
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* State 3: Confirmed & Provenance Revealed */}
                  {scanState === 'verified' && (
                    <motion.div
                      key="verified"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {/* Success Banner */}
                      <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300/80 text-emerald-900">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold">✓ PRODUCT OFFICIALLY VERIFIED</div>
                          <div className="text-[11px] text-emerald-700">
                            Cryptographically Verified Origin • Lab Tested Standards
                          </div>
                        </div>
                      </div>

                      {/* Revealed Attributes Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Origin Apiary</span>
                          <span className="font-bold text-slate-900">Coorg, Karnataka</span>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Harvest Date</span>
                          <span className="font-bold text-slate-900">12 Aug 2026</span>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Lab Quality</span>
                          <span className="font-bold text-emerald-700">FSSAI Certified Passed</span>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Traceability</span>
                          <span className="font-bold text-amber-800">Complete 8-Stage Audit</span>
                        </div>
                      </div>

                      <div className="pt-2 text-center">
                        <a
                          href={`/verify/${sampleToken}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
                        >
                          <span>Open Full Public Verification Page</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
