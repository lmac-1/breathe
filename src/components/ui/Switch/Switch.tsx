import { cn } from '@/utils';

type Props = {
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelId?: string;
};

export const Switch = ({ className, checked, onChange, labelId }: Props) => {
  return (
    <button
      aria-labelledby={labelId}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      tabIndex={0}
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(
        'relative inline-flex h-6 w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-3 focus-visible:ring focus:ring-blue-500 focus-visible:ring-opacity-75',
        'bg-gray-200 dark:bg-gray-800 data-[state=checked]:bg-green-600',
        className
      )}
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(
          'absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
          'translate-x-0 data-[state=checked]:translate-x-5'
        )}
      />
    </button>
  );
};
