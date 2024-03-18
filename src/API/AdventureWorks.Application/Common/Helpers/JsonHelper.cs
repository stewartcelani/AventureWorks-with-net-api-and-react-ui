using System.Text.Json;

namespace AdventureWorks.Application.Common.Helpers;

public static class JsonHelper
{
    private static readonly JsonSerializerOptions DefaultOptions = new();

    public static async Task DumpAsJsonAsync<T>(T data, string filePath, JsonSerializerOptions? options = null)
    {
        if (string.IsNullOrWhiteSpace(filePath))
            throw new ArgumentException("File path must not be null or whitespace.", nameof(filePath));

        options ??= DefaultOptions;

        await using var stream = File.Create(filePath);
        await JsonSerializer.SerializeAsync(stream, data, options);
    }

    public static async Task<T> LoadFromJsonAsync<T>(string filePath, JsonSerializerOptions? options = null)
    {
        if (string.IsNullOrWhiteSpace(filePath))
            throw new ArgumentException("File path must not be null or whitespace.", nameof(filePath));

        if (!File.Exists(filePath)) throw new FileNotFoundException($"The file '{filePath}' was not found.");

        options ??= DefaultOptions;

        await using var stream = File.OpenRead(filePath);
        var result = await JsonSerializer.DeserializeAsync<T>(stream, options);
        return result ?? throw new InvalidOperationException($"Failed to deserialize the file '{filePath}'.");
    }
}