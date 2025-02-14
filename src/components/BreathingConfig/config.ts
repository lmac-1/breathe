import { BreathingExercise } from '@/types';

export const CONFIG_OPTIONS: Record<
  BreathingExercise,
  { title: string; description: string; max?: number }
> = {
  resonant: {
    title: 'Resonant Breathing',
    description: 'Find balance through symmetrical breaths',
  },
  box: {
    title: 'Box Breathing',
    description: 'Find calm in four simple sides',
    max: 6,
  },
  even: {
    title: 'Equal Breathing',
    description: 'Find balance through symmetrical breaths',
    max: 8,
  },
  calm: {
    title: '4-7-8 Breathing',
    description: 'Find balance through symmetrical breaths',
  },
};
