using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

[Authorize(Roles = AuthConstants.Roles.Employees.Write)]
public class UpdateEmployeeCommand : AuditableCommand, IRequest<ErrorOr<UpdateEmployeeCommandResponse>> 
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string FirstName { get; init; }
    public required string MiddleName { get; init; } = string.Empty;
    public required string LastName { get; init; }
    public required string JobTitle { get; init; }
}