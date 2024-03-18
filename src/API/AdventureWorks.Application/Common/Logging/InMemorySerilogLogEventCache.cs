using Serilog.Events;

namespace AdventureWorks.Application.Common.Logging;

public class InMemorySerilogLogEventCache
{
    private List<LogEvent> _logs = [];

    public void Clear()
    {
        _logs.Clear();
    }

    public void Log(LogEvent log)
    {
        _logs.Add(log);
    }

    public List<LogEvent> Logs => _logs;
}