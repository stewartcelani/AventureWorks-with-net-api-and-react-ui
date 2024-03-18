namespace AdventureWorks.Application.Common.Helpers;

public static class ListHelper
{
    public static IEnumerable<List<T>> SplitList<T>(List<T> items, int size)
    {
        for (var i = 0; i < items.Count; i += size) yield return items.GetRange(i, Math.Min(size, items.Count - i));
    }
}