"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { VeoVideoAdapter } from './VeoVideoAdapter';

interface HoneycombSceneProps {
  progress: MotionValue<number>;
}

export function HoneycombScene({ progress }: HoneycombSceneProps) {
  // Persistent, gentle ambient background transforms with strict clamping
  const sceneOpacity = useTransform(
    progress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.75, 0.45, 0.35, 0.4, 0.35],
    { clamp: true }
  );

  const sceneScale = useTransform(
    progress,
    [0, 0.5, 1],
    [1, 1.08, 1.15],
    { clamp: true }
  );

  const sceneY = useTransform(
    progress,
    [0, 0.5, 1],
    [0, -25, -50],
    { clamp: true }
  );

  const sceneBlur = useTransform(
    progress,
    [0, 0.2, 0.7, 1],
    ['blur(0px)', 'blur(2px)', 'blur(3px)', 'blur(4px)'],
    { clamp: true }
  );

  // Hexagon grid parameters
  const hexCells = [
    { id: 1, cx: 300, cy: 180, fillLevel: 0.95, glow: true, highlight: 'prime' },
    { id: 2, cx: 430, cy: 180, fillLevel: 0.88, glow: false },
    { id: 3, cx: 235, cy: 255, fillLevel: 0.75, glow: false },
    { id: 4, cx: 365, cy: 255, fillLevel: 1.0, glow: true, highlight: 'source' },
    { id: 5, cx: 495, cy: 255, fillLevel: 0.82, glow: false },
    { id: 6, cx: 170, cy: 330, fillLevel: 0.65, glow: false },
    { id: 7, cx: 300, cy: 330, fillLevel: 0.92, glow: true },
    { id: 8, cx: 430, cy: 330, fillLevel: 0.85, glow: false },
    { id: 9, cx: 560, cy: 330, fillLevel: 0.60, glow: false },
    { id: 10, cx: 235, cy: 405, fillLevel: 0.78, glow: false },
    { id: 11, cx: 365, cy: 405, fillLevel: 0.90, glow: false },
    { id: 12, cx: 495, cy: 405, fillLevel: 0.70, glow: false },
  ];

  return (
    <VeoVideoAdapter
      progress={progress}
      startProgress={0}
      endProgress={1}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{
          opacity: sceneOpacity,
          scale: sceneScale,
          y: sceneY,
          filter: sceneBlur,
        }}
        className="relative w-full max-w-4xl aspect-[4/3] flex items-center justify-center pointer-events-none"
      >
        {/* Soft Golden Ambient Light Backdrop */}
        <div className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/25 to-yellow-200/15 blur-[100px] pointer-events-none -z-10" />

        {/* Realistic SVG Macro Honeycomb */}
        <svg
          viewBox="65 90 600 400"
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(217,119,6,0.15)]"
        >
          <defs>
            {/* Natural Wax Wall Gradient */}
            <linearGradient id="waxWall" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#b45309" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0.95" />
            </linearGradient>

            {/* Rich Golden Liquid Honey Gradient */}
            <radialGradient id="liquidHoney" cx="45%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#d97706" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.95" />
            </radialGradient>

            {/* Sunlight Specular Highlight */}
            <linearGradient id="sunHighlight" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </linearGradient>

            {/* Wax Depth Shadow */}
            <filter id="waxShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#451a03" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Hexagon Pattern Definition */}
          {hexCells.map((cell) => {
            const r = 62;
            const points = [
              [cell.cx, cell.cy - r],
              [cell.cx + (r * Math.sqrt(3)) / 2, cell.cy - r / 2],
              [cell.cx + (r * Math.sqrt(3)) / 2, cell.cy + r / 2],
              [cell.cx, cell.cy + r],
              [cell.cx - (r * Math.sqrt(3)) / 2, cell.cy + r / 2],
              [cell.cx - (r * Math.sqrt(3)) / 2, cell.cy - r / 2],
            ]
              .map((p) => `${p[0]},${p[1]}`)
              .join(' ');

            return (
              <g key={cell.id} filter="url(#waxShadow)">
                {/* Outer Hexagon (Beeswax Wall) */}
                <polygon
                  points={points}
                  fill="url(#waxWall)"
                  stroke="#78350f"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Inner Honey Reservoir */}
                <polygon
                  points={points}
                  transform={`scale(${cell.fillLevel * 0.88}) translate(${
                    (cell.cx * (1 - cell.fillLevel * 0.88)) / (cell.fillLevel * 0.88)
                  }, ${(cell.cy * (1 - cell.fillLevel * 0.88)) / (cell.fillLevel * 0.88)})`}
                  fill="url(#liquidHoney)"
                  opacity={0.88}
                />

                {/* Sunlight Surface Reflection */}
                <polygon
                  points={points}
                  transform={`scale(0.82) translate(${
                    (cell.cx * 0.18) / 0.82
                  }, ${(cell.cy * 0.18) / 0.82})`}
                  fill="url(#sunHighlight)"
                  opacity={0.45}
                />

                {/* Macro Cell Rim Light */}
                <path
                  d={`M ${cell.cx - 25} ${cell.cy - r + 8} Q ${cell.cx} ${cell.cy - r + 4} ${cell.cx + 25} ${cell.cy - r + 8}`}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity={0.6}
                />

                {/* Source Cell Indicator Ring */}
                {cell.highlight === 'source' && (
                  <circle
                    cx={cell.cx}
                    cy={cell.cy}
                    r="12"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className="animate-spin"
                    style={{ transformOrigin: `${cell.cx}px ${cell.cy}px`, animationDuration: '16s' }}
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>
    </VeoVideoAdapter>
  );
}

