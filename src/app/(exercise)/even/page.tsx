'use client';

import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';

export default function Page() {
  const [minutes, setMinutes] = useState(5);
  const [lengthOfBreathPhase, setLengthOfBreathPhase] = useState(5);
  const {
    exerciseState,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
    totalSeconds,
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
    <BreathingSession
      breathCycleTime={breathingPhaseDuration}
      breathingPhase={breathingPhase}
      mode={exerciseState}
      totalSeconds={totalSeconds}
      elapsedSeconds={elapsedSeconds}
    />
  );
}
