import { getAuthenticatedApiClient } from '@utils/authUtils.ts';
import { type PagedResponse, pagedResponseSchema } from '@/types/pagedResponse.ts';
import { type Employee, employeeSchema } from '@features/employees/types/employee.ts';
import { employeeRouteDefaults } from '@routes/employees';
import { useQuery } from '@tanstack/react-query';

const employeesResponseSchema = pagedResponseSchema(employeeSchema);

export type EmployeesResponse = PagedResponse<Employee>;

export async function getEmployees(
  page: number = employeeRouteDefaults.page,
  pageSize: number = employeeRouteDefaults.pageSize
): Promise<EmployeesResponse> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`employees?page=${page}&pageSize=${pageSize}`);
  const data = await response.json();
  return employeesResponseSchema.parse(data);
}

export const getEmployeesQueryOptions = (
  page: number = employeeRouteDefaults.page,
  pageSize: number = employeeRouteDefaults.pageSize
) => ({
  queryKey: ['getEmployees', page, pageSize],
  queryFn: () => getEmployees(page, pageSize)
});

export function useGetEmployeesQuery(
  page: number = employeeRouteDefaults.page,
  pageSize: number = employeeRouteDefaults.pageSize
) {
  return useQuery(getEmployeesQueryOptions(page, pageSize));
}
