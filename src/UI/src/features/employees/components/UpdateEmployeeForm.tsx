import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@components/ui/use-toast.ts';
import {
  updateEmployee,
  type UpdateEmployeeRequest,
  updateEmployeeSchema
} from '@features/employees/mutations/updateEmployee.ts';
import { getEmployeeQueryOptions } from '@features/employees/queries/getEmployee.ts';
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

type UpdateEmployeeFormProps = {
  employeeId: number;
} & HTMLAttributes<HTMLDivElement>;

export default function UpdateEmployeeForm({ employeeId, className, ...props }: UpdateEmployeeFormProps) {
  const { data: employee } = useSuspenseQuery(getEmployeeQueryOptions(employeeId));
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<UpdateEmployeeRequest>({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      nationalIdNumber: employee.nationalIDNumber,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle
    },
    mode: 'onChange'
  });

  const mutation = useMutation({
    mutationFn: updateEmployee,
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: getEmployeeQueryOptions(Number(employeeId)).queryKey });
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
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

  const onSubmit = async (updateEmployeeRequest: UpdateEmployeeRequest) => {
    await mutation.mutateAsync({ employeeId: Number(employeeId), updateEmployeeRequest });
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
