'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Shield, Phone, Mail } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    {
      id: 'usr-1',
      name: 'Ramesh Sharma',
      phone: '+91 98765 43210',
      email: 'ramesh@honeychain.dev',
      role: 'BEEKEEPER',
      status: 'ACTIVE',
      joined: 'March 2026',
    },
    {
      id: 'usr-2',
      name: 'Delhi Lab Inspector',
      phone: '+91 98765 43211',
      email: 'inspector@fssai.gov.in',
      role: 'QUALITY_INSPECTOR',
      status: 'ACTIVE',
      joined: 'April 2026',
    },
    {
      id: 'usr-3',
      name: 'KVIC Regional Coordinator',
      phone: '+91 98765 43212',
      email: 'admin@kvic.gov.in',
      role: 'ADMIN',
      status: 'ACTIVE',
      joined: 'January 2026',
    },
    {
      id: 'usr-4',
      name: 'Himalayan Organics Facility',
      phone: '+91 98765 43213',
      email: 'processor@himalayan.com',
      role: 'PROCESSOR',
      status: 'ACTIVE',
      joined: 'May 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management & Access Control</h1>
        <p className="text-sm text-slate-500">Manage supply chain roles, certificates, and authentication</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {users.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-slate-100 text-slate-700 rounded-full">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{u.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
                      <span>{u.phone}</span>
                      <span>•</span>
                      <span>{u.email}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 text-xs">
                    {u.role}
                  </Badge>
                  <span className="text-xs text-emerald-600 font-medium">Active</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
