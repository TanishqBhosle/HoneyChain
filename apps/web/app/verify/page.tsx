"use client";

import React from 'react';
import { ConsumerHeader } from '@/components/consumer/ConsumerHeader';
import { ConsumerFooter } from '@/components/consumer/ConsumerFooter';
import { QRCodeScanner } from '@/components/consumer/QRCodeScanner';

export default function VerifyLandingPage() {
  return (
    <div className="min-h-screen bg-[#fbf9f4] text-slate-900 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950">
      <ConsumerHeader />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <QRCodeScanner />
      </main>

      <ConsumerFooter />
    </div>
  );
}
