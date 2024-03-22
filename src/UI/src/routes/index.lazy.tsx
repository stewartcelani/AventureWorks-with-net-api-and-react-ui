import { createLazyFileRoute } from '@tanstack/react-router';
import DashboardPage from '@features/dashboard/components/DashboardPage.tsx';

export const Route = createLazyFileRoute('/')({
  component: DashboardPage
});
