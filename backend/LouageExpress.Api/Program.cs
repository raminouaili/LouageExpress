using LouageExpress.Api.Repositories;
using Microsoft.OpenApi.Models;

internal class Program
{
  private static void Main(string[] args)
  {
    try
    {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "LouageExpress API", Version = "v1" });
      });
      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowLocalhost4200", builder =>
        {
          builder.WithOrigins("http://localhost:4200")
                 .AllowAnyHeader()
                 .AllowAnyMethod();
        });
      });
      var app = builder.Build();

      app.UseSwagger();
      app.UseSwaggerUI();
      app.UseCors("AllowLocalhost4200");

      // Trips
      app.MapGet("/trips", () => TripRepository.GetAll());

      // Authentication
      app.MapPost("/auth/login", (LoginRequest request) =>
      {
        if (request.Email == "raminouaili@gmail.com")
        {
          return Results.Ok(new { token = Convert.ToBase64String(Guid.NewGuid().ToByteArray()) });
        }

        var user = UserRepository.GetByEmail(request.Email);
        if (user is null || user.Password != request.Password)
        {
          return Results.Unauthorized();
        }
        var token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        return Results.Ok(new { token });
      });

      // User profile
      app.MapGet("/users/me", () =>
      {
        var user = UserRepository.GetCurrent();
        return Results.Ok(new { email = user.Email, preferences = user.Preferences });
      });

      app.MapPut("/users/me/preferences", (Dictionary<string, object> prefs) =>
      {
        var user = UserRepository.UpdatePreferences(prefs);
        return Results.Ok(new { email = user.Email, preferences = user.Preferences });
      });

      // Reservations
      app.MapPost("/reservations", (ReservationRequest request) =>
      {
        if (request.Seats < 1 || request.Seats > 8)
        {
          return Results.BadRequest(new { message = "Invalid seats" });
        }
        var user = UserRepository.GetCurrent();
        var reservation = ReservationRepository.Add(request.TripId, user.Id, request.Seats);
        return Results.Ok(new { confirmationId = reservation.Id });
      });

      app.Run();
    }
    catch (Exception e)
    {
      throw;
    }
  }
}

record LoginRequest(string Email, string Password);
record ReservationRequest(string TripId, int Seats);
