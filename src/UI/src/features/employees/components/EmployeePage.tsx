import { useSuspenseQuery } from '@tanstack/react-query';
import UpdateEmployeeForm from '@features/employees/components/UpdateEmployeeForm.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getEmployeeQueryOptions } from '@features/employees/queries/getEmployee.ts';
import { Route as EmployeeRoute } from '@routes/employees.$employeeId.index';
import { Route as EmployeesRoute } from '@routes/employees.index.tsx';

export default function EmployeePage() {
  const { employeeId } = EmployeeRoute.useParams();
  const employeeIdNumber = Number(employeeId);
  const { data: employee } = useSuspenseQuery(getEmployeeQueryOptions(employeeIdNumber));

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={EmployeesRoute.to}>Employees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {employee.firstName} {employee.middleName.trim().length > 0 && `${employee.middleName}`}{' '}
              {employee.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {employee.firstName} {employee.middleName.trim().length > 0 && `${employee.middleName}`} {employee.lastName}
          </h2>
          <p className="flex-1 text-muted-foreground">{employee.jobTitle}</p>
        </div>
        <div></div>
      </div>
      <UpdateEmployeeForm
        employeeId={employeeIdNumber}
        className="my-6 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3"
      />
    </>
  );
}
