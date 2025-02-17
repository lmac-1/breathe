import { cn } from '@/utils';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Props = {
  progress: number;
  centerText?: string;
  className?: string;
};

export const ProgressCircle = ({ progress, className, centerText }: Props) => {
  const strokeWidth = 1;
  const radius = 50 - strokeWidth / 2;
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-navy/10"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-navy"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference * (1 - progress / 100),
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-navy text-sm font-mono">{centerText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
