import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { RefreshCcw, X } from 'lucide-react';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';
import { Route as EmployeesRoute, type EmployeesSearchParams } from '@routes/employees.index.tsx';
import { Route as EmployeeRoute } from '@routes/employees.$employeeId.index';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/dates';
import { Input } from '@/components/ui/input';

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { page, pageSize, searchTerm } = EmployeesRoute.useSearch();
  const [inputValue, setInputValue] = useState(searchTerm || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isFetching } = useSuspenseQuery(getEmployeesQueryOptions({ page, pageSize, searchTerm }));

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      void navigate({
        search: { page: page, pageSize: pageSize, searchTerm: inputValue }
      });
    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, navigate, pageSize, page]);

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
          <div className="relative w-[250px] sm:w-[350px]">
            <Input
              ref={inputRef}
              className="w-[250px] sm:w-[350px]"
              placeholder="Search employees"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            {inputValue.length > 0 && (
              <X
                className="absolute size-5 cursor-pointer text-muted-foreground"
                style={{ top: '10px', right: '10px' }}
                onClick={() => {
                  setInputValue('');
                  void navigate({
                    search: { page: 1, pageSize: pageSize, searchTerm: '' }
                  });
                  inputRef?.current?.focus();
                }}
              />
            )}
          </div>
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
        <TableCaption>{data.items.length === 0 ? 'No employees found' : ''}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="hidden sm:table-cell">Role</TableHead>
            <TableHead className="hidden md:table-cell">Department</TableHead>
            <TableHead className="hidden lg:table-cell">Unit</TableHead>
            <TableHead className="hidden lg:table-cell">Hire Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((employee) => (
            <TableRow key={employee.businessEntityID}>
              <TableCell className="font-medium">
                <Link
                  className="hover:underline"
                  to={EmployeeRoute.to}
                  params={{ employeeId: `${employee.businessEntityID}` }}
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </Link>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{employee.jobTitle}</TableCell>
              <TableCell className="hidden md:table-cell">{employee.department.name}</TableCell>
              <TableCell className="hidden lg:table-cell">{employee.department.groupName}</TableCell>
              <TableCell className="hidden lg:table-cell">{formatDate(employee.hireDate)}</TableCell>
              <TableCell className="text-right">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end">
        <div className="flex-1 text-sm text-muted-foreground">
          {data.totalCount} {data.totalCount && data.totalCount > 1 ? 'employees' : 'employee'}
        </div>
        <div className="space-x-2">
          <Link
            from={EmployeesRoute.fullPath}
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
            from={EmployeesRoute.fullPath}
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
