'use client';
import { useEvenBreath } from '@/hooks/useEvenBreath';
import { Button } from '@/components/ui/Button';
import { BreathingAnimation } from '@/components/BreathingAnimation';

export const EvenBreathing = () => {
  const breathDurationMs = 6000;
  const { mode, handleStart, totalCycles, cycleCount, breathingPhase } =
    useEvenBreath({ breathDurationMs, totalMinutes: 5 });

  if (mode === 'idle') {
    return (
      <div>
        <p>
          inhaling and exhaling for the same duration can help calm your nervous
          system and reduce anxious thoughts and stress held in the body.
        </p>
        <Button className="mt-3" onClick={handleStart}>
          let&apos;s go
        </Button>
      </div>
    );
  }

  if (mode === 'finished') return 'finished! how do you feel?';
  return (
    <div className="mt-3">
      <p className="text-gray-500 text-xs font-mono">
        cycle {cycleCount + 1} of {totalCycles}
      </p>
      <h1 className="text-2xl font-semibold">{breathingPhase}</h1>
      <BreathingAnimation
        breathCycleTime={breathDurationMs}
        breathingPhase={breathingPhase}
        mode={mode}
      />
    </div>
  );
};
