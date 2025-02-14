'use client';

import { BreathingConfig } from '@/components/BreathingConfig';
import { BreathingSession } from '@/components/BreathingSession';
import { useBreathing } from '@/hooks/useBreathing';

export default function Page() {
  const {
    exerciseState,
    totalSeconds,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
  } = useBreathing({ type: 'calm' });
  if (exerciseState === 'idle') {
    return <BreathingConfig type="calm" start={start} />;
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
