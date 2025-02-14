import { BreathingExercise } from '@/types';
import { Button } from '../ui/Button';

type Props = {
  type: BreathingExercise;
  totalSeconds: number;
};

export const Finish = ({ type, totalSeconds }: Props) => {
  const exerciseLengthText =
    type !== 'calm'
      ? `${totalSeconds / 60} minutes of ${type} breathing`
      : '5 rounds of 4-7-8 breathing';
  return (
    <div className="py-10 px-6 text-navy flex flex-col gap-5">
      <h2 className="text-4xl font-light">Well done.</h2>
      <p className="text-navy/80 text-lg">
        You completed <span className="font-medium">{exerciseLengthText}</span>
      </p>
      <p className="text-navy/80 text-lg">
        Take a moment to notice how you feel.
      </p>

      {/* Breathwork Statistic Section */}
      <div className="p-4 bg-navy/5 rounded-lg border border-navy/10 w-full max-w-md">
        <p className="text-navy">
          Did you know? Just <strong>5 minutes of breathwork</strong> daily can
          improve mood and reduce anxiety more effectively than mindfulness
          meditation.
        </p>
      </div>

      <Button href="/" className="mt-6 self-center">
        Back to exercises
      </Button>
    </div>
  );
};
