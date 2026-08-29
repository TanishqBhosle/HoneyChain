import React from 'react';
import { cn } from '@/lib/utils';

export function HealthScoreGauge({
  score,
  status,
  size = 'md',
  className,
}: {
  score: number;
  status?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const normalizedScore = Math.min(100, Math.max(0, score));
  const rotation = (normalizedScore / 100) * 180 - 90;

  let color = 'text-emerald-500 border-emerald-500';
  if (normalizedScore < 50) color = 'text-red-500 border-red-500';
  else if (normalizedScore < 80) color = 'text-amber-500 border-amber-500';

  const isSmall = size === 'sm';
  const widthClass = isSmall ? 'w-32 h-16' : 'w-48 h-24';
  const circleClass = isSmall ? 'w-32 h-32 border-[12px]' : 'w-48 h-48 border-[20px]';
  const textClass = isSmall ? 'text-2xl' : 'text-4xl';

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      <div className={cn('relative overflow-hidden', widthClass)}>
        <div className={cn('absolute top-0 left-0 rounded-full border-slate-100', circleClass)} />
        <div
          className={cn(
            'absolute top-0 left-0 rounded-full border-b-transparent border-r-transparent transition-transform duration-1000 ease-out',
            circleClass,
            color
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className={cn('font-bold', textClass, color.split(' ')[0])}>{normalizedScore}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
          {status || 'Health Score'}
        </span>
      </div>
    </div>
  );
}
