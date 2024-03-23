using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeById;

public record GetEmployeeByIdQuery(int BusinessEntityID) : IRequest<ErrorOr<Employee?>>;