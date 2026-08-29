import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface AlertCardProps {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  date: string;
  hiveName?: string;
}

export function AlertCard({ title, message, severity, date, hiveName }: AlertCardProps) {
  const Icon = severity === 'critical' ? AlertCircle : severity === 'warning' ? AlertTriangle : Info;
  
  const colors = {
    info: 'text-blue-500 bg-blue-50 border-blue-200',
    warning: 'text-amber-500 bg-amber-50 border-amber-200',
    critical: 'text-red-500 bg-red-50 border-red-200',
  };

  const badgeVariants = {
    info: 'default',
    warning: 'warning',
    critical: 'destructive',
  } as const;

  return (
    <Card className={cn("border-l-4", colors[severity].replace(/bg-[a-z]+-50/, '').replace(/text-[a-z]+-500/, ''))}>
      <CardContent className="p-4 flex items-start space-x-4">
        <div className={cn("p-2 rounded-full", colors[severity].split(' ').slice(0, 2).join(' '))}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
              {hiveName && (
                <p className="text-xs text-slate-500 mt-0.5">Hive: {hiveName}</p>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-xs text-slate-400">{formatDate(date)}</span>
              <Badge variant={badgeVariants[severity]}>{severity}</Badge>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
