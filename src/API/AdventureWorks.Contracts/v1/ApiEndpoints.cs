namespace AdventureWorks.Contracts.v1;

public static class ApiEndpoints
{
    private const string Root = "api";
    private const string Version = "v1";
    private const string Base = $"/{Root}/{Version}";

    public static class Weather
    {
        public static class GetWeatherForecast
        {
            public const string Url = Base + "/weather";
        }
    }
}