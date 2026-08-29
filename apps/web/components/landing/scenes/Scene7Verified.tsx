"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, CheckCircle, Sparkles, ExternalLink, QrCode, Award } from 'lucide-react';
import Link from 'next/link';
import { SceneContainer } from './SceneContainer';

interface Scene7VerifiedProps {
  progress: MotionValue<number>;
}

export function Scene7Verified({ progress }: Scene7VerifiedProps) {
  // Laser scanner sweep across QR code
  const laserY = useTransform(progress, [0.93, 0.99], ['-10%', '110%'], { clamp: true });
  const laserOpacity = useTransform(progress, [0.93, 0.95, 0.98, 1.0], [0, 1, 1, 0.8], { clamp: true });
  const badgeScale = useTransform(progress, [0.95, 0.99], [0.85, 1], { clamp: true });

  return (
    <SceneContainer
      progress={progress}
      enterRange={[0.92, 0.96]}
      exitRange={[1, 1]}
      isLast
      className="z-30 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center"
    >
      <div className="flex flex-col items-center relative max-w-3xl mx-auto">
        {/* Contrast Scrim */}
        <div className="absolute -inset-8 rounded-3xl bg-gradient-to-b from-[#fbf9f4]/85 via-[#fbf9f4]/50 to-transparent blur-2xl pointer-events-none -z-10" />

        {/* Top Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>07. VERIFIED AUTHENTIC HONEY</span>
        </div>

        {/* Primary Heading */}
        <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-950 tracking-tight leading-tight mb-3">
          Verified From Hive to Home
        </h2>

        {/* Supporting Subtitle */}
        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-xl mb-5">
          Scan with any smartphone camera to inspect the cryptographically verified provenance and lab certificates.
        </p>

        {/* Honey Jar Package Container */}
        <div className="relative w-full max-w-[370px] rounded-3xl bg-white/95 backdrop-blur-2xl border border-amber-300/90 p-5 sm:p-6 shadow-2xl shadow-amber-950/20 text-left pointer-events-auto">
          {/* Packaging Header */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🍯</span>
              <div>
                <div className="text-xs font-black text-slate-900 tracking-wider font-heading uppercase">
                  RAW MULTIFLORAL HONEY
                </div>
                <div className="text-[10px] text-amber-800 font-semibold">
                  Net Wt: 500g • Unpasteurized
                </div>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              PKG-2026-001
            </span>
          </div>

          {/* QR Code Inspection Frame */}
          <div className="my-4 relative flex flex-col items-center justify-center p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 overflow-hidden">
            {/* The QR Code */}
            <div className="relative p-2.5 bg-white rounded-xl shadow-inner border border-amber-100">
              <QRCodeSVG
                value="https://honeychain.org/verify/BATCH-2026-001-KVIC"
                size={120}
                bgColor="#ffffff"
                fgColor="#1e2430"
                level="Q"
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 22,
                  width: 22,
                  excavate: true,
                }}
              />

              {/* Animated Laser Scanning Line */}
              <motion.div
                style={{
                  top: laserY,
                  opacity: laserOpacity,
                }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10b981] pointer-events-none"
              />
            </div>

            <div className="mt-2.5 text-[10px] font-semibold text-slate-600 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-amber-600" />
              <span>Scan with any smartphone camera</span>
            </div>
          </div>

          {/* Verified Authentic Certificate Badge */}
          <motion.div
            style={{ scale: badgeScale }}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/20 to-amber-500/15 border border-emerald-400/60 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-emerald-950 font-heading flex items-center gap-1">
                  VERIFIED AUTHENTIC
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="text-[10px] text-emerald-800 font-semibold">
                  Coorg Origin • 12 August 2026
                </div>
              </div>
            </div>

            <Link
              href="/verify/BATCH-2026-001"
              className="p-2 rounded-xl bg-white/90 hover:bg-white text-emerald-800 transition shadow-sm hover:shadow active:scale-95"
              title="View Public Certificate"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </SceneContainer>
  );
}
