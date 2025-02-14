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
  } = useBreathing({ type: BREATHING_TYPE });
  if (exerciseState === 'idle') {
    return <BreathingConfig type={BREATHING_TYPE} start={start} />;
  }
  if (exerciseState === 'finished')
    return <Finish totalSeconds={totalSeconds} type={BREATHING_TYPE} />;

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
