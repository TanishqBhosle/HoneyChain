"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const heroVisualX = useTransform(smoothX, [-300, 300], [-8, 8]);
  const heroVisualY = useTransform(smoothY, [-300, 300], [-8, 8]);
  const bgGlowX = useTransform(smoothX, [-300, 300], [15, -15]);
  const bgGlowY = useTransform(smoothY, [-300, 300], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Ambient Honey Glow Background */}
      <motion.div
        style={{ x: bgGlowX, y: bgGlowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full bg-gradient-to-br from-amber-300/20 via-amber-400/15 to-transparent blur-[120px] pointer-events-none -z-10"
      />

      {/* Subtle honeycomb grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#d97706 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Value Props */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* 0.4s Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-6 shadow-sm shadow-amber-950/5"
            >
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>THE TRUST LAYER FOR HONEY</span>
            </motion.div>

            {/* 0.6s Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-950 leading-[1.08] tracking-tight mb-6"
            >
              From Hive to Home,{' '}
              <span className="block mt-1 honey-gradient-text">
                Every Drop Has a Story.
              </span>
            </motion.h1>

            {/* 0.8s Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-8"
            >
              Honey Chain connects <span className="font-semibold text-slate-800">hive intelligence</span>,{' '}
              <span className="font-semibold text-slate-800">AI-assisted health monitoring</span>, and{' '}
              <span className="font-semibold text-slate-800">blockchain traceability</span> to make every jar transparent, from beekeeper to consumer.
            </motion.p>

            {/* 1.0s Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8"
            >
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#journey"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-700 bg-white/80 hover:bg-white border border-amber-200/80 hover:border-amber-300 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Compass className="mr-2 w-4 h-4 text-amber-600" />
                <span>Explore the Journey</span>
              </a>
            </motion.div>

            {/* Secondary Small Trust Marker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-500"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Built for beekeepers • supply chains • consumers</span>
            </motion.div>

          </div>

          {/* Right Column: 1.2s Interactive Hero Ecosystem Visual */}
          <motion.div
            style={{ x: heroVisualX, y: heroVisualY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <HeroVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
