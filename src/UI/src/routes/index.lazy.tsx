import { createLazyFileRoute } from '@tanstack/react-router';
import Dashboard from '@features/dashboard/components/Dashboard.tsx';

export const Route = createLazyFileRoute('/')({
  component: Dashboard
});
