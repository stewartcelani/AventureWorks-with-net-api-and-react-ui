import { ReactNode, useEffect } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from '@azure/msal-react';
import { AuthContext as AuthContextType } from '@/types/authContext.ts';
import { AuthContext } from '@/hooks/useAuth';
import { InteractionRequiredAuthError, InteractionType } from '@azure/msal-browser';

interface AuthProviderProps {
  authContext: AuthContextType;
  children: ReactNode;
}

export const AuthProvider = ({ children, authContext }: AuthProviderProps) => {
  const request = {
    scopes: ['User.Read']
  };
  const { login, error } = useMsalAuthentication(InteractionType.Silent, request);

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      void login(InteractionType.Redirect, request);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { accounts } = useMsal();

  authContext.setAccount(accounts[0] || null);

  return (
    <>
      <AuthenticatedTemplate>
        <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Redirecting for authentication...</p>
      </UnauthenticatedTemplate>
    </>
  );
};
