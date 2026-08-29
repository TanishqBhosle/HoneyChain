"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { VeoVideoAdapter } from './VeoVideoAdapter';
import { ShieldCheck, Cpu, Droplets, CheckCircle, Package, ScanLine, Sparkles } from 'lucide-react';

interface TraceabilitySceneProps {
  progress: MotionValue<number>;
}

export function TraceabilityScene({ progress }: TraceabilitySceneProps) {
  // Reveal between scroll 0.58 and 0.95
  const sceneOpacity = useTransform(progress, [0.55, 0.64, 0.94, 0.99], [0, 1, 1, 0.2]);
  const sceneScale = useTransform(progress, [0.58, 0.72, 0.92], [0.92, 1, 1.04]);

  // Golden Path SVG draw progress (from 0% offset to full path draw)
  // Length of path ~ 1000
  const pathOffset = useTransform(progress, [0.60, 0.85], [1000, 0]);

  // Node 1: HIVE (0.62)
  const node1Opacity = useTransform(progress, [0.60, 0.64], [0, 1]);
  const node1Scale = useTransform(progress, [0.60, 0.64], [0.6, 1]);

  // Node 2: HARVEST (0.66)
  const node2Opacity = useTransform(progress, [0.64, 0.68], [0, 1]);
  const node2Scale = useTransform(progress, [0.64, 0.68], [0.6, 1]);

  // Node 3: QUALITY (0.71)
  const node3Opacity = useTransform(progress, [0.68, 0.73], [0, 1]);
  const node3Scale = useTransform(progress, [0.68, 0.73], [0.6, 1]);

  // Node 4: PROCESSING (0.76)
  const node4Opacity = useTransform(progress, [0.73, 0.78], [0, 1]);
  const node4Scale = useTransform(progress, [0.73, 0.78], [0.6, 1]);

  // Node 5: PACKAGING (0.81)
  const node5Opacity = useTransform(progress, [0.78, 0.83], [0, 1]);
  const node5Scale = useTransform(progress, [0.78, 0.83], [0.6, 1]);

  // Node 6: CONSUMER VERIFICATION (0.86)
  const node6Opacity = useTransform(progress, [0.83, 0.88], [0, 1]);
  const node6Scale = useTransform(progress, [0.83, 0.88], [0.6, 1]);

  const stages = [
    {
      id: 1,
      title: 'Hive IoT',
      sub: 'Apiary H-07 • Coorg',
      icon: '🐝',
      opacity: node1Opacity,
      scale: node1Scale,
      cx: 80,
      cy: 160,
    },
    {
      id: 2,
      title: 'Harvest',
      sub: 'Raw Multifloral 14.2kg',
      icon: '🍯',
      opacity: node2Opacity,
      scale: node2Scale,
      cx: 240,
      cy: 90,
    },
    {
      id: 3,
      title: 'AI & Quality',
      sub: 'Moisture 18.2% • Pure',
      icon: '🔬',
      opacity: node3Opacity,
      scale: node3Scale,
      cx: 400,
      cy: 170,
    },
    {
      id: 4,
      title: 'Processing',
      sub: 'Cold Filtered',
      icon: '🏭',
      opacity: node4Opacity,
      scale: node4Scale,
      cx: 560,
      cy: 100,
    },
    {
      id: 5,
      title: 'Blockchain & PKG',
      sub: '0x7f8a... Anchored',
      icon: '📦',
      opacity: node5Opacity,
      scale: node5Scale,
      cx: 720,
      cy: 180,
    },
    {
      id: 6,
      title: 'Consumer QR',
      sub: 'Verified Origin',
      icon: '✨',
      opacity: node6Opacity,
      scale: node6Scale,
      cx: 880,
      cy: 110,
    },
  ];

  return (
    <VeoVideoAdapter
      /* TODO: Replace with Veo asset: src="/videos/04-honey-journey.mp4" */
      progress={progress}
      startProgress={0.58}
      endProgress={0.92}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{
          opacity: sceneOpacity,
          scale: sceneScale,
        }}
        className="relative w-full max-w-5xl px-4 py-8 flex flex-col items-center justify-center"
      >
        {/* Subtle Ambient Trail Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-300/20 to-amber-500/10 rounded-3xl blur-3xl pointer-events-none -z-10" />

        {/* Section Headline */}
        <div className="text-center mb-6 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>THE GOLDEN TRACEABILITY PATH</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-slate-900">
            From Forest Blossom to Sealed Jar
          </h2>
        </div>

        {/* SVG Flow Curve */}
        <div className="relative w-full aspect-[960/260] max-h-[300px]">
          <svg viewBox="0 0 960 260" className="w-full h-full overflow-visible">
            <defs>
              {/* Golden Path Stroke Gradient */}
              <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
              </linearGradient>

              {/* Stream Glow Filter */}
              <filter id="traceGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#f59e0b" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Background Faint Track Line */}
            <path
              d="M 80 160 C 160 160, 160 90, 240 90 C 320 90, 320 170, 400 170 C 480 170, 480 100, 560 100 C 640 100, 640 180, 720 180 C 800 180, 800 110, 880 110"
              fill="none"
              stroke="#fed7aa"
              strokeWidth="4"
              strokeDasharray="6 6"
              opacity="0.4"
            />

            {/* The Animated Golden Honey Light Stream */}
            <motion.path
              d="M 80 160 C 160 160, 160 90, 240 90 C 320 90, 320 170, 400 170 C 480 170, 480 100, 560 100 C 640 100, 640 180, 720 180 C 800 180, 800 110, 880 110"
              fill="none"
              stroke="url(#traceGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={1000}
              style={{
                strokeDashoffset: pathOffset,
              }}
              filter="url(#traceGlow)"
            />
          </svg>

          {/* Render Milestone Glass Badges on Top */}
          {stages.map((stage) => (
            <motion.div
              key={stage.id}
              style={{
                left: `${(stage.cx / 960) * 100}%`,
                top: `${(stage.cy / 260) * 100}%`,
                opacity: stage.opacity,
                scale: stage.scale,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute flex flex-col items-center pointer-events-auto group"
            >
              {/* Glass Node Sphere */}
              <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-300 shadow-lg shadow-amber-900/10 flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                {stage.icon}
              </div>

              {/* Node Card Tag */}
              <div className="bg-white/90 backdrop-blur-lg border border-amber-200/80 px-2.5 py-1 rounded-xl shadow-md text-center whitespace-nowrap">
                <div className="text-[11px] font-extrabold text-slate-900 font-heading">
                  {stage.title}
                </div>
                <div className="text-[9px] font-medium text-amber-800">
                  {stage.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </VeoVideoAdapter>
  );
}
