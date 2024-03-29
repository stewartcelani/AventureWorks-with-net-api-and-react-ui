using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Queries.GetDepartments;

[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
public record GetDepartmentsQuery(ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<List<Department>>>;