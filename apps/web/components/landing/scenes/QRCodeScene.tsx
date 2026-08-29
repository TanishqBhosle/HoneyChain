"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { VeoVideoAdapter } from './VeoVideoAdapter';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, CheckCircle, Sparkles, ExternalLink, QrCode } from 'lucide-react';
import Link from 'next/link';

interface QRCodeSceneProps {
  progress: MotionValue<number>;
}

export function QRCodeScene({ progress }: QRCodeSceneProps) {
  // Reveal window: 0.86 - 1.0
  const sceneOpacity = useTransform(progress, [0.85, 0.91, 1.0], [0, 1, 1]);
  const sceneScale = useTransform(progress, [0.85, 0.94], [0.88, 1]);

  // Package assembly entrance (Slide up)
  const jarY = useTransform(progress, [0.85, 0.92], [60, 0]);

  // Laser scanner sweep across QR code (moves from 0% to 100% height)
  const laserY = useTransform(progress, [0.89, 0.96], ['-10%', '110%']);
  const laserOpacity = useTransform(progress, [0.88, 0.91, 0.95, 0.97], [0, 1, 1, 0]);

  // Verified Badge emergence (progress 0.95 -> 1.0)
  const badgeScale = useTransform(progress, [0.94, 0.98], [0.6, 1]);
  const badgeOpacity = useTransform(progress, [0.94, 0.98], [0, 1]);
  const haloGlow = useTransform(progress, [0.95, 1.0], [0.3, 0.8]);

  return (
    <VeoVideoAdapter
      /* TODO: Replace with Veo asset: src="/videos/05-honey-qr.mp4" */
      progress={progress}
      startProgress={0.85}
      endProgress={1.0}
      className="w-full h-full flex items-center justify-center pointer-events-none"
    >
      <motion.div
        style={{
          opacity: sceneOpacity,
          scale: sceneScale,
        }}
        className="relative w-full max-w-lg px-4 flex flex-col items-center justify-center pointer-events-auto"
      >
        {/* Golden Aura Halo */}
        <motion.div
          style={{ opacity: haloGlow }}
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-amber-400/30 via-emerald-400/20 to-amber-500/30 blur-[90px] pointer-events-none -z-10"
        />

        {/* Honey Jar Package Container */}
        <motion.div
          style={{ y: jarY }}
          className="relative w-full max-w-[360px] rounded-3xl bg-white/90 backdrop-blur-2xl border border-amber-300/80 p-6 shadow-2xl shadow-amber-950/15"
        >
          {/* Packaging Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-amber-100">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🍯</span>
              <div>
                <div className="text-xs font-black text-slate-900 tracking-wider font-heading uppercase">
                  RAW MULTIFLORAL HONEY
                </div>
                <div className="text-[10px] text-amber-700 font-semibold">
                  Net Wt: 500g • Unpasteurized
                </div>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              PKG-2026-001
            </span>
          </div>

          {/* QR Code Inspection Frame */}
          <div className="my-5 relative flex flex-col items-center justify-center p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70 overflow-hidden">
            {/* The QR Code */}
            <div className="relative p-2.5 bg-white rounded-xl shadow-inner border border-amber-100">
              <QRCodeSVG
                value="https://honeychain.org/verify/BATCH-2026-001-KVIC"
                size={130}
                bgColor="#ffffff"
                fgColor="#1e2430"
                level="Q"
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
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

            <div className="mt-3 text-[10px] font-medium text-slate-500 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-amber-600" />
              <span>Scan with any smartphone camera</span>
            </div>
          </div>

          {/* Emergent Verified Authentic Certificate Badge */}
          <motion.div
            style={{
              scale: badgeScale,
              opacity: badgeOpacity,
            }}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/15 to-amber-500/10 border border-emerald-400/50 flex items-center justify-between"
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
                  Cryptographically Verified • Lab Tested Purity
                </div>
              </div>
            </div>

            <Link
              href="/verify/BATCH-2026-001"
              className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-emerald-800 transition shadow-sm"
              title="View Public Certificate"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </VeoVideoAdapter>
  );
}
