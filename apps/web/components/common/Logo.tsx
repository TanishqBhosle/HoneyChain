import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  showTagline?: boolean;
  href?: string;
}

export function Logo({
  className = '',
  size = 'md',
  variant = 'dark',
  showTagline = true,
  href = '/',
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]', pad: 'p-1.5' },
    md: { icon: 'w-9 h-9', text: 'text-lg', sub: 'text-[10px]', pad: 'p-2' },
    lg: { icon: 'w-11 h-11', text: 'text-xl', sub: 'text-xs', pad: 'p-2.5' },
    xl: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-sm', pad: 'p-3' },
  };

  const isLight = variant === 'light';
  const conf = sizeMap[size];

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 select-none group ${className}`}>
      {/* Sleek Vector Geometric Honeycomb + Blockchain Hexagon Icon */}
      <div
        className={`relative ${conf.icon} rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/25 ring-1 ring-amber-400/30 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all duration-300 ease-out`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
        >
          <defs>
            <linearGradient id="dropGrad" x1="20" y1="12" x2="20" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
            <linearGradient id="hexGrad" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Hexagon Outer Boundary (Honeycomb Cell) */}
          <path
            d="M20 4L33 11.5V28.5L20 36L7 28.5V11.5L20 4Z"
            stroke="url(#hexGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Inner Cryptographic Node Connections */}
          <circle cx="20" cy="4" r="1.8" fill="#FFFFFF" />
          <circle cx="33" cy="11.5" r="1.8" fill="#FFFFFF" />
          <circle cx="33" cy="28.5" r="1.8" fill="#FFFFFF" />
          <circle cx="20" cy="36" r="1.8" fill="#FFFFFF" />
          <circle cx="7" cy="28.5" r="1.8" fill="#FFFFFF" />
          <circle cx="7" cy="11.5" r="1.8" fill="#FFFFFF" />

          {/* Golden Honey Drop Silhouette with Pure Highlight */}
          <path
            d="M20 12C20 12 13.5 19 13.5 23.5C13.5 27.09 16.41 30 20 30C23.59 30 26.5 27.09 26.5 23.5C26.5 19 20 12 20 12Z"
            fill="url(#dropGrad)"
          />

          {/* Drop Glint / Reflection Accent */}
          <path
            d="M17 21C16.5 22.5 16.5 24.5 17.5 26"
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>

        {/* Subtle Ambient Pulsing Glow */}
        <div className="absolute inset-0 rounded-xl bg-amber-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${conf.text} font-black tracking-tight font-heading ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Honey<span className="text-amber-500 ml-0.5">Chain</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`${conf.sub} ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            } font-medium tracking-tight mt-0.5 leading-tight`}
          >
            Hive-to-Home Traceability
          </span>
        )}
      </div>
    </div>
  );

  if (!href) return logoContent;

  return (
    <Link href={href} className="inline-flex focus:outline-none">
      {logoContent}
    </Link>
  );
}
