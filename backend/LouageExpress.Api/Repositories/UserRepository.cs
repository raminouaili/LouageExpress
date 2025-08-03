using LouageExpress.Api.Entities;

namespace LouageExpress.Api.Repositories;

public static class UserRepository
{
    private static readonly User DemoUser = new(
        "1",
        "demo@louage-express.tn",
        "password",
        new()
    );

    public static User? GetByEmail(string email) =>
        email.Equals(DemoUser.Email, StringComparison.OrdinalIgnoreCase) ? DemoUser : null;

    public static User GetCurrent() => DemoUser;

    public static User UpdatePreferences(Dictionary<string, object> prefs)
    {
        foreach (var kvp in prefs)
        {
            DemoUser.Preferences[kvp.Key] = kvp.Value!;
        }
        return DemoUser;
    }
}
