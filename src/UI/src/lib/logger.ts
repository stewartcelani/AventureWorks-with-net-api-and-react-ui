import seq, { Logger as SeqLogger } from 'seq-logging';
import { v4 as uuidv4 } from 'uuid';
import type { UserClaims } from '@features/settings/types/userClaims.ts';

const loggerInstance = new seq.Logger({
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const sessionId: string = uuidv4();

// eslint-disable-next-line prefer-const
export const logger: Logger = {
  instance: loggerInstance,
  user: null,
  setUser: (u: UserClaims | null) => (logger.user = u),
  logTrace: (message: string, properties: object = {}) => {
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
