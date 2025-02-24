import { BreathingExercise } from '@/types';
import { Button } from '@/components/ui/Button';
import { Info, Trophy } from 'lucide-react';

type Props = {
  type: BreathingExercise;
  totalSeconds: number;
};

export const Finish = ({ type, totalSeconds }: Props) => {
  const minutes = totalSeconds / 60;
  const totalExercise =
    type !== 'calm'
      ? minutes + `${minutes > 1 ? ' minutes' : 'minute'}`
      : '5 rounds';
  const breathingExerciseType = {
    resonant: 'resonant',
    even: 'equal',
    box: 'box',
    calm: '4-7-8',
  }[type];

  return (
    <div className="text-navy py-10 gap-4 flex flex-col items-center">
      <Trophy size={48} strokeWidth={1.25} />
      <h2 className="text-4xl font-light">Well done</h2>
      <p>
        You completed {totalExercise} of {breathingExerciseType} breathing
      </p>
      <p className="italic">Take a moment to notice how you feel</p>
      {/* info box */}
      <div className="p-4 my-2 bg-navy/5 rounded-xl flex  border border-navy/10 w-full max-w-md gap-3">
        <Info className="shrink-0 mt-0.5" />
        <p className="text-navy">
          Just <strong>5 minutes of breathwork</strong> daily can improve mood
          and reduce anxiety more effectively than mindfulness meditation.
        </p>
      </div>
      <Button href="/" className="self-center">
        Back to exercises
      </Button>
    </div>
  );
};
