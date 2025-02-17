import { BreathingExercise } from '@/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AudioLines, Clock } from 'lucide-react';
import { ConfigRadio } from '../ConfigRadio';
import { Label } from '../ui/Label';
import { CONFIG_OPTIONS } from './config';
import { Header } from './Header';
import { BreathLengthConfig } from './BreathLengthConfig';
import { BreathCycleSummary } from './BreathCycleSummary';
import { Switch } from '../ui/Switch';

type Props = {
  type: BreathingExercise;
  start: () => void;
  minutes?: number;
  setMinutes?: (minutes: number) => void;
  lengthOfBreathPhase?: number;
  setLengthOfBreathPhase?: (length: number) => void;
  isNarrated: boolean;
  toggleNarrated: () => void;
};

export const BreathingConfig = ({
  type,
  start,
  minutes,
  setMinutes,
  lengthOfBreathPhase,
  setLengthOfBreathPhase,
  isNarrated,
  toggleNarrated,
}: Props) => {
  const { title, description, max } = CONFIG_OPTIONS[type];

  return (
    <div className="mx-auto py-10">
      <Header title={title} description={description} />
      <Card className="space-y-8">
        {type === 'calm' && (
          <div>
            <Label tight label="Length of exercise:" icon={Clock} />
            <p className="text-navy/80 text-sm">
              5 cycles (1 minute 35 seconds)
            </p>
          </div>
        )}
        {/* Duration selector */}
        {minutes && setMinutes && (
          <ConfigRadio
            label="Session length:"
            labelIcon={Clock}
            options={[
              { label: '5 min', value: 5 },
              { label: '10 min', value: 10 },
              { label: '15 min', value: 15 },
            ]}
            value={minutes}
            setValue={setMinutes}
          />
        )}

        {/* Breath length configuration */}
        {lengthOfBreathPhase !== undefined && setLengthOfBreathPhase && (
          <BreathLengthConfig
            lengthOfBreathPhase={lengthOfBreathPhase}
            setLengthOfBreathPhase={setLengthOfBreathPhase}
            type={type}
            max={max}
          />
        )}
        <BreathCycleSummary
          type={type}
          lengthOfBreathPhase={lengthOfBreathPhase}
        />
        <div className="flex justify-between">
          <Label id="narration" label="Guided audio" icon={AudioLines} />
          <Switch
            labelId="narration"
            checked={isNarrated}
            onChange={toggleNarrated}
          />
        </div>

        {/* Preview section */}
        {/*  <div className="bg-navy/5 rounded-lg p-4">
          <h3 className="text-navy font-medium mb-2">Practice Summary</h3>
          <div className="text-navy/70 space-y-1">
            <p>Total time: {minutes} minutes</p>
            <p>Complete cycles: ~{totalCycles}</p>
            <p>Cycle length: EACH_CYCLE_TODO seconds</p>
          </div>
        </div> */}
        <Button
          onClick={start}
          className="w-full text-lg flex gap-2 items-center justify-center mt-4"
        >
          Start breathing
        </Button>
      </Card>
    </div>
  );
};
