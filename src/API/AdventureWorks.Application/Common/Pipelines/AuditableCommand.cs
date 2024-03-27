namespace AdventureWorks.Application.Common.Pipelines;

public class AuditableCommand
{
    public required ExecutionContext ExecutionContext { get; init; }
}