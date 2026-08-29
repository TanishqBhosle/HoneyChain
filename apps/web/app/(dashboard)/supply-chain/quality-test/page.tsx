'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export default function QualityTestPage() {
  const [tests, setTests] = useState([
    {
      id: 'test-1',
      batchId: 'batch-001',
      moisture: 18.2,
      fructoseRatio: 1.15,
      hpmResult: 'Negative',
      result: 'PASSED',
      testedBy: 'National Bee Board Certified Lab',
      date: '2026-08-28',
    },
    {
      id: 'test-2',
      batchId: 'batch-002',
      moisture: 19.1,
      fructoseRatio: 1.08,
      hpmResult: 'Negative',
      result: 'PASSED',
      testedBy: 'State Food Safety Lab',
      date: '2026-08-25',
    },
  ]);

  const [form, setForm] = useState({
    batchId: 'batch-003',
    moisturePct: '',
    purityNotes: '',
    result: 'APPROVED',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest = {
      id: `test-${Date.now()}`,
      batchId: form.batchId,
      moisture: parseFloat(form.moisturePct) || 18.0,
      fructoseRatio: 1.12,
      hpmResult: 'Negative',
      result: form.result === 'APPROVED' ? 'PASSED' : 'REJECTED',
      testedBy: 'Lab Inspector (Current User)',
      date: new Date().toISOString().split('T')[0],
    };
    setTests([newTest, ...tests]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Lab Quality & Purity Testing</h1>
        <p className="text-sm text-slate-500">Record NMR, moisture, and pollen authenticity tests on-chain</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-amber-500" /> Submit Lab Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded border border-emerald-200">
                ✅ Quality test recorded and signed to blockchain!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">Select Honey Batch</label>
                <select
                  className="w-full mt-1 border rounded-md p-2 text-sm bg-white"
                  value={form.batchId}
                  onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                >
                  <option value="batch-001">batch-001 (Mustard Flora)</option>
                  <option value="batch-002">batch-002 (Acacia Forest)</option>
                  <option value="batch-003">batch-003 (Multifloral)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Moisture Content (%) - Max 20%</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="18.2"
                  value={form.moisturePct}
                  onChange={(e) => setForm({ ...form, moisturePct: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Purity & C3/C4 Sugar Notes</label>
                <Input
                  placeholder="NMR profile normal, 0% added sugar syrup"
                  value={form.purityNotes}
                  onChange={(e) => setForm({ ...form, purityNotes: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Final Recommendation</label>
                <select
                  className="w-full mt-1 border rounded-md p-2 text-sm bg-white"
                  value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                >
                  <option value="APPROVED">APPROVED (Passes FSSAI & Export Standards)</option>
                  <option value="REJECTED">REJECTED (High Moisture or Adulteration)</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium">
                Record Lab Result
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Lab Test History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tests.map((t) => (
              <div key={t.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-900 text-sm">Batch: {t.batchId}</span>
                    <Badge variant="outline" className={t.result === 'PASSED' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}>
                      {t.result}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{t.date}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500">Moisture:</span> <strong className="text-slate-800">{t.moisture}%</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500">F/G Ratio:</span> <strong className="text-slate-800">{t.fructoseRatio}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-500">Foreign Sugars:</span> <strong className="text-emerald-700">{t.hpmResult}</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-400 pt-1">Inspector: {t.testedBy}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
