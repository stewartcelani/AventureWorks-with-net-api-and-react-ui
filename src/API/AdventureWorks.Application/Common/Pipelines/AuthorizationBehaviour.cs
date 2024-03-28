using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace AdventureWorks.Application.Common.Pipelines;

public class AuthorizationBehaviour<TRequest, TResponse>(
    ExecutionContextValidator executionContextValidator)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly ExecutionContextValidator _executionContextValidator = executionContextValidator;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        // Check if the request handler has the [Authorize] attribute
        var authorizeAttributes = request.GetType().GetCustomAttributes(typeof(AuthorizeAttribute), true);
        if (!authorizeAttributes.Any())
        {
            return await next(); // Continue with the request pipeline
        }

        var executionContext = await GetExecutionContextAsync(request);
        
        // Check if any roles were specified on the [Authorize] attribute
        var authorizeAttribute = (AuthorizeAttribute)authorizeAttributes.First();
        var requiredRoles = authorizeAttribute.Roles?.Split(',').Select(r => r.Trim()).ToList();

        if (requiredRoles != null && requiredRoles.Count != 0)
        {
            if (!requiredRoles.All(role =>executionContext.UserClaims.HasRole(role)))
            {
                throw new UnauthorizedAccessException("User does not have the required roles.");
            }
        }
        
        return await next();
    }
    
    private async Task<ExecutionContext> GetExecutionContextAsync(TRequest request)
    {
        var executionContextProperty = typeof(TRequest).GetProperty(nameof(ExecutionContext));
        if (executionContextProperty is null)
        {
            throw new ApplicationException($"All requests must be passed an {nameof(ExecutionContext)}.");
        }

        var executionContext = (ExecutionContext)executionContextProperty!.GetValue(request)!;

        var validationResult = await _executionContextValidator.ValidateAsync(executionContext);

        if (!validationResult.IsValid)
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        return executionContext;
    }
}