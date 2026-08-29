"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getRoleDashboardPath } from '@/contexts/AuthContext';
import { Logo } from '@/components/common/Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'How It Works', href: '#journey' },
    { name: 'Traceability', href: '#traceability' },
    { name: 'Verify Honey', href: '/verify' },
    { name: 'Impact', href: '#impact' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#fdfcf9]/80 backdrop-blur-xl border-b border-amber-500/15 shadow-sm shadow-amber-950/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" variant="dark" />

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-amber-50/60 border border-amber-200/50 rounded-full backdrop-blur-md px-4 shadow-inner shadow-amber-900/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-amber-700 hover:bg-white/70 rounded-full transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <Link
              href={getRoleDashboardPath(user.role)}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-amber-100 hover:bg-amber-200 border border-amber-300/80 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/60 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#fdfcf9]/95 backdrop-blur-2xl border-b border-amber-200 px-6 py-5 shadow-xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-amber-100 flex flex-col space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-bold text-slate-700 bg-amber-50/80 rounded-xl border border-amber-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-bold text-white bg-amber-500 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
