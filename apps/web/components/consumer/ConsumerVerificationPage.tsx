"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  RotateCcw, 
  QrCode, 
  ShieldCheck, 
  ArrowLeft,
  Search,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { ConsumerHeader } from './ConsumerHeader';
import { ConsumerFooter } from './ConsumerFooter';
import { VerificationStatus } from './VerificationStatus';
import { VerificationResult } from './VerificationResult';
import { ProductJourney } from './ProductJourney';
import { SourceDetails } from './SourceDetails';
import { SustainabilityStory } from './SustainabilityStory';
import { VerificationDetails } from './VerificationDetails';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ConsumerVerificationPageProps {
  token: string;
}

export function ConsumerVerificationPage({ token }: ConsumerVerificationPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVerification = async () => {
    setLoading(true);
    setError(null);
    const apiHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    try {
      const res = await fetch(`${apiHost}/api/v1/verify/${encodeURIComponent(token)}`);
      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.message || `Verification query returned HTTP ${res.status}`);
      }
      const responseData = await res.json();
      if (!responseData.verified) {
        throw new Error('Cryptographic signature check failed or token is invalid.');
      }
      setData(responseData);
    } catch (err: any) {
      console.warn('Honey Chain Verification Error:', err.message);
      setError(err.message || 'We could not confirm this product’s verified journey.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchVerification();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-slate-900 flex flex-col justify-between selection:bg-amber-200 selection:text-amber-950">
      
      {/* Header */}
      <ConsumerHeader showBackToScan />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        
        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <LoadingSpinner className="w-14 h-14 text-amber-500" />
              <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Verifying Provenance...
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Validating cryptographic QR signature against decentralized batch ledger
              </p>
            </div>
          </div>
        )}

        {/* Error / Invalid QR State */}
        {!loading && (error || !data) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 sm:p-10 border-2 border-amber-300 text-center space-y-6 shadow-2xl shadow-amber-950/10 max-w-lg mx-auto"
          >
            {/* Warning Emblem */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center ring-8 ring-red-50/50 shadow-md">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-700 bg-red-100/70 px-3 py-1 rounded-full border border-red-200">
                Authentication Unsuccessful
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
                We Couldn&apos;t Verify This Honey
              </h1>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t confirm this product&apos;s verified journey.
              </p>
            </div>

            {/* Possible Reasons List */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left text-xs text-slate-700 space-y-2">
              <p className="font-bold text-amber-950">Possible Reasons:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>The QR code token may have expired or was modified</li>
                <li>The physical jar was not minted by an authorized Honey Chain processor</li>
                <li>The QR code may be a counterfeit duplicate</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={fetchVerification}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                <span>Try Again</span>
              </button>
              <Link
                href="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition"
              >
                <QrCode className="w-4 h-4 mr-1.5" />
                <span>Scan Another QR Code</span>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Success State: 5 Seamless Consumer Provenance Sections */}
        {!loading && data && (
          <div className="space-y-12 sm:space-y-16">
            
            {/* Screen 2: Authenticity Status & Provenance Card */}
            <div className="space-y-6">
              <VerificationStatus
                verified={data.verified}
                scanStatus={data.scanStatus}
                scanCount={data.scanCount}
                honeyType={data.product?.honeyType}
                batchId={data.product?.batchId}
              />
              <VerificationResult
                product={data.product}
                quality={data.quality}
                scanCount={data.scanCount}
              />
            </div>

            {/* Screen 3: Product Journey Timeline */}
            <ProductJourney journey={data.journey} />

            {/* Screen 4: Source Details & Terroir */}
            <SourceDetails
              origin={data.origin}
              product={data.product}
            />

            {/* Screen 5: Sustainability & Beekeeper Story */}
            <SustainabilityStory
              beekeeper={data.beekeeper}
              sustainability={data.sustainability}
            />

            {/* Verification Transparency & Cryptographic Proof */}
            <VerificationDetails blockchain={data.blockchain} />

          </div>
        )}

      </main>

      {/* Footer */}
      <ConsumerFooter />

    </div>
  );
}
