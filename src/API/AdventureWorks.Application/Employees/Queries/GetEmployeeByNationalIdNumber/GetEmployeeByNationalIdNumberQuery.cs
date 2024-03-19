using AdventureWorks.Domain.Employees;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

public record GetEmployeeByNationalIdNumberQuery(string NationalIdNumber) : IRequest<Employee?>;