"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { VeoVideoAdapter } from './VeoVideoAdapter';

interface BeeFlightSceneProps {
  progress: MotionValue<number>;
}

export function BeeFlightScene({ progress }: BeeFlightSceneProps) {
  // Calibrated for Scene 2 (0.18 - 0.42)
  const beeOpacity = useTransform(
    progress,
    [0.18, 0.22, 0.38, 0.42],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Curved Flight Coordinates: Traverses across full viewport from Left to Right
  const beeX = useTransform(
    progress,
    [0.18, 0.24, 0.30, 0.36, 0.42],
    [-580, -290, 0, 290, 580],
    { clamp: true }
  );

  const beeY = useTransform(
    progress,
    [0.18, 0.24, 0.30, 0.36, 0.42],
    [80, 20, -10, -50, -120],
    { clamp: true }
  );

  // Natural banking and rotation facing direction of flight (up & rightwards)
  const beeRotate = useTransform(
    progress,
    [0.18, 0.24, 0.30, 0.36, 0.42],
    [35, 48, 55, 58, 45],
    { clamp: true }
  );

  const beeScale = useTransform(
    progress,
    [0.18, 0.24, 0.30, 0.36, 0.42],
    [0.85, 1.05, 1.15, 1.05, 0.85],
    { clamp: true }
  );

  // Realistic Bee Shadow on honeycomb below
  const shadowX = useTransform(beeX, (x) => Number(x) + 20);
  const shadowY = useTransform(beeY, (y) => Number(y) + 50);
  const shadowOpacity = useTransform(
    progress,
    [0.18, 0.22, 0.38, 0.42],
    [0, 0.35, 0.35, 0],
    { clamp: true }
  );

  return (
    <VeoVideoAdapter
      progress={progress}
      startProgress={0.18}
      endProgress={0.42}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
        {/* Soft ground shadow */}
        <motion.div
          style={{
            x: shadowX,
            y: shadowY,
            opacity: shadowOpacity,
            scale: beeScale,
          }}
          className="absolute w-24 h-12 bg-amber-950/25 rounded-full blur-md pointer-events-none -z-10"
        />

        {/* The Animated Honeybee */}
        <motion.div
          style={{
            x: beeX,
            y: beeY,
            rotate: beeRotate,
            scale: beeScale,
            opacity: beeOpacity,
          }}
          className="relative w-36 h-36 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(69,26,3,0.35)] pointer-events-none z-20"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              {/* Abdomen Stripe Gradient */}
              <linearGradient id="beeAbdomen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="25%" stopColor="#1e2430" />
                <stop offset="45%" stopColor="#fbbf24" />
                <stop offset="65%" stopColor="#1e2430" />
                <stop offset="85%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Thorax Fuzzy Velvet Gradient */}
              <radialGradient id="beeThorax" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#92400e" />
                <stop offset="50%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#18181b" />
              </radialGradient>

              {/* Translucent Veined Wing Gradient */}
              <linearGradient id="beeWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.55" />
                <stop offset="80%" stopColor="#fef08a" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
              </linearGradient>

              {/* Wing Shimmer Filter */}
              <filter id="wingGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Left Back Legs */}
            <path d="M 90 110 Q 70 130 55 145" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 95 105 Q 80 120 70 135" stroke="#27272a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Right Back Legs */}
            <path d="M 120 110 Q 140 130 155 145" stroke="#27272a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 115 105 Q 130 120 140 135" stroke="#27272a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Abdomen (Striped Fuzzy Body) */}
            <ellipse
              cx="100"
              cy="125"
              rx="24"
              ry="38"
              fill="url(#beeAbdomen)"
              transform="rotate(0 100 125)"
            />

            {/* Abdomen Segment Highlights */}
            <path d="M 82 105 Q 100 112 118 105" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.9" />
            <path d="M 78 120 Q 100 128 122 120" stroke="#fcd34d" strokeWidth="3.5" fill="none" opacity="0.9" />
            <path d="M 84 135 Q 100 142 116 135" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.9" />
            <path d="M 92 150 Q 100 155 108 150" stroke="#f59e0b" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Stinger Tip */}
            <polygon points="98,162 102,162 100,169" fill="#18181b" />

            {/* Thorax */}
            <circle cx="100" cy="85" r="22" fill="url(#beeThorax)" />

            {/* Head */}
            <circle cx="100" cy="60" r="15" fill="#18181b" />

            {/* Large Compound Eyes */}
            <ellipse cx="89" cy="58" rx="6.5" ry="9" fill="#451a03" stroke="#78350f" strokeWidth="1" />
            <ellipse cx="88" cy="56" rx="2" ry="3.5" fill="#ffffff" opacity="0.75" />
            
            <ellipse cx="111" cy="58" rx="6.5" ry="9" fill="#451a03" stroke="#78350f" strokeWidth="1" />
            <ellipse cx="110" cy="56" rx="2" ry="3.5" fill="#ffffff" opacity="0.75" />

            {/* Antennae */}
            <path d="M 94 48 Q 85 36 78 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 106 48 Q 115 36 122 38" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* LEFT WING (High Frequency Flutter Animation) */}
            <motion.g
              animate={{
                rotate: [-20, 24, -20],
                scaleY: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: 0.09,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: '92px 75px' }}
            >
              <ellipse
                cx="58"
                cy="58"
                rx="42"
                ry="16"
                fill="url(#beeWingGrad)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.2"
                transform="rotate(-38 58 58)"
                filter="url(#wingGlow)"
              />
              {/* Delicate Wing Veins */}
              <path d="M 88 72 Q 58 60 30 45" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" fill="none" />
              <path d="M 68 62 Q 55 50 42 38" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" fill="none" />
            </motion.g>

            {/* RIGHT WING (High Frequency Flutter Animation) */}
            <motion.g
              animate={{
                rotate: [20, -24, 20],
                scaleY: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: 0.09,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: '108px 75px' }}
            >
              <ellipse
                cx="142"
                cy="58"
                rx="42"
                ry="16"
                fill="url(#beeWingGrad)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.2"
                transform="rotate(38 142 58)"
                filter="url(#wingGlow)"
              />
              {/* Delicate Wing Veins */}
              <path d="M 112 72 Q 142 60 170 45" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" fill="none" />
              <path d="M 132 62 Q 145 50 158 38" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" fill="none" />
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </VeoVideoAdapter>
  );
}

