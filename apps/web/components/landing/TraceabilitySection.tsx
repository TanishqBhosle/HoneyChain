"use client";
import React, { useState } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { motion } from 'framer-motion';
import { 
  Box, 
  MapPin, 
  Droplets, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Package, 
  QrCode, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function TraceabilitySection() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'hive',
      name: 'Hive',
      icon: Box,
      location: 'Apiary Alpha, Coorg',
      timestamp: '12 Aug 2026, 06:30 AM',
      txHash: '0x3a4b...89c1',
      actor: 'Hive Unit H-07 (IoT Node)',
      status: 'Continuous Monitoring Active',
      metrics: [
        { label: 'Temp', val: '34.2°C' },
        { label: 'Humidity', val: '61%' },
        { label: 'Health Score', val: '92/100' },
      ],
      description: 'Internal temperature, acoustic resonance, and brood metrics captured live via solar-powered telemetry sensors.',
    },
    {
      id: 'apiary',
      name: 'Apiary',
      icon: MapPin,
      location: 'Western Ghats Bio-Reserve',
      timestamp: '12 Aug 2026, 09:00 AM',
      txHash: '0x4d5e...90f2',
      actor: 'Ramesh Kumar (Master Beekeeper)',
      status: 'KVIC Certified Apiary #108',
      metrics: [
        { label: 'Altitude', val: '1,120 m' },
        { label: 'Flora', val: 'Wild Multifloral' },
        { label: 'Active Hives', val: '48' },
      ],
      description: 'Geofenced apiary boundary verified on satellite maps. Organic forage perimeter with zero synthetic pesticide exposure.',
    },
    {
      id: 'harvest',
      name: 'Harvest',
      icon: Droplets,
      location: 'Extraction Shed, Sector 4',
      timestamp: '12 Aug 2026, 11:15 AM',
      txHash: '0x5e6f...01a3',
      actor: 'Harvest Logging Terminal',
      status: 'Batch #2026-001 Created',
      metrics: [
        { label: 'Weight Extracted', val: '240 kg' },
        { label: 'Extraction', val: 'Cold Centrifugal' },
        { label: 'Moisture Est.', val: '17.2%' },
      ],
      description: 'Raw honey extracted using low-temperature centrifuging to preserve delicate natural bee enzymes and active antioxidants.',
    },
    {
      id: 'collection',
      name: 'Collection',
      icon: Building2,
      location: 'Regional Hub, Madikeri',
      timestamp: '12 Aug 2026, 03:45 PM',
      txHash: '0x6f7a...12b4',
      actor: 'KVIC Regional Aggregator',
      status: 'Secure Sealed Transit',
      metrics: [
        { label: 'Container ID', val: 'SS-304-A9' },
        { label: 'Gross Weight', val: '240.2 kg' },
        { label: 'Seal Code', val: 'SL-9941' },
      ],
      description: 'Food-grade stainless steel drums locked with tamper-evident digital NFC seals; transit route tracked by GPS.',
    },
    {
      id: 'quality',
      name: 'Quality',
      icon: CheckCircle2,
      location: 'National Honey Testing Lab',
      timestamp: '13 Aug 2026, 10:00 AM',
      txHash: '0x7a8b...23c5',
      actor: 'Dr. Priya Devi (Cert. Officer)',
      status: 'FSSAI & C4-Sugar Tested: PASSED',
      metrics: [
        { label: 'Moisture', val: '17.4% (Max 20%)' },
        { label: 'HMF', val: '12 mg/kg (<40)' },
        { label: 'C4 Sugars', val: '0.0% (Clean)' },
      ],
      description: 'Complete NMR spectroscopy and isotopic mass spectrometry confirming zero adulteration and authentic floral pollen profile.',
    },
    {
      id: 'processing',
      name: 'Processing',
      icon: Cpu,
      location: 'Apex Processing Unit, Mysore',
      timestamp: '13 Aug 2026, 04:30 PM',
      txHash: '0x8b9c...34d6',
      actor: 'Batching Controller Unit',
      status: 'Micro-filtered & Raw Settled',
      metrics: [
        { label: 'Max Process Temp', val: '38°C (Raw)' },
        { label: 'Pollen Retained', val: '99.1%' },
        { label: 'Batch Vol', val: '238.5 kg' },
      ],
      description: 'Gentle micro-filtration removes hive wax fragments without overheating, keeping bioactive pollen and diastase enzymes intact.',
    },
    {
      id: 'packaging',
      name: 'Packaging',
      icon: Package,
      location: 'Packaging Line 2',
      timestamp: '14 Aug 2026, 09:30 AM',
      txHash: '0x9c0d...45e7',
      actor: 'Automated Bottling Line',
      status: 'Serialized QR Assigned',
      metrics: [
        { label: 'Jar Size', val: '500g Glass' },
        { label: 'Units Packaged', val: '476 Jars' },
        { label: 'Expiry', val: 'Aug 2028' },
      ],
      description: 'Each individual jar is sealed with a unique cryptographically linked QR code mapped to this specific batch ledger entry.',
    },
    {
      id: 'consumer',
      name: 'Consumer',
      icon: QrCode,
      location: 'Retail Shelf / Doorstep',
      timestamp: 'Immediate Verification',
      txHash: '0x0d1e...56f8',
      actor: 'End Consumer Scan',
      status: 'Provenance Confirmed',
      metrics: [
        { label: 'Scans', val: 'Live Instant' },
        { label: 'Authenticity', val: 'Verified' },
        { label: 'Farmer Direct', val: 'Verified' },
      ],
      description: 'Consumer scans jar via phone camera to inspect the full unadulterated provenance story from apiary flowers to breakfast table.',
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="traceability" className="py-24 md:py-32 relative overflow-hidden bg-cream-50/70 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
              End-to-End Provenance
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 mt-4 leading-tight">
              Know where every jar came from.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Click through the 8 stages below to inspect the real cryptographic events and laboratory parameters stored on-chain.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive 8-Stage Timeline Navigation */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="mb-10 p-3 sm:p-4 rounded-3xl bg-white/80 border border-amber-200/70 backdrop-blur-xl shadow-sm">
            <div className="flex items-center justify-between overflow-x-auto pb-2 sm:pb-0 gap-2 scrollbar-none">
              {stages.map((stg, idx) => {
                const Icon = stg.icon;
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setActiveStage(idx)}
                    className={`flex-1 min-w-[95px] flex flex-col items-center py-3 px-2 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 scale-105'
                        : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50/70'
                    }`}
                  >
                    <div className={`p-2 rounded-xl mb-1.5 ${isActive ? 'bg-white/20' : 'bg-amber-100/60'}`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-800'}`} />
                    </div>
                    <span className="text-xs font-bold font-heading whitespace-nowrap">
                      {stg.name}
                    </span>
                    <span className={`text-[9px] font-semibold ${isActive ? 'text-amber-100' : 'text-slate-400'}`}>
                      Step 0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Detailed Stage Ledger Card */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-300/60 bg-white shadow-xl shadow-amber-950/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Stage Metadata */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                    Stage 0{activeStage + 1} of 08
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {current.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                    {current.name}: <span className="honey-gradient-text">{current.location}</span>
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/50">
                      <div className="text-[10px] uppercase font-bold text-slate-500">{m.label}</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Cryptographic On-Chain Receipt Preview */}
              <div className="lg:col-span-5 bg-slate-950 text-slate-200 p-6 rounded-2xl font-mono text-xs space-y-3 border border-amber-500/20 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ON-CHAIN BLOCK RECORD
                  </span>
                  <span className="text-[10px] text-slate-400">POLYGON-POS</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-slate-500 block text-[10px]">RECORDING ACTOR</span>
                    <span className="text-slate-200 font-semibold">{current.actor}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">TIMESTAMP</span>
                    <span className="text-amber-200">{current.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">TRANSACTION HASH</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded inline-block">
                      {current.txHash}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">MERKLE STATE ROOT</span>
                    <span className="text-slate-400 truncate block text-[11px]">
                      0x9812eacbf771092a543881efba029198
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Cryptographic Proof</span>
                  <span className="text-amber-400 font-semibold">Blockchain Anchored</span>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
