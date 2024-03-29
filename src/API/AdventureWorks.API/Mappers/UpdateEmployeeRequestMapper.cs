using AdventureWorks.Application.Employees.Commands.UpdateEmployee;
using AdventureWorks.Contracts.v1.Employees.Requests;
using AdventureWorks.Domain.Employees;
using Gender = AdventureWorks.Domain.Employees.Gender;

namespace AdventureWorks.API.Mappers;

public static class UpdateEmployeeRequestMapper
{
    public static UpdateEmployeeCommand ToUpdateEmployeeCommand(this UpdateEmployeeRequest request,
        int businessEntityID, ExecutionContext executionContext)
    {
        return new UpdateEmployeeCommand
        {
            ExecutionContext = executionContext,
            BusinessEntityID = businessEntityID,
            NationalIDNumber = request.NationalIDNumber.Trim(),
            LoginID = request.LoginId.Trim(),
            FirstName = request.FirstName.Trim(),
            MiddleName = request.MiddleName.Trim(),
            LastName = request.LastName.Trim(),
            JobTitle = request.JobTitle.Trim(),
            BirthDate = DateOnly.FromDateTime(request.BirthDate),
            MaritalStatus = MartialStatus.FromName(request.MaritalStatus.ToString()),
            Gender = Gender.FromName(request.Gender.ToString()),
            HireDate = DateOnly.FromDateTime(request.HireDate),
            SalariedFlag = request.SalariedFlag,
            CurrentFlag = request.CurrentFlag,
            DepartmentID = request.DepartmentID
        };
    }
}