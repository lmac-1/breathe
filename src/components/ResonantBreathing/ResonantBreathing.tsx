'use client';
import { Button } from '../ui/Button';
import { BreathingAnimation } from '../BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';
import { ConfigRadio } from '../ConfigRadio';
import { useState } from 'react';

export function ResonantBreathing() {
  const [minutes, setMinutes] = useState(1);
  const {
    exerciseState,
    start,
    elapsedSeconds,
    breathingPhase,
    totalSeconds,
    breathingPhaseDuration,
  } = useBreathing({ type: 'resonant', minutes });

  if (exerciseState === 'idle')
    return (
      <div className="flex flex-col gap-y-4 mt-3">
        <p>
          breathe at 5.5 breaths per minute to chill out, reset your mind, and
          find your focus.
        </p>
        <ConfigRadio
          label="pick your flow time"
          options={[
            { label: 'just a minute', value: 1 },
            { label: 'quick reset (5 mins)', value: 5 },
            { label: 'deep focus (10 mins)', value: 10 },
          ]}
          value={minutes}
          setValue={setMinutes}
        />
        <Button className="mt-3" onClick={start}>
          i&apos;m ready
        </Button>
      </div>
    );

  if (exerciseState === 'finished') return 'finished! how do you feel?';
  return (
    <div className="mt-3">
      <p>{totalSeconds}</p>
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
