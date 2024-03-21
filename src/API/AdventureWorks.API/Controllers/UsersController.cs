using AdventureWorks.API.Mappers;
using AdventureWorks.Contracts.v1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace AdventureWorks.API.Controllers;

[ApiController]
[Authorize]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAdSettings:Scopes")]
public class UsersController : ControllerBase
{
    [Authorize]
    [HttpGet(ApiEndpoints.Users.Me.Url, Name = nameof(Me) )]
    public IActionResult Me()
    {
        var userClaims = HttpContext.User.ToUserClaims();
        return Ok(userClaims.ToUserClaimsResponse());
    }
}