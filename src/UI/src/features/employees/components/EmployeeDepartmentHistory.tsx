import type { HTMLAttributes } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetEmployeeDepartmentHistoryQuery } from '@features/employees/queries/getEmployeeDepartmentHistory.ts';

type EmployeeDepartmentHistoryProps = {
  employeeId: number;
} & HTMLAttributes<HTMLDivElement>;

export default function EmployeeDepartmentHistory({ employeeId, ...props}: EmployeeDepartmentHistoryProps) {
  const { data: employeeDepartmentHistory, isLoading, isError } = useGetEmployeeDepartmentHistoryQuery(employeeId);

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <div className="text-destructive">Error loading department history.</div>;
  }

  return (
    <div {...props}>
      <Table className="lg:w-[800px]">
        <TableCaption>{!employeeDepartmentHistory || employeeDepartmentHistory.length === 0 ? 'No department history found' : ''}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeDepartmentHistory && employeeDepartmentHistory.map((employeeDepartment) => (
            <TableRow key={employeeDepartment.departmentID}>
              <TableCell>{employeeDepartment.name}</TableCell>
              <TableCell>{employeeDepartment.startDate.toLocaleDateString()}</TableCell>
              <TableCell>{employeeDepartment.endDate?.toLocaleDateString() ?? 'Current'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}