'use client';
import { Button } from '../ui/Button';
import { BreathingAnimation } from '../BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';
import { ConfigRadio } from '../ConfigRadio';
import { useState } from 'react';

export const BoxBreathing = () => {
  const [minutes, setMinutes] = useState(5);
  const [lengthOfBreathPhase, setLengthOfBreathPhase] = useState(4);
  const {
    exerciseState,
    breathingPhaseDuration,
    start,
    breathingPhase,
    elapsedSeconds,
  } = useBreathing({
    type: 'box',
    minutes,
    lengthOfBreathPhase,
  });

  if (exerciseState === 'idle') {
    return (
      <div className="flex flex-col gap-y-4 mt-3">
        <p>
          inhale, hold your breath, exhale, and hold again, each for the same
          duration
        </p>
        <ConfigRadio
          label="how much time do you have to breathe?"
          options={[
            { label: 'quick refresh (5 mins)', value: 5 },
            { label: 'find your rhythm (10 mins)', value: 10 },
            { label: 'deep relaxation (15 mins)', value: 15 },
          ]}
          value={minutes}
          setValue={setMinutes}
        />
        <ConfigRadio
          label="level"
          options={[
            { label: 'standard', value: 4 },
            { label: 'intermediate', value: 5 },
            { label: 'advanced', value: 6 },
            { label: 'super pro', value: 7 },
          ]}
          value={lengthOfBreathPhase}
          setValue={setLengthOfBreathPhase}
        />
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
