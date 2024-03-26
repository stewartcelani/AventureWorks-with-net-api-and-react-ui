import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/claims/')({
  beforeLoad: () => {
    throw redirect({ to: '/settings/claims/local/' });
  }
});
