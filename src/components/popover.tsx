import { useState, useRef, useEffect } from 'react';
import { type Children } from '@/utils/types';

interface PopoverProps {
  children: Children;
  content: Children;
}

export function Popover({ children, content }: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className="relative"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
        type="button"
      >
        {children}
      </button>
      {isVisible ? (
        <div
          id="popover-content"
          ref={popoverRef}
          className="absolute top-full right-0 mt-2 z-10"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full h-full p-6 shadow-md rounded-xl border-border border-2 bg-secondary">
            {content}
          </div>
        </div>
      ) : null}
    </div>
  );
}
