using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeById;

[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
public record GetEmployeeByIdQuery(int BusinessEntityID, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Employee?>>;