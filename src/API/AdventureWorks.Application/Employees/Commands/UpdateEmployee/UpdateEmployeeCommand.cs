using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

[Authorize(Roles = AuthConstants.Roles.Employees.Write)]
public class UpdateEmployeeCommand : AuditableCommand, IRequest<ErrorOr<UpdateEmployeeCommandResponse>> 
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string LoginID { get; init; }
    public required string FirstName { get; init; }
    public required string MiddleName { get; init; } = string.Empty;
    public required string LastName { get; init; }
    public required string JobTitle { get; init; }
    public required DateOnly BirthDate { get; init; }
    public required MartialStatus MaritalStatus { get; init; }
    public required Gender Gender { get; init; }
    public required DateOnly HireDate { get; init; }
    public required bool SalariedFlag { get; init; }
    public required bool CurrentFlag { get; init; }
    public required int DepartmentID { get; init; }
}