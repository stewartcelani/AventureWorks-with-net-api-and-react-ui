namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public static class GetEmployeesFilterExtensions
{
    public static string BuildGetQuery(this GetEmployeesFilter filter)
    {
        var getQuery = $@"
            {SelectQuery}
            {FromQuery}
            {filter.BuildWhereQuery()}
            ORDER BY E.BusinessEntityID
            OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
        return getQuery;
    }
    
    public static string BuildCountQuery(this GetEmployeesFilter filter)
    {
        var countQuery = $@"
            SELECT COUNT(*)
            {FromQuery}
            {filter.BuildWhereQuery()}";
        return countQuery;
    }
    
    private static string SelectQuery = @"
        SELECT 
            E.BusinessEntityID,
            E.NationalIDNumber,
            E.LoginID,
            P.FirstName,
            P.MiddleName,
            P.LastName,
            E.JobTitle,
            E.BirthDate,
            E.MaritalStatus,
            E.Gender,
            E.HireDate,
            E.SalariedFlag,
            E.VacationHours,
            E.SickLeaveHours,
            E.CurrentFlag,
            D.DepartmentID,
            D.Name as DepartmentName,
            D.GroupName as DepartmentGroupName";
    
    private static string FromQuery = @"
        FROM HumanResources.Employee E
        INNER JOIN HumanResources.EmployeeDepartmentHistory EDH ON E.BusinessEntityID = EDH.BusinessEntityID AND EDH.EndDate IS NULL
        INNER JOIN HumanResources.Department D ON EDH.DepartmentID = D.DepartmentID
        INNER JOIN Person.Person P ON E.BusinessEntityID = P.BusinessEntityID";
    

    private static string BuildWhereQuery(this GetEmployeesFilter filter)
    {
        var whereQuery = "WHERE 1 = 1 ";
        
        if (filter.BusinessEntityID.HasValue)
        {
            whereQuery += "AND E.BusinessEntityID = @BusinessEntityID ";
        }
        else if (!string.IsNullOrWhiteSpace(filter.NationalIDNumber))
        {
            whereQuery += "AND E.NationalIDNumber = @NationalIDNumber ";
        }
        
        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            whereQuery += @"AND (E.LoginID LIKE @SearchTerm 
                                    OR CONCAT(P.FirstName, ' ', P.LastName) LIKE @SearchTerm                                    
                                    OR D.Name LIKE @SearchTerm 
                                    OR D.GroupName LIKE @SearchTerm 
                                    OR E.JobTitle LIKE @SearchTerm) ";
        }

        return whereQuery;
    }
    
    
}