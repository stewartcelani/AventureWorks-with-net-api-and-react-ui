using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Contracts.v1.Common.Responses;
using AdventureWorks.Contracts.v1.Employees.Responses;

namespace AdventureWorks.API.Mappers;

public static class GetEmployeesQueryResponseMapper
{
    public static PagedResponse<EmployeeResponse> ToPagedResponse(this GetEmployeesQueryResponse response, int page, int pageSize)
    {
        return new PagedResponse<EmployeeResponse>
        {
            Page = page,
            PageSize = pageSize,
            TotalCount = response.TotalCount,
            Items = response.Items.Select(x => x.ToEmployeeResponse())
        };
    }
    
}