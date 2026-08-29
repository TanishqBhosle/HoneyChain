"use client";
import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { EyeOff, SearchX, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: '🐝',
      subIcon: EyeOff,
      title: 'Limited Hive Visibility',
      description: 'Beekeepers often lack continuous hive intelligence. Unexpected colony collapse, humidity swings, and undetected pests lead to avoidable losses.',
      impact: 'Up to 30% colony mortality without real-time telemetry.',
    },
    {
      icon: '🔍',
      subIcon: SearchX,
      title: 'Invisible Supply Chains',
      description: 'Consumers cannot easily verify where honey came from once jars enter industrial blending and distribution pipelines.',
      impact: '73% of consumers report difficulty validating pure origin.',
    },
    {
      icon: '⚠️',
      subIcon: AlertTriangle,
      title: 'Trust & Authenticity Gaps',
      description: 'Authenticity and provenance are difficult to verify without tamper-proof cryptographic audit trails from apiary to shelf.',
      impact: 'Adulteration with sugar syrups damages honest beekeepers.',
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 relative overflow-hidden bg-cream-100/60 border-y border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300/50">
              The Current Reality
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 mt-4 leading-tight">
              The journey of honey shouldn't disappear inside the jar.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
              Traditional honey production relies on fragmented paper logs and opaque middlemen, leaving beekeepers undervalued and buyers uncertain.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((prob, idx) => {
            const SubIcon = prob.subIcon;
            return (
              <ScrollReveal
                key={prob.title}
                direction="up"
                delay={0.2 + idx * 0.15}
                className="h-full"
              >
                <div className="glass-panel p-7 rounded-3xl h-full flex flex-col justify-between glass-card-hover border border-amber-200/60 bg-white/70 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl p-3 bg-amber-50 rounded-2xl border border-amber-200/50 shadow-inner">
                        {prob.icon}
                      </span>
                      <span className="p-2 rounded-xl bg-amber-100/60 text-amber-800">
                        <SubIcon className="w-4 h-4" />
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">
                      {prob.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {prob.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-100 flex items-center text-xs font-semibold text-amber-900 bg-amber-50/50 -mx-3 -mb-3 p-3 rounded-b-2xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 flex-shrink-0" />
                    <span>{prob.impact}</span>
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
