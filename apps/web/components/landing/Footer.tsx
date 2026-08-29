"use client";
import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-300 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <Logo size="md" variant="light" />
          <p className="text-xs text-slate-400 font-medium max-w-xs">
            Decentralized honey provenance, IoT hive telemetry, and tamper-evident cryptographic batch validation.
          </p>
        </div>

        {/* Clean Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
          <a href="#platform" className="hover:text-amber-400 transition-colors">Platform</a>
          <a href="#journey" className="hover:text-amber-400 transition-colors">How It Works</a>
          <a href="#traceability" className="hover:text-amber-400 transition-colors">Traceability</a>
          <a href="#qr" className="hover:text-amber-400 transition-colors">Verification</a>
          <Link href="/login" className="hover:text-amber-400 transition-colors">For Beekeepers</Link>
          <Link href="/login" className="hover:text-amber-400 transition-colors">For Supply Chain</Link>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-amber-400 cursor-pointer transition-colors">Terms</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          © 2026 Honey Chain
        </div>

      </div>
    </footer>
  );
}
