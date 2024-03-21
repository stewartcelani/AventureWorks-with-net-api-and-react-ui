import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet } from '@tanstack/react-router';
import Header from '@components/layout/Header.tsx';
import LoadingBar from 'react-top-loading-bar';
import { useUiStore } from '@stores/uiStore.ts';

export default function Layout() {
  const progress = useUiStore((state) => state.topLoadingBarProgress);
  const setProgress = useUiStore((state) => state.setTopLoadingBarProgress);

  return (
    <>
      <LoadingBar height={1} color="rgb(39, 39, 42)" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
