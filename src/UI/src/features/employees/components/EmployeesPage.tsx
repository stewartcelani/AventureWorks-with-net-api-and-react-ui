import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';
import { Route as EmployeeRoute, type EmployeesSearchParams } from '@routes/employees.index.tsx';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/dates';
import { Input } from '@/components/ui/input';

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: EmployeeRoute.fullPath });
  const { page, pageSize, searchTerm } = EmployeeRoute.useSearch();
  const [inputValue, setInputValue] = useState(searchTerm || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isFetching } = useSuspenseQuery(getEmployeesQueryOptions({ page, pageSize, searchTerm }));
  const caption = data.items.length === 0 ? 'No employees found' : '';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const debouncedSearch = useCallback(() => {
    return debounce((value: string) => {
      void navigate({
        search: { page: 1, pageSize: pageSize, searchTerm: value }
      });
    }, 300);
  }, [navigate, pageSize]);

  return (
    <>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="flex-1 text-muted-foreground">View and manage employees.</p>
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 space-x-2">
          <Input
            ref={inputRef}
            className="w-[250px] sm:w-[350px]"
            placeholder="Search employees"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              debouncedSearch()(e.target.value);
            }}
          />
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={isFetching}
            onClick={() => {
              void queryClient.refetchQueries({
                queryKey: getEmployeesQueryOptions({ page, pageSize, searchTerm }).queryKey
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
            <TableHead>Unit</TableHead>
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
              <TableCell>{employee.department.groupName}</TableCell>
              <TableCell>{formatDate(employee.hireDate)}</TableCell>
              <TableCell className="text-right">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {data.totalCount} {data.totalCount && data.totalCount > 1 ? 'employees' : 'employee'}
        </div>
        <div className="space-x-2">
          <Link
            from={EmployeeRoute.fullPath}
            disabled={page === 1}
            search={(prev: EmployeesSearchParams) => ({
              page: prev.page - 1,
              pageSize: pageSize,
              searchTerm: searchTerm
            })}
          >
            <Button variant="outline" size="sm" disabled={page === 1}>
              Prev
            </Button>
          </Link>
          <Link
            from={EmployeeRoute.fullPath}
            disabled={!data.hasNextPage}
            search={(prev: EmployeesSearchParams) => ({
              page: prev.page + 1,
              pageSize: pageSize,
              searchTerm: searchTerm
            })}
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
