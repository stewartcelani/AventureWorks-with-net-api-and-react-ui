import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { RefreshCcw, User, X } from 'lucide-react';
import {
  DotsHorizontalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';
import { Route as EmployeesRoute, type EmployeesSearchParams } from '@routes/employees.index.tsx';
import { Route as EmployeeRoute } from '@routes/employees.$employeeId.index';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import UpdateEmployee from '@features/employees/components/UpdateEmployee.tsx';

export default function EmployeesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { page, pageSize, searchTerm } = EmployeesRoute.useSearch();
  const [inputValue, setInputValue] = useState(searchTerm || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isFetching } = useSuspenseQuery(getEmployeesQueryOptions({ page, pageSize, searchTerm }));
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [sheetSide, setSheetSide] = useState<'left' | 'right' | 'bottom' | 'top'>('right');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      void navigate({
        search: { page: 1, pageSize: pageSize, searchTerm: inputValue }
      });
    }, 300);

    if (inputValue.trim() != searchTerm) debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, navigate, pageSize]);

  return (
    <>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="flex-1 text-muted-foreground">View and manage employees.</p>
        </div>
        <div></div>
      </div>
      <div className="flex items-center justify-end space-x-2 pb-4">
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
      <div className="rounded-md border" style={{ marginTop: 0 }}
           onWheel={(event) => {
             if (event.deltaY > 0) {
               if (data.hasNextPage) {
                 void navigate({
                   search: (prev: EmployeesSearchParams) => ({
                     page: prev.page + 1,
                     pageSize: pageSize,
                     searchTerm: searchTerm
                   })
                 });
               }
             } else if (event.deltaY < 0) {
               if (page > 1) {
                 void navigate({
                   search: (prev: EmployeesSearchParams) => ({
                     page: prev.page - 1,
                     pageSize: pageSize,
                     searchTerm: searchTerm
                   })
                 });
               }
             }
           }}
      >
        <Table>
          {data.items.length === 0 && <TableCaption className="pt-6 pb-10">No employees found.</TableCaption>}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] p2 pl-4">Name</TableHead>
              <TableHead className="hidden sm:table-cell p-2">Role</TableHead>
              <TableHead className="hidden md:table-cell p-2">Department</TableHead>
              <TableHead className="hidden lg:table-cell p-2">Unit</TableHead>
              <TableHead className="hidden lg:table-cell p-2">Hire Date</TableHead>
              <TableHead className="text-right p-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((employee) => (
              <TableRow key={employee.businessEntityID}>
                <TableCell className="font-medium p-2 pl-4">
                  <Link
                    className="hover:underline"
                    to={EmployeeRoute.to}
                    params={{ employeeId: `${employee.businessEntityID}` }}
                  >
                    {`${employee.firstName} ${employee.lastName}`}
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell p-1">{employee.jobTitle}</TableCell>
                <TableCell className="hidden md:table-cell p-1">{employee.department.name}</TableCell>
                <TableCell className="hidden lg:table-cell p-1">{employee.department.groupName}</TableCell>
                <TableCell className="hidden lg:table-cell p-1">{employee.hireDate.toLocaleDateString()}</TableCell>
                <TableCell className="text-right p-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className="text-md">Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="text-md h-10 cursor-pointer"
                        onClick={() => {
                          setSheetSide('right');
                          setSheetOpen(true);
                          setSelectedEmployeeId(employee.businessEntityID);
                        }}
                      >
                        <User className="mr-2 size-4" />
                        <span>Edit (right)</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-md h-10 cursor-pointer"
                        onClick={() => {
                          setSheetSide('top');
                          setSheetOpen(true);
                          setSelectedEmployeeId(employee.businessEntityID);
                        }}
                      >
                        <User className="mr-2 size-4" />
                        <span>Edit (top)</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-md h-10 cursor-pointer"
                        onClick={() => {
                          setSheetSide('bottom');
                          setSheetOpen(true);
                          setSelectedEmployeeId(employee.businessEntityID);
                        }}
                      >
                        <User className="mr-2 size-4" />
                        <span>Edit (bottom)</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-md h-10 cursor-pointer"
                        onClick={() => {
                          setSheetSide('left');
                          setSheetOpen(true);
                          setSelectedEmployeeId(employee.businessEntityID);
                        }}
                      >
                        <User className="mr-2 size-4" />
                        <span>Edit (left)</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-md h-10 cursor-pointer"
                        onClick={() => {
                          setDialogOpen(true);
                          setSelectedEmployeeId(employee.businessEntityID);
                        }}
                      >
                        <User className="mr-2 size-4" />
                        <span>Edit (modal)</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-end justify-between pt-4" style={{ marginTop: 0 }}>
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <strong>{(page - 1) * pageSize + 1}-{data.totalCount ? Math.min(page * pageSize, data.totalCount) : page * pageSize}</strong> of <strong>{data.totalCount ?? '-'}</strong> employees
        </div>
        <div className="space-x-2">
          <Link
            from={EmployeesRoute.fullPath}
            disabled={page === 1}
            search={() => ({
              page: 1,
              pageSize: pageSize,
              searchTerm: searchTerm
            })}
          >
            <Button variant="outline" size="sm" disabled={page === 1}>
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
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
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
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
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            from={EmployeesRoute.fullPath}
            disabled={!data.hasNextPage}
            search={() => ({
              page: data.totalCount ? Math.ceil(data.totalCount / pageSize) : page,
              pageSize: pageSize,
              searchTerm: searchTerm
            })}
          >
            <Button variant="outline" size="sm" disabled={!data.hasNextPage}>
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
      <Sheet open={sheetOpen} modal={true} onOpenChange={setSheetOpen}>
        <SheetContent side={sheetSide} className="pr-1">
          <SheetHeader className="mb-5">
            <SheetTitle>Edit Employee</SheetTitle>
          </SheetHeader>
          {sheetOpen && selectedEmployeeId && (
            <UpdateEmployee employeeId={selectedEmployeeId} className="mb-5 space-y-5 pr-4"
                            style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }} />
          )}
        </SheetContent>
      </Sheet>
      <Dialog open={dialogOpen} modal={true} onOpenChange={setDialogOpen}>
        <DialogContent className="md:min-w-[750px] lg:min-w-[900px]">
          <DialogHeader>
            <SheetTitle>Edit Employee</SheetTitle>
            {dialogOpen && selectedEmployeeId && (
              <UpdateEmployee
                employeeId={selectedEmployeeId}
                className="mb-2 mt-4 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3"
              />
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
