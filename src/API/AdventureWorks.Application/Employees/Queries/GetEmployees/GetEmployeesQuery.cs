using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public record GetEmployeesQuery(GetEmployeesFilter Filter) : IRequest<GetEmployeesQueryResponse>;