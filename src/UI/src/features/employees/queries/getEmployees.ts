import { useQuery } from '@tanstack/react-query';
import { type PagedResponse, pagedResponseSchema } from '@/types/pagedResponse.ts';
import { type Employee, employeeSchema } from '@features/employees/types/employee.ts';
import { getAuthenticatedApiClient } from '@/lib/apiClient.ts';

const employeesResponseSchema = pagedResponseSchema(employeeSchema);

export type EmployeesResponse = PagedResponse<Employee>;

export type GetEmployeesRequest = {
  page: number;
  pageSize: number;
  searchTerm: string;
};

export const defaultGetEmployeesRequest: GetEmployeesRequest = {
  page: 1,
  pageSize: 10,
  searchTerm: ''
};

export async function getEmployees({
  page,
  pageSize,
  searchTerm
}: GetEmployeesRequest = defaultGetEmployeesRequest): Promise<EmployeesResponse> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`employees?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
  const data = await response.json();
  return employeesResponseSchema.parse(data);
}

export const getEmployeesQueryOptions = ({
  page,
  pageSize,
  searchTerm
}: GetEmployeesRequest = defaultGetEmployeesRequest) => ({
  queryKey: ['getEmployees', page, pageSize, searchTerm],
  queryFn: () => getEmployees({ page, pageSize, searchTerm })
});

export function useGetEmployeesQuery({ page, pageSize, searchTerm }: GetEmployeesRequest = defaultGetEmployeesRequest) {
  return useQuery(getEmployeesQueryOptions({ page, pageSize, searchTerm }));
}
