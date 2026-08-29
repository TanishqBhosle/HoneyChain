"use client";
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

export function PollenParticles({ count = 28 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    const colors = [
      'rgba(245, 158, 11, 0.45)', // Amber
      'rgba(251, 191, 36, 0.55)', // Light gold
      'rgba(254, 240, 138, 0.5)', // Pale sunshine
      'rgba(217, 119, 6, 0.35)',  // Deep honey
    ];

    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        x: (i * 37) % 100,
        y: (i * 53) % 100,
        size: 2.5 + ((i * 13) % 4.5),
        opacity: 0.25 + ((i * 7) % 50) / 100,
        duration: 8 + ((i * 11) % 10),
        delay: ((i * 5) % 6),
        color: colors[i % colors.length],
      });
    }
    return list;
  }, [count]);

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {particles.slice(0, 10).map((p) => (
          <div
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              filter: 'blur(1px)',
              borderRadius: '50%',
            }}
            className="absolute"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Sunlight beam overlay */}
      <div 
        className="absolute -top-20 -left-20 w-[60vw] h-[70vh] pointer-events-none opacity-25 -rotate-12 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(254, 243, 199, 0.6) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 80%)'
        }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: p.opacity,
            scale: 0.8,
          }}
          animate={{
            x: [`${p.x}vw`, `${(p.x + 8) % 100}vw`, `${(p.x - 5 + 100) % 100}vw`, `${p.x}vw`],
            y: [`${p.y}vh`, `${(p.y - 12 + 100) % 100}vh`, `${(p.y + 6) % 100}vh`, `${p.y}vh`],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity],
            scale: [0.8, 1.2, 0.9, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}
