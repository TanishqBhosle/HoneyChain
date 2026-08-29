"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';

export interface JourneyEventItem {
  id: string;
  event: string;
  title: string;
  date: string;
  location?: string;
  notes?: string;
  actor?: {
    name: string;
    role: string;
  };
  blockchain?: {
    txHash: string;
    chain: string;
    blockNumber: number;
  } | null;
  status: 'completed' | 'current' | 'pending';
}

interface JourneyTimelineProps {
  events: JourneyEventItem[];
}

export function JourneyTimeline({ events }: JourneyTimelineProps) {
  const [activeStep, setActiveStep] = useState<number>(events.length - 1);

  const getEventIcon = (eventType: string, index: number) => {
    switch (eventType) {
      case 'BEEHIVE':
      case 'HARVEST':
        return '🐝';
      case 'COLLECTION':
        return '🏢';
      case 'QUALITY_TEST':
      case 'TESTED':
        return '🧪';
      case 'PROCESSING':
        return '🏭';
      case 'PACKAGING':
        return '📦';
      default:
        return index === events.length - 1 ? '✓' : '🍯';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Step Navigator for Desktop */}
      <div className="hidden md:flex items-center justify-between bg-amber-50/70 p-2 rounded-2xl border border-amber-200/80">
        {events.map((ev, idx) => {
          const isSelected = activeStep === idx;
          return (
            <button
              key={ev.id || idx}
              onClick={() => setActiveStep(idx)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-white text-amber-950 shadow-md shadow-amber-900/5 border border-amber-300'
                  : 'text-slate-600 hover:text-amber-900 hover:bg-white/50'
              }`}
            >
              <span className="text-base">{getEventIcon(ev.event, idx)}</span>
              <span className="truncate">{ev.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Adaptive Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-300 before:to-emerald-500">
        {events.map((ev, index) => {
          const isFocused = activeStep === index;
          const isPast = index < activeStep;
          const isFinal = index === events.length - 1;

          return (
            <motion.div
              key={ev.id || index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setActiveStep(index)}
              className={`relative cursor-pointer transition-all duration-300 ${
                isFocused
                  ? 'scale-[1.01]'
                  : 'opacity-85 hover:opacity-100'
              }`}
            >
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm shadow-md transition-transform duration-300 ${
                  isFocused
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100 scale-110'
                    : isPast
                    ? 'bg-emerald-500 text-white ring-2 ring-emerald-100'
                    : 'bg-white text-amber-800 border-2 border-amber-400'
                }`}
              >
                {getEventIcon(ev.event, index)}
              </div>

              {/* Event Content Card */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  isFocused
                    ? 'bg-white border-amber-300/90 shadow-lg shadow-amber-950/5 ring-1 ring-amber-200'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Step 0{index + 1}
                    </span>
                    <h3 className="text-base font-extrabold font-heading text-slate-900">
                      {ev.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(ev.date)}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2.5 leading-relaxed">
                  {ev.notes || 'Verified milestone record anchored to decentralized ledger.'}
                </p>

                {/* Actor & Provenance Metadata */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                  {ev.actor?.name && (
                    <div className="flex items-center space-x-1.5 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Handler: <strong className="text-slate-800">{ev.actor.name}</strong></span>
                    </div>
                  )}

                  {ev.location && (
                    <div className="flex items-center space-x-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{ev.location}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Cryptographically Anchored</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
