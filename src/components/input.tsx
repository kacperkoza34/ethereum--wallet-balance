import { Controller } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputElement['type'];
}

export function Input({ label, name, placeholder, type }: InputProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <>
          <label htmlFor={name} className="block mb-2 text-sm">
            {label}
          </label>
          <input
            {...field}
            name={name}
            type={type}
            className="bg-transparent border border-border text-foreground text-sm rounded-lg focus:accent focus:border block w-full p-2.5"
            placeholder={placeholder}
          />
          {fieldState.error ? (
            <div className="text-destructive">
              {fieldState.error.message ?? 'Invalid input'}
            </div>
          ) : null}
        </>
      )}
    />
  );
}
