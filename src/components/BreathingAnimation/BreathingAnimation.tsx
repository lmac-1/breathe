'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { ExerciseState } from '@/types';

export const BreathingAnimation = ({
  breathCycleTime,
  breathingPhase,
  mode,
}: {
  breathCycleTime: number;
  breathingPhase: string;
  mode: ExerciseState;
}) => {
  const [animationScale, setAnimationScale] = useState(0.5);

  useEffect(() => {
    if (mode !== 'breathing') return;
    if (breathingPhase === 'exhale') setAnimationScale(0.5);
    if (breathingPhase === 'inhale') setAnimationScale(1);
  }, [breathingPhase, mode]);

  return (
    <div
      className={cn(
        'w-40 mt-4 h-40 rounded-full bg-blue-300 transition-transform',
        breathingPhase === 'hold' && 'bg-[#A0AEBC]'
      )}
      style={{
        transform:
          mode === 'breathing' ? `scale(${animationScale})` : 'scale(0.5)',
        transitionDuration: `${breathCycleTime}ms`,
      }}
    />
  );
};
