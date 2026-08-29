"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export function ConsumerFooter() {
  return (
    <footer className="bg-[#0c0e12] text-slate-300 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Provenance Philosophy */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <Logo size="md" variant="light" />
          <p className="text-xs text-slate-400 font-medium max-w-sm">
            From Hive to Home, Every Drop Has a Story. Verifiable authenticity powered by decentralized provenance.
          </p>
        </div>

        {/* Essential Trust Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href="/verify" className="hover:text-amber-400 transition-colors">
            Verify Honey
          </Link>
          <Link href="/login" className="hover:text-amber-400 transition-colors">
            Beekeeper Portal
          </Link>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <span className="text-slate-400 hover:text-amber-400 cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <span className="text-slate-400 hover:text-amber-400 cursor-pointer transition-colors">
            Terms of Trust
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          © 2026 Honey Chain. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
