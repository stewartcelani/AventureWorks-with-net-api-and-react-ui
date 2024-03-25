import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { defaultGetEmployeesRequest, getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';
import { logger } from '@/lib/logger';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';

const employeesSearchSchema = z.object({
  page: z.number().catch(defaultGetEmployeesRequest.page),
  pageSize: z.number().max(100).catch(defaultGetEmployeesRequest.pageSize),
  searchTerm: z.string().catch(defaultGetEmployeesRequest.searchTerm)
});

export type EmployeesSearchParams = z.infer<typeof employeesSearchSchema>;

export const Route = createFileRoute('/employees/')({
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.employeesRead)) {
      throw new AuthenticationError('Unauthorized to view employees');
    }
  },
  validateSearch: employeesSearchSchema,
  loaderDeps: ({ search: { page, pageSize, searchTerm } }) => ({ page, pageSize, searchTerm }),
  loader: ({ context: { queryClient }, deps: { page, pageSize, searchTerm } }) =>
    queryClient.ensureQueryData(getEmployeesQueryOptions({ page, pageSize, searchTerm })),
  onError: ({ error }) => {
    logger.logError(error);
  },
  errorComponent: RouteErrorComponent,
  pendingComponent: TopLoadingBarComponent
});
