import * as React from 'react';
import { cn } from '@/lib/utils';

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg leading-none"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-1.5 pb-2 border-b', className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-lg font-semibold text-slate-900', className)}>{children}</h2>;
}
