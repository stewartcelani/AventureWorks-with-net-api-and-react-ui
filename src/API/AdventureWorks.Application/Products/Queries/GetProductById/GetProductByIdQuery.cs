using AdventureWorks.Domain.Products;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Products.Queries.GetProductById;

public record GetProductByIdQuery(int ProductID) : IRequest<ErrorOr<Product?>>;