'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { ExerciseState } from '@/types';

type Props = {
  breathCycleTime: number;
  breathingPhase: string;
  mode: ExerciseState;
  className?: string;
};

export const BreathingAnimation = ({
  breathCycleTime,
  breathingPhase,
  mode,
  className,
}: Props) => {
  const [bubbleSize, setBubbleSize] = useState(0.5);
  useEffect(() => {
    if (mode !== 'breathing') return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = elapsed / breathCycleTime;

      if (breathingPhase === 'inhale') {
        setBubbleSize(0.5 + progress * 0.5);
      } else if (breathingPhase === 'exhale') {
        setBubbleSize(1 - progress * 0.5);
      }
      if (elapsed < breathCycleTime) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (breathingPhase === 'inhale') {
      setBubbleSize(0.5);
      animationFrameId = requestAnimationFrame(animate);
    } else if (breathingPhase === 'exhale') {
      setBubbleSize(1);
      animationFrameId = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [breathingPhase, breathCycleTime, mode]);

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Fixed Text */}
      <span className="absolute text-navy text-2xl font-light">
        {breathingPhase}
      </span>
      {/* breathing circle */}
      <div
        className={cn(
          'w-48 h-48 md:w-64 md:h-64 rounded-full',
          breathingPhase === 'hold'
            ? 'bg-[#6B7280]/40 shadow-[0_0_40px_rgba(107,114,128,0.4)]'
            : 'bg-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.4)]'
        )}
        style={{
          transform: `scale(${bubbleSize})`,
          transition:
            breathingPhase === 'hold' ? 'none' : 'box-shadow 0.3s ease-in-out',
        }}
      >
        {/* Hold state animation */}
        {breathingPhase === 'hold' && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute animate-shimmer -translate-x-full inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
};
