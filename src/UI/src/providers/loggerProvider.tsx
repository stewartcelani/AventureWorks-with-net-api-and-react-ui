import { ReactNode } from 'react';
import type { Logger } from '@utils/logger.ts';
import { LoggerContext } from '@hooks/useLogger.ts';

interface LoggerProviderProps {
  children: ReactNode;
  logger: Logger;
}

export const LoggerProvider = ({ children, logger }: LoggerProviderProps) => {
  return (
    <>
      <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
    </>
  );
};
