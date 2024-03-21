import { createContext, useContext } from 'react';
import { AuthContext } from '@hooks/useAuth.ts';
import { logger, type Logger } from '@utils/logger.ts';

export const LoggerContext = createContext<Logger>(logger);

export const useLogger = () => {
  const authContext = useContext(AuthContext);
  const logger = useContext(LoggerContext);

  if (!logger) {
    throw new Error('useLoggerWithAuth must be used within a LoggerContext.Provider');
  }

  return {
    ...logger,
    logInfo: (message: string, properties: object = {}) => {
      logger.logInfo(message, {
        ...properties,
        user: authContext.userClaims
      });
    },
    logWarning: (message: string, properties: object = {}) => {
      logger.logWarning(message, {
        ...properties,
        user: authContext.userClaims
      });
    },
    logError: (message: string, properties: object = {}) => {
      logger.logError(message, {
        ...properties,
        user: authContext.userClaims
      });
    },
    logDebug: (message: string, properties: object = {}) => {
      logger.logDebug(message, {
        ...properties,
        user: authContext.userClaims
      });
    }
  };
};
