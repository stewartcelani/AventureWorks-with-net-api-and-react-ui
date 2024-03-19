using System.Text.Json.Serialization;

namespace AdventureWorks.Contracts.v1.Common.Responses;

public class PagedResponse<TResponse>
{
    [JsonPropertyOrder(1)]
    public required int Page { get; init; }
    
    [JsonPropertyOrder(2)]
    public required int PageSize { get; init; }
    
    [JsonPropertyOrder(3)]
    public required int? TotalCount { get; init; }
    

    [JsonPropertyOrder(9)]
    public bool? HasNextPage => TotalCount is null ? null : TotalCount > (Page * PageSize);
    
    [JsonPropertyOrder(10)]

    public required IEnumerable<TResponse> Items { get; init; } = Enumerable.Empty<TResponse>();
}