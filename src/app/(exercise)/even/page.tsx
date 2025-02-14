'use client';

import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';
import { Finish } from '@/components/Finish';

const BREATHING_TYPE = 'even';

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
  } = useBreathing({ type: BREATHING_TYPE, minutes, lengthOfBreathPhase });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        type={BREATHING_TYPE}
        start={start}
        minutes={minutes}
        setMinutes={setMinutes}
        lengthOfBreathPhase={lengthOfBreathPhase}
        setLengthOfBreathPhase={setLengthOfBreathPhase}
      />
    );
  }

  if (exerciseState === 'finished')
    return <Finish type={BREATHING_TYPE} totalSeconds={totalSeconds} />;

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
