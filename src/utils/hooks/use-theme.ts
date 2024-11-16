import { useContext } from 'react';
import {
  ThemeProviderContext,
  type ThemeProviderState,
} from '@/utils/providers/theme-provider';

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
