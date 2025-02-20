'use client';

import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';
import { Finish } from '@/components/Finish';
import { useBreathing } from '@/hooks/useBreathing';

const BREATHING_TYPE = 'calm';

export default function Page() {
  const {
    exerciseState,
    totalSeconds,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
    isNarrated,
    toggleNarrated,
    cancel,
  } = useBreathing({ type: BREATHING_TYPE });
  if (exerciseState === 'idle') {
    return (
      <BreathingConfig
        isNarrated={isNarrated}
        toggleNarrated={toggleNarrated}
        type={BREATHING_TYPE}
        start={start}
      />
    );
  }
  if (exerciseState === 'finished')
    return <Finish totalSeconds={totalSeconds} type={BREATHING_TYPE} />;

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
