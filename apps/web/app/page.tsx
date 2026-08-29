"use client";
import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { CinematicHero } from '@/components/landing/CinematicHero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { JourneySection } from '@/components/landing/JourneySection';
import { IoTSection } from '@/components/landing/IoTSection';
import { AISection } from '@/components/landing/AISection';
import { BlockchainSection } from '@/components/landing/BlockchainSection';
import { TraceabilitySection } from '@/components/landing/TraceabilitySection';
import { QRSection } from '@/components/landing/QRSection';
import { ImpactSection } from '@/components/landing/ImpactSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div id="platform" className="min-h-screen bg-[#fbf9f4] text-slate-900 selection:bg-amber-200 selection:text-amber-950">
      <Navbar />
      <main>
        <CinematicHero />
        <ProblemSection />
        <JourneySection />
        <IoTSection />
        <AISection />
        <BlockchainSection />
        <TraceabilitySection />
        <QRSection />
        <ImpactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
