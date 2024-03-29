import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HTMLAttributes, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@components/ui/use-toast.ts';
import {
  updateEmployee,
  type UpdateEmployeeRequest,
} from '@features/employees/mutations/updateEmployee.ts';
import { getEmployeeQueryOptions, useGetEmployeeQuery } from '@features/employees/queries/getEmployee.ts';
import { logger } from '@lib/logger.ts';
import { Button } from '@components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form.tsx';
import { Input } from '@components/ui/input.tsx';
import type { Employee, EmployeeDepartment } from '@features/employees/types/employee.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { z } from "zod";
import { format } from 'date-fns';
import { useGetEmployeeDepartmentsQuery } from '@features/employees/queries/getEmployeeDepartments.ts';

type UpdateEmployeeProps = {
  employeeId: number;
  useSuspense?: boolean;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  notFoundComponent?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;



export default function UpdateEmployee({
  employeeId,
  loadingComponent,
  errorComponent,
  notFoundComponent,
  ...props
}: UpdateEmployeeProps) {
  const { data: employee, isError: isEmployeeError, isLoading: isEmployeeLoading } = useGetEmployeeQuery(employeeId);
  const { data: departments, isError: isDepartmentsError, isLoading: isDepartmentsLoading } = useGetEmployeeDepartmentsQuery();

  if (isEmployeeLoading || isDepartmentsLoading) return loadingComponent || <>Loading...</>;
  if (isEmployeeError || isDepartmentsError) return errorComponent || <div>There was an error loading the employee.</div>;
  if (!employee || !departments) return notFoundComponent || <div>Employee not found.</div>;

  return <UpdateEmployeeForm employee={employee} departments={departments} {...props} />;
}


const updateEmployeeFormSchema = z.object({
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
  birthDate: z.date(),
  maritalStatus: z.enum(['Single', 'Married']),
  gender: z.enum(['Male', 'Female']),
  hireDate: z.date(),
  salariedFlag: z.enum(['1', '0']),
  vacationHours: z.number().int().min(0).max(100000),
  sickLeaveHours: z.number().int().min(0).max(100000),
  currentFlag:z.enum(['1', '0']),
  departmentId: z.string(),
})

type UpdateEmployeeForm = z.infer<typeof updateEmployeeFormSchema>;


type UpdateEmployeeFormProps = {
  employee: Employee;
  departments: EmployeeDepartment[];
} & HTMLAttributes<HTMLDivElement>;

export function UpdateEmployeeForm({ employee, departments, className, ...props }: UpdateEmployeeFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<UpdateEmployeeForm>({
    resolver: zodResolver(updateEmployeeFormSchema),
    defaultValues: {
      nationalIdNumber: employee.nationalIDNumber,
      loginId: employee.loginID,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
      birthDate: employee.birthDate,
      maritalStatus: employee.maritalStatus,
      gender: employee.gender,
      hireDate: employee.hireDate,
      salariedFlag: employee.salariedFlag ? '1' : '0',
      vacationHours: employee.vacationHours,
      sickLeaveHours: employee.sickLeaveHours,
      currentFlag: employee.currentFlag ? '1' : '0',
      departmentId: employee.department.departmentID.toString()
    },
    mode: 'onChange'
  });

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: getEmployeeQueryOptions(employee.businessEntityID).queryKey });
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
      form.reset({}, { keepValues: true })
    },
    onSuccess: () => {
      toast({
        duration: 2500,
        title: 'Employee updated!',
        description: `${employee.firstName} has been updated successfully.`
      });
    },
    onError: (error) => {
      logger.logError('Error updating employee', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! something went wrong.',
        description: 'There was a problem with your request.'
      });
    }
  });

  const onSubmit = async (updateEmployeeForm: UpdateEmployeeForm) => {
    logger.logInfo('Updating employee', updateEmployeeForm);
    const updateEmployeeRequest: UpdateEmployeeRequest = {
      nationalIdNumber: updateEmployeeForm.nationalIdNumber,
      loginId: updateEmployeeForm.loginId,
      firstName: updateEmployeeForm.firstName,
      middleName: updateEmployeeForm.middleName,
      lastName: updateEmployeeForm.lastName,
      jobTitle: updateEmployeeForm.jobTitle,
      birthDate: format(updateEmployeeForm.birthDate, 'yyyy-MM-dd'),
      maritalStatus: updateEmployeeForm.maritalStatus,
      gender: updateEmployeeForm.gender,
      hireDate: format(updateEmployeeForm.hireDate, 'yyyy-MM-dd'),
      salariedFlag: updateEmployeeForm.salariedFlag === '1',
      currentFlag: updateEmployeeForm.currentFlag === '1',
      departmentId: Number(updateEmployeeForm.departmentId),
    }
    await mutation.mutateAsync({ employeeId: employee.businessEntityID, updateEmployeeRequest });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={className} {...props}>
          <FormField
            control={form.control}
            name="nationalIdNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.nationalIDNumber}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                    autoFocus
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loginId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.loginID}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                    autoFocus
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.firstName}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.middleName}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.lastName}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder={employee.jobTitle}
                    {...field}
                    disabled={mutation.isPending || form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={mutation.isPending || form.formState.isSubmitting}
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                           field.value.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>

                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      required
                      mode="single"
                      defaultMonth={field.value}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01") || mutation.isPending || form.formState.isSubmitting
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Martial Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department: EmployeeDepartment) => (
                      <SelectItem key={department.departmentID} value={department.departmentID.toString()}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hireDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={mutation.isPending || form.formState.isSubmitting}
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          field.value.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>

                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      required
                      mode="single"
                      defaultMonth={field.value}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01") || mutation.isPending || form.formState.isSubmitting
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salariedFlag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salaried</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentFlag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vacationHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Leave</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={employee.vacationHours.toString()}
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sickLeaveHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sick Leave</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={employee.sickLeaveHours.toString()}
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={mutation.isPending || form.formState.isSubmitting || !form.formState.isDirty}
          type="submit"
          variant="outline"
          className="mt-0 hover:bg-primary/70"
        >
          {mutation.isPending || form.formState.isSubmitting ? 'Updating...' : 'Update employee'}
        </Button>
      </form>
    </Form>
  );
}
