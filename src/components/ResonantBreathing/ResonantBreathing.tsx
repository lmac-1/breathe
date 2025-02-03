'use client';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

type BreathingPhase = 'inhale' | 'exhale';
type Mode = 'idle' | 'breathing' | 'finished';

const MINUTES = 1;

export function ResonantBreathing() {
  const inhaleTime = 5500; // 5.5 seconds for inhale
  const exhaleTime = inhaleTime; // 5.5 seconds for exhale

  const totalDuration = MINUTES * 60 * 1000; // 1 minute
  const totalCycles = Math.floor(totalDuration / (inhaleTime + exhaleTime));

  const [mode, setMode] = useState<Mode>('idle');
  const [breathingPhase, setBreathingPhase] =
    useState<BreathingPhase>('inhale');
  const [animationScale, setAnimationScale] = useState(0.5);
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
      setAnimationScale(breathingPhase === 'inhale' ? 0.5 : 1);
      if (breathingPhase === 'exhale') setCycleCount((prev) => prev + 1); // Increment cycle after exhale
    }, breathDuration);

    return () => clearTimeout(interval);
  }, [breathingPhase, cycleCount, totalCycles, mode, exhaleTime]);

  // Ensure first inhale starts correctly
  useEffect(() => {
    if (
      mode === 'breathing' &&
      breathingPhase === 'inhale' &&
      cycleCount === 0
    ) {
      setAnimationScale(1);
    }
  }, [mode, breathingPhase, cycleCount]);

  const handleStart = () => {
    setMode('breathing');
    setBreathingPhase('inhale'); // Ensure we start with inhale
  };

  if (mode === 'idle') return <Button onClick={handleStart}>start</Button>;

  if (mode === 'finished') return 'finished! how do you feel?';
  return (
    <div>
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>

      {/* Breath Circle */}
      <div
        className="w-40 mt-4 h-40 rounded-full bg-blue-300 transition-transform duration-[5500ms]"
        style={{
          transform:
            mode === 'breathing' ? `scale(${animationScale})` : 'scale(0.5)',
        }}
      />
    </div>
  );
}
