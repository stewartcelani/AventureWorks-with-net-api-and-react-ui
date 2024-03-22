import { createRootRouteWithContext } from '@tanstack/react-router';
import Layout from '@components/layout/Layout.tsx';
import type { QueryClient } from '@tanstack/react-query';
import type { AuthContext } from '@/types/authContext.ts';

interface RouterContext {
  queryClient: QueryClient;
  authContext: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute
});

function RootRoute() {
  return <Layout />;
}
