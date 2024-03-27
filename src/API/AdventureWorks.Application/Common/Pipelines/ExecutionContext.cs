using AdventureWorks.Domain.Authentication;

namespace AdventureWorks.Application.Common.Pipelines;

public class ExecutionContext
{
    public required Guid BatchId { get; init; }
    public required string RequestId { get; init; } // Trace Identifier
    public required string RequestPath { get; init; } // Request Path
    public required string UserAgent { get; init; } = string.Empty;
    public required UserClaims UserClaims { get; init; }
}