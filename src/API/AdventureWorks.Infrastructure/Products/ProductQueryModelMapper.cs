using AdventureWorks.Domain.Products;

namespace AdventureWorks.Infrastructure.Products;

public static class ProductQueryModelMapper
{
    public static Product ToProduct(this ProductQueryModel queryModel)
    {
        return new Product
        {
            ProductID = queryModel.ProductID,
            Name = queryModel.Name,
            ProductNumber = queryModel.ProductNumber,
            MakeFlag = queryModel.MakeFlag,
            FinishedGoodsFlag = queryModel.FinishedGoodsFlag,
            Model = queryModel.Model,
            ProductCategory = queryModel.ProductCategory,
            ProductSubcategory = queryModel.ProductSubcategory,
            Color = queryModel.Color,
            SafetyStockLevel = queryModel.SafetyStockLevel,
            ReorderPoint = queryModel.ReorderPoint,
            Inventory = queryModel.Inventory,
            StandardCost = queryModel.StandardCost,
            ListPrice = queryModel.ListPrice,
            Size = queryModel.Size,
            SizeUnitMeasureCode = queryModel.SizeUnitMeasureCode,
            WeightUnitMeasureCode = queryModel.WeightUnitMeasureCode,
            Weight = queryModel.Weight,
            DaysToManufacture = queryModel.DaysToManufacture
        };
    }
}