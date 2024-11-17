import React from 'react';
import { cn } from '@/utils/helpers/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md bg-primary py-2 px-4 border border-transparent text-center text-sm text-primary-foreground transition-all shadow-md hover:shadow-lg active:bg-accent-foreground hover:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
