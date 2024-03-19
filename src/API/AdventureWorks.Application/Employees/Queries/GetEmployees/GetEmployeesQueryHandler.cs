using AdventureWorks.Application.Common.Interfaces;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public class GetEmployeesQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeesQuery, ErrorOr<GetEmployeesQueryResponse>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;

    public async Task<ErrorOr<GetEmployeesQueryResponse>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeesAsync(request.Filter, cancellationToken);
    }
}