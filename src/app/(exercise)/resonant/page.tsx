'use client';

import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';
import { Finish } from '@/components/Finish';

const BREATHING_TYPE = 'resonant';

export default function Page() {
  const [minutes, setMinutes] = useState(5);
  const {
    exerciseState,
    start,
    elapsedSeconds,
    breathingPhase,
    breathingPhaseDuration,
    totalSeconds,
    isNarrated,
    toggleNarrated,
    cancel,
  } = useBreathing({ type: BREATHING_TYPE, minutes });

  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        type={BREATHING_TYPE}
        start={start}
        minutes={minutes}
        setMinutes={setMinutes}
        isNarrated={isNarrated}
        toggleNarrated={toggleNarrated}
      />
    );
  }

  if (exerciseState === 'finished')
    return <Finish type={BREATHING_TYPE} totalSeconds={totalSeconds} />;

  return (
    <BreathingSession
      cancel={cancel}
      mode={exerciseState}
      breathCycleTime={breathingPhaseDuration}
      breathingPhase={breathingPhase}
      elapsedSeconds={elapsedSeconds}
      totalSeconds={totalSeconds}
    />
  );
}
