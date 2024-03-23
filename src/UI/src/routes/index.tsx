import { createFileRoute } from '@tanstack/react-router';
import DashboardPage from '@features/dashboard/components/DashboardPage.tsx';

export const Route = createFileRoute('/')({
  component: DashboardPage
});
