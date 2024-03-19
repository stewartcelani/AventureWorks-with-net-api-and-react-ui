using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Employees;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

public class GetEmployeeByNationalIdNumberQueryHandler(IEmployeeRepository employeeRepository)
    : IRequestHandler<GetEmployeeByNationalIdNumberQuery, ErrorOr<Employee?>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;

    public async Task<ErrorOr<Employee?>> Handle(GetEmployeeByNationalIdNumberQuery request, CancellationToken cancellationToken)
    {
        return await _employeeRepository.GetEmployeeAsync(nationalIdNumber: request.NationalIdNumber, cancellationToken);
    }
}