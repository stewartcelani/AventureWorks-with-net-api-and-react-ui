import seq, { Logger as SeqLogger } from 'seq-logging';

const loggerInstance = new seq.Logger({
  serverUrl: 'https://seq.stewartcelani.com:5050/',
  apiKey: 'Ot1YztDL3MVHmRmqKMyG',
  onError: (error) => {
    console.error('Error sending log:', error);
  }
});

export type Logger = {
  instance: SeqLogger;
  logInfo: (message: string, properties?: object) => void;
  logWarning: (message: string, properties?: object) => void;
  logError: (message: string, properties?: object) => void;
  logDebug: (message: string, properties?: object) => void;
};

export const logger: Logger = {
  instance: loggerInstance,
  logInfo: (message: string, properties: object = {}) => {
    loggerInstance.emit({
      timestamp: new Date(),
      level: 'Information',
      messageTemplate: message,
      properties: {
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
        ...properties
      }
    });
  }
};
