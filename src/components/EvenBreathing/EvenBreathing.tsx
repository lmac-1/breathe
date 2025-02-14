'use client';

import { BreathingAnimation } from '@/components/BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '../BreathingConfig';

export const EvenBreathing = () => {
  const [minutes, setMinutes] = useState(5);
  const [lengthOfBreathPhase, setLengthOfBreathPhase] = useState(5);
  const {
    exerciseState,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
  } = useBreathing({ type: 'even', minutes, lengthOfBreathPhase });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        type="even"
        start={start}
        minutes={minutes}
        setMinutes={setMinutes}
        lengthOfBreathPhase={lengthOfBreathPhase}
        setLengthOfBreathPhase={setLengthOfBreathPhase}
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
};
