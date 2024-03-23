import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

type AppScopes = {
  api: string;
};

export const appScopes: AppScopes = {
  api: 'api://7b2827c2-2b03-4df8-899a-f9e370209c4c/API.Access'
};

type AppRoles = {
  administrator: string;
  developer: string;
  employeesRead: string;
  employeesWrite: string;
  productsRead: string;
  productsWrite: string;
};

export const appRoles: AppRoles = {
  administrator: 'Administrator',
  developer: 'Developer',
  employeesRead: 'Employees.Read',
  employeesWrite: 'Employees.Write',
  productsRead: 'Products.Read',
  productsWrite: 'Products.Write'
};

const msalConfig: Configuration = {
  auth: {
    clientId: 'b2874584-e6de-439b-9051-e3b65e209e41',
    authority: 'https://login.microsoftonline.com/14983a8c-008c-4d78-b2bc-39660ef7b186',
    redirectUri: 'https://localhost:5173'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};

export const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);
