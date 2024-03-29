import { z } from 'zod';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';
import { FetchError } from '@errors/authenticationError.ts';

export const updateEmployeeRequestSchema = z.object({
  nationalIdNumber: z
    .string()
    .min(8, 'National ID must be between 8 and 15 characters')
    .max(15, 'National ID number must be between 8 and 15 characters.'),
  loginId: z.string().min(3, 'Login ID must be between 3 and 256 characters.').max(256),
  firstName: z
    .string()
    .min(2, 'First name must be between 2 and 50 characters.')
    .max(50, 'First name must be between 2 and 50 characters.'),
  middleName: z.string().max(50, 'Middle name must be less than 50 characters.'),
  lastName: z.string().min(2).max(50, 'Last name must be between 2 and 50 characters.'),
  jobTitle: z.string().min(3).max(50, 'Job title must be between 3 and 50 characters.'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Birth date must be in the format YYYY-MM-DD',
  }),
  maritalStatus: z.enum(['Single', 'Married']),
  gender: z.enum(['Male', 'Female']),
  hireDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Hire date must be in the format YYYY-MM-DD',
  }),
  salariedFlag: z.boolean(),
  currentFlag: z.boolean(),
  departmentId: z.number(),
});

export type UpdateEmployeeRequest = z.infer<typeof updateEmployeeRequestSchema>;

type UpdateEmployeeParams = {
  employeeId: number;
  updateEmployeeRequest: UpdateEmployeeRequest;
};

export async function updateEmployee({ employeeId, updateEmployeeRequest }: UpdateEmployeeParams): Promise<void> {
  updateEmployeeRequestSchema.parse(updateEmployeeRequest);
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.put(`employees/${employeeId}`, { json: updateEmployeeRequest });
  if (!response.ok) {
    throw new FetchError('Failed to update employee');
  }
}
