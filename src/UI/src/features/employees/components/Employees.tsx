import { Route as EmployeeRoute, type EmployeesSearchParams } from '@routes/employees';
import { Link } from '@tanstack/react-router';
import { getEmployeesQueryOptions } from '@features/employees/queries/getEmployees.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export default function Employees() {
  const queryClient = useQueryClient();
  const { page, pageSize }: EmployeesSearchParams = EmployeeRoute.useSearch();
  const { data } = useSuspenseQuery(getEmployeesQueryOptions(page, pageSize));

  return (
    <>
      <h1>Employees</h1>
      <button
        onClick={() => {
          void queryClient.refetchQueries({ queryKey: getEmployeesQueryOptions(page, pageSize).queryKey });
        }}
      >
        Refresh
      </button>
      {data.items.map((employee) => (
        <div key={employee.businessEntityID}>
          <h3>{`${employee.firstName} ${employee.lastName}`}</h3>
          <p>{employee.department.name}</p>
        </div>
      ))}
      {data.items.length === 0 && <p>No employees found</p>}
      {page > 1 && (
        <>
          <Link
            from={EmployeeRoute.fullPath}
            search={(prev: EmployeesSearchParams) => ({ page: prev.page - 1, pageSize: pageSize })}
          >
            Prev Page
          </Link>
          {'  '}
        </>
      )}
      {data.hasNextPage && (
        <Link
          from={EmployeeRoute.fullPath}
          search={(prev: EmployeesSearchParams) => ({ page: prev.page + 1, pageSize: pageSize })}
        >
          Next Page
        </Link>
      )}
    </>
  );
}
