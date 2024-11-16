import { cn } from '@/utils/helpers/cn';
import type { Children } from '@/utils/types';

interface LayoutProps {
  children: Children;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return <div className={cn('container mx-auto', className)}>{children}</div>;
}
