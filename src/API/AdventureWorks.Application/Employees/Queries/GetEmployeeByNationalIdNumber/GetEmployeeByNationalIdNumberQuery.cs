using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
public record GetEmployeeByNationalIdNumberQuery(string NationalIdNumber, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Employee?>>;