namespace LouageExpress.Api.Entities;

public record User(
    string Id,
    string Email,
    string Password,
    Dictionary<string, object> Preferences);
