"use client";
import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { HeartPulse, TrendingUp, Link2, ShieldCheck } from 'lucide-react';

export function ImpactSection() {
  const impacts = [
    {
      icon: HeartPulse,
      emoji: '🐝',
      title: 'Better Hive Management',
      description: 'Continuous thermal, acoustic, and weight telemetry provide early alerts for temperature spikes or swarming risks, supporting colony longevity.',
      stakeholder: 'For Beekeepers',
    },
    {
      icon: TrendingUp,
      emoji: '📈',
      title: 'Data-Driven Productivity',
      description: 'AI-assisted comb screening and hive telemetry help apiaries optimize seasonal foraging locations and extract honey at peak enzymatic maturity.',
      stakeholder: 'For Apiaries & Co-ops',
    },
    {
      icon: Link2,
      emoji: '🔗',
      title: 'Transparent Supply Chains',
      description: 'Cryptographic records eliminate opaque blending, ensuring fair premium payouts reach authentic beekeepers rather than industrial counterfeiters.',
      stakeholder: 'For Processors & Regulators',
    },
    {
      icon: ShieldCheck,
      emoji: '✓',
      title: 'Consumer Confidence',
      description: 'Direct smartphone QR verification allows consumers to confirm organic origin, lab test certificates, and ethical beekeeper compensation in seconds.',
      stakeholder: 'For Consumers & Families',
    },
  ];

  return (
    <section id="impact" className="py-24 md:py-32 relative overflow-hidden bg-cream-100/60 border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
              Ecosystem Impact
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 mt-4 leading-tight">
              Technology that creates trust at every step.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Designed to uplift local beekeeping communities, safeguard bee populations, and bring complete truth to the global honey economy.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={0.15 + idx * 0.1}
                className="h-full"
              >
                <div className="glass-panel p-7 rounded-3xl h-full flex flex-col justify-between glass-card-hover border border-amber-200/70 bg-white/80 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl p-2.5 bg-amber-50 rounded-2xl border border-amber-200/50">
                        {item.emoji}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300/40">
                        {item.stakeholder}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-heading text-slate-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-amber-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                    <span>Real-world verifiable outcome</span>
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
