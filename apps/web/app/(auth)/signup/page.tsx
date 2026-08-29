"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/contexts/AuthContext';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  MapPin, 
  Box, 
  Layers, 
  Building2, 
  FlaskConical, 
  Factory, 
  Truck, 
  Store,
  ShieldCheck, 
  Check, 
  KeyRound,
  Sparkles,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';

type SignUpRoleOption = 'BEEKEEPER' | 'COLLECTION_CENTER' | 'QUALITY_INSPECTOR' | 'PROCESSOR' | 'DISTRIBUTOR_RETAILER';

export default function Signup() {
  const { login } = useAuth();
  
  // Step 1: Base Account & OTP -> Step 2: Role Details -> Step 3: Specific Config -> Step 4: Ready
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Base Form States
  const [selectedRoleOption, setSelectedRoleOption] = useState<SignUpRoleOption>('BEEKEEPER');
  const [distributorOrRetailer, setDistributorOrRetailer] = useState<'DISTRIBUTOR' | 'RETAILER'>('DISTRIBUTOR');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Beekeeper Onboarding States
  const [apiaryName, setApiaryName] = useState('Nilgiri Valley Apiary');
  const [apiaryLocation, setApiaryLocation] = useState('Coorg, Karnataka');
  const [hiveCount, setHiveCount] = useState('12');
  const [firstHiveId, setFirstHiveId] = useState('HIVE-KA-01');
  const [hiveType, setHiveType] = useState('Langstroth Standard');
  const [beeSpecies, setBeeSpecies] = useState('Apis cerana indica (Indian Honeybee)');
  const [installationDate, setInstallationDate] = useState('2026-08-15');

  // Collection Center Onboarding States
  const [centerName, setCenterName] = useState('Madikeri Regional Collection Center');
  const [centerDistrict, setCenterDistrict] = useState('Kodagu Division, Karnataka');
  const [collectionCapacity, setCollectionCapacity] = useState('500 kg / day');

  // Quality Inspector Onboarding States
  const [labName, setLabName] = useState('KVIC Quality Verification Laboratory');
  const [accreditationId, setAccreditationId] = useState('NABL-FSSAI-IN-4921');
  const [testingCapabilities, setTestingCapabilities] = useState('Moisture, C4 Sugar, NMR, HMF');

  // Processor Onboarding States
  const [plantName, setPlantName] = useState('Apex Honey Processing & Packaging Unit');
  const [plantLocation, setPlantLocation] = useState('Mysore Industrial Area');
  const [packagingLines, setPackagingLines] = useState('250g, 500g, 1kg Glass Jars');

  // Distributor / Retailer Onboarding States
  const [businessName, setBusinessName] = useState('Southern Pure Organics Distribution');
  const [serviceArea, setServiceArea] = useState('Karnataka & South Zone');

  // Compute final backend role
  const resolvedRole: UserRole = 
    selectedRoleOption === 'DISTRIBUTOR_RETAILER' 
      ? distributorOrRetailer 
      : selectedRoleOption;

  const publicRoles = [
    {
      id: 'BEEKEEPER' as const,
      icon: '🐝',
      label: 'Beekeeper',
      description: 'Monitor your apiaries, track hive health, and create traceable honey batches.',
    },
    {
      id: 'COLLECTION_CENTER' as const,
      icon: '🏢',
      label: 'Collection Center',
      description: 'Receive beekeeper batches and record collection events.',
    },
    {
      id: 'QUALITY_INSPECTOR' as const,
      icon: '🧪',
      label: 'Quality Inspector',
      description: 'Record quality tests and approve or reject honey batches.',
    },
    {
      id: 'PROCESSOR' as const,
      icon: '🏭',
      label: 'Processor',
      description: 'Process approved batches and prepare products for packaging.',
    },
    {
      id: 'DISTRIBUTOR_RETAILER' as const,
      icon: '🚚',
      label: 'Distributor / Retailer',
      description: 'Track packaged honey through distribution and retail.',
    },
  ];

  const handleSendOtp = () => {
    if (!identifier) return;
    setOtpSent(true);
    setOtp('582910'); // Simulated instant OTP
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoleOption === 'BEEKEEPER') {
      setStep(3); // Beekeeper has Add First Hive step
    } else {
      setStep(4); // Other roles are ready for dashboard
    }
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const completeRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      login('token_' + Date.now(), {
        id: 'usr_' + Date.now().toString().slice(-4),
        name: name || `${publicRoles.find(r => r.id === selectedRoleOption)?.label} Member`,
        role: resolvedRole,
        phone: identifier.includes('@') ? undefined : identifier,
        email: identifier.includes('@') ? identifier : undefined,
        organization: 
          selectedRoleOption === 'BEEKEEPER' ? apiaryName :
          selectedRoleOption === 'COLLECTION_CENTER' ? centerName :
          selectedRoleOption === 'QUALITY_INSPECTOR' ? labName :
          selectedRoleOption === 'PROCESSOR' ? plantName :
          businessName,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#fbf9f4] p-4 sm:p-6 relative overflow-hidden">
      
      {/* Ambient Honey Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-300/20 blur-[140px] pointer-events-none -z-10" />

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
          <span>Verified Onboarding</span>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white/95 border border-amber-300/60 shadow-2xl shadow-amber-950/10 overflow-hidden relative z-10 backdrop-blur-xl">
        
        {/* Left Side: Brand & Onboarding Summary */}
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
              Create your verified identity on Honey Chain's decentralized traceability platform.
            </p>

            {/* Stepper Progress Pill */}
            <div className="bg-amber-950/50 p-4 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-extrabold text-amber-200">
                <span>Setup Progress</span>
                <span className="text-amber-300 font-mono">Stage {step} of {selectedRoleOption === 'BEEKEEPER' ? 4 : 3}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                {[1, 2, ...(selectedRoleOption === 'BEEKEEPER' ? [3] : []), selectedRoleOption === 'BEEKEEPER' ? 4 : 3].map((s, idx) => (
                  <React.Fragment key={s}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      step >= (idx + 1) ? 'bg-amber-400 text-amber-950' : 'bg-amber-900/70 text-amber-400'
                    }`}>
                      {idx + 1}
                    </div>
                    {idx < (selectedRoleOption === 'BEEKEEPER' ? 3 : 2) && (
                      <div className={`flex-1 h-1 rounded-full ${step > (idx + 1) ? 'bg-amber-400' : 'bg-amber-900/60'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-[11px] text-amber-200 font-medium pt-1">
                {step === 1 && 'Role Selection & Verification'}
                {step === 2 && (
                  selectedRoleOption === 'BEEKEEPER' ? 'Apiary Geolocation Setup' :
                  selectedRoleOption === 'COLLECTION_CENTER' ? 'Collection Center Details' :
                  selectedRoleOption === 'QUALITY_INSPECTOR' ? 'Laboratory Credentials' :
                  selectedRoleOption === 'PROCESSOR' ? 'Processing Plant Profile' :
                  'Logistics & Retail Profile'
                )}
                {step === 3 && (
                  selectedRoleOption === 'BEEKEEPER' ? 'Add Primary Smart Hive' : 'Review & Launch'
                )}
                {step === 4 && 'Launching Operational Dashboard'}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-500/40 text-xs text-amber-200 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span className="font-semibold">Cryptographically Verified Protocol</span>
            </div>
            <p className="text-[11px] text-amber-300/80 pl-6">
              Compliant with KVIC & FSSAI honey quality standards.
            </p>
          </div>
        </div>

        {/* Right Side: Dynamic Form Container */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* ================= STEP 1: Role Selection & Phone/Email OTP ================= */}
          {step === 1 && (
            <div>
              <div className="mb-5">
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 mb-1">
                  Create Account
                </h3>
                <p className="text-sm font-medium text-amber-900">
                  Choose how you'll use Honey Chain.
                </p>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                
                {/* 5 Public Roles Selection Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {publicRoles.map((r) => {
                      const isSelected = selectedRoleOption === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSelectedRoleOption(r.id)}
                          className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-100/90 border-amber-500 text-amber-950 shadow-md shadow-amber-900/5 ring-2 ring-amber-400/40 scale-[1.01]'
                              : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-amber-50/60 hover:border-amber-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-base font-bold flex items-center gap-1.5">
                              <span>{r.icon}</span>
                              <span className="text-xs font-heading">{r.label}</span>
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-amber-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-tight">
                            {r.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-option if Distributor / Retailer selected */}
                {selectedRoleOption === 'DISTRIBUTOR_RETAILER' && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300/80 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-950 block">
                      Specific Business Function (Backend Role)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDistributorOrRetailer('DISTRIBUTOR')}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center border transition ${
                          distributorOrRetailer === 'DISTRIBUTOR'
                            ? 'bg-white border-amber-500 text-amber-950 shadow-sm'
                            : 'bg-amber-100/40 border-amber-200 text-slate-600'
                        }`}
                      >
                        🚚 Distributor
                      </button>
                      <button
                        type="button"
                        onClick={() => setDistributorOrRetailer('RETAILER')}
                        className={`p-2.5 rounded-xl text-xs font-bold text-center border transition ${
                          distributorOrRetailer === 'RETAILER'
                            ? 'bg-white border-amber-500 text-amber-950 shadow-sm'
                            : 'bg-amber-100/40 border-amber-200 text-slate-600'
                        }`}
                      >
                        🏪 Retailer
                      </button>
                    </div>
                  </div>
                )}

                {/* Full Name / Organization */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Full Name / Organization Name
                  </label>
                  <Input
                    placeholder="e.g. Ramesh Kumar or Nilgiri Beekeepers Society"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                  />
                </div>

                {/* Phone / Email Input + OTP */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Phone Number or Email
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="+91 98765 43210 or name@domain.com"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendOtp}
                      className="text-xs px-3 font-semibold border-amber-300 hover:bg-amber-100 whitespace-nowrap"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </Button>
                  </div>
                </div>

                {/* OTP Verification Input */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      OTP Verification Code
                    </label>
                    {otpSent && (
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        ✓ OTP auto-sent to {identifier || 'phone/email'}
                      </span>
                    )}
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP (e.g. 582910)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="rounded-xl border-amber-200 bg-amber-50/30 text-sm font-mono"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                >
                  <span>Continue to Role Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}

          {/* ================= STEP 2: Role-Specific Onboarding Details ================= */}
          {step === 2 && (
            <div>
              {/* Beekeeper: Create Apiary */}
              {selectedRoleOption === 'BEEKEEPER' && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      Beekeeper Onboarding • Step 2 of 3
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                      Create Your Apiary
                    </h3>
                    <p className="text-xs text-slate-500">
                      Register your primary apiary location to establish origin geolocation for all harvests.
                    </p>
                  </div>

                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Apiary Name</label>
                      <Input
                        value={apiaryName}
                        onChange={(e) => setApiaryName(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Location / KVIC District</label>
                      <Input
                        value={apiaryLocation}
                        onChange={(e) => setApiaryLocation(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Number of Active Hives</label>
                      <Input
                        type="number"
                        value={hiveCount}
                        onChange={(e) => setHiveCount(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Next: Add First Hive</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Collection Center: Center Info */}
              {selectedRoleOption === 'COLLECTION_CENTER' && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      Collection Center Onboarding
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                      Collection Center Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure your reception node to record beekeeper deposits and weigh incoming batches.
                    </p>
                  </div>

                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Center Name / Mandi ID</label>
                      <Input
                        value={centerName}
                        onChange={(e) => setCenterName(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">KVIC District / Regional Division</label>
                      <Input
                        value={centerDistrict}
                        onChange={(e) => setCenterDistrict(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Daily Receiving Capacity</label>
                      <Input
                        value={collectionCapacity}
                        onChange={(e) => setCollectionCapacity(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Complete Registration</span>
                      <Check className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Quality Inspector: Credentials */}
              {selectedRoleOption === 'QUALITY_INSPECTOR' && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      Quality Inspector Onboarding
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                      Inspector & Testing Facility
                    </h3>
                    <p className="text-xs text-slate-500">
                      Link your laboratory accreditation to sign digital purity and adulteration test certificates.
                    </p>
                  </div>

                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Testing Lab / Organization Name</label>
                      <Input
                        value={labName}
                        onChange={(e) => setLabName(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">NABL / FSSAI Accreditation Number</label>
                      <Input
                        value={accreditationId}
                        onChange={(e) => setAccreditationId(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Supported Test Parameters</label>
                      <Input
                        value={testingCapabilities}
                        onChange={(e) => setTestingCapabilities(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Complete Registration</span>
                      <Check className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Processor: Plant details */}
              {selectedRoleOption === 'PROCESSOR' && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      Processor Onboarding
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                      Processing Plant Facility
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure your bottling and micro-filtration plant to generate tamper-evident packaging QR batches.
                    </p>
                  </div>

                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Processing Plant Name</label>
                      <Input
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Facility Location</label>
                      <Input
                        value={plantLocation}
                        onChange={(e) => setPlantLocation(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Packaging Form Factors</label>
                      <Input
                        value={packagingLines}
                        onChange={(e) => setPackagingLines(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Complete Registration</span>
                      <Check className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Distributor / Retailer: Business Setup */}
              {selectedRoleOption === 'DISTRIBUTOR_RETAILER' && (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      {distributorOrRetailer === 'DISTRIBUTOR' ? 'Distributor Onboarding' : 'Retailer Onboarding'}
                    </span>
                    <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                      {distributorOrRetailer === 'DISTRIBUTOR' ? 'Distribution Network' : 'Retail Store & Inventory'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Track sealed batches through wholesale logistics or mark products as received in retail stock.
                    </p>
                  </div>

                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        {distributorOrRetailer === 'DISTRIBUTOR' ? 'Logistics / Distributor Entity Name' : 'Store / Chain Name'}
                      </label>
                      <Input
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        {distributorOrRetailer === 'DISTRIBUTOR' ? 'Operating Distribution Territory' : 'Retail Store Location'}
                      </label>
                      <Input
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        required
                        className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Complete Registration</span>
                      <Check className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* ================= STEP 3: Beekeeper Add First Hive ================= */}
          {step === 3 && selectedRoleOption === 'BEEKEEPER' && (
            <div>
              <div className="mb-5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                  Beekeeper Onboarding • Step 3 of 3
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-2 mb-1">
                  Add Your First Hive
                </h3>
                <p className="text-xs text-slate-500">
                  Assign hive parameters and IoT sensor mapping for automated telemetry and disease screening.
                </p>
              </div>

              <form onSubmit={handleStep3Submit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hive Identifier</label>
                    <Input
                      value={firstHiveId}
                      onChange={(e) => setFirstHiveId(e.target.value)}
                      required
                      className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Installation Date</label>
                    <Input
                      type="date"
                      value={installationDate}
                      onChange={(e) => setInstallationDate(e.target.value)}
                      required
                      className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hive Architecture Type</label>
                  <Input
                    value={hiveType}
                    onChange={(e) => setHiveType(e.target.value)}
                    required
                    className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Bee Species</label>
                  <Input
                    value={beeSpecies}
                    onChange={(e) => setBeeSpecies(e.target.value)}
                    required
                    className="rounded-xl border-amber-200 bg-amber-50/30 text-sm"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>IoT Telemetry & Edge AI Ready</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Live temperature, acoustic, and weight sensor streams will be initialized for {firstHiveId}.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Finish Setup</span>
                  <Check className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}

          {/* ================= STEP 4: Ready to Enter Dashboard ================= */}
          {step === 4 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-3xl shadow-sm">
                🎉
              </div>

              <div>
                <h3 className="text-2xl font-extrabold font-heading text-slate-900 mb-1">
                  Registration Complete!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Your node <span className="font-bold text-slate-900">{name || 'Member'}</span> is now active as{' '}
                  <span className="font-bold text-amber-800">
                    {publicRoles.find(r => r.id === selectedRoleOption)?.label}
                  </span>.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 text-left space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>On-Chain Cryptographic Key Initialized</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Your credentials and permissions are synchronized with the Honey Chain network. Click below to enter your operational workspace.
                </p>
              </div>

              <Button
                onClick={completeRegistration}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 text-sm"
              >
                <span>{loading ? 'Launching Dashboard...' : 'Open Operational Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Switch to Sign In */}
          <div className="text-center pt-4 mt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-amber-700 hover:underline">
                Sign In Instead
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
