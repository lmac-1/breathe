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
    <div className="flex py-10 flex-col min-h-screen items-center gap-4">
      <ProgressCircle
        progress={progress}
        centerText={secondsDisplay}
        className=""
      />
      <BreathingAnimation
        breathCycleTime={breathCycleTime}
        breathingPhase={breathingPhase}
        mode={mode}
        className="grow flex flex-col justify-center"
      />

      <h2 className="text-3xl h-20 font-light text-navy flex flex-col justify-center ">
        {breathingPhase}
      </h2>
    </div>
  );
};
