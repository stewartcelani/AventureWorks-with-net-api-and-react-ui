using AdventureWorks.Application.Common.Domain;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public class GetEmployeesFilter : PagedFilter
{
    public bool IncludeTotalCount { get; init; } = false;
    public int? BusinessEntityID { get; init; }
    public string? NationalIDNumber { get; init; }
}