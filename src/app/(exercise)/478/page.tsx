'use client';

import { BreathingAnimation } from '@/components/BreathingAnimation';
import { BreathingConfig } from '@/components/BreathingConfig';
import { useBreathing } from '@/hooks/useBreathing';

export default function Page() {
  const {
    exerciseState,
    cycleCount,
    totalCycles,
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
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <p className="text-gray-500 text-xs font-mono">{elapsedSeconds}</p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathingAnimation
        breathCycleTime={breathingPhaseDuration}
        breathingPhase={breathingPhase}
        mode={exerciseState}
      />
    </div>
  );
}
