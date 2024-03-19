using AdventureWorks.Domain.Employees;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;

public record GetEmployeeByBusinessEntityIdQuery(int BusinessEntityID) : IRequest<Employee?>;