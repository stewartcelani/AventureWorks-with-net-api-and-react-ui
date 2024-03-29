using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Application.Products.Queries.GetProducts;
using AdventureWorks.Contracts.v1.Products.Requests;

namespace AdventureWorks.API.Mappers;

public static class GetProductsRequestMapper
{
    public static GetProductsFilter ToGetProductsFilter(this GetProductsRequest request)
    {
        return new GetProductsFilter
        {
            SearchTerm = string.IsNullOrWhiteSpace(request.SearchTerm) ? null : "%" + request.SearchTerm + "%",
            Page = request.Page,
            PageSize = request.PageSize,
            IncludeTotalCount = request.IncludeTotalCount,
            OrderBy = GetProductsFilterOrderBy.FromName(request.OrderBy.ToString()),
            OrderByOperator = OrderByOperator.FromValue(request.OrderByOperator.ToString())
        };
    }
}