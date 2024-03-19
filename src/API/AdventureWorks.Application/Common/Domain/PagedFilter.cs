namespace AdventureWorks.Application.Common.Domain;

public class PagedFilter
{
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 10;
    public OrderByOperator OrderByOperator { get; init; } = OrderByOperator.Ascending;

    
    public int Offset => (Page - 1) * PageSize;
    
}