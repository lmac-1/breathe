import { BreathingConfig, ExerciseState, PhaseConfig } from '@/types';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_TOTAL_MINUTES = 5;
const CALM_TOTAL_CYCLES = 5;
const EVEN_DEFAULT_BREATH_PHASE = 5;
const BOX_DEFAULT_BREATH_PHASE = 4;

export const useBreathing = (config: BreathingConfig) => {
  const [exerciseState, setExerciseState] = useState<ExerciseState>('idle');
  const [currentBreathingPatternIndex, setCurrentBreathingPatternIndex] =
    useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const breathingPattern = useMemo((): PhaseConfig[] => {
    switch (config.type) {
      case 'resonant':
        return [
          { phase: 'inhale', durationMs: 5500 },
          { phase: 'exhale', durationMs: 5500 },
        ];
      case 'box': {
        const lengthOfBreathPhase =
          (config.lengthOfBreathPhase || BOX_DEFAULT_BREATH_PHASE) * 1000;
        return [
          { phase: 'inhale', durationMs: lengthOfBreathPhase },
          { phase: 'holdAfterInhale', durationMs: lengthOfBreathPhase },
          { phase: 'exhale', durationMs: lengthOfBreathPhase },
          { phase: 'holdAfterExhale', durationMs: lengthOfBreathPhase },
        ];
      }
      case 'calm':
        return [
          { phase: 'inhale', durationMs: 4000 },
          { phase: 'holdAfterInhale', durationMs: 7000 },
          { phase: 'exhale', durationMs: 8000 },
        ];
      case 'even': {
        const lengthOfBreathPhase =
          (config.lengthOfBreathPhase || EVEN_DEFAULT_BREATH_PHASE) * 1000;
        return [
          { phase: 'inhale', durationMs: lengthOfBreathPhase },
          { phase: 'exhale', durationMs: lengthOfBreathPhase },
        ];
      }
    }
  }, [config.type, config?.lengthOfBreathPhase]);

  const lengthOfBreathCycleSeconds = useMemo(() => {
    return breathingPattern.reduce(
      (sum, phase) => sum + phase.durationMs / 1000,
      0
    );
  }, [breathingPattern]);

  const totalSeconds = useMemo(() => {
    if (config.type === 'calm')
      return lengthOfBreathCycleSeconds * CALM_TOTAL_CYCLES;
    const minutes = config.minutes ? config.minutes : DEFAULT_TOTAL_MINUTES;
    return minutes * 60;
  }, [config.type, config.minutes, lengthOfBreathCycleSeconds]);

  const totalCycles = useMemo(() => {
    if (config.type === 'calm') return CALM_TOTAL_CYCLES;
    return Math.floor(totalSeconds / lengthOfBreathCycleSeconds);
  }, [totalSeconds, lengthOfBreathCycleSeconds, config.type]);

  const currentPhase = breathingPattern[currentBreathingPatternIndex];

  useEffect(() => {
    if (exerciseState !== 'breathing') return;

    const phaseTimeout = setInterval(() => {
      // we are calculating next index and cycle here so that it works in strict mode
      // these should not be added to dependency array
      const nextIndex =
        (currentBreathingPatternIndex + 1) % breathingPattern.length;
      const nextCycle = cycleCount + 1;
      if (nextIndex === 0) {
        setCycleCount(nextCycle);
      }
      setCurrentBreathingPatternIndex(nextIndex);
    }, currentPhase.durationMs);

    return () => {
      clearInterval(phaseTimeout);
    };
  }, [breathingPattern, exerciseState, currentPhase, totalCycles]);

  // handles elapsed seconds
  useEffect(() => {
    if (exerciseState !== 'breathing') return;
    if (elapsedSeconds >= totalSeconds) {
      setExerciseState('finished');
      return;
    }

    const timeInterval = setInterval(() => {
      setElapsedSeconds((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [exerciseState, elapsedSeconds, totalSeconds]);

  const start = () => {
    setExerciseState('breathing');
    setCurrentBreathingPatternIndex(0);
    setElapsedSeconds(0);
  };
  return {
    exerciseState,
    breathingPhase: ['holdAfterInhale', 'holdAfterExhale'].includes(
      currentPhase.phase
    )
      ? 'hold'
      : currentPhase.phase,
    cycleCount,
    totalCycles,
    start,
    breathingPhaseDuration: currentPhase.durationMs,
    elapsedSeconds,
    totalSeconds,
  };
};
