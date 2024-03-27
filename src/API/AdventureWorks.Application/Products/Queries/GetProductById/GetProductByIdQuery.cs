using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Products;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Products.Queries.GetProductById;

public record GetProductByIdQuery(int ProductID, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Product?>>;