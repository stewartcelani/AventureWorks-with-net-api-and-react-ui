using AdventureWorks.Domain.Employees;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandResponse
{
    public required Employee EmployeeBeforeUpdate { get; init; }
    public required Employee EmployeeAfterUpdate { get; init; }
}