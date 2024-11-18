import { createContext, useEffect, useState } from 'react';
import { type Children } from '@/utils/types';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: Children;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(storageKey) as Theme | undefined) ?? defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    root.classList.add('dark');
  }, [theme]);

  const value = {
    theme,
    setTheme: (_theme: Theme) => {
      localStorage.setItem(storageKey, _theme);
      setTheme(_theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
