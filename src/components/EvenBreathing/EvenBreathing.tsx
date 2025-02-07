'use client';

import { Button } from '@/components/ui/Button';
import { BreathingAnimation } from '@/components/BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';

export const EvenBreathing = () => {
  const {
    exerciseState,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
  } = useBreathing({ type: 'even' });

  if (exerciseState === 'idle') {
    return (
      <div>
        <p>
          inhaling and exhaling for the same duration can help calm your nervous
          system and reduce anxious thoughts and stress held in the body.
        </p>
        <Button className="mt-3" onClick={start}>
          let&apos;s go
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
