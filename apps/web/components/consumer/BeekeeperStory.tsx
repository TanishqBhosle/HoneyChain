"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

interface BeekeeperStoryProps {
  beekeeper?: {
    displayName?: string;
    region?: string;
    kvicEnrollmentId?: string;
    experience?: string;
    apiaryName?: string;
  };
}

export function BeekeeperStory({ beekeeper }: BeekeeperStoryProps) {
  const name = beekeeper?.displayName || 'Ramesh Kumar';
  const region = beekeeper?.region || 'Coorg, Karnataka';
  const kvicId = beekeeper?.kvicEnrollmentId || 'KVIC-KA-2024-001';
  const apiary = beekeeper?.apiaryName || 'Nilgiri Valley Apiary';

  return (
    <div className="rounded-3xl bg-gradient-to-br from-white via-[#fdfcf9] to-amber-50/40 border border-amber-200/90 p-6 sm:p-8 shadow-xl shadow-amber-950/5">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        
        {/* Beekeeper Visual Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 text-white flex items-center justify-center text-4xl shadow-xl shadow-amber-600/20 ring-4 ring-white border-2 border-amber-300">
            👨🏽‍🌾
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-white">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Beekeeper Bio & Credentials */}
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Award className="w-3 h-3 text-amber-700" />
              <span>Certified Artisan Apiarist</span>
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-1">
              Meet {name}
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              {region} • {apiary}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            A dedicated third-generation beekeeper in the Western Ghats mountain range practicing ethical apiculture. Ramesh nurtures native <em>Apis cerana indica</em> colonies and harvests only seasonal surplus combs to preserve colony health.
          </p>

          {/* Privacy-Safe Verification Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>KVIC ID: <strong>{kvicId}</strong></span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-[11px]">
              <Heart className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Direct Fair Compensation</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
