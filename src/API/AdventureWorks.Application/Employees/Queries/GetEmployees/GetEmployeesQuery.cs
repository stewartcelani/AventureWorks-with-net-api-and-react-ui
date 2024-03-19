using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public record GetEmployeesQuery(GetEmployeesFilter Filter) : IRequest<ErrorOr<GetEmployeesQueryResponse>>;