namespace AdventureWorks.Application.Common.Helpers;

public static class CronExpressionHelper
{
    public static string EverySeconds(int seconds)
    {
        ThrowIfOutOfRange(seconds);
        return $"*/{seconds} * * * * *";
    }

    public static string EveryMinutes(int minutes)
    {
        ThrowIfOutOfRange(minutes);
        return $"0 */{minutes} * * * *";
    }

    public static string EveryHours(int hours)
    {
        ThrowIfOutOfRange(hours);
        return $"0 0 */{hours} * * *";
    }

    public static string EveryDays(int days)
    {
        ThrowIfOutOfRange(days);
        return $"0 0 0 */{days} * *";
    }

    private static void ThrowIfOutOfRange(int n)
    {
        if (n is < 1 or > 59) throw new ArgumentOutOfRangeException(nameof(n), n, "Valid range: 1-59");
    }
}