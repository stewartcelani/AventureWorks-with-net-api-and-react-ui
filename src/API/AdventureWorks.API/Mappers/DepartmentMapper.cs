using AdventureWorks.Contracts.v1.Employees.Responses;
using AdventureWorks.Domain.Employees;

namespace AdventureWorks.API.Mappers;

public static class DepartmentMapper
{
    public static DepartmentResponse ToDepartmentResponse(this Department department)
    {
        return new DepartmentResponse
        {
            DepartmentID = department.DepartmentID,
            Name = department.Name,
            GroupName = department.GroupName
        };
    }
}