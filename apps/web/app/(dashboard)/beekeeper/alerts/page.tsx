'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, CheckCircle, Bell, Filter, ShieldAlert } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      title: 'High Internal Temperature',
      hive: 'Apiary Beta - Hive 12',
      severity: 'WARNING',
      message: 'Hive temperature reached 39.2°C, exceeding the 36.0°C upper threshold.',
      date: '10 minutes ago',
      resolved: false,
    },
    {
      id: 'alert-2',
      title: 'Varroa Mite Infestation Detected',
      hive: 'Apiary Gamma - Hive 05',
      severity: 'CRITICAL',
      message: 'MobileNetV3 AI analysis classified frame image as Varroa destructor with 89% confidence.',
      date: '2 hours ago',
      resolved: false,
    },
    {
      id: 'alert-3',
      title: 'Sudden Weight Drop',
      hive: 'Apiary Alpha - Hive 02',
      severity: 'WARNING',
      message: 'Weight dropped by 4.2kg within 2 hours. Possible swarming event.',
      date: 'Yesterday',
      resolved: true,
    },
  ]);

  const handleResolve = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Colony Alerts & Diagnostics</h1>
          <p className="text-sm text-slate-500">Real-time threshold triggers and AI anomaly notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          return (
            <Card key={alert.id} className={`border-l-4 ${isCritical ? 'border-l-red-500' : 'border-l-amber-500'}`}>
              <CardContent className="p-5 flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2.5 rounded-full ${isCritical ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
                    {isCritical ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-slate-900 text-base">{alert.title}</h4>
                      <Badge variant="outline" className={isCritical ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}>
                        {alert.severity}
                      </Badge>
                      {alert.resolved && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                          RESOLVED
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-500">{alert.hive} • {alert.date}</p>
                    <p className="text-sm text-slate-700 pt-1">{alert.message}</p>
                  </div>
                </div>

                <div>
                  {!alert.resolved ? (
                    <Button size="sm" variant="outline" onClick={() => handleResolve(alert.id)}>
                      <CheckCircle className="w-4 h-4 mr-1 text-emerald-600" /> Mark Resolved
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Resolved
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
