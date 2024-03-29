using AdventureWorks.Contracts.v1.Employees.Responses;
using AdventureWorks.Domain.Employees;

namespace AdventureWorks.API.Mappers;

public static class DepartmentHistoryMapper
{
    public static EmployeeDepartmentHistoryResponse ToEmployeeDepartmentHistoryResponse(this DepartmentHistory departmentHistory)
    {
        return new EmployeeDepartmentHistoryResponse
        {
            DepartmentID = departmentHistory.DepartmentID,
            Name = departmentHistory.Name,
            GroupName = departmentHistory.GroupName,
            StartDate = departmentHistory.StartDate,
            EndDate = departmentHistory.EndDate
        };
    }
}