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
  birthDate: z.string(),
  maritalStatus: z.string(),
  gender: z.string(),
  hireDate: z.string(),
  salariedFlag: z.boolean(),
  vacationHours: z.number(),
  sickLeaveHours: z.number(),
  currentFlag: z.boolean(),
  department: employeeDepartmentSchema
});

export type EmployeeDepartment = z.infer<typeof employeeDepartmentSchema>;
export type Employee = z.infer<typeof employeeSchema>;
