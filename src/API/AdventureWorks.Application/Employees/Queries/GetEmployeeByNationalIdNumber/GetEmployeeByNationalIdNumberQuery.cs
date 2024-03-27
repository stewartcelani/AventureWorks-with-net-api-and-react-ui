using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

public record GetEmployeeByNationalIdNumberQuery(string NationalIdNumber, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Employee?>>;