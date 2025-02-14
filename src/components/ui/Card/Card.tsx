import { cn } from '@/utils';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return (
    <div
      className={cn('bg-white/50 backdrop-blur-sm rounded-xl p-6', className)}
    >
      {children}
    </div>
  );
};
