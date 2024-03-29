using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Domain.Employees;

namespace AdventureWorks.Application.Common.Interfaces;

public interface IEmployeeRepository
{
    Task<Employee?> GetEmployeeAsync(int businessEntityId, CancellationToken cancellationToken);
    Task<Employee?> GetEmployeeAsync(string nationalIdNumber, CancellationToken cancellationToken);
    Task<GetEmployeesQueryResponse> GetEmployeesAsync(GetEmployeesFilter filter, CancellationToken cancellationToken);

    Task<bool> UpdateEmployeeAsync(Employee existingEmployee, Employee updatedEmployee,
        CancellationToken cancellationToken);
    Task<List<Department>> GetDepartmentsAsync(CancellationToken cancellationToken);
}