using AdventureWorks.Application.Common.Interfaces;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

public class GetProductsQueryHandler(IProductRepository productRepository) : IRequestHandler<GetProductsQuery, ErrorOr<GetProductsQueryResponse>>
{
    private readonly IProductRepository _productRepository = productRepository;

    public async Task<ErrorOr<GetProductsQueryResponse>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        return await _productRepository.GetProductsAsync(request.Filter, cancellationToken);
    }
}