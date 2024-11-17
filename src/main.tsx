import { StrictMode } from 'react';
import './index.css';
import '@/i18n/i18n';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/utils/providers/theme-provider';
import { Router } from '@/utils/router/router';
import { store } from '@/utils/store/store';
import { AttachWalletProvider } from '@/utils/providers/attach-wallet-provider';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <AttachWalletProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </AttachWalletProvider>
    </Provider>
  </StrictMode>
);
