import { createRootRouteWithContext } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import type { AuthContext } from '@/types/authContext.ts';
import RootLayout from '@components/layout/RootLayout.tsx';

interface RouterContext {
  queryClient: QueryClient;
  authContext: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute
});

function RootRoute() {
  return <RootLayout />;
}
