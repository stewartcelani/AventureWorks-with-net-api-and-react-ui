import { createFileRoute } from '@tanstack/react-router';
import RouteErrorComponent from '@components/errors/RouteErrorComponent.tsx';

export const Route = createFileRoute('/user/')({
  onError: ({ error }) => {
    console.error(error);
  },
  errorComponent: RouteErrorComponent
});
