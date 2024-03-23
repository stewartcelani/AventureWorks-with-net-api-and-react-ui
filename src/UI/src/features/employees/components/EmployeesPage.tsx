import { Link, useRouterState } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';

import { getEmployeesQueryOptions, useGetEmployeesQuery } from '@features/employees/queries/getEmployees.ts';
import { Route as EmployeeRoute, type EmployeesSearchParams } from '@routes/employees.index.tsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/dates';

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const state = useRouterState();
  console.log(state);
  const { page, pageSize }: EmployeesSearchParams = EmployeeRoute.useSearch();
  const { data } = useSuspenseQuery(getEmployeesQueryOptions({ page, pageSize }));
  const { isFetching } = useGetEmployeesQuery({ page, pageSize });
  const caption = data.items.length === 0 ? 'No employees found' : '';

  return (
    <>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="flex-1 text-muted-foreground">View and manage employees.</p>
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            disabled={isFetching}
            onClick={() => {
              void queryClient.refetchQueries({
                queryKey: getEmployeesQueryOptions({ page, pageSize }).queryKey
              });
            }}
          >
            <RefreshCcw className="size-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((employee) => (
            <TableRow key={employee.businessEntityID}>
              <TableCell className="font-medium">{`${employee.firstName} ${employee.lastName}`}</TableCell>
              <TableCell>{employee.jobTitle}</TableCell>
              <TableCell>{employee.department.name}</TableCell>
              <TableCell>{formatDate(employee.hireDate)}</TableCell>
              <TableCell className="text-right">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {data.totalCount} employees {isFetching && <span className="px-2 text-muted-foreground/50">Loading...</span>}
        </div>
        <div className="space-x-2">
          <Link
            from={EmployeeRoute.fullPath}
            disabled={page === 1}
            search={(prev: EmployeesSearchParams) => ({ page: prev.page - 1, pageSize: pageSize })}
          >
            <Button variant="outline" size="sm" disabled={page === 1}>
              Prev
            </Button>
          </Link>
          <Link
            from={EmployeeRoute.fullPath}
            disabled={!data.hasNextPage}
            search={(prev: EmployeesSearchParams) => ({ page: prev.page + 1, pageSize: pageSize })}
          >
            <Button variant="outline" size="sm" disabled={!data.hasNextPage}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
