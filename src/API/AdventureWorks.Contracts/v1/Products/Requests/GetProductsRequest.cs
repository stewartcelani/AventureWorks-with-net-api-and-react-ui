using System.Text.Json.Serialization;
using AdventureWorks.Contracts.v1.Common.Requests;

namespace AdventureWorks.Contracts.v1.Products.Requests;

public class GetProductsRequest : PagedRequest
{
    public string? SearchTerm { get; init; }
    public required OrderBy OrderBy { get; set; } = OrderBy.ProductID;
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
    DaysToManufacture
}