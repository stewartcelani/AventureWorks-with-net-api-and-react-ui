namespace AdventureWorks.Application.Common.Interfaces;

public interface ILoggerAdapter<TType> : ILoggerAdapter
{
}

public interface ILoggerAdapter
{
    void LogTrace(string? message, params object?[] args);
    void LogDebug(string? message, params object?[] args);
    void LogInformation(string? message, params object?[] args);
    void LogWarning(string? message, params object?[] args);
    void LogError(string? message, params object?[] args);
    void LogError(Exception exception, string? message, params object?[] args);
    void LogCritical(string? message, params object?[] args);
    void LogCritical(Exception exception, string? message, params object?[] args);
}