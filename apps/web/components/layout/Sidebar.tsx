import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Map, 
  Box, 
  Droplet, 
  Camera, 
  Bell, 
  Activity, 
  Package, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  Building2, 
  FlaskConical, 
  Factory, 
  Truck, 
  Store, 
  QrCode,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/common/Logo';

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const rawRole = String(user?.role || 'BEEKEEPER').toUpperCase();

  const linksByRole: Record<string, Array<{ name: string; href: string; icon: any }>> = {
    BEEKEEPER: [
      { name: 'Overview', href: '/beekeeper', icon: Home },
      { name: 'My Apiaries', href: '/beekeeper/apiaries', icon: Map },
      { name: 'Smart Hives', href: '/beekeeper/hives', icon: Box },
      { name: 'Harvest Log', href: '/beekeeper/harvest', icon: Droplet },
      { name: 'AI Vision Diagnosis', href: '/beekeeper/ai-analysis', icon: Camera },
      { name: 'Realtime Alerts', href: '/beekeeper/alerts', icon: Bell },
    ],
    COLLECTION_CENTER: [
      { name: 'Center Overview', href: '/supply-chain', icon: Home },
      { name: 'Incoming Batches', href: '/supply-chain/batches', icon: Package },
      { name: 'Deposit Receipts', href: '/supply-chain', icon: Building2 },
    ],
    QUALITY_INSPECTOR: [
      { name: 'Lab Dashboard', href: '/supply-chain/quality-test', icon: FlaskConical },
      { name: 'Submit Test Result', href: '/supply-chain/quality-test', icon: CheckCircle },
      { name: 'All Batches', href: '/supply-chain/batches', icon: Package },
    ],
    PROCESSOR: [
      { name: 'Plant Overview', href: '/supply-chain/processing', icon: Factory },
      { name: 'Packaging & QR Mint', href: '/supply-chain/processing', icon: QrCode },
      { name: 'Inventory Batches', href: '/supply-chain/batches', icon: Package },
    ],
    DISTRIBUTOR: [
      { name: 'Logistics Overview', href: '/supply-chain/batches', icon: Truck },
      { name: 'Dispatched Batches', href: '/supply-chain/batches', icon: Package },
      { name: 'Chain Custody', href: '/supply-chain', icon: Activity },
    ],
    RETAILER: [
      { name: 'Store Overview', href: '/supply-chain/batches', icon: Store },
      { name: 'Received Stock', href: '/supply-chain/batches', icon: Package },
      { name: 'Verify QR Shelf', href: '/supply-chain/batches', icon: QrCode },
    ],
    ADMIN: [
      { name: 'Admin Overview', href: '/admin', icon: Home },
      { name: 'Registered Beekeepers', href: '/admin/beekeepers', icon: Users },
      { name: 'Batches Ledger', href: '/admin/batches', icon: Package },
      { name: 'System Users', href: '/admin/users', icon: ShieldCheck },
    ]
  };

  // Determine role key
  let roleKey = 'BEEKEEPER';
  if (rawRole.includes('COLLECTION')) roleKey = 'COLLECTION_CENTER';
  else if (rawRole.includes('QUALITY') || rawRole.includes('INSPECTOR')) roleKey = 'QUALITY_INSPECTOR';
  else if (rawRole.includes('PROCESSOR')) roleKey = 'PROCESSOR';
  else if (rawRole.includes('DISTRIBUTOR')) roleKey = 'DISTRIBUTOR';
  else if (rawRole.includes('RETAILER')) roleKey = 'RETAILER';
  else if (rawRole.includes('ADMIN')) roleKey = 'ADMIN';
  else if (rawRole.includes('BEEKEEPER')) roleKey = 'BEEKEEPER';
  else if (rawRole.includes('SUPPLY')) roleKey = 'COLLECTION_CENTER';

  const navLinks = linksByRole[roleKey] || linksByRole.BEEKEEPER;

  const roleDisplayLabels: Record<string, { label: string; badge: string; color: string }> = {
    BEEKEEPER: { label: 'Beekeeper Portal', badge: 'Apiary Node', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    COLLECTION_CENTER: { label: 'Collection Center', badge: 'Regional Depot', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    QUALITY_INSPECTOR: { label: 'Quality Testing Lab', badge: 'NABL Certified', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    PROCESSOR: { label: 'Processing Plant', badge: 'Packaging Line', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    DISTRIBUTOR: { label: 'Logistics Network', badge: 'Transit Custody', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    RETAILER: { label: 'Retail Portal', badge: 'Store Inventory', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
    ADMIN: { label: 'KVIC State Admin', badge: 'Oversight', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  };

  const currentRoleMeta = roleDisplayLabels[roleKey] || roleDisplayLabels.BEEKEEPER;

  return (
    <div className="flex h-full w-64 flex-col bg-[#0b1120] text-white border-r border-slate-800 shadow-xl flex-shrink-0">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-5 border-b border-slate-800/80 bg-[#080d19]">
        <Logo size="sm" variant="light" />
      </div>

      {/* Role & User Context Pill */}
      <div className="px-5 py-3.5 bg-slate-900/60 border-b border-slate-800/60 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-200 truncate">
            {currentRoleMeta.label}
          </span>
          <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded border ${currentRoleMeta.color}`}>
            {currentRoleMeta.badge}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{user?.name || 'Active Operator'}</span>
        </p>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-500/40 shadow-sm font-bold" 
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              )}
            >
              <link.icon 
                className={cn(
                  "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                  isActive ? "text-amber-400" : "text-slate-400 group-hover:text-amber-300"
                )} 
              />
              <span className="truncate">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer Link to Landing Page */}
      <div className="p-3 border-t border-slate-800/80 bg-[#080d19]/80">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 rounded-lg transition-colors"
        >
          <span>View Public Platform</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
