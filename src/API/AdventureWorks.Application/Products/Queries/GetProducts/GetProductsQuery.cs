using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

[Authorize(Roles = AuthConstants.Roles.Products.Read)]
public record GetProductsQuery(GetProductsFilter Filter, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<GetProductsQueryResponse>>;