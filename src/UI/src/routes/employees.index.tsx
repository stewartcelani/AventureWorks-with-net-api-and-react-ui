import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';
import { defaultGetEmployeesRequest, getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';

const employeesSearchSchema = z.object({
  page: z.number().catch(defaultGetEmployeesRequest.page),
  pageSize: z.number().max(100).catch(defaultGetEmployeesRequest.pageSize)
});

export type EmployeesSearchParams = z.infer<typeof employeesSearchSchema>;

export const Route = createFileRoute('/employees/')({
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.employeesRead)) {
      throw new AuthenticationError('Unauthorized to view employees');
    }
  },
  validateSearch: employeesSearchSchema,
  loaderDeps: ({ search: { page, pageSize } }) => ({ page, pageSize }),
  loader: ({ context: { queryClient }, deps: { page, pageSize } }) =>
    queryClient.ensureQueryData(getEmployeesQueryOptions({ page, pageSize })),
  onError: ({ error }) => {
    console.error(error);
  },
  errorComponent: RouteErrorComponent,
  pendingComponent: TopLoadingBarComponent
});
