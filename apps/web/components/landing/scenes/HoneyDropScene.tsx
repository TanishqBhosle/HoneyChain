"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { VeoVideoAdapter } from './VeoVideoAdapter';

interface HoneyDropSceneProps {
  progress: MotionValue<number>;
}

export function HoneyDropScene({ progress }: HoneyDropSceneProps) {
  // Calibrated for Scene 2 (0.18 - 0.42)
  const overallOpacity = useTransform(
    progress,
    [0.18, 0.23, 0.37, 0.42],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Strand elongation transforms
  const strandScaleY = useTransform(
    progress,
    [0.20, 0.28, 0.35],
    [0.2, 1.1, 1.6],
    { clamp: true }
  );

  const strandOpacity = useTransform(
    progress,
    [0.19, 0.24, 0.35, 0.39],
    [0, 1, 0.85, 0],
    { clamp: true }
  );

  // Droplet position & deformation transforms
  const dropY = useTransform(
    progress,
    [0.20, 0.27, 0.33, 0.39],
    [-10, 40, 95, 260],
    { clamp: true }
  );

  const dropScaleX = useTransform(
    progress,
    [0.20, 0.27, 0.33, 0.39],
    [0.7, 1.1, 0.9, 1.0],
    { clamp: true }
  );

  const dropScaleY = useTransform(
    progress,
    [0.20, 0.27, 0.33, 0.39],
    [0.7, 0.95, 1.35, 1.1],
    { clamp: true }
  );

  const dropBlur = useTransform(
    progress,
    [0.32, 0.38],
    ['blur(0px)', 'blur(1.5px)'],
    { clamp: true }
  );

  return (
    <VeoVideoAdapter
      progress={progress}
      startProgress={0.18}
      endProgress={0.42}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{ opacity: overallOpacity }}
        className="relative w-full max-w-lg aspect-square flex items-center justify-center pointer-events-none"
      >
        {/* Glow halo around the honey drip */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <svg viewBox="0 0 400 600" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="honeyStreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="1" />
            </linearGradient>

            <radialGradient id="honeyRefract" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="80%" stopColor="#d97706" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="1" />
            </radialGradient>

            <filter id="honeyWetFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#92400e" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Upper Cell Lip */}
          <g transform="translate(200, 120)">
            <ellipse cx="0" cy="0" rx="36" ry="12" fill="url(#honeyStreamGrad)" opacity="0.8" />
            <ellipse cx="0" cy="-2" rx="30" ry="8" fill="#fef08a" opacity="0.6" />
          </g>

          {/* Elongating Honey Strand */}
          <motion.g
            style={{
              opacity: strandOpacity,
              scaleY: strandScaleY,
              transformOrigin: '200px 120px',
            }}
          >
            <path
              d="M 194 120 Q 197 180 198 220 L 202 220 Q 203 180 206 120 Z"
              fill="url(#honeyStreamGrad)"
            />
            <path
              d="M 196 125 Q 198 175 199 215"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.75"
            />
          </motion.g>

          {/* The Hero Honey Droplet */}
          <motion.g
            style={{
              y: dropY,
              scaleX: dropScaleX,
              scaleY: dropScaleY,
              filter: dropBlur,
              transformOrigin: '200px 180px',
            }}
            filter="url(#honeyWetFilter)"
          >
            <path
              d="M 200 135 C 182 170 170 195 170 215 C 170 235 183 250 200 250 C 217 250 230 235 230 215 C 230 195 218 170 200 135 Z"
              fill="url(#honeyRefract)"
            />
            <ellipse cx="195" cy="222" rx="18" ry="14" fill="#fef08a" opacity="0.45" />
            <path
              d="M 182 195 Q 178 215 186 230"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <circle cx="212" cy="205" r="2.5" fill="#ffffff" opacity="0.85" />
          </motion.g>
        </svg>
      </motion.div>
    </VeoVideoAdapter>
  );
}

