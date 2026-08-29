"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/contexts/AuthContext';
import { 
  KeyRound, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  Mail, 
  Phone,
  CheckCircle2, 
  Sparkles,
  Users,
  QrCode
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';

interface DemoProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  organization: string;
  label: string;
  icon: string;
  description: string;
}

export default function Login() {
  const { login } = useAuth();
  
  const demoProfiles: Record<string, DemoProfile> = {
    BEEKEEPER: {
      id: 'bk_ramesh',
      name: 'Ramesh Kumar',
      role: 'BEEKEEPER',
      phone: '+91 98765 43210',
      email: 'ramesh.beekeeper@honeychain.org',
      organization: 'Nilgiri Valley Apiary',
      label: 'Beekeeper',
      icon: '🐝',
      description: 'Hive telemetry, apiary management & batch extraction'
    },
    COLLECTION_CENTER: {
      id: 'cc_madikeri',
      name: 'Suresh Gowda',
      role: 'COLLECTION_CENTER',
      phone: '+91 98123 45678',
      email: 'collection.madikeri@honeychain.org',
      organization: 'Madikeri Regional Collection Center',
      label: 'Collection Center',
      icon: '🏢',
      description: 'Receive honey drums from beekeepers & register custody'
    },
    QUALITY_INSPECTOR: {
      id: 'qi_priya',
      name: 'Dr. Priya Devi',
      role: 'QUALITY_INSPECTOR',
      phone: '+91 98234 56789',
      email: 'priya.inspector@honeychain.org',
      organization: 'NABL Certified Honey Testing Lab',
      label: 'Quality Inspector',
      icon: '🧪',
      description: 'NMR, moisture, and pollen purity certification'
    },
    PROCESSOR: {
      id: 'pr_mysore',
      name: 'Anil Verma',
      role: 'PROCESSOR',
      phone: '+91 98345 67890',
      email: 'processor.mysore@honeychain.org',
      organization: 'Apex Honey Processing Plant',
      label: 'Processor',
      icon: '🏭',
      description: 'Filtration, bottling, and QR code minting'
    },
    DISTRIBUTOR: {
      id: 'dist_apex',
      name: 'Vikram Logistics',
      role: 'DISTRIBUTOR',
      phone: '+91 98456 78901',
      email: 'distributor.south@honeychain.org',
      organization: 'Southern Honey Logistics Network',
      label: 'Distributor',
      icon: '🚚',
      description: 'Warehouse custody & regional transit distribution'
    },
    RETAILER: {
      id: 'ret_organic',
      name: 'Pooja Sharma',
      role: 'RETAILER',
      phone: '+91 98567 89012',
      email: 'retailer.bangalore@honeychain.org',
      organization: 'Pure Nature Organic Store',
      label: 'Retailer',
      icon: '🏪',
      description: 'Store inventory receipt and shelf verification'
    },
    ADMIN: {
      id: 'admin_kvic',
      name: 'KVIC State Administrator',
      role: 'ADMIN',
      phone: '+91 99000 11122',
      email: 'admin@honeychain.org',
      organization: 'KVIC National Honey Mission',
      label: 'Admin',
      icon: '👑',
      description: 'Platform registry, disease surveillance & audit analytics'
    },
  };

  const [selectedRoleKey, setSelectedRoleKey] = useState<keyof typeof demoProfiles>('BEEKEEPER');
  const [identifier, setIdentifier] = useState(demoProfiles.BEEKEEPER.email);
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleSelectDemoProfile = (roleKey: keyof typeof demoProfiles) => {
    setSelectedRoleKey(roleKey);
    setIdentifier(demoProfiles[roleKey].email);
    setPassword('123456');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const profile = demoProfiles[selectedRoleKey];
    
    setTimeout(() => {
      login('demo-jwt-token-' + Date.now(), {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        email: identifier.includes('@') ? identifier : undefined,
        phone: identifier.includes('@') ? undefined : identifier,
        organization: profile.organization,
      });
    }, 600);
  };

  const currentProfile = demoProfiles[selectedRoleKey];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fbf9f4] p-4 sm:p-6 relative overflow-hidden">
      
      {/* Ambient background honey glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-300/20 blur-[130px] pointer-events-none -z-10" />

      {/* Top Floating Back to Landing Page Link */}
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-800 bg-white/80 hover:bg-white px-3.5 py-2 rounded-full border border-amber-200/80 shadow-sm backdrop-blur-md transition-all duration-200 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-amber-600 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Landing Page</span>
        </Link>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Network Live</span>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white/95 border border-amber-300/60 shadow-2xl shadow-amber-950/10 overflow-hidden relative z-10 backdrop-blur-xl">
        
        {/* Left Side: Brand Story Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div>
            <div className="mb-8">
              <Logo size="lg" variant="light" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-tight mb-3">
              From Hive to Home.
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed mb-6">
              Sign in with your role credentials to access real-time hive telemetry, quality inspection certificates, or immutable custody tracking.
            </p>

            {/* Active Demo Profile Badge */}
            <div className="bg-amber-950/50 p-4 rounded-2xl border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-extrabold text-amber-300">
                <span>Selected Operational Role</span>
                <span className="font-mono text-amber-200">VERIFIED NODE</span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xl">
                  {currentProfile.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {currentProfile.label}
                  </h4>
                  <p className="text-[11px] text-amber-200/80">
                    {currentProfile.name} • {currentProfile.organization}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-amber-300/90 pt-1 leading-snug">
                {currentProfile.description}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-500/40 text-xs text-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Enterprise Role-Based Access Control</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-amber-300/80">
              <QrCode className="w-3.5 h-3.5" />
              <span>Consumers do not require login; verify directly via QR</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form & Role Switcher */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          <div className="mb-4">
            <h3 className="text-2xl font-extrabold font-heading text-slate-900 mb-1">
              Sign In
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a quick demo profile or enter your phone/email credentials.
            </p>
          </div>

          {/* Quick Demo Profile Selector */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Quick Role Switcher (Live Demo Accounts)</span>
              </label>
              <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/70 px-2 py-0.5 rounded-full">
                1-Click Switch
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(Object.keys(demoProfiles) as Array<keyof typeof demoProfiles>).map((k) => {
                const p = demoProfiles[k];
                const isSelected = selectedRoleKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleSelectDemoProfile(k)}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-sm ring-1 ring-amber-400'
                        : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-amber-50/60 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-sm">{p.icon}</span>
                    <span className="truncate text-[11px] font-bold">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                Phone Number or Email
              </label>
              <Input
                placeholder="Enter email or phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="rounded-xl border-amber-200 bg-amber-50/30 focus:bg-white text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  Password / OTP Code
                </label>
                <span className="text-[11px] text-amber-700 font-semibold cursor-pointer hover:underline">
                  Forgot OTP?
                </span>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-amber-200 bg-amber-50/30 focus:bg-white text-sm font-mono"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Authenticating...' : `Sign In as ${currentProfile.label}`}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Active Credentials Hint Box */}
          <div className="mt-4 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-slate-700">
            <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
              <div className="flex items-center space-x-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>Active Demo Credentials</span>
              </div>
              <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-200/70 text-amber-900 font-mono">
                ROLE: {currentProfile.role}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-0.5 font-mono">
              <p><span className="font-semibold text-slate-800">Account:</span> {currentProfile.email}</p>
              <p><span className="font-semibold text-slate-800">OTP / Key:</span> 123456</p>
            </div>
          </div>

          {/* Consumer QR Link & Sign Up Link */}
          <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-amber-700 hover:underline">
                Create Account
              </Link>
            </div>
            <div>
              <Link href="/verify/hc-coorg-2026-001" className="font-semibold text-slate-600 hover:text-amber-800 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-amber-600" />
                <span>Consumer QR Verification →</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
