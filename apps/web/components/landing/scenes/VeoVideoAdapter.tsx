"use client";
import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

interface VeoVideoAdapterProps {
  src?: string;
  poster?: string;
  progress: MotionValue<number>;
  startProgress?: number;
  endProgress?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * VeoVideoAdapter
 * Provides a drop-in slot for Veo-generated cinematic video assets.
 * When a video src is supplied (e.g. /videos/01-honeycomb.mp4), it scrubs video.currentTime
 * in synchronization with the Framer Motion scroll progress using requestAnimationFrame.
 * If no video src is provided, it gracefully renders the high-fidelity SVG/CSS visual children.
 */
export function VeoVideoAdapter({
  src,
  poster,
  progress,
  startProgress = 0,
  endProgress = 1,
  className = "",
  children,
}: VeoVideoAdapterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!src || !videoRef.current) return;
    const video = videoRef.current;

    const updateFrame = () => {
      const currentScroll = progress.get();
      const clamped = Math.max(0, Math.min(1, (currentScroll - startProgress) / (endProgress - startProgress)));
      
      if (video.duration && !isNaN(video.duration)) {
        const targetTime = clamped * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          video.currentTime = targetTime;
        }
      }
      rafRef.current = requestAnimationFrame(updateFrame);
    };

    rafRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [src, progress, startProgress, endProgress]);

  if (!src) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* TODO: Replace with Veo asset e.g. /videos/01-honeycomb.mp4 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        preload="metadata"
        className="w-full h-full object-cover pointer-events-none"
      />
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
}
