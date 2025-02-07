'use client';

import { Button } from '@/components/ui/Button';
import { BreathingAnimation } from '@/components/BreathingAnimation';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';
import { ConfigRadio } from '../ConfigRadio';

export const EvenBreathing = () => {
  const [minutes, setMinutes] = useState(5);
  const [lengthOfBreathPhase, setLengthOfBreathPhase] = useState(5);
  const {
    exerciseState,
    start,
    breathingPhase,
    breathingPhaseDuration,
    elapsedSeconds,
  } = useBreathing({ type: 'even', minutes, lengthOfBreathPhase });

  if (exerciseState === 'idle') {
    return (
      <div className="flex flex-col gap-y-4 mt-3">
        <p>
          inhaling and exhaling for the same duration can help calm your nervous
          system and reduce anxious thoughts and stress held in the body.
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
            { label: 'warm up', value: 4 },
            { label: 'beginner', value: 5 },
            { label: 'intermediate', value: 6 },
            { label: 'advanced', value: 7 },
            { label: 'super pro', value: 8 },
          ]}
          value={lengthOfBreathPhase}
          setValue={setLengthOfBreathPhase}
        />
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
