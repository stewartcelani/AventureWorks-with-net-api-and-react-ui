import { z } from 'zod';

export const employeeDepartmentSchema = z.object({
  departmentID: z.number(),
  name: z.string(),
  groupName: z.string()
});

export const employeeSchema = z.object({
  businessEntityID: z.number(),
  nationalIDNumber: z.string(),
  loginID: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  maritalStatus: z.enum(['Single', 'Married']),
  gender: z.enum(['Male', 'Female']),
  hireDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  salariedFlag: z.boolean(),
  vacationHours: z.number(),
  sickLeaveHours: z.number(),
  currentFlag: z.boolean(),
  department: employeeDepartmentSchema
});

export type EmployeeDepartment = z.infer<typeof employeeDepartmentSchema>;
export type Employee = z.infer<typeof employeeSchema>;
