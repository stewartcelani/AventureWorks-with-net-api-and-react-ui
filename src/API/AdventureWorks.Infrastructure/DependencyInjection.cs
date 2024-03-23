using AdventureWorks.Application.Common.Helpers;
using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Logging;
using AdventureWorks.Application.Common.Settings;
using AdventureWorks.Infrastructure.Common.Data;
using AdventureWorks.Infrastructure.Employees;
using AdventureWorks.Infrastructure.Products;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Debugging;

namespace AdventureWorks.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Logging
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            .Enrich.FromLogContext()
            .CreateLogger();

        SelfLog.Enable(Console.Error);
        services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.ClearProviders();
            loggingBuilder.AddSerilog(Log.Logger);
        });
        services.AddSingleton(typeof(ILoggerAdapter<>), typeof(LoggerAdapter<>));

        // Add any Fluent Validation validators
        services.AddValidatorsFromAssemblyContaining<IInfrastructureMarker>();
        
        // Azure AD Settings
        var azureAdSettings = SettingsBinder.BindAndValidate<AzureAdSettings, AzureAdSettingsValidator>(configuration);
        services.AddSingleton(azureAdSettings);
        
        // Connection Strings
        var connectionStrings = SettingsBinder.BindAndValidate<ConnectionStrings, ConnectionStringsValidator>(configuration);
        services.AddSingleton(connectionStrings);
        
        // Dapper wrapper
        services.AddTransient<IDbConnectionFactory, SqlDbConnectionFactory>();
        
        // Repositories
        services.AddTransient<IEmployeeRepository, EmployeeRepository>();
        services.AddTransient<IProductRepository, ProductRepository>();
        
        return services;
    }
}