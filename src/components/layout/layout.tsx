import { cn } from '@/utils/helpers/cn';
import type { Children } from '@/utils/types';

interface LayoutProps {
  children: Children;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={cn(
        'h-screen w-full max-w-[40rem] m-auto font-roboto',
        className
      )}
    >
      <div className="h-full w-full flex justify-center items-start md:items-center">
        <div className="h-full w-full md:max-h-[24rem]">{children}</div>
      </div>
    </div>
  );
}
