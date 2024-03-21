using System.Security.Claims;
using AdventureWorks.Domain.Authentication;

namespace AdventureWorks.API.Mappers;

public static class ClaimsPrincipalMapper
{
    public static UserClaims ToUserClaims(this ClaimsPrincipal claimsPrincipal)
    {
        // Azure Object ID
        var oid = claimsPrincipal.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
        if (string.IsNullOrWhiteSpace(oid)) oid = claimsPrincipal.FindFirst("oid")?.Value;
        if (string.IsNullOrWhiteSpace(oid)) throw new InvalidOperationException("Azure Object ID not found in claims.");
        var id = Guid.Parse(oid);
        
        // First Name
        var firstName = claimsPrincipal.FindFirst(ClaimTypes.GivenName)?.Value;
        if (string.IsNullOrWhiteSpace(firstName)) firstName = claimsPrincipal.FindFirst("given_name")?.Value;
        if (string.IsNullOrWhiteSpace(firstName)) throw new InvalidOperationException("First Name not found in claims.");
        
        // Last Name
        var lastName = claimsPrincipal.FindFirst(ClaimTypes.Surname)?.Value;
        if (string.IsNullOrWhiteSpace(lastName)) lastName = claimsPrincipal.FindFirst("family_name")?.Value;
        if (string.IsNullOrWhiteSpace(lastName)) throw new InvalidOperationException("Last Name not found in claims.");

        // Email
        var email = claimsPrincipal.FindFirst(ClaimTypes.Upn)?.Value;
        if (string.IsNullOrWhiteSpace(email)) email = claimsPrincipal.FindFirst("upn")?.Value;
        if (string.IsNullOrWhiteSpace(email)) throw new InvalidOperationException("Email (upn) not found in claims.");

        // Roles
        var roles = claimsPrincipal.FindAll(ClaimTypes.Role).Select(x => x.Value).ToList();
        roles.AddRange(claimsPrincipal.FindAll("appRole").Select(x => x.Value).ToList()); // Front-end token
        roles.AddRange(claimsPrincipal.FindAll("roles").Select(x => x.Value).ToList()); // ROPC grant token
        if (roles.Count == 0) throw new InvalidOperationException("No roles found in claims.");
        
        return new UserClaims
        {
            Id = id,
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            Roles = roles.OrderBy(x => x).ToList()
        };
    }
}