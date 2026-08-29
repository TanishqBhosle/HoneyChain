'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, ExternalLink, Copy, Check, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface QRCodeDisplayProps {
  value?: string;
  token?: string;
  batchId?: string;
  size?: number;
  includeMargin?: boolean;
}

export function QRCodeDisplay({
  value,
  token,
  batchId,
  size = 180,
  includeMargin = true,
}: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const displayToken = token || batchId || 'BATCH-2026-001';
  const displayValue = value || (typeof window !== 'undefined' ? `${window.location.origin}/verify/${encodeURIComponent(displayToken)}` : `http://localhost:3000/verify/${encodeURIComponent(displayToken)}`);
  const qrId = `qr-svg-${displayToken.replace(/[^a-zA-Z0-9]/g, '-')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svgElement = document.getElementById(qrId);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Create a branded card canvas for the downloaded QR
      canvas.width = 400;
      canvas.height = 480;

      if (ctx) {
        // White rounded background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Amber header
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(0, 0, canvas.width, 10);

        // Header Title
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('HONEY CHAIN PROVENANCE PASSPORT', canvas.width / 2, 45);

        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Batch: ${batchId || displayToken}`, canvas.width / 2, 68);

        // Draw QR in center
        ctx.drawImage(img, (canvas.width - 240) / 2, 90, 240, 240);

        // Footer Trust Text
        ctx.fillStyle = '#059669';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('✓ Cryptographically Verified Authenticity', canvas.width / 2, 360);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        const truncatedUrl = displayValue.length > 45 ? displayValue.substring(0, 42) + '...' : displayValue;
        ctx.fillText(truncatedUrl, canvas.width / 2, 390);

        ctx.fillStyle = '#78350f';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('Scan with any smartphone camera to verify', canvas.width / 2, 430);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `HoneyChain-QR-${batchId || 'passport'}.png`;
        link.href = pngUrl;
        link.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg border-2 border-amber-300/80 space-y-4 max-w-sm mx-auto">
      
      {/* Header Pill */}
      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
        <span>Cryptographic QR Passport</span>
      </div>

      {/* QR Code Container with subtle golden border */}
      <div className="p-4 bg-[#fbf9f4] rounded-2xl border border-amber-200/90 shadow-inner relative group">
        <QRCodeSVG
          id={qrId}
          value={displayValue}
          size={size}
          level="H"
          includeMargin={includeMargin}
          fgColor="#0f172a"
        />
        <div className="absolute inset-0 rounded-2xl bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Batch and Token Metadata */}
      <div className="text-center space-y-1 w-full px-2">
        {batchId && (
          <p className="text-xs font-bold text-slate-900">
            Batch ID: <span className="font-mono text-amber-900">{batchId}</span>
          </p>
        )}
        <p className="text-[11px] font-mono text-slate-400 truncate max-w-xs mx-auto">
          {displayValue}
        </p>
      </div>

      {/* Actions: Download QR & Open Verification */}
      <div className="flex flex-col w-full gap-2 pt-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download QR</span>
          </button>

          {/* Copy Link Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 text-xs font-bold transition active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-700" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Open Verification Button */}
        <Link
          href={`/verify/${encodeURIComponent(displayToken)}`}
          target="_blank"
          className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/20 transition active:scale-[0.98]"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Public Verification Page</span>
        </Link>
      </div>

    </div>
  );
}
