using AdventureWorks.Domain.Employees;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public class GetEmployeesQueryResponse
{
    public required List<Employee> Employees { get; init; }
    public int? TotalCount { get; set; }
}