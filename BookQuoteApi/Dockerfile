# # ---------- BUILD ----------
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /app

# COPY BookQuoteApi.csproj ./
# RUN dotnet restore

# COPY . ./
# RUN dotnet publish -c Release -o /out

# # ---------- RUNTIME ----------
# FROM mcr.microsoft.com/dotnet/aspnet:9.0
# WORKDIR /app

# COPY --from=build /out ./

# ENV ASPNETCORE_URLS=http://0.0.0.0:8080
# EXPOSE 8080

# ENTRYPOINT ["dotnet", "BookQuoteApi.dll"]


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["BookQuoteApi.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookQuoteApi.dll"]