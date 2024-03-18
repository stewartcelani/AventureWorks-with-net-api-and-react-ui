using AdventureWorks.Application.Common.Interfaces;

namespace AdventureWorks.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly ILoggerAdapter<ExceptionHandlingMiddleware> _logger;
    private readonly RequestDelegate _request;

    public ExceptionHandlingMiddleware(RequestDelegate request,
        ILoggerAdapter<ExceptionHandlingMiddleware> logger)
    {
        _request = request;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _request(context);
        }
        catch (TaskCanceledException ex)
        {
            /*Swallow*/
        }
        catch (Exception ex)
        {
            _logger.LogCritical(ex, ex.Message);
            context.Response.StatusCode = 500;
            await context.Response.CompleteAsync();
        }
    }
}