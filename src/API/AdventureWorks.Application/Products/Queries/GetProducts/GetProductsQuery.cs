using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

public record GetProductsQuery(GetProductsFilter Filter) : IRequest<ErrorOr<GetProductsQueryResponse>>;