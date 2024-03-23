using AdventureWorks.API.Mappers;
using AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;
using AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Contracts.v1;
using AdventureWorks.Contracts.v1.Employees.Requests;
using AdventureWorks.Domain.Authentication;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace AdventureWorks.API.Controllers;

[ApiController]
[Authorize(Roles = AuthConstants.Roles.Employees.Read)]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAdSettings:Scopes")]
public class EmployeesController(ISender mediator) : ControllerBase
{
    private readonly ISender _mediator = mediator;

    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployeeByBusinessEntityId.Url, Name = nameof(GetEmployeeByBusinessEntityId))]
    public async Task<IActionResult> GetEmployeeByBusinessEntityId(int businessEntityID, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetEmployeeByBusinessEntityIdQuery(businessEntityID), cancellationToken);
        if (result.IsError) return result.FirstError.ToActionResult();
        return result.Value is null ? NotFound() : Ok(result.Value.ToEmployeeResponse());
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployeeByNationalIdNumber.Url, Name = nameof(GetEmployeeByNationalIdNumber))]
    public async Task<IActionResult> GetEmployeeByNationalIdNumber(string nationalIdNumber, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetEmployeeByNationalIdNumberQuery(nationalIdNumber), cancellationToken);
        if (result.IsError) return result.FirstError.ToActionResult();
        return result.Value is null ? NotFound() : Ok(result.Value.ToEmployeeResponse());
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployees.Url, Name = nameof(GetEmployees))]
    public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeesRequest request, CancellationToken cancellationToken = default)
    {
        var randomDelay = new Random().Next(0, 1000);
        await Task.Delay(randomDelay, cancellationToken);
        var filter = request.ToGetEmployeesFilter();
        var result = await _mediator.Send(new GetEmployeesQuery(filter), cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok(result.Value.ToPagedResponse(filter.Page, filter.PageSize));
    }
  
}