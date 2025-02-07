'use client';
import { Button } from '../ui/Button';
import { BreathingAnimation } from '../BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';

export const BoxBreathing = () => {
  const {
    exerciseState,
    breathingPhaseDuration,
    start,
    breathingPhase,
    elapsedSeconds,
  } = useBreathing({
    type: 'box',
    minutes: 1,
  });

  if (exerciseState === 'idle') {
    return (
      <div>
        <p>
          inhale, hold your breath, exhale, and hold again, each for the same
          duration
        </p>
        <Button className="mt-3" onClick={start}>
          go
        </Button>
      </div>
    );
  }
  if (exerciseState === 'finished') return 'finished! how do you feel?';

  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">{elapsedSeconds}</p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathingAnimation
        breathCycleTime={breathingPhaseDuration}
        breathingPhase={breathingPhase}
        mode={exerciseState}
      />
    </div>
  );
};
