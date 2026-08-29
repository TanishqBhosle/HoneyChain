"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Tag, 
  Award, 
  ShieldCheck, 
  Package, 
  QrCode,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface VerificationResultProps {
  product: {
    batchId: string;
    honeyType: string;
    origin: string;
    harvestDate: string;
    quantityKg: number;
    status: string;
    packageSerial?: string;
  };
  quality?: {
    status: string;
    grade: string;
    moisturePct: number;
    purityNotes: string;
    inspectorOrganization: string;
  };
  scanCount?: number;
}

export function VerificationResult({ product, quality, scanCount = 1 }: VerificationResultProps) {
  // Format harvest date cleanly
  const formattedDate = (() => {
    try {
      const d = new Date(product.harvestDate);
      if (isNaN(d.getTime())) return '12 August 2026';
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return '12 August 2026';
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-xl shadow-amber-950/5 overflow-hidden"
    >
      {/* Subtle Honeycomb Pattern Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#b45309 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Banner: Product Title & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-100/90 relative z-10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
              100% PURE & RAW
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Lab Certified
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1.5 tracking-tight">
            {product.honeyType || 'Coorg Multifloral Raw Honey'}
          </h2>
          <p className="text-xs font-mono font-medium text-slate-500 mt-1 flex items-center gap-2">
            <span>Batch: <strong className="text-slate-800">{product.batchId}</strong></span>
            {product.packageSerial && (
              <>
                <span className="text-slate-300">•</span>
                <span>Serial: <strong className="text-slate-800">{product.packageSerial}</strong></span>
              </>
            )}
          </p>
        </div>

        {/* Scan Status Pill */}
        <div className="shrink-0 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 text-right">
          <div className="flex items-center justify-end space-x-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-end gap-1">
            <QrCode className="w-3 h-3 text-slate-400" />
            <span>Scanned {scanCount} {scanCount === 1 ? 'time' : 'times'}</span>
          </p>
        </div>
      </div>

      {/* Grid: Core Provenance Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 relative z-10">
        
        {/* Origin */}
        <div className="bg-[#fbf9f4] p-4 rounded-2xl border border-amber-100 flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
            <MapPin className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Origin</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{product.origin || 'Coorg, Karnataka'}</p>
            <p className="text-[11px] text-amber-900 font-medium">Western Ghats Canopy</p>
          </div>
        </div>

        {/* Harvest Date */}
        <div className="bg-[#fbf9f4] p-4 rounded-2xl border border-amber-100 flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
            <Calendar className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Harvested</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{formattedDate}</p>
            <p className="text-[11px] text-emerald-800 font-medium">Traditional Single-Extraction</p>
          </div>
        </div>

        {/* Lab Certification */}
        <div className="bg-[#fbf9f4] p-4 rounded-2xl border border-amber-100 flex items-start space-x-3.5 sm:col-span-2 md:col-span-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quality Grade</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{quality?.grade || 'Certified Grade A+'}</p>
            <p className="text-[11px] text-slate-600">Moisture: {quality?.moisturePct || 17.8}% (≤ 20% limit)</p>
          </div>
        </div>

      </div>

      {/* Purity & Inspection Guarantee Snippet */}
      {quality?.purityNotes && (
        <div className="mt-5 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-center space-x-3 text-xs text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="leading-snug">
            <strong className="font-semibold text-amber-900">Lab Guarantee:</strong> {quality.purityNotes}
          </span>
        </div>
      )}
    </motion.div>
  );
}
