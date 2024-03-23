import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@hooks/useAuth';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
    authContext: undefined!
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function Router() {
  const authContext = useAuth();
  const queryClient = useQueryClient();

  return <RouterProvider router={router} context={{ queryClient, authContext }} />;
}
