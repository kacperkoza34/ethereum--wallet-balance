import { cn } from '@/utils/helpers/cn';
import type { Children } from '@/utils/types';

interface LayoutProps {
  children: Children;
  className?: string;
  maxHeight?: string;
}

export function Layout({
  children,
  className,
  maxHeight = '24rem',
}: LayoutProps) {
  return (
    <div
      className={cn(
        'h-screen w-full max-w-[40rem] m-auto font-roboto',
        className
      )}
    >
      <div className="h-full w-full flex justify-center items-start md:items-center">
        <div className="h-full w-full" style={{ maxHeight }}>
          {children}
        </div>
      </div>
    </div>
  );
}
