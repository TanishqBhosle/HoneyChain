import './globals.css';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Honey Chain — From Hive to Home, Every Drop Has a Story',
  description: 'Honey Chain connects IoT hive intelligence, AI-assisted health screening, and blockchain traceability into one transparent, verifiable honey ecosystem.',
  keywords: 'honey traceability, blockchain honey, IoT beekeeping, smart hive, Honey Chain, purity verification, Polygon blockchain',
  openGraph: {
    title: 'Honey Chain — The Trust Layer for Pure Honey',
    description: 'From Hive to Home, Every Drop Has a Story. Verifiable honey provenance powered by IoT, AI & Blockchain.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#fbf9f4] text-slate-900 selection:bg-amber-200 selection:text-amber-950 min-h-screen overflow-x-hidden">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

