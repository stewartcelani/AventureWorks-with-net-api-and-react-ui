using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Products;
using ErrorOr;
using MediatR;

namespace AdventureWorks.Application.Products.Queries.GetProductById;

public class GetProductByIdQueryHandler(IProductRepository productRepository) : IRequestHandler<GetProductByIdQuery, ErrorOr<Product?>>
{
    private readonly IProductRepository _productRepository = productRepository;

    public async Task<ErrorOr<Product?>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        return await _productRepository.GetProductAsync(productId: request.ProductID,
            cancellationToken: cancellationToken);
    }
}