using AdventureWorks.Application.Common.Pipelines;
using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

public record GetProductsQuery(GetProductsFilter Filter, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<GetProductsQueryResponse>>;