using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Employees.Queries.GetDepartments;
using AdventureWorks.Application.Employees.Queries.GetEmployeeById;
using AdventureWorks.Domain.Employees;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandHandler(IEmployeeRepository employeeRepository, ISender mediator)
    : IRequestHandler<UpdateEmployeeCommand, ErrorOr<UpdateEmployeeCommandResponse>>
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository ?? throw new ArgumentNullException(nameof(employeeRepository));
    private readonly ISender _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

    public async Task<ErrorOr<UpdateEmployeeCommandResponse>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employeeResult = await _mediator.Send(new GetEmployeeByIdQuery(request.BusinessEntityID, request.ExecutionContext), cancellationToken);
        if (employeeResult.IsError) return employeeResult.FirstError;
        
        var employee = employeeResult.Value;
        if (employee is null) return Error.NotFound(description: "Employee not found.");

        var departments = new List<Department> { employee.Department };
        if (request.DepartmentID != employee.Department.DepartmentID)
        {
            var departmentResult = await _mediator.Send(new GetDepartmentsQuery(request.ExecutionContext), cancellationToken);
            if (departmentResult.IsError) return departmentResult.FirstError;
            departments = departmentResult.Value;
        }

        var updatedEmployee = new Employee
        {
            BusinessEntityID = employee.BusinessEntityID,
            NationalIDNumber = request.NationalIDNumber,
            LoginID = request.LoginID,
            FirstName = request.FirstName,
            MiddleName = request.MiddleName,
            LastName = request.LastName,
            JobTitle = request.JobTitle,
            BirthDate = request.BirthDate,
            MaritalStatus = request.MaritalStatus,
            Gender = request.Gender,
            HireDate = request.HireDate,
            SalariedFlag = request.SalariedFlag,
            VacationHours = employee.VacationHours,
            SickLeaveHours = employee.SickLeaveHours,
            CurrentFlag = request.CurrentFlag,
            Department = employee.Department.DepartmentID != request.DepartmentID
                ? departments.First(x => x.DepartmentID == request.DepartmentID)
                : employee.Department
        };
        
        var updateResult = await _employeeRepository.UpdateEmployeeAsync(employee, updatedEmployee, cancellationToken);
        if (!updateResult) return Error.Failure(description: "Failed to update employee.");

        return new UpdateEmployeeCommandResponse
        {
            EmployeeBeforeUpdate = employee,
            EmployeeAfterUpdate = updatedEmployee
        };
    }
}