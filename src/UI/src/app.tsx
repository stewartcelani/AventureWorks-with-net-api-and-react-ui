/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/authConfig.ts';
import { AuthProvider } from '@providers/AuthProvider.tsx';
import { authContext } from '@/types/authContext.ts';
import Router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/index.css';
import { ThemeProvider } from '@providers/ThemeProvider';

const queryClient = new QueryClient();

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MsalProvider instance={msalInstance}>
          <AuthProvider authContext={authContext}>
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </AuthProvider>
        </MsalProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
