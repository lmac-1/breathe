import { useEffect, useState } from 'react';

export type BreathingPhase =
  | 'inhale'
  | 'exhale'
  | 'holdAfterInhale'
  | 'holdAfterExhale';
export type Mode = 'idle' | 'breathing' | 'finished';

export const useEvenBreath = ({
  breathDurationMs,
  totalMinutes,
}: {
  breathDurationMs: number;
  totalMinutes: number;
}) => {
  const totalDurationMs = totalMinutes * 60 * 1000;
  const totalCycles = Math.floor(totalDurationMs / (breathDurationMs * 2));

  const [mode, setMode] = useState<Mode>('idle');
  const [breathingPhase, setBreathingPhase] =
    useState<BreathingPhase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (mode !== 'breathing') return; // we dont initiate time interval unless breathing
    if (cycleCount >= totalCycles) {
      setMode('finished');
      return;
    }
    const interval = setTimeout(() => {
      setBreathingPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      if (breathingPhase === 'exhale') setCycleCount((prev) => prev + 1);
    }, breathDurationMs);

    return () => clearTimeout(interval);
  }, [breathingPhase, cycleCount, breathDurationMs, mode, totalCycles]);

  const handleStart = () => {
    setMode('breathing');
    setBreathingPhase('inhale');
  };

  return { mode, handleStart, breathingPhase, cycleCount, totalCycles };
};
