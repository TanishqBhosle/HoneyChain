"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  QrCode, 
  ArrowRight, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ScanLine,
  RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeScannerProps {
  onScanSuccess?: (token: string) => void;
}

export function QRCodeScanner({ onScanSuccess }: QRCodeScannerProps) {
  const router = useRouter();
  const [manualToken, setManualToken] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Quick Demo tokens for instant testing
  const demoBatches = [
    { label: 'Golden Path Batch', token: 'BATCH-2026-001', region: 'Coorg, Karnataka' },
    { label: 'Nilgiri Flora Batch', token: 'BATCH-2026-002', region: 'Nilgiris, Tamil Nadu' },
  ];

  const handleNavigate = (token: string) => {
    const clean = token.trim();
    if (!clean) return;
    if (onScanSuccess) {
      onScanSuccess(clean);
    } else {
      router.push(`/verify/${encodeURIComponent(clean)}`);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken.trim()) {
      handleNavigate(manualToken.trim());
    }
  };

  // Start Camera with Web BarcodeDetector if available
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported on this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        startDetection();
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraError(err.message || 'Could not access camera. Please enter code manually.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startDetection = () => {
    setIsScanning(true);
    // Check if window.BarcodeDetector is natively supported
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ['qr_code'],
      });

      const detectInterval = setInterval(async () => {
        if (!videoRef.current || !isCameraActive) {
          clearInterval(detectInterval);
          return;
        }

        try {
          const barcodes = await barcodeDetector.detect(videoRef.current);
          if (barcodes.length > 0) {
            const rawValue = barcodes[0].rawValue;
            clearInterval(detectInterval);
            stopCamera();
            // Extract token if full URL was scanned
            const tokenMatch = rawValue.split('/verify/')[1] || rawValue;
            handleNavigate(tokenMatch);
          }
        } catch {
          // Continue scanning
        }
      }, 500);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      
      {/* Visual Product & QR Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white via-[#fdfcf9] to-amber-50/50 border-2 border-amber-300/80 p-8 sm:p-10 shadow-2xl shadow-amber-950/10 text-center overflow-hidden">
        
        {/* Subtle honeycomb backdrop grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#b45309 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Honey Jar & Trust Seal Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 ring-4 ring-white border-2 border-amber-300">
            🍯
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
            <QrCode className="w-4 h-4" />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-950 tracking-tight">
          Verify Your Honey
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium max-w-md mx-auto mt-2 leading-relaxed">
          Scan to discover the full story and authentic origin behind every drop of your honey.
        </p>

        {/* Primary Action: Camera Scanner CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={startCamera}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-[0.98]"
          >
            <Camera className="w-5 h-5 mr-2" />
            <span>Scan QR Code with Camera</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-200/80" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#fcfaf5] px-3 text-slate-500 font-bold tracking-wider">
              Or Enter Verification Code
            </span>
          </div>
        </div>

        {/* Manual Token Input Mechanism */}
        <form onSubmit={handleManualSubmit} className="max-w-md mx-auto space-y-3">
          <div className="relative flex items-center">
            <input
              type="text"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              placeholder="e.g. BATCH-2026-001 or signed QR link"
              className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white border border-amber-300/90 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
            <Search className="absolute left-4 w-4 h-4 text-amber-600" />
            <button
              type="submit"
              disabled={!manualToken.trim()}
              className="absolute right-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
            >
              <span>Verify</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick Demo Batch Test Buttons */}
        <div className="mt-8 pt-6 border-t border-amber-100/80">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Quick Verification Demo
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {demoBatches.map((b) => (
              <button
                key={b.token}
                onClick={() => handleNavigate(b.token)}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300/80 text-xs font-bold text-amber-950 transition-all shadow-2xs hover:shadow-xs active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{b.label} ({b.token})</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Live Camera Scanner Modal */}
      <AnimatePresence>
        {isCameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-900 rounded-3xl p-6 border border-amber-500/30 text-white space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ScanLine className="w-5 h-5 text-amber-400 animate-pulse" />
                  <h3 className="text-base font-bold">Position QR in Viewfinder</h3>
                </div>
                <button
                  onClick={stopCamera}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cameraError ? (
                <div className="p-4 bg-red-950/60 border border-red-800 rounded-2xl text-red-200 text-xs space-y-2">
                  <div className="flex items-center space-x-2 font-bold">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span>Camera Notice</span>
                  </div>
                  <p>{cameraError}</p>
                </div>
              ) : (
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-amber-400/50 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                  />
                  {/* Scanner Target Guide Overlay */}
                  <div className="absolute inset-8 border-2 border-amber-400/80 rounded-2xl pointer-events-none animate-pulse flex items-center justify-center">
                    <div className="w-full h-0.5 bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-bounce" />
                  </div>
                </div>
              )}

              <p className="text-xs text-center text-slate-400">
                Hold your phone camera steady over the Honey Chain QR code printed on the jar label.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
