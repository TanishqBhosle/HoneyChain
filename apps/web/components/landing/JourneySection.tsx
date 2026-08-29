"use client";
import React, { useState } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { Radio, BrainCircuit, Droplets, ShieldCheck, QrCode, ArrowRight, Check } from 'lucide-react';

export function JourneySection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      tag: 'MONITOR',
      title: 'IoT Sensor Stream',
      description: 'Continuous monitoring of temperature, humidity, hive weight, and acoustic patterns directly inside the brood box.',
      icon: Radio,
      detail: 'Sensors transmit telemetry via LoRaWAN/GSM every 15 minutes to prevent swarming and distress.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      num: '02',
      tag: 'UNDERSTAND',
      title: 'AI Health Screening',
      description: 'Computer vision algorithms assist beekeepers in detecting early Varroa mite infestations, foulbrood, and queen health anomalies.',
      icon: BrainCircuit,
      detail: 'Assists human inspection with instant confidence metrics and localized risk indicators.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      num: '03',
      tag: 'HARVEST',
      title: 'Source Recorded Harvest',
      description: 'The beekeeper logs exact yield, floral source, and geolocation right at the apiary with digital signatures.',
      icon: Droplets,
      detail: 'Origin is locked at the moment of extraction, preventing unauthorized blending.',
      color: 'from-amber-600 to-amber-700',
    },
    {
      num: '04',
      tag: 'TRACE',
      title: 'Cryptographic Ledger',
      description: 'Quality parameters, lab testing results, and processing stages are immutably anchored on-chain.',
      icon: ShieldCheck,
      detail: 'Zero alteration possible — moisture, HMF levels, and sucrose ratios are permanently audited.',
      color: 'from-emerald-600 to-emerald-700',
    },
    {
      num: '05',
      tag: 'VERIFY',
      title: 'Consumer QR Verification',
      description: 'End consumers scan a tamper-evident QR code on the jar to view the unalterable timeline of their exact honey.',
      icon: QrCode,
      detail: 'Instant transparency on origin apiary, farmer identity, testing certificates, and packing dates.',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <section id="journey" className="py-24 md:py-32 relative overflow-hidden bg-[#fdfaf3]">
      {/* Background Flow Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-200/20 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
              The Architecture
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 mt-4 leading-tight">
              One connected journey.{' '}
              <span className="honey-gradient-text">From hive to home.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Every drop is monitored, screened, verified, and anchored across 5 synchronized stages.
            </p>
          </ScrollReveal>
        </div>

        {/* 5 Journey Steps (Horizontal on desktop / Stack on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = activeStep === idx;
            return (
              <ScrollReveal
                key={step.num}
                direction="up"
                delay={0.15 + idx * 0.1}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`h-full rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                    isHovered
                      ? 'bg-white shadow-xl shadow-amber-900/10 border-amber-400 -translate-y-2 scale-[1.02]'
                      : 'bg-white/70 hover:bg-white/90 border-amber-200/60 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Number and Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-heading text-amber-500/80">
                        {step.num}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-300/40">
                        {step.tag}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-4 text-amber-700 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-bold font-heading text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 text-[11px] text-amber-900/90 font-medium">
                    {step.detail}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}
