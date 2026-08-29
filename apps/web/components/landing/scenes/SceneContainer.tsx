"use client";
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface SceneContainerProps {
  progress: MotionValue<number>;
  enterRange: [number, number]; // [startEnter, fullEnter]
  exitRange: [number, number];  // [startExit, fullExit]
  children: React.ReactNode;
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * SceneContainer
 * Strictly governs the lifecycle of a single cinematic story scene:
 * - INACTIVE: opacity: 0, visibility: hidden, pointer-events: none
 * - ENTERING: opacity: 0 -> 1, y: 24 -> 0, scale: 0.97 -> 1
 * - ACTIVE: opacity: 1, y: 0, scale: 1, pointer-events: auto
 * - EXITING: opacity: 1 -> 0, y: 0 -> -24, scale: 1 -> 0.97
 */
export function SceneContainer({
  progress,
  enterRange,
  exitRange,
  children,
  className = "",
  isFirst = false,
  isLast = false,
}: SceneContainerProps) {
  const [enterStart, enterEnd] = enterRange;
  const [exitStart, exitEnd] = exitRange;

  // Clamped opacity curve
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [1, 1, 0]
      : isLast
      ? [0, 1, 1]
      : [0, 1, 1, 0],
    { clamp: true }
  );

  // Clamped Y translation
  const y = useTransform(
    progress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [0, 0, -28]
      : isLast
      ? [28, 0, 0]
      : [28, 0, 0, -28],
    { clamp: true }
  );

  // Clamped subtle scale
  const scale = useTransform(
    progress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
      ? [enterStart, enterEnd, 1]
      : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [1, 1, 0.97]
      : isLast
      ? [0.97, 1, 1]
      : [0.97, 1, 1, 0.97],
    { clamp: true }
  );

  // Derive pointerEvents & visibility based on progress
  const pointerEvents = useTransform(progress, (v) => {
    const isActive = isFirst
      ? v < exitEnd
      : isLast
      ? v >= enterStart
      : v >= enterStart && v <= exitEnd;
    return isActive ? 'auto' : 'none';
  });

  const visibility = useTransform(progress, (v) => {
    const isVisible = isFirst
      ? v < exitEnd + 0.01
      : isLast
      ? v >= enterStart - 0.01
      : v >= enterStart - 0.01 && v <= exitEnd + 0.01;
    return isVisible ? 'visible' : 'hidden';
  });

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        pointerEvents,
        visibility,
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
