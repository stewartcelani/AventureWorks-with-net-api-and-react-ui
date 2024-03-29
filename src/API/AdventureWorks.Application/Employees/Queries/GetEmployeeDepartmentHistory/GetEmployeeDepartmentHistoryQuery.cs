using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Employees;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeDepartmentHistory;

[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
public record GetEmployeeDepartmentHistoryQuery(int BusinessEntityID, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<List<DepartmentHistory>>>;