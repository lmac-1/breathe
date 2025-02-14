'use client';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';

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
  } = useBreathing({
    type: 'box',
    minutes,
    lengthOfBreathPhase,
  });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        type="box"
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
      elapsedSeconds={elapsedSeconds}
      totalSeconds={totalSeconds}
    />
  );
}
