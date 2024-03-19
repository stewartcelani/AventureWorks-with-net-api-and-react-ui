FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AdventureWorks.API/AdventureWorks.API.csproj", "AdventureWorks.API/"]
COPY ["AdventureWorks.Contracts/AdventureWorks.Contracts.csproj", "AdventureWorks.Contracts/"]
COPY ["AdventureWorks.Domain/AdventureWorks.Domain.csproj", "AdventureWorks.Domain/"]
COPY ["AdventureWorks.Application/AdventureWorks.Application.csproj", "AdventureWorks.Application/"]
COPY ["AdventureWorks.Infrastructure/AdventureWorks.Infrastructure.csproj", "AdventureWorks.Infrastructure/"]
RUN dotnet restore "AdventureWorks.API/AdventureWorks.API.csproj"
COPY . .
WORKDIR "/src/AdventureWorks.API"
RUN dotnet build "AdventureWorks.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "AdventureWorks.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AdventureWorks.API.dll"]
