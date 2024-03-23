namespace AdventureWorks.Application.Products.Queries.GetProducts;

public static class GetProductsFilterExtensions
{
    public static string BuildGetQuery(this GetProductsFilter filter)
    {
        var getQuery = $@"
            {SelectQuery}
            {FromQuery}
            {filter.BuildWhereQuery()}
            ORDER BY P.ProductID
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
        return getQuery;
    }
    
    public static string BuildCountQuery(this GetProductsFilter filter)
    {
        var countQuery = $@"
            SELECT COUNT(*)
            {FromQuery}
            {filter.BuildWhereQuery()}";
        return countQuery;
    }
    
    private static string SelectQuery = @"
        SELECT
            P.ProductID,
            P.Name,
            P.ProductNumber,
            P.MakeFlag,
            P.FinishedGoodsFlag,
            COALESCE(PM.Name, 'N/A') as Model,	
            COALESCE(PC.Name, 'Parts') as ProductCategory,
            COALESCE(PSC.Name, 'Parts') as ProductSubcategory,
            COALESCE(P.Color,'') as Color,
            P.SafetyStockLevel,
            P.ReorderPoint,
	        COALESCE((SELECT SUM(Quantity) FROM Production.ProductInventory WHERE ProductID = P.ProductID),0) AS Inventory,
            P.StandardCost,
            P.ListPrice,
            COALESCE(P.Size,'') as Size,
            COALESCE(P.SizeUnitMeasureCode,'') as SizeUnitMeasureCode,
            COALESCE(P.WeightUnitMeasureCode,'') as WeightUnitMeasureCode,
            COALESCE(P.Weight,0) as Weight,
            P.DaysToManufacture";
    
    private static string FromQuery = @"
        FROM Production.Product P
        LEFT JOIN Production.ProductModel PM ON PM.ProductModelID = P.ProductModelID
        LEFT JOIN Production.ProductSubcategory PSC ON PSC.ProductSubcategoryID = P.ProductSubcategoryID
        LEFT JOIN Production.ProductCategory PC ON PC.ProductCategoryID = PSC.ProductCategoryID
        LEFT JOIN Purchasing.ProductVendor PV ON PV.ProductID = P.ProductID";
    

    private static string BuildWhereQuery(this GetProductsFilter filter)
    {
        var whereQuery = "WHERE 1 = 1 ";
        
        if (filter.ProductID.HasValue)
        {
            whereQuery += "AND P.ProductID = @ProductID ";
        }
        
        return whereQuery;
    }
}