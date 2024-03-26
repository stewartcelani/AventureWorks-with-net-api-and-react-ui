import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { getEmployeeQueryOptions } from '@features/employees/queries/getEmployee.ts';
import { Route as EmployeeRoute } from '@routes/employees.$employeeId.index';
import { Route as EmployeesRoute } from '@routes/employees.index.tsx';
import { Input } from '@components/ui/input.tsx';
import { Button } from '@components/ui/button.tsx';
import { useToast } from '@/components/ui/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form.tsx';
import {
  updateEmployee,
  type UpdateEmployeeRequest,
  updateEmployeeSchema
} from '@features/employees/mutations/updateEmployee.ts';
import { logger } from '@lib/logger.ts';

export default function EmployeePage() {
  const { employeeId } = EmployeeRoute.useParams();
  const { data: employee } = useSuspenseQuery(getEmployeeQueryOptions(Number(employeeId)));

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateEmployee,
    /*onMutate: (variables) => { // This works but its actually better experience for the toast + ui to change at same time
      const previousEmployee = queryClient.getQueryData(getEmployeeQueryOptions(Number(employeeId)).queryKey);
      queryClient.setQueryData(getEmployeeQueryOptions(Number(employeeId)).queryKey, (old: Employee | undefined) => {
        if (old) {
          return {
            ...old,
            ...variables.updateEmployeeRequest
          };
        }
        return old;
      });
      return { previousEmployee };
    },*/
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: getEmployeeQueryOptions(Number(employeeId)).queryKey });
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
  const form = useForm<UpdateEmployeeRequest>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle
    },
    mode: 'onChange'
  });

  const onSubmit = async (updateEmployeeRequest: UpdateEmployeeRequest) => {
    await mutation.mutateAsync({ employeeId: Number(employeeId), updateEmployeeRequest });
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={EmployeesRoute.to}>Employees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {employee.firstName} {employee.lastName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="flex-1 text-muted-foreground">{employee.jobTitle}</p>
        </div>
        <div></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-6 grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder={employee.firstName} {...field} disabled={mutation.isPending} />
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
                    <Input placeholder={employee.lastName} {...field} disabled={mutation.isPending} />
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
                    <Input placeholder={employee.jobTitle} {...field} disabled={mutation.isPending} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={mutation.isPending} type="submit" variant="outline" className="mt-0 hover:bg-primary/70">
            {mutation.isPending ? 'Updating...' : 'Update employee'}
          </Button>
        </form>
      </Form>
    </>
  );
}
