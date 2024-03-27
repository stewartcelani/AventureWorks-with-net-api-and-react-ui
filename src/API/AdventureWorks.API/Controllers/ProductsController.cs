using AdventureWorks.API.Mappers;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Application.Products.Queries.GetProductById;
using AdventureWorks.Application.Products.Queries.GetProducts;
using AdventureWorks.Contracts.v1;
using AdventureWorks.Contracts.v1.Products.Requests;
using AdventureWorks.Domain.Authentication;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace AdventureWorks.API.Controllers;

[ApiController]
[Authorize(Roles = AuthConstants.Roles.Products.Read)]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAdSettings:Scopes")]
public class ProductsController(ISender mediator) : ControllerBase
{
    private readonly ISender _mediator = mediator;

    [Authorize(Roles = AuthConstants.Roles.Products.Read)]
    [HttpGet(ApiEndpoints.Products.GetProductById.Url, Name = nameof(GetProductById))]
    public async Task<IActionResult> GetProductById(int productId, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(productId, HttpContext.ToExecutionContext()), cancellationToken);
        if (result.IsError) return result.FirstError.ToActionResult();
        return result.Value is null ? NotFound() : Ok(result.Value.ToProductResponse());
    }
    
    [Authorize(Roles = AuthConstants.Roles.Products.Read)]
    [HttpGet(ApiEndpoints.Products.GetProducts.Url, Name = nameof(GetProducts))]
    public async Task<IActionResult> GetProducts([FromQuery] GetProductsRequest request, CancellationToken cancellationToken = default)
    {
        /*var randomDelay = new Random().Next(0, 350);
        await Task.Delay(randomDelay, cancellationToken);*/
        var filter = request.ToGetProductsFilter();
        var result = await _mediator.Send(new GetProductsQuery(filter, HttpContext.ToExecutionContext()), cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok(result.Value.ToPagedResponse(filter.Page, filter.PageSize));
    }
    
    
}