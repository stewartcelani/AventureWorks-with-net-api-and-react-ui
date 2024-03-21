namespace AdventureWorks.Domain.Employees;

public class Employee
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string LoginID { get; init; }
    public required string FirstName { get; init; }
    public required string MiddleName { get; init; }
    public required string LastName { get; init; }
    public required string JobTitle { get; init; }
    public required DateOnly BirthDate { get; init; }
    public required MartialStatus MaritalStatus { get; init; }
    public required Gender Gender { get; init; }
    public required DateOnly HireDate { get; init; }
    public required bool SalariedFlag { get; init; }
    public required double VacationHours { get; init; }
    public required double SickLeaveHours { get; init; }
    public required bool CurrentFlag { get; init; }
    public required Department Department { get; init; }
}