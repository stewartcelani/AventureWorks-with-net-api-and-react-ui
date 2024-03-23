using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Application.Products.Queries.GetProducts;
using AdventureWorks.Domain.Products;

namespace AdventureWorks.Application.Common.Interfaces;

public interface IProductRepository
{
    Task<Product?> GetProductAsync(int productId, CancellationToken cancellationToken);
    Task<GetProductsQueryResponse> GetProductsAsync(GetProductsFilter filter, CancellationToken cancellationToken);
}