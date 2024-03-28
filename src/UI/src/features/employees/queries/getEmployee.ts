import { useQuery } from '@tanstack/react-query';
import { Employee, employeeSchema } from '@features/employees/types/employee.ts';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';

export async function getEmployee(employeeId: number): Promise<Employee> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`employees/${employeeId}`);
  const data = await response.json();
  return employeeSchema.parse(data);
}

export const getEmployeeQueryOptions = (employeeId: number) => ({
  queryKey: ['employee', employeeId],
  queryFn: () => getEmployee(employeeId)
});

export function useGetEmployeeQuery(employeeId: number) {
  return useQuery(getEmployeeQueryOptions(employeeId));
}
