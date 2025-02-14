'use client';

import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';

export default function Page() {
  const [minutes, setMinutes] = useState(5);
  const {
    exerciseState,
    start,
    elapsedSeconds,
    breathingPhase,
    breathingPhaseDuration,
    totalSeconds,
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
    <BreathingSession
      mode={exerciseState}
      breathCycleTime={breathingPhaseDuration}
      breathingPhase={breathingPhase}
      elapsedSeconds={elapsedSeconds}
      totalSeconds={totalSeconds}
    />
  );
}
