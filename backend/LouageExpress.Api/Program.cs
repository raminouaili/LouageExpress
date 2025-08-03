using LouageExpress.Api.Repositories;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/trips", () => TripRepository.GetAll());

app.Run();
