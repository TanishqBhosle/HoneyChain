'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value?: string;
  token?: string;
  batchId?: string;
  size?: number;
  includeMargin?: boolean;
}

export function QRCodeDisplay({ value, token, batchId, size = 140, includeMargin = true }: QRCodeDisplayProps) {
  const displayValue = value || (token ? `http://localhost:3000/verify/${token}` : batchId || 'honey-chain-verify');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-slate-100">
      <QRCodeSVG
        value={displayValue}
        size={size}
        level="H"
        includeMargin={includeMargin}
        fgColor="#0f172a"
      />
      {batchId && <p className="mt-2 text-xs font-semibold text-slate-800">Batch: {batchId}</p>}
      <p className="mt-1 text-[11px] text-slate-400 text-center max-w-[220px] break-all font-mono">
        {displayValue}
      </p>
    </div>
  );
}
