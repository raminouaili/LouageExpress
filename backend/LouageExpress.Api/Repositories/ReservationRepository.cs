using LouageExpress.Api.Entities;

namespace LouageExpress.Api.Repositories;

public static class ReservationRepository
{
    private static readonly List<Reservation> Reservations = new();

    public static Reservation Add(string tripId, string userId, int seats)
    {
        var reservation = new Reservation(
            Guid.NewGuid().ToString(),
            tripId,
            userId,
            seats,
            DateTime.UtcNow
        );

        Reservations.Add(reservation);
        return reservation;
    }

    public static IEnumerable<Reservation> GetAll() => Reservations;
}
