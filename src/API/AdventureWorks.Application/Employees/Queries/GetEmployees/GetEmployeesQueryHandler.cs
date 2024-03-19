using AdventureWorks.Application.Common.Interfaces;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public class GetEmployeesQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeesQuery, GetEmployeesQueryResponse>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;

    public async Task<GetEmployeesQueryResponse> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeesAsync(request.Filter, cancellationToken);
    }
}