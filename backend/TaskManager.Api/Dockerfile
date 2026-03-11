FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["TaskManager.Api.csproj", "./"]
RUN dotnet restore "TaskManager.Api.csproj"

COPY . .
RUN dotnet publish "TaskManager.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .
EXPOSE 8080

ENTRYPOINT ["dotnet", "TaskManager.Api.dll"]