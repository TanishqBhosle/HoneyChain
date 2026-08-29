"use client";
import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ArrowRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-[#fbf9f4]">
      {/* Large Honey Glow Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] rounded-full bg-gradient-to-tr from-amber-300/30 via-amber-400/20 to-amber-200/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-white/90 via-amber-50/70 to-white/90 p-8 sm:p-16 text-center border-2 border-amber-300/60 shadow-2xl shadow-amber-900/10 backdrop-blur-2xl max-w-5xl mx-auto overflow-hidden">
            
            {/* Glowing Top Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Ready for Real-World Deployment</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-950 leading-[1.1] tracking-tight mb-6 max-w-3xl mx-auto">
              Make every jar{' '}
              <span className="honey-gradient-text">tell its story.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bring hive intelligence, automated quality testing, and cryptographically verified consumer trust together into one unified platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all active:scale-[0.98]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-800 bg-white/90 hover:bg-white border border-amber-200/80 hover:border-amber-300 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                <Compass className="mr-2 w-5 h-5 text-amber-600" />
                <span>Verify Honey Batch</span>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-amber-100 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                KVIC & FSSAI Aligned
              </span>
              <span>•</span>
              <span>Polygon Smart Contracts</span>
              <span>•</span>
              <span>Zero App Install for Consumers</span>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
