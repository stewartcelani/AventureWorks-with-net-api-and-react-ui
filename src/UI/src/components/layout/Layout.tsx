import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet } from '@tanstack/react-router';
import HeaderNav from '@components/layout/HeaderNav.tsx';
import LoadingBar from 'react-top-loading-bar';
import { useUiStore } from '@stores/uiStore.ts';
import { useEffect } from 'react';
import { logger } from '@/lib/logger.ts';
import { ThemeToggle } from '@components/layout/ThemeToggle.tsx';

export default function Layout() {
  const progress = useUiStore((state) => state.topLoadingBarProgress);
  const setProgress = useUiStore((state) => state.setTopLoadingBarProgress);

  logger.logTrace('Layout rendered');

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      const errorProperties: object = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        errorType: event.error?.name || 'Unknown',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        stack: event.error?.stack,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        componentStack: event.error?.componentStack,
        uri: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };

      logger.logError('{message}', errorProperties);
    };

    window.addEventListener('error', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <>
      <LoadingBar height={1} color="rgb(39, 39, 42)" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div>TeamSwitcher</div>
          <HeaderNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <div>Search</div>
            <ThemeToggle />
            {/*<Search />
            <UserNav />*/}
          </div>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
