"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, QrCode } from 'lucide-react';

interface ConsumerHeaderProps {
  showBackToScan?: boolean;
}

export function ConsumerHeader({ showBackToScan = false }: ConsumerHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfcf9]/90 backdrop-blur-xl border-b border-amber-200/60 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Provenance Badge */}
        <div className="flex items-center space-x-3">
          <Logo size="sm" variant="dark" />
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-900">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Consumer Provenance</span>
          </div>
        </div>

        {/* Consumer Navigation */}
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-amber-800 transition px-2.5 py-1.5 rounded-lg hover:bg-amber-50/60"
          >
            Home
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/80 px-3 py-1.5 rounded-full transition shadow-xs"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-700" />
            <span>Verify Honey</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
