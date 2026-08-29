"use client";
import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../lib/auth';
import { useRouter } from 'next/navigation';

export type UserRole =
  | 'ADMIN'
  | 'BEEKEEPER'
  | 'COLLECTION_CENTER'
  | 'QUALITY_INSPECTOR'
  | 'PROCESSOR'
  | 'DISTRIBUTOR'
  | 'RETAILER'
  | 'CONSUMER'
  | string;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
  organization?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function getRoleDashboardPath(role: string): string {
  const norm = String(role).toUpperCase();
  switch (norm) {
    case 'BEEKEEPER':
      return '/beekeeper';
    case 'COLLECTION_CENTER':
      return '/supply-chain';
    case 'QUALITY_INSPECTOR':
      return '/supply-chain/quality-test';
    case 'PROCESSOR':
      return '/supply-chain/processing';
    case 'DISTRIBUTOR':
    case 'RETAILER':
      return '/supply-chain/batches';
    case 'ADMIN':
      return '/admin';
    case 'CONSUMER':
      return '/verify/hc-coorg-2026-001';
    default:
      // Fallback compatibility checks
      if (norm.includes('BEEKEEPER')) return '/beekeeper';
      if (norm.includes('ADMIN')) return '/admin';
      if (norm.includes('QUALITY') || norm.includes('INSPECTOR')) return '/supply-chain/quality-test';
      if (norm.includes('PROCESSOR')) return '/supply-chain/processing';
      return '/supply-chain';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('hc_user') : null;
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser({ id: 'bk_ramesh', name: 'Ramesh Kumar', role: 'BEEKEEPER' });
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hc_user', JSON.stringify(userData));
    }
    const destination = getRoleDashboardPath(userData.role);
    router.push(destination);
  };

  const logout = () => {
    removeToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hc_user');
    }
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


