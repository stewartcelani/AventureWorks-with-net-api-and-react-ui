import { z } from 'zod';

export const employeeDepartmentHistorySchema = z.object({
  departmentID: z.number(),
  name: z.string(),
  groupName: z.string(),
  startDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  endDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    if (arg === null) return null;
  }, z.date().nullable()),
});

export type EmployeeDepartmentHistory = z.infer<typeof employeeDepartmentHistorySchema>;