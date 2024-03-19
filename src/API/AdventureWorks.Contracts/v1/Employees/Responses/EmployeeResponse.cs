namespace AdventureWorks.Contracts.v1.Employees.Responses;

public class EmployeeResponse
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string LoginID { get; init; }
    public required string JobTitle { get; init; }
    public required DateOnly BirthDate { get; init; }
    public required string MaritalStatus { get; init; }
    public required string Gender { get; init; }
    public required DateOnly HireDate { get; init; }
    public required bool SalariedFlag { get; init; }
    public required double VacationHours { get; init; }
    public required double SickLeaveHours { get; init; }
    public required bool CurrentFlag { get; init; }
    public required DepartmentResponse Department { get; init; }
}