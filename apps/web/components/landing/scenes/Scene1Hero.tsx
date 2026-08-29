"use client";
import React from 'react';
import Link from 'next/link';
import { MotionValue } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene1HeroProps {
  progress: MotionValue<number>;
}

export function Scene1Hero({ progress }: Scene1HeroProps) {
  return (
    <SceneContainer
      progress={progress}
      enterRange={[0, 0]}
      exitRange={[0.15, 0.20]}
      isFirst
      className="z-30 pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-3xl mx-auto">
        {/* Subtle Contrast Shield Scrim to guarantee readability */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/90 via-[#fbf9f4]/60 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-300/80 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-5 shadow-sm shadow-amber-950/5">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span>THE TRUST LAYER FOR HONEY</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-slate-950 tracking-tight leading-[1.05] mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
          FROM HIVE <br className="sm:hidden" />
          <span className="honey-gradient-text">TO HOME.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-xl sm:text-2xl font-bold text-amber-950 font-heading mb-3.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
          Every Drop Has a Story.
        </p>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-7 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
          Honey Chain connects <strong className="text-slate-950 font-bold">hive intelligence</strong>,{' '}
          <strong className="text-slate-950 font-bold">AI-assisted health monitoring</strong>,{' '}
          <strong className="text-slate-950 font-bold">blockchain-backed traceability</strong>, and{' '}
          <strong className="text-slate-950 font-bold">consumer verification</strong> into one connected journey.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-row items-center justify-center gap-3.5 w-full sm:w-auto pointer-events-auto">
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#journey"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-700 bg-white/95 hover:bg-white border border-amber-200/90 hover:border-amber-300 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] backdrop-blur-sm"
          >
            <Compass className="mr-2 w-4 h-4 text-amber-600" />
            <span>Explore the Journey</span>
          </a>
        </div>
      </div>
    </SceneContainer>
  );
}
