using System.Net.Mail;
using Microsoft.Data.SqlClient;

namespace AdventureWorks.Application.Common.Extensions;

public static class StringExtensions
{
    public static string Proper(this string s)
    {
        return s.First().ToString().ToUpper() + s.ToLower()[1..];
    }

    public static bool IsValidEmail(this string s)
    {
        try
        {
            var mailAddress = new MailAddress(s);
            return mailAddress.Address == s;
        }
        catch
        {
            return false;
        }
    }

    public static bool IsValidUri(this string s)
    {
        return Uri.TryCreate(s, UriKind.Absolute, out _);
    }
    
    public static bool IsValidGuid(this string s)
    {
        return Guid.TryParse(s, out _);
    }
    
    public static bool IsValidConnectionString(this string s)
    {
        try
        {
            new SqlConnectionStringBuilder(s);
            return true;
        }
        catch
        {
            return false;
        }
    }
}