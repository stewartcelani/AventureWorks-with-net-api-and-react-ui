import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';
import { EmployeeDepartment, employeeDepartmentSchema } from '../types/employeeDepartment';

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