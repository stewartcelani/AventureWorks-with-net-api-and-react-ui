/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from '@/config/authConfig.ts';
import { AuthProvider } from '@providers/authProvider.tsx';
import { authContext } from '@/types/authContext.ts';
import Router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <AuthProvider authContext={authContext}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </AuthProvider>
      </MsalProvider>
    </StrictMode>
  );
}
