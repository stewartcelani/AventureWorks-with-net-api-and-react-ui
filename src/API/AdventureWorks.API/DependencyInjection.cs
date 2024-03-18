using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace AdventureWorks.API;

public static class DependencyInjection
{
    public static IServiceCollection AddApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddValidatorsFromAssemblyContaining<IApiMarker>();

        // Framework services
        services.AddHttpContextAccessor();
        services.AddControllers();

        // Authentication and Authorization        
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(configuration.GetRequiredSection("AzureAdSettings"))
            .EnableTokenAcquisitionToCallDownstreamApi()
            .AddInMemoryTokenCaches();

       
        // CORS and Swagger
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.WithOrigins(
                        "http://localhost:5173"
                    );
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                });
        });
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }
}