import { StrictMode } from 'react';
import './index.css';
import '@/i18n/i18n';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/utils/providers/theme-provider';
import { Router } from '@/utils/router/router';
import { store } from '@/utils/store/store';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
