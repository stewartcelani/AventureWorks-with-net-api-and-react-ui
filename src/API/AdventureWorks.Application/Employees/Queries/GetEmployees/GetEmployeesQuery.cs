using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
public record GetEmployeesQuery(GetEmployeesFilter Filter, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<GetEmployeesQueryResponse>>;