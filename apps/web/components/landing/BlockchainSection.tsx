"use client";
import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ShieldCheck, Check, Lock, Hash, Link as LinkIcon, FileText, CheckCircle2 } from 'lucide-react';

export function BlockchainSection() {
  const batchEvents = [
    { title: 'Harvest Logged & Signed', time: '12 Aug, 09:30 AM', status: 'Passed', block: '#4910281' },
    { title: 'KVIC Quality Test (C4/HMF/Moisture)', time: '13 Aug, 10:15 AM', status: 'Passed', block: '#4910892' },
    { title: 'Cold-Filtered Processing', time: '13 Aug, 04:45 PM', status: 'Passed', block: '#4911420' },
    { title: 'Sterile Bottling & Serialization', time: '14 Aug, 11:20 AM', status: 'Passed', block: '#4912004' },
    { title: 'State Registry Verification', time: '14 Aug, 01:00 PM', status: 'Verified', block: '#4912250' },
  ];

  return (
    <section id="blockchain" className="py-24 md:py-32 relative overflow-hidden bg-charcoal-900 text-white">
      {/* Background Subtle Amber Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30">
              Cryptographic Integrity
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white mt-4 leading-tight">
              Proof, not promises.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed max-w-2xl mx-auto">
              Important supply-chain events are cryptographically anchored so the journey can be independently verified by regulators and consumers alike.
            </p>
          </ScrollReveal>
        </div>

        {/* Proof Ledger Visual Card */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="max-w-4xl mx-auto rounded-3xl bg-charcoal-800/90 border border-amber-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            
            {/* Batch Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
                    BATCH-2026-001
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Multifloral Organic Honey</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Origin: Apiary Alpha, Coorg, Karnataka (Farmer ID: BK-9921)
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>BLOCKCHAIN VERIFIED</span>
              </div>
            </div>

            {/* Event Sequence */}
            <div className="py-6 space-y-4">
              {batchEvents.map((evt, idx) => (
                <div
                  key={evt.title}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-charcoal-900/60 border border-slate-800 hover:border-amber-500/30 transition gap-2"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 font-heading">{evt.title}</h4>
                      <p className="text-xs text-slate-400">{evt.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 self-end sm:self-auto">
                    <span className="text-slate-500">{evt.block}</span>
                    <span className="text-emerald-400 font-bold bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {evt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cryptographic Ledger Summary Footer */}
            <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 font-mono">
              <div className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Consensus: Multi-Sig KVIC + Lab Validator Oracles</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate max-w-sm">
                Root Hash: 0x9e87f1a302bcd6790aee45f099148d
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
