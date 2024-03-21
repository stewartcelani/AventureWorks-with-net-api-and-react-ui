namespace AdventureWorks.Infrastructure.Employees;

public class EmployeeQueryModel
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string LoginID { get; init; }
    public required string FirstName { get; init; }
    public required string MiddleName { get; init; } = string.Empty;
    public required string LastName { get; init; }
    public required string JobTitle { get; init; }
    public required DateTime BirthDate { get; init; }
    public required string MaritalStatus { get; init; }
    public required string Gender { get; init; }
    public required DateTime HireDate { get; init; }
    public required bool SalariedFlag { get; init; }
    public required double VacationHours { get; init; }
    public required double SickLeaveHours { get; init; }
    public required bool CurrentFlag { get; init; }
    public required int DepartmentID { get; init; }
    public required string DepartmentName { get; init; }
    public required string DepartmentGroupName { get; init; }
}