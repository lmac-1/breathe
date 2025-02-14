import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils';

type Props = {
  value: number;
  onChange: (value: number[]) => void;
  min?: number;
  defaultValue?: number;
  max: number;
  step?: number;
};

export const Slider = ({
  value,
  onChange,
  min,
  defaultValue,
  max,
  step = 1,
}: Props) => {
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue ? [defaultValue] : undefined}
      max={max}
      min={min}
      step={step}
      value={[value]}
      onValueChange={onChange}
      aria-label="value"
      className="relative flex h-5 w-full touch-none items-center"
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-white dark:bg-gray-800">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-navy dark:bg-white" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'block h-5 w-5 rounded-full bg-navy dark:bg-white',
          'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
        )}
      />
    </SliderPrimitive.Root>
  );
};
