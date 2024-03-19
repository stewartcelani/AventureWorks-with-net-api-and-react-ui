using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Contracts.v1.Employees.Requests;

namespace AdventureWorks.API.Mappers;

public static class GetEmployeesRequestMapper
{
    public static GetEmployeesFilter ToGetEmployeesFilter(this GetEmployeesRequest request)
    {
        return new GetEmployeesFilter
        {
            Page = request.Page,
            PageSize = request.PageSize,
            IncludeTotalCount = request.IncludeTotalCount,
            OrderByOperator = OrderByOperator.FromValue(request.OrderByOperator.ToString())
        };
    }
}