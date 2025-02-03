'use client';
import { useEffect, useState } from 'react';
import { BreathingPhase, Mode } from '@/hooks/useEvenBreath';
import { cn } from '@/utils';

export const BreathingAnimation = ({
  breathCycleTime,
  breathingPhase,
  mode,
}: {
  breathCycleTime: number;
  breathingPhase: BreathingPhase;
  mode: Mode;
}) => {
  const [animationScale, setAnimationScale] = useState(0.5);

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
        'w-40 mt-4 h-40 rounded-full bg-blue-300 transition-transform'
      )}
      style={{
        transform:
          mode === 'breathing' ? `scale(${animationScale})` : 'scale(0.5)',
        transitionDuration: `${breathCycleTime}ms`,
      }}
    />
  );
};
