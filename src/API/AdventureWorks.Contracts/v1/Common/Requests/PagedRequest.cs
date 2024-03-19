namespace AdventureWorks.Contracts.v1.Common.Requests;

public class PagedRequest
{
    public int Page { get; init; } = 1;

    public int PageSize { get; init; } = 10;

    public bool IncludeTotalCount { get; init; } = true;

    public OrderByOperator OrderByOperator { get; init; } = OrderByOperator.ASC;


    public virtual string QueryString
    {
        get
        {
            var props = new List<string>
            {
                $"page={Page}",
                $"pageSize={PageSize}",
                $"includeTotalCount={IncludeTotalCount.ToString()}",
                $"orderByOperator={OrderByOperator.ToString()}"
            };

            return "?" + string.Join("&", props);
        }
    }
}