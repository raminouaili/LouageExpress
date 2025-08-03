namespace LouageExpress.Api.Entities;

public record Trip(
    string Id,
    string Time,
    int Price,
    string Route,
    string Seats,
    int Duration,
    double Rating
);
