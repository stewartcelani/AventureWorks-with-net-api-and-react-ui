using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Domain.Products;
using Ardalis.SmartEnum;

namespace AdventureWorks.Application.Products.Queries.GetProducts;

public class GetProductsFilter : PagedFilter
{
    public string? SearchTerm { get; init; }
    public GetProductsFilterOrderBy OrderBy { get; init; } = GetProductsFilterOrderBy.ProductID;
    public bool IncludeTotalCount { get; init; } = false;
    public int? ProductID { get; init; }
    public List<int>? CategoryIDs { get; init; } = null;

}

public class GetProductsFilterOrderBy(string name, string value)
    : SmartEnum<GetProductsFilterOrderBy, string>(name, value)
{
    public static readonly GetProductsFilterOrderBy ProductID = new(nameof(Product.ProductID), "P.ProductID");
    public static readonly GetProductsFilterOrderBy Name = new(nameof(Product.Name), "P.Name");
    public static readonly GetProductsFilterOrderBy ProductNumber = new(nameof(Product.ProductNumber), "P.ProductNumber");
    public static readonly GetProductsFilterOrderBy MakeFlag = new(nameof(Product.MakeFlag), "P.MakeFlag");
    public static readonly GetProductsFilterOrderBy FinishedGoodsFlag = new(nameof(Product.FinishedGoodsFlag), "P.FinishedGoodsFlag");
    public static readonly GetProductsFilterOrderBy Model = new(nameof(Product.Model), "PM.Name");
    public static readonly GetProductsFilterOrderBy ProductCategory = new(nameof(Product.ProductCategory), "PC.Name");
    public static readonly GetProductsFilterOrderBy ProductSubcategory = new(nameof(Product.ProductSubcategory), "PSC.Name");
    public static readonly GetProductsFilterOrderBy Color = new(nameof(Product.Color), "P.Color");
    public static readonly GetProductsFilterOrderBy SafetyStockLevel = new(nameof(Product.SafetyStockLevel), "P.SafetyStockLevel");
    public static readonly GetProductsFilterOrderBy ReorderPoint = new(nameof(Product.ReorderPoint), "P.ReorderPoint");
    public static readonly GetProductsFilterOrderBy Inventory = new(nameof(Product.Inventory), "(SELECT SUM(Quantity) FROM Production.ProductInventory WHERE ProductID = P.ProductID)");
    public static readonly GetProductsFilterOrderBy StandardCost = new(nameof(Product.StandardCost), "P.StandardCost");
    public static readonly GetProductsFilterOrderBy ListPrice = new(nameof(Product.ListPrice), "P.ListPrice");
    public static readonly GetProductsFilterOrderBy Size = new(nameof(Product.Size), "P.Size");
    public static readonly GetProductsFilterOrderBy SizeUnitMeasureCode = new(nameof(Product.SizeUnitMeasureCode), "P.SizeUnitMeasureCode");
    public static readonly GetProductsFilterOrderBy WeightUnitMeasureCode = new(nameof(Product.WeightUnitMeasureCode), "P.WeightUnitMeasureCode");
    public static readonly GetProductsFilterOrderBy Weight = new(nameof(Product.Weight), "P.Weight");
    public static readonly GetProductsFilterOrderBy DaysToManufacture = new(nameof(Product.DaysToManufacture), "P.DaysToManufacture");
}