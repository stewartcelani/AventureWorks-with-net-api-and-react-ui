using System.Diagnostics;
using System.Text.Json;
using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Domain.Common;
using ErrorOr;
using FluentValidation;
using MediatR;

namespace AdventureWorks.Application.Common.Pipelines;

public class AuditLoggingBehaviour<TRequest, TResponse>(
    IAuditRepository auditRepository,
    ILoggerAdapter<AuditLoggingBehaviour<TRequest, TResponse>> logger,
    IMediator mediator)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly IAuditRepository _auditRepository =
        auditRepository ?? throw new ArgumentNullException(nameof(auditRepository));
    private readonly ILoggerAdapter<AuditLoggingBehaviour<TRequest, TResponse>> _logger =
        logger ?? throw new ArgumentNullException(nameof(logger));
    private readonly IMediator _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));

    private List<string> _excludeRequestTypesFromLogging = [];

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        // Certain commands/requests can be excluded from requiring an execution context by using the [ExecutionContextNotRequired] attribute
        var requestType = request.GetType();
        var isExecutionContextNotRequired =
            Attribute.IsDefined(requestType, typeof(ExecutionContextNotRequiredAttribute));
        if (isExecutionContextNotRequired)
        {
            return await next();
        }

        var stopwatch = Stopwatch.StartNew();
        var executionContext = await GetExecutionContextAsync(request);
        var response = await next();
        var isCommand = typeof(TRequest).Name.EndsWith("Command");
        if (response is not null && isCommand)
        {
            if (response is not IErrorOr errorOr)
                throw new ApplicationException("All commands should return an IErrorOr.");

            // Error or Response Response
            var isError = errorOr.IsError;
            _logger.LogTrace("BatchId: {BatchId}", executionContext.BatchId);
            _logger.LogTrace("IsError: {IsError}", isError);
            string? serializedError = null;
            string? serializedValue = null;
            if (isError)
            {
                var firstErrorProp = response.GetType().GetProperty("FirstError") ??
                                     throw new InvalidOperationException(
                                         "FirstError property not found (should never happen).");
                var firstErrorValue = firstErrorProp.GetValue(response);
                _logger.LogTrace("Error: {@FirstError}", firstErrorValue);
                serializedError = JsonSerializer.Serialize(firstErrorValue);
            }
            else
            {
                var valueProp = response.GetType().GetProperty("Value") ??
                                throw new InvalidOperationException(
                                    "Value property not found (should never happen).");
                var value = valueProp.GetValue(response);
                serializedValue = JsonSerializer.Serialize(value);
                const int maxLogLength = 10000;
                if (serializedValue.Length > maxLogLength)
                {
                    var truncatedValue = serializedValue[..maxLogLength] + "...(truncated)";
                    _logger.LogTrace("Response: {@Response}", truncatedValue);
                }
                else
                {
                    _logger.LogTrace("Response: {@Response}", serializedValue);
                }
            }

            var auditLog = new AuditLogEntry
            {
                RequestId = executionContext.RequestId,
                RequestPath = executionContext.RequestPath,
                BatchId = executionContext.BatchId,
                Command = typeof(TRequest).Name,
                Request = JsonSerializer.Serialize(request),
                IsError = isError,
                Error = serializedError,
                Response = serializedValue,
                UserId = executionContext.UserClaims.Id,
                UserEmail = executionContext.UserClaims.Email,
                UserFirstName = executionContext.UserClaims.FirstName,
                UserLastName = executionContext.UserClaims.LastName,
                UserRoles = executionContext.UserClaims.Roles,
                UserAgent = executionContext.UserAgent
            };

            var added = await _auditRepository.AddAsync(auditLog);

            if (added is false)
                throw new ApplicationException("AuditLog could not be added (should never happen).");
        }

        stopwatch.Stop();
        
        var isExcludedFromLogging = _excludeRequestTypesFromLogging.Contains(typeof(TRequest).Name);

        if (!isExcludedFromLogging)
            _logger.LogInformation(
                "Handled {RequestTypeName} [{ElapsedSeconds}s] for {UserEmail} via {RequestPath}",
                typeof(TRequest).Name,
                stopwatch.Elapsed.TotalSeconds.ToString("F3"), executionContext.UserClaims.Email,
                executionContext.RequestPath);

        return response;
    }

    private static async Task<ExecutionContext> GetExecutionContextAsync(TRequest request)
    {
        var executionContextProperty = typeof(TRequest).GetProperty(nameof(ExecutionContext));
        if (executionContextProperty is null)
        {
            throw new ApplicationException($"All requests must be passed an {nameof(ExecutionContext)}.");
        }

        var executionContext = (ExecutionContext)executionContextProperty!.GetValue(request)!;

        var executionContextValidator = new ExecutionContextValidator();

        await executionContextValidator.ValidateAndThrowAsync(executionContext);

        return executionContext;
    }
}