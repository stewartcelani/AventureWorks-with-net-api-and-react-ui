import { AccountInfo } from '@azure/msal-browser';
import { msalInstance } from '@config/authConfig';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { type UserClaims, UserClaimsSchema } from '@features/user/types/userClaims.ts';
import { logger } from '@utils/logger.ts';

export type AuthContext = {
  account: AccountInfo | null;
  userClaims: UserClaims | null;
  isAuthenticated: () => boolean;
  setAccount: (user: AccountInfo | null) => void;
  hasRole: (role: string) => boolean;
  getRoles: () => string[];
};

export const authContext: AuthContext = {
  account: null,
  userClaims: null,
  isAuthenticated: () => {
    return !!authContext.account;
  },
  setAccount: (user: AccountInfo | null) => {
    if (!user) {
      msalInstance.setActiveAccount(null);
      authContext.account = null;
      logger.setUser(null);
      return;
    }
    authContext.userClaims = getUserClaimsFromAccountInfo(user);
    msalInstance.setActiveAccount(user);
    authContext.account = user;
    logger.setUser(authContext.userClaims);
  },
  hasRole: (role: string) => {
    if (!authContext.account || !authContext.account.idTokenClaims || !authContext.account.idTokenClaims.roles) {
      return false;
    }
    const roles = authContext.account.idTokenClaims.roles;
    return roles.includes(role);
  },
  getRoles: (): string[] => {
    if (!authContext.account) return [];
    return getRolesFromAccountInfo(authContext.account);
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
