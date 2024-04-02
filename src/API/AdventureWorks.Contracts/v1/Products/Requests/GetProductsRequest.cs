using System.ComponentModel;
using System.Text.Json.Serialization;
using AdventureWorks.Contracts.v1.Common.Requests;

namespace AdventureWorks.Contracts.v1.Products.Requests;

public class GetProductsRequest : PagedRequest
{
    public string? SearchTerm { get; init; }
    
    public required OrderBy OrderBy { get; init; } = OrderBy.ProductID;
    
    
    public string? Categories { get; init; }
    
    [JsonIgnore]
    public List<int>? CategoryIds => Categories?.Split(',', StringSplitOptions.RemoveEmptyEntries)
        .Select(s => int.TryParse(s.Trim(), out int value) ? value : (int?)null)
        .Where(i => i.HasValue)
        .Select(i => i.Value)
        .ToList() ?? null;
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderBy
{
    ProductID,
    Name,
    ProductNumber,
    MakeFlag,
    FinishedGoodsFlag,
    Model,
    ProductCategory,
    ProductSubcategory,
    Color,
    SafetyStockLevel,
    ReorderPoint,
    StandardCost,
    ListPrice,
    Size,
    SizeUnitMeasureCode,
    WeightUnitMeasureCode,
    Weight,
    DaysToManufacture,
    Inventory
}