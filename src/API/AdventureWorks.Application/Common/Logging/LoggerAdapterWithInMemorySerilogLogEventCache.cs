using AdventureWorks.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;
using Serilog.Events;
using Serilog.Parsing;

namespace AdventureWorks.Application.Common.Logging;

/*
 * For use in tests, this class logs to an in-memory cache of Serilog LogEvents.
 * In ConfigureTestServices:
 *  services.RemoveAll(typeof(ILoggerAdapter<>));
 *  services.AddSingleton<InMemorySerilogLogEventCache>();
 *  services.AddSingleton(typeof(ILoggerAdapter<>), typeof(LoggerAdapterWithInMemorySerilogLogEventCache<>));
 *
 * And then in a tests Arrange:
 *  var logEventCache = _sharedTestContext.ApiFactory.GetService<InMemorySerilogLogEventCache>();
 *  logEventCache.Clear();
 *
 * And then in a tests Assert:
 *  logEventCache.Logs.Count(x => x.Level == LogEventLevel.Error).Should().Be(0); // At the most basic level just check for no errors
 *  logEventCache.Logs.Count(x =>
 *          x.MessageTemplate.Text.Contains("sending email with subject", StringComparison.OrdinalIgnoreCase))
 *      .Should()
 *      .Be(1);
 *  logEventCache.Logs.Count(x => x.MessageTemplate.Text.Equals("Import of clockings into ERP system completed successfully. Imported {Count} clockings.", StringComparison.OrdinalIgnoreCase)).Should().Be(1);
 *  var logEvent = logEventCache.Logs.Single(x => x.MessageTemplate.Text.Equals("Import of clockings into ERP system completed successfully. Imported {Count} clockings.", StringComparison.OrdinalIgnoreCase));
 *  var logEventPropertyValue = logEvent.Properties.First().Value as ScalarValue;
 *  logEventPropertyValue!.Value.Should().BeOfType<int>().Which.Should().BeGreaterOrEqualTo(1);
 */
public class LoggerAdapterWithInMemorySerilogLogEventCache<TType> : ILoggerAdapter<TType>
{
    private readonly ILogger<TType> _logger;
    private readonly InMemorySerilogLogEventCache _inMemorySerilogSink;

    public LoggerAdapterWithInMemorySerilogLogEventCache(ILogger<TType> logger,
        InMemorySerilogLogEventCache inMemorySerilogSink)
    {
        _logger = logger;
        _inMemorySerilogSink = inMemorySerilogSink;
    }

    public void LogTrace(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Verbose, message, args));
        _logger.LogTrace(message, args);
    }

    public void LogDebug(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Debug, message, args));
        _logger.LogDebug(message, args);
    }

    public void LogInformation(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Information, message, args));
        _logger.LogInformation(message, args);
    }
    
    public void LogWarning(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Warning, message, args));
        _logger.LogWarning(message, args);
    }

    public void LogError(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Error, message, args));
        _logger.LogError(message, args);
    }

    public void LogError(Exception? exception, string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Error, message, args));
        _logger.LogError(exception, message, args);
    }

    public void LogCritical(string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Fatal, message, args));
        _logger.LogCritical(message, args);
    }

    public void LogCritical(Exception exception, string? message, params object?[] args)
    {
        _inMemorySerilogSink.Log(GenerateLogEvent(LogEventLevel.Fatal, message, args));
        _logger.LogCritical(exception, message, args);
    }


    private static LogEvent GenerateLogEvent(LogEventLevel logEventLevel, string? message, object?[] args)
    {
        var messageTemplate = new MessageTemplateParser().Parse(message ?? string.Empty);
        var properties = new Dictionary<string, LogEventPropertyValue>();
        for (var i = 0; i < args.Length; i++)
        {
            properties.Add($"Property{i}", new ScalarValue(args[i]));
        }

        var logEvent = new LogEvent(
            DateTimeOffset.Now,
            logEventLevel,
            null,
            messageTemplate,
            new List<LogEventProperty>());
        foreach (var property in properties)
        {
            logEvent.AddPropertyIfAbsent(new LogEventProperty(property.Key, property.Value));
        }

        return logEvent;
    }
}