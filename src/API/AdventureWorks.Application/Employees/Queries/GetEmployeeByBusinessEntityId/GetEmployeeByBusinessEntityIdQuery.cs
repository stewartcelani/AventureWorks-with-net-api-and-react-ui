using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;

public record GetEmployeeByBusinessEntityIdQuery(int BusinessEntityID) : IRequest<ErrorOr<Employee?>>;