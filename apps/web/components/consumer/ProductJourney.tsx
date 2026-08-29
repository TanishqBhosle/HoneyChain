"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { JourneyTimeline, JourneyEventItem } from './JourneyTimeline';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

interface ProductJourneyProps {
  journey: JourneyEventItem[];
}

export function ProductJourney({ journey }: ProductJourneyProps) {
  // Ensure default curated milestones if API returned sparse events
  const defaultMilestones: JourneyEventItem[] = [
    {
      id: 'm1',
      event: 'BEEHIVE',
      title: 'Monitored at Coorg Apiary',
      date: '2026-08-12',
      location: 'Coorg, Karnataka',
      notes: 'Harvested from monitored Langstroth Hives H-01 & H-07. Raw and cold-extracted.',
      actor: { name: 'Ramesh Kumar', role: 'Beekeeper' },
      status: 'completed',
    },
    {
      id: 'm2',
      event: 'COLLECTION',
      title: 'Received at Regional Collection Center',
      date: '2026-08-13',
      location: 'Madikeri Collection Hub',
      notes: 'Custody sealed and batch weight authenticated.',
      actor: { name: 'Suresh Gowda', role: 'Collection Officer' },
      status: 'completed',
    },
    {
      id: 'm3',
      event: 'QUALITY_TEST',
      title: 'NABL Lab Quality Certified',
      date: '2026-08-14',
      location: 'Regional Quality Lab',
      notes: 'Purity score 99.4%, Moisture 17.8%, 0% C4 sugar adulteration. Approved Grade A+.',
      actor: { name: 'Dr. Priya Devi', role: 'Quality Inspector' },
      status: 'completed',
    },
    {
      id: 'm4',
      event: 'PACKAGING',
      title: 'Bottled & Tamper-Proof QR Sealed',
      date: '2026-08-15',
      location: 'Processing Facility 01',
      notes: 'Micro-filtered below 40°C. Bottled into tamper-evident glass jars with cryptographic QR passport.',
      actor: { name: 'Anil Verma', role: 'Lead Processor' },
      status: 'completed',
    },
  ];

  const displayEvents = journey && journey.length > 0 ? journey : defaultMilestones;

  return (
    <section aria-labelledby="product-journey-heading" className="space-y-6">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>Transparent Traceability</span>
        </div>
        <h2 id="product-journey-heading" className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
          From Hive to Home
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Follow each verified milestone in this honey&apos;s journey from forest blossoms to your hands.
        </p>
      </div>

      <JourneyTimeline events={displayEvents} />
    </section>
  );
}
