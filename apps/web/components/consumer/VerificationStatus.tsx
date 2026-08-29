"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ShieldCheck, AlertTriangle } from 'lucide-react';

interface VerificationStatusProps {
  verified: boolean;
  scanStatus?: 'NORMAL' | 'CAUTION';
  scanCount?: number;
  honeyType?: string;
  batchId?: string;
}

export function VerificationStatus({
  verified,
  scanStatus = 'NORMAL',
  scanCount = 1,
  honeyType = 'Pure Raw Honey',
  batchId,
}: VerificationStatusProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!verified) {
    return (
      <div className="text-center space-y-4 max-w-lg mx-auto py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100/90 text-amber-700 ring-8 ring-amber-50 shadow-lg">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600 bg-red-50 border border-red-200/80 px-3 py-1 rounded-full">
            Verification Alert
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
            We Couldn&apos;t Verify This Honey
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            We could not confirm this product&apos;s verified journey. The code may be invalid, missing, or altered.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section aria-label="Authenticity Verification Status" className="relative text-center py-6 sm:py-8 overflow-hidden">
      {/* Background Honey Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-400/20 via-yellow-300/15 to-transparent blur-3xl" />
      </div>

      <div className="max-w-xl mx-auto space-y-5">
        {/* Animated Golden Verification Badge */}
        <div className="relative inline-flex items-center justify-center">
          {/* Pulsing Outer Golden Ring */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-500/20 blur-md pointer-events-none"
            />
          )}

          {/* Core Green/Gold Checkmark Emblem */}
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 ring-4 ring-white border-2 border-emerald-300"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
            >
              <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3.5]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Verification Status Text */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Securely Verified Journey</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-950 tracking-tight">
            Verified Authentic Honey
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-medium max-w-md mx-auto leading-relaxed">
            Every recorded step matches the verified provenance record from hive to package.
          </p>
        </motion.div>

        {/* Scan Caution Banner (if scan anomaly detected) */}
        {scanStatus === 'CAUTION' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-amber-50 border border-amber-300/80 rounded-xl text-left max-w-md mx-auto flex items-start space-x-3 shadow-xs"
          >
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Verification Note</p>
              <p className="text-amber-800 mt-0.5">
                This package has been scanned {scanCount} times. If purchasing in a retail store, please verify that the jar seal remains untampered.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
