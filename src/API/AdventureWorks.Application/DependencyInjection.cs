using AdventureWorks.Application.Common.Pipelines;
using AdventureWorks.Domain;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AdventureWorks.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddValidatorsFromAssemblyContaining<IApplicationMarker>();
        services.AddValidatorsFromAssemblyContaining<IDomainMarker>();

        services.AddMediatR(options => { options.RegisterServicesFromAssemblyContaining(typeof(DependencyInjection)); })
            .AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        // TODO: Add ExecutionContext pipeline behaviour

        return services;
    }
}