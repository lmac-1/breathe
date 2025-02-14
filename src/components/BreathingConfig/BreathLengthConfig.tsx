import { BreathingExercise } from '@/types';
import { Label } from '../ui/Label';
import { Box, Wind } from 'lucide-react';
import { Slider } from '../ui/Slider';

type Props = {
  lengthOfBreathPhase: number;
  setLengthOfBreathPhase: (length: number) => void;
  type: BreathingExercise;
  max?: number;
};

export const BreathLengthConfig = ({
  lengthOfBreathPhase,
  type,
  setLengthOfBreathPhase,
  max,
}: Props) => {
  return (
    <div>
      <div className="flex gap-2 text-navy">
        <Label
          icon={type === 'box' ? Box : Wind}
          label={type === 'box' ? 'Box length' : 'Length of inhale/exhale:'}
        />
        <span className="font-normal">{lengthOfBreathPhase} seconds</span>
      </div>
      <Slider
        max={max || 8}
        min={4}
        step={1}
        value={lengthOfBreathPhase}
        onChange={(value) => setLengthOfBreathPhase(value[0])}
      />
    </div>
  );
};
