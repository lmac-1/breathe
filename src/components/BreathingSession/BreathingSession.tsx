'use client';
import { useMemo } from 'react';
import { convertSecondsToMinutesSecondDisplay } from '@/helperFunctions';
import { ExerciseState } from '@/types';
import { BreathingAnimation } from '../BreathingAnimation';
import { ArrowLeft } from 'lucide-react';

type Props = {
  breathCycleTime: number;
  breathingPhase: string;
  mode: ExerciseState;
  elapsedSeconds: number;
  totalSeconds: number;
  cancel: () => void;
};

export const BreathingSession = ({
  breathCycleTime,
  breathingPhase,
  mode,
  elapsedSeconds,
  totalSeconds,
  cancel,
}: Props) => {
  const progress = (elapsedSeconds / totalSeconds) * 100;
  const secondsDisplay = useMemo(
    () => convertSecondsToMinutesSecondDisplay(elapsedSeconds),
    [elapsedSeconds]
  );

  return (
    <div className="flex py-10 flex-col min-h-dvh items-center gap-4 relative">
      <button
        onClick={cancel}
        className="absolute self-start z-10 text-navy/70 hover:text-navy focus:ring focus:outline-none focus:ring-3 focus:ring-blue-500/75 rounded-full"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <BreathingAnimation
        progress={progress}
        currentSeconds={secondsDisplay}
        breathCycleTime={breathCycleTime}
        breathingPhase={breathingPhase}
        mode={mode}
        className="flex grow flex-col justify-center"
      />
    </div>
  );
};
