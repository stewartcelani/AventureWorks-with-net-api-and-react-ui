/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/authConfig.ts';
import { AuthProvider } from '@providers/authProvider.tsx';
import { authContext } from '@/types/authContext.ts';
import Router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { logger } from '@utils/logger.ts';
import { LoggerProvider } from '@providers/loggerProvider.tsx';

const queryClient = new QueryClient();

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <AuthProvider authContext={authContext}>
          <LoggerProvider logger={logger}>
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </LoggerProvider>
        </AuthProvider>
      </MsalProvider>
    </StrictMode>
  );
}
