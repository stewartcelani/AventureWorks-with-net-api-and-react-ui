using AdventureWorks.Contracts.v1.Products.Responses;
using AdventureWorks.Domain.Products;

namespace AdventureWorks.API.Mappers;

public static class ProductMapper
{
    public static ProductResponse ToProductResponse(this Product product)
    {
        return new ProductResponse
        {
            ProductID = product.ProductID,
            Name = product.Name,
            ProductNumber = product.ProductNumber,
            MakeFlag = product.MakeFlag,
            FinishedGoodsFlag = product.FinishedGoodsFlag,
            Model = product.Model,
            ProductCategory = product.ProductCategory,
            ProductSubcategory = product.ProductSubcategory,
            Color = product.Color,
            SafetyStockLevel = product.SafetyStockLevel,
            ReorderPoint = product.ReorderPoint,
            Inventory = product.Inventory,
            StandardCost = product.StandardCost,
            ListPrice = product.ListPrice,
            Size = product.Size,
            SizeUnitMeasureCode = product.SizeUnitMeasureCode,
            WeightUnitMeasureCode = product.WeightUnitMeasureCode,
            Weight = product.Weight,
            DaysToManufacture = product.DaysToManufacture
        };
    }
    
}