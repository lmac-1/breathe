'use client';
import { Button } from '../ui/Button';
import { useEvenBreath } from '@/hooks/useEvenBreath';
import { BreathingAnimation } from '../BreathingAnimation';

export function ResonantBreathing() {
  const breathDurationMs = 5500;
  const { mode, handleStart, totalCycles, cycleCount, breathingPhase } =
    useEvenBreath({ breathDurationMs, totalMinutes: 1 });

  if (mode === 'idle')
    return (
      <div>
        <p>
          breathe at 5.5 breaths per minute to chill out, reset your mind, and
          find your focus.
        </p>
        <Button className="mt-3" onClick={handleStart}>
          i&apos;m ready
        </Button>
      </div>
    );

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
}
