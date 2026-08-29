"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Trees, 
  Layers, 
  Scale, 
  Calendar, 
  Globe2, 
  Sparkles,
  Info
} from 'lucide-react';

interface SourceDetailsProps {
  origin?: {
    region?: string;
    apiaryName?: string;
    latitude?: number;
    longitude?: number;
    floralSource?: string;
    hiveIds?: string[];
  };
  product?: {
    batchId?: string;
    honeyType?: string;
    harvestDate?: string;
    quantityKg?: number;
  };
}

export function SourceDetails({ origin, product }: SourceDetailsProps) {
  const hivesList = origin?.hiveIds && origin.hiveIds.length > 0 
    ? origin.hiveIds.join(', ') 
    : 'Hive H-01, Hive H-07';

  const latitude = origin?.latitude ? `${origin.latitude.toFixed(4)}° N` : '12.3375° N';
  const longitude = origin?.longitude ? `${origin.longitude.toFixed(4)}° E` : '75.8069° E';

  return (
    <section aria-labelledby="source-details-heading" className="space-y-6">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
          <Trees className="w-3.5 h-3.5 text-amber-700" />
          <span>Origin & Terroir</span>
        </div>
        <h2 id="source-details-heading" className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
          Where Did This Honey Come From?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Pure provenance harvested from verified apiaries in rich indigenous bio-reserves.
        </p>
      </div>

      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200/90 p-6 sm:p-8 shadow-xl shadow-amber-950/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Apiary & Region */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Apiary & Region</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">
              {origin?.apiaryName || 'Nilgiri Valley Apiary'}
            </p>
            <p className="text-xs text-slate-600">
              {origin?.region || 'Coorg, Karnataka, India'}
            </p>
          </div>

          {/* Hives */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Monitored Hives</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">
              {hivesList}
            </p>
            <p className="text-xs text-emerald-800 font-medium">
              Langstroth Standard Boxes
            </p>
          </div>

          {/* Flora / Botanical Source */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <Trees className="w-4 h-4 text-amber-600" />
              <span>Botanical Flora</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">
              {origin?.floralSource || 'Western Ghats Wildflower Canopy'}
            </p>
            <p className="text-xs text-slate-600">
              Jamun, Eucalyptus & Forest Flora
            </p>
          </div>

          {/* Coordinates */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <Globe2 className="w-4 h-4 text-amber-600" />
              <span>GPS Coordinates</span>
            </div>
            <p className="text-sm font-mono font-bold text-slate-900">
              {latitude}, {longitude}
            </p>
            <p className="text-xs text-slate-500">
              Western Ghats UNESCO Reserve
            </p>
          </div>

          {/* Honey Type */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Honey Type</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">
              {product?.honeyType || 'Coorg Multifloral Raw Honey'}
            </p>
            <p className="text-xs text-amber-900 font-medium">
              Raw • Unheated • Single-Origin
            </p>
          </div>

          {/* Batch Harvest Volume */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#fbf9f4] border border-amber-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Batch Harvest Yield</span>
            </div>
            <p className="text-base font-extrabold text-slate-900">
              {product?.quantityKg ? `${product.quantityKg} kg` : '45.0 kg'}
            </p>
            <p className="text-xs text-slate-600">
              Small-batch artisan extraction
            </p>
          </div>

        </div>

        {/* Visual Terroir Story Box */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-transparent border border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-amber-950">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              🍯
            </div>
            <div>
              <p className="font-bold text-slate-900">Single-Origin Terroir Authenticity</p>
              <p className="text-slate-600 text-[11px]">
                This honey was never blended with imported syrups or heated past hive temperatures (max 38°C).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
