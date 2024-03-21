namespace AdventureWorks.Contracts.v1.Users.Responses;

public class UserClaimsResponse
{
    public required Guid Id { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required List<string> Roles { get; init; } = new();
}