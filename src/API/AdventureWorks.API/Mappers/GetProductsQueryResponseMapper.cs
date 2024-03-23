using AdventureWorks.Application.Products.Queries.GetProducts;
using AdventureWorks.Contracts.v1.Common.Responses;
using AdventureWorks.Contracts.v1.Products.Responses;

namespace AdventureWorks.API.Mappers;

public static class GetProductsQueryResponseMapper
{
    public static PagedResponse<ProductResponse> ToPagedResponse(this GetProductsQueryResponse response, int page, int pageSize)
    {
        return new PagedResponse<ProductResponse>
        {
            Page = page,
            PageSize = pageSize,
            TotalCount = response.TotalCount,
            Items = response.Items.Select(x => x.ToProductResponse())
        };
    }
}