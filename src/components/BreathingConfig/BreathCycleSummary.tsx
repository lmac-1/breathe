import { RESONANT_BREATH_PHASE } from '@/hooks/useBreathing';
import { BreathingExercise } from '@/types';
import { Label } from '../ui/Label';
import { Atom } from 'lucide-react';

type Props = {
  type: BreathingExercise;
  lengthOfBreathPhase?: number;
};

export const BreathCycleSummary = ({ type, lengthOfBreathPhase }: Props) => {
  let content;
  switch (type) {
    case 'box':
      content = `Inhale for ${lengthOfBreathPhase}, hold for ${lengthOfBreathPhase}, exhale for ${lengthOfBreathPhase}, hold for ${lengthOfBreathPhase}`;
      break;
    case 'resonant':
      content = `Inhale for ${RESONANT_BREATH_PHASE} seconds, exhale for ${RESONANT_BREATH_PHASE} seconds`;
      break;
    case 'calm':
      content = 'Inhale for 4, hold for 7, exhale for 8';
      break;
    case 'even':
      content = `Inhale for ${lengthOfBreathPhase} seconds, exhale for ${lengthOfBreathPhase} seconds`;
      break;
    default:
      content = '';
  }

  return (
    <div>
      <Label icon={Atom} label="Breath exercise:" tight />
      <p className="text-navy/80 text-sm">{content}</p>
    </div>
  );
};
