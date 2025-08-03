namespace LouageExpress.Api.Entities;

public record Reservation(
    string Id,
    string TripId,
    string UserId,
    int Seats,
    DateTime CreatedAt);
