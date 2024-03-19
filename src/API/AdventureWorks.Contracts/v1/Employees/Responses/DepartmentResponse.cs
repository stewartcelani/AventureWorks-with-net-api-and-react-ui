namespace AdventureWorks.Contracts.v1.Employees.Responses;

public class DepartmentResponse
{
    public required int DepartmentID { get; set; }
    public required string Name { get; set; }
    public required string GroupName { get; set; }
}