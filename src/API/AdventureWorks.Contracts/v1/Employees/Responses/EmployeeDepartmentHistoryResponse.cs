namespace AdventureWorks.Contracts.v1.Employees.Responses;

public class EmployeeDepartmentHistoryResponse
{
    public required int DepartmentID { get; set; }
    public required string Name { get; set; }
    public required string GroupName { get; set; }
    public required DateOnly StartDate { get; init; }
    public required DateOnly? EndDate { get; init; }
}