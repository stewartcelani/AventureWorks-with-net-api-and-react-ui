namespace AdventureWorks.Application.Common.Extensions;

public static class MathExtensions
{
    public static decimal ToMegabytes(this long i)
    {
        return (decimal)Math.Round(i / 1024f / 1024f, 4);
    }
}