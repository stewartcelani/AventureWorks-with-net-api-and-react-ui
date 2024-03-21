import { createLazyFileRoute } from '@tanstack/react-router';
import Employees from '@features/employees/components/Employees';

export const Route = createLazyFileRoute('/employees/')({
  component: Employees
});
