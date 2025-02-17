import { LucideIcon } from 'lucide-react';
import { useId } from 'react';
import { Label } from '../ui/Label';

type Props = {
  value: number | undefined;
  setValue: (value: number) => void;
  options: { label?: string; value: string | number }[];
  label: string;
  labelIcon?: LucideIcon;
};

export const ConfigRadio = ({
  value,
  setValue,
  options,
  label,
  labelIcon,
}: Props) => {
  const name = useId();
  const labelId = name + '-label';

  return (
    <div role="radiogroup" aria-labelledby={labelId} className="flex flex-col">
      <Label id={labelId} icon={labelIcon} label={label} />
      <div className="flex gap-2 flex-wrap">
        {options.map(({ value: optionValue, label }) => (
          <div key={optionValue} className="flex-1">
            <input
              type="radio"
              className="appearance-none opacity-0 peer"
              name={name}
              id={`${name}-${optionValue}`}
              value={optionValue}
              checked={value === optionValue}
              onChange={(event) => {
                setValue(parseInt(event.target.value));
              }}
            />
            <label
              className="peer-checked:bg-navy/80 peer-checked:peer-hover:bg-navy/85 cursor-pointer h-full text-center inline-block text-navy w-full ring-blue-500/75 peer-checked:border-transparent border-navy/80 peer-focus:ring peer-checked:text-cream px-3 py-1 border rounded-lg shrink-0"
              htmlFor={`${name}-${optionValue}`}
            >
              {label || optionValue}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
