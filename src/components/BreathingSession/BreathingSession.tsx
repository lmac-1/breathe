'use client';
import { useMemo } from 'react';
import { ProgressCircle } from '@/components/ProgressCircle';
import { convertSecondsToMinutesSecondDisplay } from '@/helperFunctions';
import { ExerciseState } from '@/types';
import { BreathingAnimation } from '../BreathingAnimation';

type Props = {
  breathCycleTime: number;
  breathingPhase: string;
  mode: ExerciseState;
  elapsedSeconds: number;
  totalSeconds: number;
};

export const BreathingSession = ({
  breathCycleTime,
  breathingPhase,
  mode,
  elapsedSeconds,
  totalSeconds,
}: Props) => {
  const progress = (elapsedSeconds / totalSeconds) * 100;
  const secondsDisplay = useMemo(
    () => convertSecondsToMinutesSecondDisplay(elapsedSeconds),
    [elapsedSeconds]
  );

  return (
    <div className="flex py-10 flex-col min-h-dvh items-center gap-4 relative">
      <ProgressCircle
        progress={progress}
        centerText={secondsDisplay}
        className="absolute"
      />
      <BreathingAnimation
        breathCycleTime={breathCycleTime}
        breathingPhase={breathingPhase}
        mode={mode}
        className="flex grow flex-col justify-center"
      />
    </div>
  );
};
