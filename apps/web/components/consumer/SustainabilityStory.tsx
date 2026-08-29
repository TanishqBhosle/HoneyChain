"use client";

import React from 'react';
import { BeekeeperStory } from './BeekeeperStory';
import { Heart, Sparkles, ShieldCheck, CheckCircle2, Feather, Flame, TreePine } from 'lucide-react';

interface SustainabilityStoryProps {
  beekeeper?: {
    displayName?: string;
    region?: string;
    kvicEnrollmentId?: string;
    experience?: string;
    apiaryName?: string;
  };
  sustainability?: {
    harvestMethod?: string;
    preservation?: string;
    beeSpecies?: string;
    habitatProtection?: string;
    fairTrade?: string;
  };
}

export function SustainabilityStory({ beekeeper, sustainability }: SustainabilityStoryProps) {
  const practices = [
    {
      icon: '🐝',
      title: 'Colony Welfare First',
      desc: 'Beekeepers only extract ripe surplus honey, leaving sufficient natural honey reserves for brood nutrition year-round.',
    },
    {
      icon: '❄️',
      title: 'Never Heated or Pasteurized',
      desc: 'Raw honey is cold-extracted below 40°C, retaining natural invertase enzymes, polyphenols, and active bio-compounds.',
    },
    {
      icon: '🌲',
      title: 'Indigenous Biodiversity',
      desc: 'Apiaries situated in Western Ghats forest buffer zones help pollinate rare endemic flora and maintain rainforest equilibrium.',
    },
    {
      icon: '🤝',
      title: 'Direct Beekeeper Prosperity',
      desc: 'Decentralized tracing removes deceptive middlemen, guaranteeing fair prices directly into rural beekeeper accounts.',
    },
  ];

  return (
    <section aria-labelledby="sustainability-story-heading" className="space-y-6">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-emerald-700" />
          <span>Ethics & Sustainability</span>
        </div>
        <h2 id="sustainability-story-heading" className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
          The Story Behind the Honey
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Every jar supports regenerative beekeeping, forest habitat preservation, and rural livelihoods.
        </p>
      </div>

      {/* Beekeeper Profile Section */}
      <BeekeeperStory beekeeper={beekeeper} />

      {/* Sustainable Beekeeping Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {practices.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200/80 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-xl flex items-center justify-center shrink-0 shadow-2xs">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-heading text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
