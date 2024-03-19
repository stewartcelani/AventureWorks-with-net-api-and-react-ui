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
        JOIN HumanResources.EmployeeDepartmentHistory EDH ON E.BusinessEntityID = EDH.BusinessEntityID
        JOIN HumanResources.Department D ON EDH.DepartmentID = D.DepartmentID";
    

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

        return whereQuery;
    }
    
    
}