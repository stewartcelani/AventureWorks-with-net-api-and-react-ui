using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

public record GetEmployeeByNationalIdNumberQuery(string NationalIdNumber) : IRequest<ErrorOr<Employee?>>;