import { cn } from '@/utils';
import { LucideIcon } from 'lucide-react';

export const Label = ({
  id,
  icon,
  label,
  tight,
}: {
  id?: string;
  icon?: LucideIcon;
  label: string;
  tight?: boolean;
}) => {
  const Icon = icon;
  return (
    <label
      id={id}
      className={cn(
        'flex items-center gap-2 text-navy',
        tight && 'mb-2',
        !tight && 'mb-4'
      )}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{label}</span>
    </label>
  );
};
