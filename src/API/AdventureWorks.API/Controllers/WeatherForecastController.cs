using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Contracts.v1;
using AdventureWorks.Domain.Authentication;
using AdventureWorks.Domain.Weather;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace AdventureWorks.API.Controllers;

[ApiController]
[Authorize(Roles = AuthConstants.Roles.Weather.Read)]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAdSettings:Scopes")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILoggerAdapter<WeatherForecastController> _logger;

    public WeatherForecastController(ILoggerAdapter<WeatherForecastController> logger)
    {
        _logger = logger;
    }


    [Authorize(Roles = AuthConstants.Roles.Weather.Read)]
    [HttpGet(ApiEndpoints.Weather.GetWeatherForecast.Url, Name = nameof(GetWeatherForecast))]
    public IEnumerable<WeatherForecast> GetWeatherForecast()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
    }
}