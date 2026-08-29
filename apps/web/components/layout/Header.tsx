import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bell, User, LogOut, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '../ui/Button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-6 shadow-sm z-10">
      <div className="flex items-center space-x-3">
        <div className="text-xs sm:text-sm text-slate-500">
          Welcome, <span className="font-bold text-slate-900">{user?.name || 'Operator'}</span>
        </div>
        <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Polygon Amoy Verified</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Quick Node Sync Status */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60">
          <Activity className="w-3.5 h-3.5 text-amber-500" />
          <span>IoT Ingestion: Active</span>
        </div>

        {/* Notifications Icon */}
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100/80">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
        </Button>

        {/* User profile & Logout */}
        <div className="flex items-center space-x-2.5 border-l border-slate-200 pl-3 sm:pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white font-bold text-xs shadow-sm shadow-amber-500/20">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'HC'}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl px-2.5 py-1.5 flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
