using AdventureWorks.Application.Common.Domain;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

public class GetProductsFilter : PagedFilter
{
    public bool IncludeTotalCount { get; init; } = false;
    public int? ProductID { get; init; }
}