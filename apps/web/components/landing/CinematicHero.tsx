"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PollenParticles } from '@/components/motion/PollenParticles';
import { HoneycombScene } from './scenes/HoneycombScene';
import { Scene1Hero } from './scenes/Scene1Hero';
import { Scene2Harvest } from './scenes/Scene2Harvest';
import { Scene3Traceability } from './scenes/Scene3Traceability';
import { Scene4TechOverlay } from './scenes/Scene4TechOverlay';
import { Scene5Verified } from './scenes/Scene5Verified';

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStageText, setCurrentStageText] = useState("01. THE TRUST LAYER");

  // Master Scroll Progress for the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.20) setCurrentStageText("01. THE TRUST LAYER");
    else if (v < 0.42) setCurrentStageText("02. BEE & NECTAR FLOW");
    else if (v < 0.64) setCurrentStageText("03. TRACEABILITY PATH");
    else if (v < 0.86) setCurrentStageText("04. AI VISION & TELEMETRY");
    else setCurrentStageText("05. VERIFIED AUTHENTIC HONEY");
  });

  // Center scroll hint fades out immediately when scrolling starts
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0], { clamp: true });
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"], { clamp: true });

  return (
    <div
      ref={containerRef}
      id="hero-journey"
      className="relative h-[500vh] w-full bg-[#fbf9f4] selection:bg-amber-200 selection:text-amber-950"
    >
      {/* Pinned 100vh Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Layer 1: Ambient Forest & Golden Sunlight Backdrop */}
        <div className="absolute inset-0 pointer-events-none -z-20">
          <div className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-amber-300/25 via-amber-400/15 to-transparent blur-[140px]" />
          <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-amber-400/20 via-yellow-200/20 to-transparent blur-[130px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[50vw] rounded-full bg-gradient-to-t from-amber-500/10 via-amber-200/15 to-transparent blur-[120px]" />
          
          {/* Subtle natural honeycomb grid texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(#b45309 1.2px, transparent 1.2px)`,
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        {/* Layer 2: Floating Pollen & Sunbeam Particles */}
        <PollenParticles count={24} />

        {/* Layer 3: Persistent Ambient Honeycomb Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 px-4">
          <HoneycombScene progress={scrollYProgress} />
        </div>

        {/* Layer 4: Discrete 5-Scene Interactive Storyboard Canvas */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
          {/* SCENE 1: THE TRUST LAYER */}
          <Scene1Hero progress={scrollYProgress} />

          {/* SCENE 2: BEE FLIGHT & NECTAR FLOW */}
          <Scene2Harvest progress={scrollYProgress} />

          {/* SCENE 3: THE GOLDEN TRACEABILITY PATH */}
          <Scene3Traceability progress={scrollYProgress} />

          {/* SCENE 4: CONNECTED INTELLIGENCE - ALL 4 KPI CARDS AT ONCE */}
          <Scene4TechOverlay progress={scrollYProgress} />

          {/* SCENE 5: VERIFIED AUTHENTIC HONEY */}
          <Scene5Verified progress={scrollYProgress} />
        </div>

        {/* Layer 5: Bottom Cinematic Story HUD & Navigation Controls */}
        <div className="relative z-40 pb-5 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-end justify-between pointer-events-none">
          
          {/* Active Story Stage Indicator */}
          <div className="bg-white/95 backdrop-blur-xl border border-amber-200/90 px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-950/5 flex items-center space-x-3 pointer-events-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">
                CINEMATIC JOURNEY
              </span>
              <span className="text-xs font-black text-slate-900 font-heading">
                {currentStageText}
              </span>
            </div>
          </div>

          {/* Center Scroll Hint (Fades out cleanly upon initial scroll) */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="hidden md:flex flex-col items-center text-amber-900/80 text-xs font-bold tracking-widest uppercase animate-bounce drop-shadow-sm pointer-events-none"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 mt-0.5 text-amber-600" />
          </motion.div>

          {/* Story Progress Bar */}
          <div className="bg-white/95 backdrop-blur-xl border border-amber-200/90 px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-950/5 flex items-center space-x-3 pointer-events-auto">
            <div className="w-24 sm:w-36 h-2 bg-amber-100 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressBarWidth }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-sm"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800">
              STORY
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}


