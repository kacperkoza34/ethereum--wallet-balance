import { cn } from '@/utils/helpers/cn';
import type { Children } from '@/utils/types';

interface CardProps {
  children: Children;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'w-full h-full p-6 shadow-md rounded-xl md:border-border md:border-2',
        className
      )}
    >
      {children}
    </div>
  );
}
