'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Droplet, CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function HarvestPage() {
  const [batches, setBatches] = useState([
    {
      id: 'batch-001',
      honeyType: 'Multifloral Mustard',
      apiary: 'Apiary Alpha',
      harvestDate: '2026-08-28',
      quantityKg: 24.5,
      status: 'CREATED',
    },
    {
      id: 'batch-002',
      honeyType: 'Wild Forest Acacia',
      apiary: 'Apiary Beta',
      harvestDate: '2026-08-20',
      quantityKg: 38.0,
      status: 'COLLECTED',
    },
  ]);

  const [form, setForm] = useState({
    apiaryId: 'apiary-1',
    honeyType: 'Wild Multifloral',
    quantityKg: '',
    notes: '',
  });

  const [createdBatch, setCreatedBatch] = useState<any>(null);

  const handleHarvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch = {
      id: `batch-${Date.now().toString().slice(-4)}`,
      honeyType: form.honeyType,
      apiary: 'Apiary Alpha',
      harvestDate: new Date().toISOString().split('T')[0],
      quantityKg: parseFloat(form.quantityKg) || 10,
      status: 'CREATED',
    };
    setBatches([newBatch, ...batches]);
    setCreatedBatch(newBatch);
    setForm({ apiaryId: 'apiary-1', honeyType: 'Wild Multifloral', quantityKg: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Harvest & Batch Logging</h1>
        <p className="text-sm text-slate-500">Record honey extraction to mint transparent blockchain batches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center">
              <Droplet className="w-4 h-4 mr-2 text-amber-500" /> Log New Harvest
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleHarvestSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">Apiary Source</label>
                <select
                  className="w-full mt-1 border rounded-md p-2 text-sm bg-white"
                  value={form.apiaryId}
                  onChange={(e) => setForm({ ...form, apiaryId: e.target.value })}
                >
                  <option value="apiary-1">Apiary Alpha (Sunflower Valley)</option>
                  <option value="apiary-2">Apiary Beta (Mustard Ridge)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Honey Floral Variety</label>
                <Input
                  value={form.honeyType}
                  onChange={(e) => setForm({ ...form, honeyType: e.target.value })}
                  placeholder="e.g. Acacia, Mustard, Multifloral"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Harvested Quantity (kg)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="25.5"
                  value={form.quantityKg}
                  onChange={(e) => setForm({ ...form, quantityKg: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600">Extraction Notes</label>
                <Input
                  placeholder="Moisture estimate, weather conditions..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium">
                Log Harvest & Mint Batch
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">Recent Batches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {batches.map((batch) => (
              <div key={batch.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-full">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{batch.honeyType}</h4>
                    <p className="text-xs text-slate-500">ID: {batch.id} • {batch.apiary} • {batch.harvestDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{batch.quantityKg} kg</p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                      {batch.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
