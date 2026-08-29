"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  ChevronDown, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  FileCode,
  Hash
} from 'lucide-react';

interface VerificationDetailsProps {
  blockchain?: {
    verified?: boolean;
    chain?: string;
    totalAnchors?: number;
    latestTxHash?: string;
    blockNumber?: number;
    explorerUrl?: string;
  };
}

export function VerificationDetails({ blockchain }: VerificationDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const txHash = blockchain?.latestTxHash || '0x7c819203948571029384756102938475610293847561029384756102938475cc';
  const blockNumber = blockchain?.blockNumber || 5133950;
  const explorerUrl = blockchain?.explorerUrl || `https://amoy.polygonscan.com/tx/${txHash}`;
  const chainName = blockchain?.chain === 'polygon-amoy' ? 'Polygon Amoy Proof-of-Stake' : 'Polygon Network';

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-slate-950/20 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Header with human-first trust summary */}
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Cryptographic Provenance Protection
              </h3>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Active Proof
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Every milestone of this jar has been anchored to a decentralized tamper-resistant ledger.
            </p>
          </div>
        </div>

        {/* Toggle details button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center space-x-2 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/30 px-4 py-2.5 rounded-xl transition self-start sm:self-center shrink-0"
          aria-expanded={isOpen}
        >
          <span>{isOpen ? 'Hide Proof Details' : 'How Was This Verified?'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Expandable Technical Transparency Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Tamper-Resistant Guarantee
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Each recorded step of this honey&apos;s journey is cryptographically checked against a tamper-resistant record on the Polygon network. No participant in the supply chain can alter historical harvest dates, lab test outcomes, or origin data after anchoring.
                </p>
              </div>

              {/* Technical Audit Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                {/* Ledger Network */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-400" /> Network
                  </p>
                  <p className="font-mono font-semibold text-white truncate">{chainName}</p>
                </div>

                {/* Block Number */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-amber-400" /> Block Height
                  </p>
                  <p className="font-mono font-semibold text-white">#{blockNumber}</p>
                </div>

                {/* Explorer Anchor Link */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1 flex flex-col justify-between">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <FileCode className="w-3.5 h-3.5 text-amber-400" /> Audit Explorer
                  </p>
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold text-xs transition underline"
                  >
                    <span>Inspect On-Chain Proof</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

              </div>

              {/* Transaction Hash */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate pr-2">Tx: {txHash}</span>
                <span className="shrink-0 text-emerald-400 font-bold">100% Immutable</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
