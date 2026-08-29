'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Layers, QrCode, ArrowRight, CheckCircle2, ExternalLink, RefreshCw } from 'lucide-react';
import { QRCodeDisplay } from '@/components/batch/QRCodeDisplay';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function ProcessingPage() {
  const { user } = useAuth();
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);

  const fetchBatches = async () => {
    setLoading(true);
    const apiHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const res = await fetch(`${apiHost}/api/v1/batches`);
      if (res.ok) {
        const data = await res.json();
        setBatches(data);
      }
    } catch (err) {
      console.warn('Failed to fetch live batches for processor:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleGenerateQR = async (batchId: string) => {
    setSelectedBatch(batchId);
    setMinting(true);
    const apiHost = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`${apiHost}/api/v1/batches/${batchId}/package`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ quantity: 45.0, unit: 'kg' }),
      });

      if (res.ok) {
        const data = await res.json();
        const signedToken = data.package?.qrCode?.signedToken || batchId;
        setGeneratedToken(signedToken);
        fetchBatches();
      } else {
        // Fallback for demo
        setGeneratedToken(batchId);
      }
    } catch (err) {
      console.warn('Error minting package QR:', err);
      setGeneratedToken(batchId);
    } finally {
      setMinting(false);
    }
  };

  // Batches that are ready for packaging (or all active batches)
  const displayBatches = batches.length > 0 ? batches : [
    {
      id: 'BATCH-2026-001',
      honeyType: 'Coorg Multifloral Raw Honey',
      estimatedQuantityKg: 45.0,
      status: 'PACKAGED',
      package: { qrCode: { signedToken: 'BATCH-2026-001' } },
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Processing & Packaging Facility</h1>
          <p className="text-sm text-slate-500">Filter, package into retail jars, and mint tamper-proof QR code signatures</p>
        </div>
        <Button
          onClick={fetchBatches}
          variant="outline"
          className="self-start sm:self-auto text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Batches
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-semibold text-slate-900">Batches in Lifecycle</h2>
          {displayBatches.map((b) => {
            const hasQr = !!b.package?.qrCode?.signedToken;
            const token = b.package?.qrCode?.signedToken || b.id;

            return (
              <Card key={b.id} className="hover:border-amber-300 transition">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-slate-900 text-base">{b.honeyType || 'Raw Honey'}</h3>
                      <Badge variant="outline" className={b.status === 'PACKAGED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700'}>
                        {b.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      ID: <span className="font-mono font-bold text-slate-700">{b.id}</span> • Quantity: {b.estimatedQuantityKg || 45} kg
                    </p>
                    {hasQr && (
                      <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Signed QR Token Active
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleGenerateQR(b.id)}
                      disabled={minting}
                      className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
                    >
                      <QrCode className="w-4 h-4 mr-1.5" />
                      {hasQr ? 'View QR Token' : 'Mint QR Batch'}
                    </Button>
                    {hasQr && (
                      <Link
                        href={`/verify/${encodeURIComponent(token)}`}
                        target="_blank"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition"
                        title="Open Public Verification Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center">
                <QrCode className="w-4 h-4 mr-2 text-amber-500" /> Package QR Passport
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              {generatedToken ? (
                <div className="space-y-4 w-full">
                  <QRCodeDisplay token={generatedToken} batchId={selectedBatch || ''} />
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">
                      Scan or click below to view the public zero-auth consumer provenance story.
                    </p>
                    <Link
                      href={`/verify/${encodeURIComponent(generatedToken)}`}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition"
                    >
                      <span>Open Consumer Verification</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400">
                  <QrCode className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Select a batch to generate on-chain QR passport</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
