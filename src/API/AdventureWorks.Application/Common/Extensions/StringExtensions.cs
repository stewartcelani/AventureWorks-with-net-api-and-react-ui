using System.Net.Mail;

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

    public static bool IsValidUri(this string str)
    {
        return Uri.TryCreate(str, UriKind.Absolute, out _);
    }
    
    public static bool IsValidGuid(this string str)
    {
        return Guid.TryParse(str, out _);
    }
}