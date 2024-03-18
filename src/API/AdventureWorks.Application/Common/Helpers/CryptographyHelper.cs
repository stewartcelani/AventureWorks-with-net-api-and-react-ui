using System.Security.Cryptography;
using System.Text;

namespace AdventureWorks.Application.Common.Helpers;

public static class CryptographyHelper
{
    public static string GenerateSha256Hash(string input)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(input));

        var builder = new StringBuilder();
        foreach (var t in bytes) builder.Append(t.ToString("x2"));

        return builder.ToString();
    }
}