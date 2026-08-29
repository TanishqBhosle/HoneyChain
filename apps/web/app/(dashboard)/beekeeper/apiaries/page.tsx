'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { MapPin, Plus, Box, Calendar, Activity } from 'lucide-react';

export default function ApiariesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [apiaries, setApiaries] = useState([
    {
      id: 'apiary-1',
      name: 'Apiary Alpha (Sunflower Valley)',
      latitude: 28.6139,
      longitude: 77.2090,
      totalHives: 6,
      healthyHives: 5,
      warningHives: 1,
      createdAt: '2026-03-15',
    },
    {
      id: 'apiary-2',
      name: 'Apiary Beta (Mustard Ridge)',
      latitude: 28.7041,
      longitude: 77.1025,
      totalHives: 6,
      healthyHives: 4,
      warningHives: 2,
      createdAt: '2026-05-10',
    },
  ]);

  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    const newApiary = {
      id: `apiary-${Date.now()}`,
      name: form.name,
      latitude: parseFloat(form.latitude) || 28.5,
      longitude: parseFloat(form.longitude) || 77.2,
      totalHives: 0,
      healthyHives: 0,
      warningHives: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setApiaries([...apiaries, newApiary]);
    setForm({ name: '', latitude: '', longitude: '' });
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Apiaries</h1>
          <p className="text-sm text-slate-500">Manage apiary locations and track colony distribution</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="bg-amber-500 hover:bg-amber-600">
          <Plus className="w-4 h-4 mr-2" /> Add Apiary
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apiaries.map((apiary) => (
          <Card key={apiary.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-900">{apiary.name}</CardTitle>
                <div className="flex items-center text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Lat: {apiary.latitude}, Long: {apiary.longitude}
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {apiary.totalHives} Hives
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 pt-2 border-t text-center">
                <div className="bg-slate-50 p-2 rounded">
                  <p className="text-xs text-slate-500">Total Hives</p>
                  <p className="text-lg font-bold text-slate-800">{apiary.totalHives}</p>
                </div>
                <div className="bg-emerald-50 p-2 rounded">
                  <p className="text-xs text-emerald-700">Healthy</p>
                  <p className="text-lg font-bold text-emerald-700">{apiary.healthyHives}</p>
                </div>
                <div className="bg-amber-50 p-2 rounded">
                  <p className="text-xs text-amber-700">Warning</p>
                  <p className="text-lg font-bold text-amber-700">{apiary.warningHives}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> Created: {apiary.createdAt}
                </span>
                <span className="flex items-center text-emerald-600 font-medium">
                  <Activity className="w-3.5 h-3.5 mr-1" /> Telemetry Active
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Apiary</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Apiary Name / Location</label>
              <Input
                placeholder="e.g. Apiary Gamma (Clover Field)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="28.6139"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Longitude</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="77.2090"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">
                Save Apiary
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
