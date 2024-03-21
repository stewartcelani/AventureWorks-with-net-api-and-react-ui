using AdventureWorks.Application.Common.Extensions;
using AdventureWorks.Domain.Employees;

namespace AdventureWorks.Infrastructure.Employees;

public static class EmployeeQueryModelMapper
{
    public static Employee ToEmployee(this EmployeeQueryModel queryModel) => new Employee
    {
        BusinessEntityID = queryModel.BusinessEntityID,
        NationalIDNumber = queryModel.NationalIDNumber,
        LoginID = queryModel.LoginID,
        FirstName = queryModel.FirstName,
        MiddleName = queryModel.MiddleName,
        LastName = queryModel.LastName,
        JobTitle = queryModel.JobTitle,
        BirthDate = queryModel.BirthDate.ToDateOnly(),
        MaritalStatus = MartialStatus.FromValue(queryModel.MaritalStatus),
        Gender = Gender.FromValue(queryModel.Gender),
        HireDate = queryModel.HireDate.ToDateOnly(),
        SalariedFlag = queryModel.SalariedFlag,
        VacationHours = queryModel.VacationHours,
        SickLeaveHours = queryModel.SickLeaveHours,
        CurrentFlag = queryModel.CurrentFlag,
        Department = new Department
        {
            DepartmentID = queryModel.DepartmentID,
            Name = queryModel.DepartmentName,
            GroupName = queryModel.DepartmentGroupName
        }
    };
}