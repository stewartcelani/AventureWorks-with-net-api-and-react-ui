namespace AdventureWorks.Domain.Products;

public class Product
{
    public required int ProductID { get; init; }
    public required string Name { get; init; }
    public required string ProductNumber { get; init; }
    public required bool MakeFlag { get; init; }
    public required bool FinishedGoodsFlag { get; init; }
    public required string Model { get; init; }
    public required string ProductCategory { get; init; }
    public required string ProductSubcategory { get; init; }
    public required string Color { get; init; }
    public required short SafetyStockLevel { get; init; }
    public required short ReorderPoint { get; init; }
    public required int Inventory { get; init; }
    public required decimal StandardCost { get; init; }
    public required decimal ListPrice { get; init; }
    public required string Size { get; init; }
    public required string SizeUnitMeasureCode { get; init; }
    public required string WeightUnitMeasureCode { get; init; }
    public required double Weight { get; init; }
    public required int DaysToManufacture { get; init; }
}