import { z } from 'zod';

export const employeeDepartmentSchema = z.object({
  departmentID: z.number(),
  name: z.string(),
  groupName: z.string()
});

export type EmployeeDepartment = z.infer<typeof employeeDepartmentSchema>;
