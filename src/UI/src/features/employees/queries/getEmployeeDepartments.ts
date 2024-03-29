import { useQuery } from '@tanstack/react-query';
import { EmployeeDepartment, employeeDepartmentSchema } from '@features/employees/types/employee.ts';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';

export async function getEmployeeDepartments(): Promise<EmployeeDepartment[]> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get('employees/departments');
  const data: EmployeeDepartment[] = await response.json();
  return data.map((employeeDepartment) => employeeDepartmentSchema.parse(employeeDepartment));
}


export const getEmployeeDepartmentsQueryOptions = () => ({
  queryKey: ['departments'],
  queryFn: getEmployeeDepartments
});

export function useGetEmployeeDepartmentsQuery() {
  return useQuery(getEmployeeDepartmentsQueryOptions());
}