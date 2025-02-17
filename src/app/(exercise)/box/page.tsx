'use client';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';
import { Finish } from '@/components/Finish';

const BREATHING_TYPE = 'box';

export default function Page() {
  const [minutes, setMinutes] = useState(5);
  const [lengthOfBreathPhase, setLengthOfBreathPhase] = useState(4);
  const {
    exerciseState,
    breathingPhaseDuration,
    start,
    breathingPhase,
    elapsedSeconds,
    totalSeconds,
    isNarrated,
    toggleNarrated,
  } = useBreathing({
    type: BREATHING_TYPE,
    minutes,
    lengthOfBreathPhase,
  });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        isNarrated={isNarrated}
        toggleNarrated={toggleNarrated}
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
    return <Finish totalSeconds={totalSeconds} type={BREATHING_TYPE} />;

  return (
    <BreathingSession
      breathCycleTime={breathingPhaseDuration}
      breathingPhase={breathingPhase}
      mode={exerciseState}
      elapsedSeconds={elapsedSeconds}
      totalSeconds={totalSeconds}
    />
  );
}
