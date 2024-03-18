using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text;

namespace AdventureWorks.Application.Common.Helpers;

[SuppressMessage("Interoperability", "CA1416:Validate platform compatibility")]
public static class DpapiHelper
{
    public static string Encrypt(string data, DataProtectionScope scope)
    {
        var dataBytes = Encoding.UTF8.GetBytes(data);
        var encryptedBytes = ProtectedData.Protect(dataBytes, null, scope);
        return Convert.ToBase64String(encryptedBytes);
    }

    public static string Decrypt(string encryptedData, DataProtectionScope scope)
    {
        var encryptedBytes = Convert.FromBase64String(encryptedData);
        var decryptedBytes = ProtectedData.Unprotect(encryptedBytes, null, scope);
        return Encoding.UTF8.GetString(decryptedBytes);
    }
}