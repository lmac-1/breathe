'use client';
import { Button } from '../ui/Button';
import { BreathingAnimation } from '../BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';

export function ResonantBreathing() {
  const {
    exerciseState,
    start,
    cycleCount,
    totalCycles,
    elapsedSeconds,
    breathingPhase,
    breathingPhaseDuration,
  } = useBreathing({ type: 'resonant' });

  if (exerciseState === 'idle')
    return (
      <div>
        <p>
          breathe at 5.5 breaths per minute to chill out, reset your mind, and
          find your focus.
        </p>
        <Button className="mt-3" onClick={start}>
          i&apos;m ready
        </Button>
      </div>
    );

  if (exerciseState === 'finished') return 'finished! how do you feel?';
  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <p>elapsed seconds: {elapsedSeconds}</p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathingAnimation
        breathCycleTime={breathingPhaseDuration}
        breathingPhase={breathingPhase}
        mode={exerciseState}
      />
    </div>
  );
}
