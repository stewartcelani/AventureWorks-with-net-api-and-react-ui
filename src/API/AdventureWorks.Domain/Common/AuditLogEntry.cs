namespace AdventureWorks.Domain.Common;

public class AuditLogEntry
{
    public required string RequestId { get; init; }
    public required string RequestPath { get; init; }
    public required Guid BatchId { get; init; }
    public required string Command { get; init; }
    public required string Request { get; init; }
    public required bool IsError { get; init; }
    public required string? Error { get; init; }
    public required string? Response { get; init; }
    public required Guid UserId { get; init; }
    public required string UserEmail { get; init; }
    public required string UserFirstName { get; init; }
    public required string UserLastName { get; init; }
    public required List<string> UserRoles { get; init; }
    public required string UserAgent { get; init; }
}