'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Layers, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QRCodeDisplay } from '@/components/batch/QRCodeDisplay';

export default function ProcessingPage() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const batchesToProcess = [
    {
      id: 'batch-002',
      honeyType: 'Acacia Forest Honey',
      quantityKg: 220.0,
      qualityStatus: 'APPROVED (Moisture: 19.1%)',
      filtrationTemp: '42°C (Raw Unpasteurized)',
      jarsCount: 440,
    },
    {
      id: 'batch-001',
      honeyType: 'Mustard Flora Honey',
      quantityKg: 150.0,
      qualityStatus: 'APPROVED (Moisture: 18.2%)',
      filtrationTemp: '40°C (Cold Extracted)',
      jarsCount: 300,
    },
  ];

  const handleGenerateQR = (batchId: string) => {
    setSelectedBatch(batchId);
    setGeneratedToken(`${batchId}:hmac_${Date.now().toString(16)}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Processing & Packaging Facility</h1>
        <p className="text-sm text-slate-500">Filter, package into retail jars, and mint tamper-proof QR code signatures</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Batches Ready for Packaging</h2>
          {batchesToProcess.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-slate-900 text-base">{b.honeyType}</h3>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                      Lab Passed
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    ID: {b.id} • Total Bulk: {b.quantityKg} kg • Yield: {b.jarsCount} × 500g Jars
                  </p>
                  <p className="text-xs text-slate-400">Filtration: {b.filtrationTemp}</p>
                </div>

                <Button
                  onClick={() => handleGenerateQR(b.id)}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
                >
                  <QrCode className="w-4 h-4 mr-1.5" /> Mint QR Batch
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center">
                <QrCode className="w-4 h-4 mr-2 text-amber-500" /> Package QR Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              {generatedToken ? (
                <div className="space-y-4">
                  <QRCodeDisplay token={generatedToken} batchId={selectedBatch || ''} />
                  <p className="text-xs text-slate-500">
                    Scan or open public verification view to see complete cryptographic journey.
                  </p>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400">
                  <QrCode className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Select a batch to generate on-chain QR code</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
