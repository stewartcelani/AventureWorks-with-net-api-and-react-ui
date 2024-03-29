import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { getEmployeeQueryOptions } from '@features/employees/queries/getEmployee.ts';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { getEmployeeDepartmentsQueryOptions } from '@features/employees/queries/getEmployeeDepartments.ts';

export const Route = createFileRoute('/employees/$employeeId/')({
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.employeesRead)) {
      throw new AuthenticationError('Unauthorized to view employees');
    }
  },
  parseParams: (params) => ({
    employeeId: z.number().int().parse(Number(params.employeeId))
  }),
  loader: ({ context: { queryClient }, params: { employeeId } }) => {
    queryClient.ensureQueryData(getEmployeeQueryOptions(Number(employeeId)));
    queryClient.ensureQueryData(getEmployeeDepartmentsQueryOptions());
  },
  errorComponent: RouteErrorComponent,
  pendingComponent: TopLoadingBarComponent
});
