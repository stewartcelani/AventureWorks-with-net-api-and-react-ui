import { useQuery } from '@tanstack/react-query';
import { type PagedResponse, pagedResponseSchema } from '@/types/pagedResponse.ts';
import { type Employee, employeeSchema } from '@features/employees/types/employee.ts';
import { getAuthenticatedApiClient } from '@/lib/apiClient.ts';

const employeesResponseSchema = pagedResponseSchema(employeeSchema);

export type EmployeesResponse = PagedResponse<Employee>;

export type GetEmployeesRequest = {
  page: number;
  pageSize: number;
};

export const defaultGetEmployeesRequest: GetEmployeesRequest = {
  page: 1,
  pageSize: 10
};

export async function getEmployees({
  page,
  pageSize
}: GetEmployeesRequest = defaultGetEmployeesRequest): Promise<EmployeesResponse> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`employees?page=${page}&pageSize=${pageSize}`);
  const data = await response.json();
  return employeesResponseSchema.parse(data);
}

export const getEmployeesQueryOptions = ({ page, pageSize }: GetEmployeesRequest = defaultGetEmployeesRequest) => ({
  queryKey: ['getEmployees', page, pageSize],
  queryFn: () => getEmployees({ page, pageSize })
});

export function useGetEmployeesQuery({ page, pageSize }: GetEmployeesRequest = defaultGetEmployeesRequest) {
  return useQuery(getEmployeesQueryOptions({ page, pageSize }));
}
