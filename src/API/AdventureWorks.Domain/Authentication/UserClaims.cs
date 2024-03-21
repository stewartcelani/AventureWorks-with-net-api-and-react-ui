using System.Text.Json.Serialization;

namespace AdventureWorks.Domain.Authentication;

public class UserClaims
{
    public required Guid Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required List<string> Roles { get; init; } = new();
    
    [JsonIgnore]
    public string FullName => $"{FirstName} {LastName}".Trim();
    public bool HasRole(string role) => Roles.Contains(role);

}