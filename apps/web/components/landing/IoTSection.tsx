"use client";
import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { 
  Thermometer, 
  Droplets, 
  Scale, 
  Activity, 
  Radio, 
  BatteryMedium, 
  Wifi, 
  Clock, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

export function IoTSection() {
  const [liveTemp, setLiveTemp] = useState(34.2);
  const [liveWeight, setLiveWeight] = useState(42.8);

  const initialGraphData = [
    { time: '06:00', temp: 32.5, weight: 42.1, humidity: 64 },
    { time: '08:00', temp: 33.1, weight: 42.3, humidity: 62 },
    { time: '10:00', temp: 33.8, weight: 42.5, humidity: 60 },
    { time: '12:00', temp: 34.5, weight: 42.6, humidity: 59 },
    { time: '14:00', temp: 34.8, weight: 42.7, humidity: 58 },
    { time: '16:00', temp: 34.2, weight: 42.8, humidity: 61 },
    { time: '18:00', temp: 33.9, weight: 42.8, humidity: 63 },
  ];

  const [graphData, setGraphData] = useState(initialGraphData);

  // Subtle live fluctuation effect for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.2;
      setLiveTemp((prev) => +(prev + delta).toFixed(1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="technology" className="py-24 md:py-32 relative overflow-hidden bg-cream-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="text-xs font-extrabold tracking-widest text-amber-800 uppercase bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300/60">
                Continuous Telemetry
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-950 leading-tight">
                IoT sensors that listen to the colony 24/7.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-base text-slate-600 leading-relaxed">
                Solar-powered multisensory nodes placed inside the brood box monitor thermal regulation, moisture stability, and nectar flow weight in real-time — alerting beekeepers long before swarming or winter distress occurs.
              </p>
            </ScrollReveal>

            {/* Feature List */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Non-Invasive Acoustic & Thermal Nodes</h4>
                    <p className="text-xs text-slate-500">Zero disruption to queen egg-laying cycles.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">LoRaWAN & GSM Redundancy</h4>
                    <p className="text-xs text-slate-500">Operates in remote forest valleys with solar backup.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Harvest Yield Precision</h4>
                    <p className="text-xs text-slate-500">Automated hive weight monitoring indicates honey maturity.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Animated Live Hive Preview Dashboard */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.3}>
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-300/60 bg-white/90 shadow-2xl shadow-amber-950/10">
                
                {/* Header with Hive Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-amber-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/30">
                      🐝
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-slate-900 font-heading">
                          HIVE H-07
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          ONLINE
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">Apiary Alpha • Coorg, Karnataka</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-600 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/50">
                    <span className="flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-emerald-600" /> GSM-98%
                    </span>
                    <span className="flex items-center gap-1">
                      <BatteryMedium className="w-3.5 h-3.5 text-amber-600" /> Solar 94%
                    </span>
                  </div>
                </div>

                {/* 4 Core Sensor Metric Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6">
                  
                  {/* Metric 1: Health Score */}
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Health Score</span>
                      <Activity className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-heading">
                      92<span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-700 mt-1">
                      Optimal Status
                    </div>
                  </div>

                  {/* Metric 2: Temperature */}
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Temperature</span>
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-heading transition-all">
                      {liveTemp}°C
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 mt-1">
                      Target: 34-35°C
                    </div>
                  </div>

                  {/* Metric 3: Humidity */}
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Humidity</span>
                      <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-heading">
                      61%
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-700 mt-1">
                      Ideal Brood RH
                    </div>
                  </div>

                  {/* Metric 4: Weight */}
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                      <span>Weight</span>
                      <Scale className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-heading">
                      {liveWeight} <span className="text-xs text-slate-400 font-normal">kg</span>
                    </div>
                    <div className="text-[10px] font-bold text-amber-800 mt-1">
                      +1.2kg Flow Gain
                    </div>
                  </div>

                </div>

                {/* Live Sensor Sparkline Graph */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-slate-800 font-heading flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      12-Hour Brood Temperature & Weight Curve
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Stable Diurnal Cycle
                    </span>
                  </div>

                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={graphData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderRadius: '8px',
                            border: 'none',
                            color: '#fff',
                            fontSize: '11px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="temp"
                          stroke="#d97706"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#tempGradient)"
                          name="Temperature (°C)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
