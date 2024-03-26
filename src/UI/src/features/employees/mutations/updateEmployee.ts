import { z } from 'zod';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';
import { FetchError } from '@errors/authenticationError.ts';

export const updateEmployeeSchema = z.object({
  firstName: z.string().min(2).max(50, 'First name must be between 2 and 50 characters.'),
  lastName: z.string().min(2).max(50, 'Last name must be between 2 and 50 characters.'),
  jobTitle: z.string().min(3).max(50, 'Job title must be between 3 and 50 characters.')
});

export type UpdateEmployeeRequest = z.infer<typeof updateEmployeeSchema>;

type UpdateEmployeeParams = {
  employeeId: number;
  updateEmployeeRequest: UpdateEmployeeRequest;
};

export async function updateEmployee({ employeeId, updateEmployeeRequest }: UpdateEmployeeParams): Promise<void> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.put(`employees/${employeeId}`, { json: updateEmployeeRequest });
  if (!response.ok) {
    throw new FetchError('Failed to update employee');
  }
}
