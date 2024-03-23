using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Settings;
using AdventureWorks.Application.Products.Queries.GetProducts;
using AdventureWorks.Domain.Products;
using Dapper;

namespace AdventureWorks.Infrastructure.Products;

public class ProductRepository(ConnectionStrings connectionStrings, IDbConnectionFactory dbConnectionFactory) : IProductRepository
{
    private readonly ConnectionStrings _connectionStrings = connectionStrings ?? throw new ArgumentNullException(nameof(connectionStrings));
    private readonly IDbConnectionFactory _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
    
    #region Public Methods

    public async Task<Product?> GetProductAsync(int productId, CancellationToken cancellationToken)
    {
        var filter = new GetProductsFilter()
        {
            ProductID = productId,
            Page = 1,
            PageSize = 2
        };
        var query = filter.BuildGetQuery();
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var productQueryModel =
            await connection.QuerySingleOrDefaultAsync<ProductQueryModel>(
                new CommandDefinition(query, filter, cancellationToken: cancellationToken));
        return productQueryModel?.ToProduct();
    }

    public async Task<GetProductsQueryResponse> GetProductsAsync(GetProductsFilter filter, CancellationToken cancellationToken)
    {
        var getQuery = filter.BuildGetQuery();
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var productQueryModels =
            await connection.QueryAsync<ProductQueryModel>(new CommandDefinition(getQuery, filter,
                cancellationToken: cancellationToken));
        var products = productQueryModels.Select(x => x.ToProduct()).ToList();
        var response = new GetProductsQueryResponse
        {
            Items = products,
            TotalCount = null
        };
        if (!filter.IncludeTotalCount) return response;
        response.TotalCount = products.Count;
        if (response.TotalCount >= filter.PageSize ||
            filter.Page > 1) 
        {
            var countQuery = filter.BuildCountQuery();
            response.TotalCount =
                await connection.ExecuteScalarAsync<int>(new CommandDefinition(countQuery, filter,
                    cancellationToken: cancellationToken));
        }

        return response;
    }
    
    #endregion
}