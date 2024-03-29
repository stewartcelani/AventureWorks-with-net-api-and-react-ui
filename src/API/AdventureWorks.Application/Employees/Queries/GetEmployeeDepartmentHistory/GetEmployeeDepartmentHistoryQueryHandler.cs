using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeDepartmentHistory;

public class GetEmployeeDepartmentHistoryQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeeDepartmentHistoryQuery, ErrorOr<List<DepartmentHistory>>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));

    public async Task<ErrorOr<List<DepartmentHistory>>> Handle(GetEmployeeDepartmentHistoryQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeeDepartmentHistoryAsync(request.BusinessEntityID, cancellationToken);
    }
}