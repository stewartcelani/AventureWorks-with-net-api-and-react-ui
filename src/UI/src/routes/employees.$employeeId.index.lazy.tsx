import { createLazyFileRoute } from '@tanstack/react-router';
import EmployeePage from '@features/employees/components/EmployeePage.tsx';

export const Route = createLazyFileRoute('/employees/$employeeId/')({
  component: EmployeePage
});
