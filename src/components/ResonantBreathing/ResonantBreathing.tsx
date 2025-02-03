'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '@/utils';

type BreathingPhase = 'inhale' | 'exhale';
type Mode = 'idle' | 'breathing' | 'finished';

const TOTAL_MINUTES = 1;

export function ResonantBreathing() {
  const inhaleTime = 5500; // 5.5 seconds for inhale
  const exhaleTime = inhaleTime; // 5.5 seconds for exhale

  const totalDuration = TOTAL_MINUTES * 60 * 1000;
  const totalCycles = Math.floor(totalDuration / (inhaleTime + exhaleTime));

  const [mode, setMode] = useState<Mode>('idle');
  const [breathingPhase, setBreathingPhase] =
    useState<BreathingPhase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (mode !== 'breathing') return;
    if (cycleCount >= totalCycles) {
      setMode('finished');
      return;
    }

    const breathDuration =
      breathingPhase === 'inhale' ? inhaleTime : exhaleTime;

    const interval = setTimeout(() => {
      setBreathingPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      if (breathingPhase === 'exhale') setCycleCount((prev) => prev + 1); // Increment cycle after exhale
    }, breathDuration);

    return () => clearTimeout(interval);
  }, [breathingPhase, cycleCount, totalCycles, mode, exhaleTime]);

  const handleStart = () => {
    setMode('breathing');
    setBreathingPhase('inhale'); // Ensure we start with inhale
  };

  if (mode === 'idle')
    return (
      <div>
        <p>
          breathe at 5.5 breaths per minute to chill out, reset your mind, and
          find your focus.
        </p>
        <Button className="mt-3" onClick={handleStart}>
          i&apos;m ready
        </Button>
      </div>
    );

  if (mode === 'finished') return 'finished! how do you feel?';
  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathCircleAnimation
        breathCycleTime={inhaleTime}
        breathingPhase={breathingPhase}
        //cycleCount={cycleCount}
        mode={mode}
      />
    </div>
  );
}

const BreathCircleAnimation = ({
  breathCycleTime,
  breathingPhase,
  mode,
}: //cycleCount,
{
  breathCycleTime: number;
  breathingPhase: BreathingPhase;
  mode: Mode;
  // cycleCount: number;
}) => {
  const [animationScale, setAnimationScale] = useState(0.5);
  const animationClassName = `duration-[${breathCycleTime}ms]`;

  useEffect(() => {
    if (mode !== 'breathing') return;
    if (breathingPhase === 'exhale') setAnimationScale(0.5);
    if (breathingPhase === 'inhale') setAnimationScale(1);
  }, [breathingPhase, mode]);

  // Ensure first inhale animates correctly
  // useEffect(() => {
  //   if (
  //     mode === 'breathing' &&
  //     breathingPhase === 'inhale' &&
  //     cycleCount === 0
  //   ) {
  //     setAnimationScale(1);
  //   }
  // }, [mode, breathingPhase, cycleCount]);

  return (
    <div
      className={cn(
        'w-40 mt-4 h-40 rounded-full bg-blue-300 transition-transform',
        animationClassName
      )}
      style={{
        transform:
          mode === 'breathing' ? `scale(${animationScale})` : 'scale(0.5)',
      }}
    />
  );
};
