import { convertSecondsToMinutesSecondDisplay } from '@/helperFunctions';
import { BreathingConfig, ExerciseState, PhaseConfig } from '@/types';
import { useCallback, useEffect, useRef, useMemo, useState } from 'react';

const DEFAULT_TOTAL_MINUTES = 5;
const CALM_TOTAL_CYCLES = 5;
const EVEN_DEFAULT_BREATH_PHASE = 5;
const BOX_DEFAULT_BREATH_PHASE = 4;
export const RESONANT_BREATH_PHASE = 5.5;

export const useBreathing = (config: BreathingConfig) => {
  const [exerciseState, setExerciseState] = useState<ExerciseState>('idle');
  const [currentBreathingPatternIndex, setCurrentBreathingPatternIndex] =
    useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const breathingPattern = useMemo((): PhaseConfig[] => {
    switch (config.type) {
      case 'resonant':
        return [
          { phase: 'inhale', durationMs: RESONANT_BREATH_PHASE * 1000 },
          { phase: 'exhale', durationMs: RESONANT_BREATH_PHASE * 1000 },
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
  }, [config.type, config.lengthOfBreathPhase]);

  const lengthOfBreathCycleSeconds = useMemo(
    () =>
      breathingPattern.reduce((sum, phase) => sum + phase.durationMs / 1000, 0),
    [breathingPattern]
  );

  const totalSeconds = useMemo(() => {
    if (config.type === 'calm')
      return lengthOfBreathCycleSeconds * CALM_TOTAL_CYCLES;
    const minutes = config.minutes ? config.minutes : DEFAULT_TOTAL_MINUTES;
    return minutes * 60;
  }, [config.type, config.minutes, lengthOfBreathCycleSeconds]);

  const totalCycles = useMemo(() => {
    if (config.type === 'calm') return CALM_TOTAL_CYCLES;
    return Math.ceil(totalSeconds / lengthOfBreathCycleSeconds);
  }, [totalSeconds, lengthOfBreathCycleSeconds, config.type]);

  const currentPhase = breathingPattern[currentBreathingPatternIndex];

  useEffect(() => {
    if (exerciseState !== 'breathing') return;

    breathingIntervalRef.current = setInterval(() => {
      // Calculate next values first so that it works correctly on strict mode
      const nextIndex =
        (currentBreathingPatternIndex + 1) % breathingPattern.length;

      // Update states using the calculated values
      setCurrentBreathingPatternIndex(nextIndex);
      if (nextIndex === 0) {
        setCycleCount((prevCount) => prevCount + 1);
      }
    }, currentPhase.durationMs);

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
        breathingIntervalRef.current = null;
      }
    };
  }, [
    exerciseState,
    currentPhase.durationMs,
    currentBreathingPatternIndex,
    breathingPattern.length,
  ]);

  useEffect(() => {
    if (exerciseState !== 'breathing') return;

    if (elapsedSeconds >= totalSeconds) {
      setExerciseState('finished');
      return;
    }

    secondsIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      if (secondsIntervalRef.current) {
        clearInterval(secondsIntervalRef.current);
        secondsIntervalRef.current = null;
      }
    };
  }, [exerciseState, elapsedSeconds, totalSeconds]);

  const start = useCallback(() => {
    setExerciseState('breathing');
    setCurrentBreathingPatternIndex(0);
    setCycleCount(0);
    setElapsedSeconds(0);
  }, []);

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
    elapsedSeconds: convertSecondsToMinutesSecondDisplay(elapsedSeconds),
    totalSeconds,
  };
};
