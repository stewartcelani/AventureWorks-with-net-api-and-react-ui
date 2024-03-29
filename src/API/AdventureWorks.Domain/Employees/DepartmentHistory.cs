namespace AdventureWorks.Domain.Employees;

public class DepartmentHistory : Department
{
    public required DateOnly StartDate { get; init; }
    public required DateOnly? EndDate { get; init; }
}