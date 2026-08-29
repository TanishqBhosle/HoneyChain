"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Sparkles, Route } from 'lucide-react';
import { SceneContainer } from './SceneContainer';

interface Scene5TraceabilityProps {
  progress: MotionValue<number>;
}

export function Scene5Traceability({ progress }: Scene5TraceabilityProps) {
  // Golden Path SVG draw progress (from 0% offset to full path draw) for Scene 5 (progress 0.60 -> 0.78)
  const pathOffset = useTransform(progress, [0.61, 0.73], [1000, 0], { clamp: true });

  const node1Opacity = useTransform(progress, [0.61, 0.63], [0, 1], { clamp: true });
  const node2Opacity = useTransform(progress, [0.63, 0.65], [0, 1], { clamp: true });
  const node3Opacity = useTransform(progress, [0.65, 0.67], [0, 1], { clamp: true });
  const node4Opacity = useTransform(progress, [0.67, 0.69], [0, 1], { clamp: true });
  const node5Opacity = useTransform(progress, [0.69, 0.71], [0, 1], { clamp: true });
  const node6Opacity = useTransform(progress, [0.71, 0.73], [0, 1], { clamp: true });

  const stages = [
    { id: 1, title: 'Hive IoT', sub: 'Apiary H-07', icon: '🐝', opacity: node1Opacity, cx: 80, cy: 160 },
    { id: 2, title: 'Harvest', sub: 'Raw 14.2kg', icon: '🍯', opacity: node2Opacity, cx: 240, cy: 90 },
    { id: 3, title: 'AI & Quality', sub: '18.2% Moisture', icon: '🔬', opacity: node3Opacity, cx: 400, cy: 170 },
    { id: 4, title: 'Processing', sub: 'Cold Filtered', icon: '🏭', opacity: node4Opacity, cx: 560, cy: 100 },
    { id: 5, title: 'Blockchain', sub: '0x7f8a... Anchored', icon: '📦', opacity: node5Opacity, cx: 720, cy: 180 },
    { id: 6, title: 'Consumer QR', sub: 'Verified Origin', icon: '✨', opacity: node6Opacity, cx: 880, cy: 110 },
  ];

  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.60, 0.64]}
      exitRange={[0.74, 0.78]}
      className="z-30 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-4xl mx-auto">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/85 via-[#fbf9f4]/50 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
          <Route className="w-3.5 h-3.5 text-amber-600" />
          <span>05. TRACEABILITY PATH</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-3">
          The Golden Traceability Path
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-6">
          Every harvest milestone from forest extraction to packaging is permanently anchored to the chain for verifiable transparency.
        </p>

        {/* The Animated SVG Traceability Stream */}
        <div className="relative w-full aspect-[960/280] max-h-[320px] px-2">
          <svg viewBox="0 0 960 280" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="traceGradS5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
              </linearGradient>
              <filter id="traceGlowS5" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Track Line Background */}
            <path
              d="M 80 160 C 160 160, 160 90, 240 90 C 320 90, 320 170, 400 170 C 480 170, 480 100, 560 100 C 640 100, 640 180, 720 180 C 800 180, 800 110, 880 110"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="4"
              strokeDasharray="6 6"
              opacity="0.5"
            />

            {/* Animated Stream Path */}
            <motion.path
              d="M 80 160 C 160 160, 160 90, 240 90 C 320 90, 320 170, 400 170 C 480 170, 480 100, 560 100 C 640 100, 640 180, 720 180 C 800 180, 800 110, 880 110"
              fill="none"
              stroke="url(#traceGradS5)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={1000}
              style={{ strokeDashoffset: pathOffset }}
              filter="url(#traceGlowS5)"
            />
          </svg>

          {/* Node Badges */}
          {stages.map((stage) => (
            <motion.div
              key={stage.id}
              style={{
                left: `${(stage.cx / 960) * 100}%`,
                top: `${(stage.cy / 280) * 100}%`,
                opacity: stage.opacity,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute flex flex-col items-center pointer-events-auto"
            >
              {/* Glass Node Sphere */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300 shadow-lg shadow-amber-900/10 flex items-center justify-center text-base sm:text-lg mb-1.5 hover:scale-110 transition-transform">
                {stage.icon}
              </div>

              {/* Node Card Tag */}
              <div className="bg-white/95 backdrop-blur-lg border border-amber-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl shadow-md text-center whitespace-nowrap">
                <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 font-heading">
                  {stage.title}
                </div>
                <div className="text-[8px] sm:text-[9px] font-medium text-amber-800">
                  {stage.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneContainer>
  );
}
