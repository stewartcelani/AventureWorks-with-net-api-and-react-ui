import { Logger as SeqLogger } from 'seq-logging';
import type { UserClaims } from '@features/settings/types/userClaims.ts';

const loggerInstance = new SeqLogger({
  serverUrl: 'https://seq.stewartcelani.com:5050/',
  apiKey: 'Ot1YztDL3MVHmRmqKMyG',
  onError: (error) => {
    console.error('Error sending log:', error);
  }
});

export type Logger = {
  instance: SeqLogger;
  user: UserClaims | null;
  setUser: (user: UserClaims | null) => void;
  logTrace: (message: string, properties?: object) => void;
  logDebug: (message: string, properties?: object) => void;
  logInfo: (message: string, properties?: object) => void;
  logWarning: (message: string, properties?: object) => void;
  logError: (message: string, properties?: object) => void;
};

const sessionId: string = crypto.randomUUID();

export const logger: Logger = {
  instance: loggerInstance,
  user: null,
  setUser: (u: UserClaims | null) => (logger.user = u),
  logTrace: (message: string, properties: object = {}) => {
    console.trace(message, properties);
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Verbose',
      messageTemplate: message,
      properties: {
        uri: window.location.href,
        sessionId: sessionId,
        user: logger.user,
        ...properties
      }
    });
  },
  logDebug: (message: string, properties: object = {}) => {
    console.debug(message, properties);
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Debug',
      messageTemplate: message,
      properties: {
        uri: window.location.href,
        sessionId: sessionId,
        user: logger.user,
        ...properties
      }
    });
  },
  logInfo: (message: string, properties: object = {}) => {
    console.info(message, properties);
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Information',
      messageTemplate: message,
      properties: {
        uri: window.location.href,
        sessionId: sessionId,
        user: logger.user,
        ...properties
      }
    });
  },
  logWarning: (message: string, properties: object = {}) => {
    console.warn(message, properties);
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Warning',
      messageTemplate: message,
      properties: {
        uri: window.location.href,
        sessionId: sessionId,
        user: logger.user,
        ...properties
      }
    });
  },
  logError: (message: string, properties: object = {}) => {
    console.error(message, properties);
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Error',
      messageTemplate: message,
      properties: {
        uri: window.location.href,
        sessionId: sessionId,
        user: logger.user,
        ...properties
      }
    });
  }
};
