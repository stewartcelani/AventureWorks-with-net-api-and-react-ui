import { AccountInfo } from '@azure/msal-browser';
import { msalInstance } from '@config/authConfig';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { type UserClaims, UserClaimsSchema } from '@features/settings/types/userClaims.ts';
import { logger } from '@/lib/logger.ts';

export type AuthContext = {
  userClaims: UserClaims | null;
  isAuthenticated: () => boolean;
  setAccount: (user: AccountInfo | null) => void;
  hasRole: (role: string) => boolean;
  getRoles: () => string[];
};

export const authContext: AuthContext = {
  userClaims: null,
  isAuthenticated: () => {
    return !!authContext.userClaims;
  },
  setAccount: (user: AccountInfo | null) => {
    if (!user) {
      msalInstance.setActiveAccount(null);
      logger.setUser(null);
      return;
    }
    authContext.userClaims = getUserClaimsFromAccountInfo(user);
    msalInstance.setActiveAccount(user);
    logger.setUser(authContext.userClaims);
  },
  hasRole: (role: string) => {
    if (!authContext.userClaims) {
      return false;
    }
    const roles = authContext.userClaims.roles;
    return roles.includes(role);
  },
  getRoles: (): string[] => {
    if (!authContext.userClaims) return [];
    return authContext.userClaims.roles;
  }
};

function getRolesFromAccountInfo(accountInfo: AccountInfo): string[] {
  if (!accountInfo.idTokenClaims || !accountInfo.idTokenClaims.roles) {
    return [];
  }
  return accountInfo.idTokenClaims.roles.sort();
}

function getUserClaimsFromAccountInfo(accountInfo: AccountInfo): UserClaims {
  const userClaims: UserClaims = {
    id: accountInfo.idTokenClaims?.oid || '',
    firstName: typeof accountInfo.idTokenClaims?.given_name === 'string' ? accountInfo.idTokenClaims.given_name : '',
    lastName: typeof accountInfo.idTokenClaims?.family_name === 'string' ? accountInfo.idTokenClaims.family_name : '',
    email: typeof accountInfo.idTokenClaims?.upn === 'string' ? accountInfo.idTokenClaims.upn : '',
    roles: getRolesFromAccountInfo(accountInfo)
  };

  const parsedUserClaims = UserClaimsSchema.safeParse(userClaims);

  if (!parsedUserClaims.success) {
    throw new AuthenticationError(parsedUserClaims.error.errors[0].message);
  }

  return parsedUserClaims.data;
}
