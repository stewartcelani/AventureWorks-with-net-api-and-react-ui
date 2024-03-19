using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;

public class GetEmployeeByBusinessEntityIdQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeeByBusinessEntityIdQuery, Employee?>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    
    public async Task<Employee?> Handle(GetEmployeeByBusinessEntityIdQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeeAsync(businessEntityId: request.BusinessEntityID, cancellationToken);
    }
}