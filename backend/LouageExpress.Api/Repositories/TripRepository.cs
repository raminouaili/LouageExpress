using LouageExpress.Api.Entities;

namespace LouageExpress.Api.Repositories;

public static class TripRepository
{
    private static readonly List<Trip> Trips = new()
    {
        new("1", "08 h 30", 18, "Tunis → Sfax", "6/8 seats", 195, 4.8),
        new("2", "09 h 00", 19, "Tunis → Sfax", "5/8 seats", 200, 4.5),
        new("3", "10 h 00", 20, "Tunis → Sfax", "7/8 seats", 210, 4.2)
    };

    public static IEnumerable<Trip> GetAll() => Trips;
}
