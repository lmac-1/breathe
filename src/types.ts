export type BreathingExercise = 'resonant' | 'box' | 'even' | 'calm';

interface BaseBreathingConfig {
  type: BreathingExercise;
}

interface ResonantBreathing extends BaseBreathingConfig {
  type: 'resonant';
  minutes?: number;
  lengthOfBreathPhase?: null;
}

interface BoxBreathing extends BaseBreathingConfig {
  type: 'box';
  lengthOfBreathPhase?: number;
  minutes?: number;
}

interface CalmBreathing extends BaseBreathingConfig {
  type: 'calm';
  lengthOfBreathPhase?: null;
  minutes?: null;
}

interface EvenBreathing extends BaseBreathingConfig {
  type: 'even';
  lengthOfBreathPhase?: number;
  minutes?: number;
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
  | 'holdAfterExhale';
export type ExerciseState = 'idle' | 'breathing' | 'paused' | 'finished';

export type PhaseConfig = {
  phase: BreathingPhase;
  durationMs: number;
};
