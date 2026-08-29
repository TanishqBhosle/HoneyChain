"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function HoneyFlowPath() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 600 400"
        className="w-full h-full opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="honeyGlowLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Trace Arc */}
        <path
          d="M 60 200 C 150 70, 450 70, 540 200 C 450 330, 150 330, 60 200"
          stroke="url(#honeyGlowLine)"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="opacity-50"
        />

        {/* Flow Path 1 */}
        <motion.path
          d="M 120 180 C 200 90, 400 90, 480 180 C 400 270, 200 270, 120 180"
          stroke="url(#honeyGlowLine)"
          strokeWidth="2.5"
          filter="url(#glowEffect)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing Nodes */}
        <circle cx="120" cy="180" r="5" fill="#f59e0b" filter="url(#glowEffect)" />
        <circle cx="300" cy="105" r="5" fill="#d97706" filter="url(#glowEffect)" />
        <circle cx="480" cy="180" r="5" fill="#b45309" filter="url(#glowEffect)" />
        <circle cx="300" cy="255" r="5" fill="#f59e0b" filter="url(#glowEffect)" />
      </svg>
    </div>
  );
}
