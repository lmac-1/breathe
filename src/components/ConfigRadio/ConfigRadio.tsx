import { useId } from 'react';

type Props = {
  value: number | undefined;
  setValue: (value: number) => void;
  options: { label?: string; value: string | number }[];
  label: string;
};

export const ConfigRadio = ({ value, setValue, options, label }: Props) => {
  const name = useId();
  return (
    <fieldset className="flex flex-col gap-y-2">
      <legend className="font-semibold">{label}</legend>
      {options.map(({ value: optionValue, label }) => (
        <div className="flex gap-2" key={optionValue}>
          <input
            type="radio"
            name={name}
            id={`${name}-${optionValue}`}
            value={optionValue}
            checked={value === optionValue}
            onChange={(event) => {
              setValue(parseInt(event.target.value));
            }}
          />
          <label htmlFor={`${name}-${optionValue}`}>
            {label || optionValue}
          </label>
        </div>
      ))}
    </fieldset>
  );
};
