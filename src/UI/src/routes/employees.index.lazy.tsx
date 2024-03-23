import { createLazyFileRoute } from '@tanstack/react-router';
import EmployeesPage from '@features/employees/components/EmployeesPage.tsx';

export const Route = createLazyFileRoute('/employees/')({
  component: EmployeesPage
});
