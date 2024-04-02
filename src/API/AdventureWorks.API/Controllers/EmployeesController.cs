using AdventureWorks.API.Mappers;
using AdventureWorks.Application.Employees.Commands.UpdateEmployee;
using AdventureWorks.Application.Employees.Queries.GetDepartments;
using AdventureWorks.Application.Employees.Queries.GetEmployeeById;
using AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;
using AdventureWorks.Application.Employees.Queries.GetEmployeeDepartmentHistory;
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
    private readonly ISender _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployeeById.Url, Name = nameof(GetEmployeeById))]
    public async Task<IActionResult> GetEmployeeById(int businessEntityID, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetEmployeeByIdQuery(businessEntityID, HttpContext.ToExecutionContext()), cancellationToken);
        if (result.IsError) return result.FirstError.ToActionResult();
        return result.Value is null ? NotFound() : Ok(result.Value.ToEmployeeResponse());
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Write)]
    [HttpPut(ApiEndpoints.Employees.GetEmployeeById.Url, Name = nameof(UpdateEmployeeById))]
    public async Task<IActionResult> UpdateEmployeeById(int businessEntityID, [FromBody] UpdateEmployeeRequest request, CancellationToken cancellationToken = default)
    {
        var command = request.ToUpdateEmployeeCommand(businessEntityID, HttpContext.ToExecutionContext());
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok();
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployeeByNationalIdNumber.Url, Name = nameof(GetEmployeeByNationalIdNumber))]
    public async Task<IActionResult> GetEmployeeByNationalIdNumber(string nationalIdNumber, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetEmployeeByNationalIdNumberQuery(nationalIdNumber, HttpContext.ToExecutionContext()), cancellationToken);
        if (result.IsError) return result.FirstError.ToActionResult();
        return result.Value is null ? NotFound() : Ok(result.Value.ToEmployeeResponse());
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployeeDepartmentHistory.Url, Name = nameof(GetEmployeeDepartmentHistory))]
    public async Task<IActionResult> GetEmployeeDepartmentHistory(int businessEntityID, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetEmployeeDepartmentHistoryQuery(businessEntityID, HttpContext.ToExecutionContext()), cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok(result.Value.Select(x => x.ToEmployeeDepartmentHistoryResponse()));
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetEmployees.Url, Name = nameof(GetEmployees))]
    public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeesRequest request, CancellationToken cancellationToken = default)
    {
        var randomDelay = new Random().Next(0, 350);
        await Task.Delay(randomDelay, cancellationToken);
        var filter = request.ToGetEmployeesFilter();
        var result = await _mediator.Send(new GetEmployeesQuery(filter, HttpContext.ToExecutionContext()), cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok(result.Value.ToPagedResponse(filter.Page, filter.PageSize));
    }
    
    [Authorize(Roles = AuthConstants.Roles.Employees.Read)]
    [HttpGet(ApiEndpoints.Employees.GetDepartments.Url, Name = nameof(GetDepartments))]
    public async Task<IActionResult> GetDepartments(CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(new GetDepartmentsQuery(HttpContext.ToExecutionContext()), cancellationToken);
        return result.IsError ? result.FirstError.ToActionResult() : Ok(result.Value);
    }
    
   
  
}