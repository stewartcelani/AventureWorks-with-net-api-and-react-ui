using System.Globalization;
using AdventureWorks.API;
using AdventureWorks.Application;
using AdventureWorks.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.Identity.Web;
using Serilog;

var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ??
                      throw new NullReferenceException("ASPNETCORE_ENVIRONMENT is null");


var configurationBuilder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", false, true)
    .AddJsonFile("appsettings.secret.json", false, true) // So I can commit other files to repo and put real secrets in this file
    .AddJsonFile($"appsettings.{environmentName}.json", true, true);

var configuration = configurationBuilder.Build();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddConfiguration(configuration);

builder.Services.AddApplication(configuration);
builder.Services.AddInfrastructure(configuration);
builder.Services.AddApi(configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} 
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Log.Information("Architecture: {Architecture}", IntPtr.Size == 4 ? "x86" : "x64");
Log.Information("Environment: {Environment}", builder.Environment.EnvironmentName);

app.Run();