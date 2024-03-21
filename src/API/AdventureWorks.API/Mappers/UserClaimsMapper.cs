using AdventureWorks.Domain.Authentication;
using AdventureWorks.Contracts.v1.Users.Responses;

namespace AdventureWorks.API.Mappers;

public static class UserClaimsMapper
{
    public static UserClaimsResponse ToUserClaimsResponse(this UserClaims claims)
    {
        return new UserClaimsResponse
        {
            Id = claims.Id,
            FirstName = claims.FirstName,
            LastName = claims.LastName,
            Email = claims.Email,
            Roles = claims.Roles
        };
    }
}