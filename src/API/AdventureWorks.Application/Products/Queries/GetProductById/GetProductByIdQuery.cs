using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Products;
using MediatR;
using ErrorOr;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Products.Queries.GetProductById;

[Authorize(Roles = AuthConstants.Roles.Products.Read)]
public record GetProductByIdQuery(int ProductID, ExecutionContext ExecutionContext) : AuditableQuery(ExecutionContext), IRequest<ErrorOr<Product?>>;