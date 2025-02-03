'use client';
import { BreathingPhase, Mode } from '@/hooks/useEvenBreath';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { BreathingAnimation } from '../BreathingAnimation';

export const BoxBreathing = () => {
  const boxMs = 4000;
  const totalMinutes = 5;
  const totalDurationMs = totalMinutes * 60 * 1000;
  const totalBreathCycle = boxMs * 4;
  const totalCycles = Math.floor(totalDurationMs / totalBreathCycle);

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
    const interval = setTimeout(() => {
      if (breathingPhase === 'inhale') setBreathingPhase('holdAfterInhale');
      if (breathingPhase === 'exhale') setBreathingPhase('holdAfterExhale');
      if (breathingPhase === 'holdAfterInhale') setBreathingPhase('exhale');
      if (breathingPhase === 'holdAfterExhale') {
        setBreathingPhase('inhale');
        setCycleCount((prev) => prev + 1);
      }
    }, boxMs);

    return () => clearTimeout(interval);
  }, [mode, cycleCount, totalCycles, breathingPhase]);

  const handleStart = () => {
    setMode('breathing');
    setBreathingPhase('inhale');
  };

  if (mode === 'idle') {
    return (
      <div>
        <p>
          inhale, hold your breath, exhale, and hold again, each for the same
          duration
        </p>
        <Button className="mt-3" onClick={handleStart}>
          go
        </Button>
      </div>
    );
  }
  if (mode === 'finished') return 'finished! how do you feel?';

  const breathingPhaseText = ['holdAfterInhale', 'holdAfterExhale'].includes(
    breathingPhase
  )
    ? 'hold'
    : breathingPhase;
  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <h1 className="text-2xl font-semibold">{breathingPhaseText}</h1>
      <BreathingAnimation
        breathCycleTime={boxMs}
        breathingPhase={breathingPhase}
        mode={mode}
      />
    </div>
  );
};
