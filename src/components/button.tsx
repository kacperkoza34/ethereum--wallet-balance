import React from 'react';
import { cn } from '@/utils/helpers/cn';

export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps<T extends React.ElementType = 'button'> {
  as?: T;
  className?: string;
  size?: ButtonSize;
}

export function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  className,
  size = 'medium',
  ...props
}: ButtonProps<T> & React.ComponentPropsWithoutRef<T>) {
  const Component = as ?? 'button';
  const sizeClassNames = cn({
    'py-2 px-4 text-sm': size === 'medium',
    'py-1 px-2 text-sm': size === 'small',
    'py-4 px-8 text-': size === 'large',
  });

  return (
    <Component
      className={cn(
        'rounded-md bg-primary border border-transparent text-center text-primary-foreground transition-all shadow-md hover:shadow-lg active:bg-accent-foreground hover:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        sizeClassNames,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
