using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeById;

public record GetEmployeeByIdQuery(int BusinessEntityID, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Employee?>>;