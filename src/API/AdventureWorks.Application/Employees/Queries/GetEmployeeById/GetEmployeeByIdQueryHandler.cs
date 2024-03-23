using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeById;

public class GetEmployeeByIdQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeeByIdQuery, ErrorOr<Employee?>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    
    public async Task<ErrorOr<Employee?>> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeeAsync(businessEntityId: request.BusinessEntityID, cancellationToken);
    }
}