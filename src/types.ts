type BreathingExercise = 'resonant' | 'box' | 'even' | 'calm';

interface BaseBreathingConfig {
  type: BreathingExercise;
}

interface ResonantBreathing extends BaseBreathingConfig {
  type: 'resonant';
  minutes?: 1 | 5 | 10;
  lengthOfBreathPhase?: null;
}

interface BoxBreathing extends BaseBreathingConfig {
  type: 'box';
  lengthOfBreathPhase?: 4 | 5 | 6 | 7;
  minutes?: 1 | 5 | 10 | 15;
}

interface CalmBreathing extends BaseBreathingConfig {
  type: 'calm';
  lengthOfBreathPhase?: null;
  minutes?: null;
}

interface EvenBreathing extends BaseBreathingConfig {
  type: 'even';
  lengthOfBreathPhase?: 4 | 5 | 6 | 7 | 8;
  minutes?: 5 | 10 | 15;
}

export type BreathingConfig =
  | ResonantBreathing
  | BoxBreathing
  | CalmBreathing
  | EvenBreathing;

type BreathingPhase =
  | 'inhale'
  | 'exhale'
  | 'holdAfterInhale'
  | 'holdAfterExhale'
  | 'remainder';
export type ExerciseState = 'idle' | 'breathing' | 'paused' | 'finished';

export type PhaseConfig = {
  phase: BreathingPhase;
  durationMs: number;
};
