using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetDepartments;

public class GetDepartmentsQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetDepartmentsQuery, ErrorOr<List<Department>>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));

    public async Task<ErrorOr<List<Department>>> Handle(GetDepartmentsQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetDepartmentsAsync(cancellationToken);
    }
}