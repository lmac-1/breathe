import { cn } from '@/utils';
import { motion } from 'framer-motion';

type Props = {
  progress: number;
  centerText?: string;
  className?: string;
};

export const ProgressCircle = ({ progress, centerText, className }: Props) => {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            className="stroke-navy/10"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            className="stroke-navy"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 36}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 36 * (1 - progress / 100),
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-navy text-sm font-mono">{centerText}</span>
        </div>
      </div>
    </div>
  );
};
