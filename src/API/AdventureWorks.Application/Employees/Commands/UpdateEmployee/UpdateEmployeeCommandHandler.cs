using AdventureWorks.Application.Common.Interfaces;
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

        var updatedEmployee = new Employee
        {
            BusinessEntityID = employee.BusinessEntityID,
            NationalIDNumber = request.NationalIDNumber,
            LoginID = employee.LoginID,
            FirstName = request.FirstName,
            MiddleName = request.MiddleName,
            LastName = request.LastName,
            JobTitle = request.JobTitle,
            BirthDate = employee.BirthDate,
            MaritalStatus = employee.MaritalStatus,
            Gender = employee.Gender,
            HireDate = employee.HireDate,
            SalariedFlag = employee.SalariedFlag,
            VacationHours = employee.VacationHours,
            SickLeaveHours = employee.SickLeaveHours,
            CurrentFlag = employee.CurrentFlag,
            Department = employee.Department
        };
        
        var updateResult = await _employeeRepository.UpdateEmployeeAsync(updatedEmployee, cancellationToken);
        if (!updateResult) return Error.Failure(description: "Failed to update employee.");

        return new UpdateEmployeeCommandResponse
        {
            EmployeeBeforeUpdate = employee,
            EmployeeAfterUpdate = updatedEmployee
        };
    }
}