using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;

public class GetEmployeeByBusinessEntityIdQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeeByBusinessEntityIdQuery, ErrorOr<Employee?>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    
    public async Task<ErrorOr<Employee?>> Handle(GetEmployeeByBusinessEntityIdQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeeAsync(businessEntityId: request.BusinessEntityID, cancellationToken);
    }
}