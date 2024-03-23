namespace AdventureWorks.Application.Common.Domain;

public class GetManyQueryResponse<T>
{
    public required List<T> Items { get; init; }
    public int? TotalCount { get; set; }
}