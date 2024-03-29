namespace AdventureWorks.API.Mappers;

public static class HttpContextMapper
{
    public static ExecutionContext ToExecutionContext(this HttpContext httpContext)
    {
        return new ExecutionContext
        {
            BatchId = Guid.NewGuid(),
            RequestId = httpContext.TraceIdentifier,
            RequestPath = httpContext.Request.Path,
            UserAgent = httpContext.Request.Headers.UserAgent.ToString(),
            UserClaims = httpContext.User.ToUserClaims()
        };
    }
}