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
            Page = request.Page,
            PageSize = request.PageSize,
            IncludeTotalCount = request.IncludeTotalCount,
            OrderByOperator = OrderByOperator.FromValue(request.OrderByOperator.ToString())
        };
    }
}