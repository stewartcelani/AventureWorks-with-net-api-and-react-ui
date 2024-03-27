using AdventureWorks.Application.Common.Pipelines;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public record GetEmployeesQuery(GetEmployeesFilter Filter, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<GetEmployeesQueryResponse>>;