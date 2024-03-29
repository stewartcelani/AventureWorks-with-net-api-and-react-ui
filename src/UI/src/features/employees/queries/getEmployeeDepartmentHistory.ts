import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';
import {
  type EmployeeDepartmentHistory,
  employeeDepartmentHistorySchema
} from '@features/employees/types/employeeDepartmentHistory.ts';

export async function getEmployeeDepartmentHistory(employeeId: number): Promise<EmployeeDepartmentHistory[]> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`employees/${employeeId}/department-history`);
  const data: EmployeeDepartmentHistory[] = await response.json();
  /*console.log('data', data)
  const parsedData: EmployeeDepartmentHistory[] = [];
  data.forEach((employeeDepartmentHistory) => {
    const safeParse = employeeDepartmentHistorySchema.safeParse(employeeDepartmentHistory);
    if (safeParse.success) {
      parsedData.push(safeParse.data);
    } else {
      console.error('Failed to parse employee department history', safeParse.error.errors);
    }


  });
  return parsedData;*/
  return data.map((employeeDepartmentHistory) => employeeDepartmentHistorySchema.parse(employeeDepartmentHistory));
}

export const getEmployeeDepartmentHistoryQueryOptions = (employeeId: number) => ({
  queryKey: ['employeeDepartmentHistory', employeeId],
  queryFn: () => getEmployeeDepartmentHistory(employeeId)
});

export function useGetEmployeeDepartmentHistoryQuery(employeeId: number) {
  return useQuery(getEmployeeDepartmentHistoryQueryOptions(employeeId));
}