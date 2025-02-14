'use client';
import { BreathingAnimation } from '../BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '../BreathingConfig';

export function ResonantBreathing() {
  const [minutes, setMinutes] = useState(5);
  const {
    exerciseState,
    start,
    elapsedSeconds,
    breathingPhase,
    breathingPhaseDuration,
  } = useBreathing({ type: 'resonant', minutes });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        type="resonant"
        start={start}
        minutes={minutes}
        setMinutes={setMinutes}
      />
    );
  }

  if (exerciseState === 'finished') return 'finished! how do you feel?';
  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">{elapsedSeconds}</p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathingAnimation
        breathCycleTime={breathingPhaseDuration}
        breathingPhase={breathingPhase}
        mode={exerciseState}
      />
    </div>
  );
}
