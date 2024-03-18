namespace AdventureWorks.Application.Common.Extensions;

public static class DateTimeExtensions
{
    /// <summary>
    ///     Rounds a DateTime to the nearest minute.
    /// </summary>
    /// <param name="dateTime">The DateTime to round.</param>
    /// <returns>The DateTime rounded to the nearest minute.</returns>
    public static DateTime RoundToNearestMinute(this DateTime dateTime)
    {
        return new DateTime(
            dateTime.Year,
            dateTime.Month,
            dateTime.Day,
            dateTime.Hour,
            dateTime.Minute,
            0,
            dateTime.Kind // Preserve the DateTimeKind (Local, Utc, Unspecified)
        ).AddSeconds(dateTime.Second >= 30 ? 60 : 0);
    }
    
    public static DateTime FloorToMinute(this DateTime dateTime)
    {
        return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day,
            dateTime.Hour, dateTime.Minute, 0, dateTime.Kind);
    }
}