using AdventureWorks.Contracts.v1.Employees.Responses;
using AdventureWorks.Domain.Employees;

namespace AdventureWorks.API.Mappers;

public static class EmployeeMapper
{
    public static EmployeeResponse ToEmployeeResponse(this Employee employee)
    {
        return new EmployeeResponse
        {
            BusinessEntityID = employee.BusinessEntityID,
            NationalIDNumber = employee.NationalIDNumber,
            LoginID = employee.LoginID,
            FirstName = employee.FirstName,
            MiddleName = employee.MiddleName,
            LastName = employee.LastName,
            JobTitle = employee.JobTitle,
            BirthDate = employee.BirthDate,
            MaritalStatus = employee.MaritalStatus.Name,
            Gender = employee.Gender.Name,
            HireDate = employee.HireDate,
            SalariedFlag = employee.SalariedFlag,
            VacationHours = employee.VacationHours,
            SickLeaveHours = employee.SickLeaveHours,
            CurrentFlag = employee.CurrentFlag,
            Department = employee.Department.ToDepartmentResponse()
        };
    }
    
}