namespace AdventureWorks.Contracts.v1;

public static class ApiEndpoints
{
    private const string Root = "api";
    private const string Version = "v1";
    private const string Base = $"/{Root}/{Version}";

    public static class Employees
    {
        public const string EmployeesBase = Base + "/employees";
        
        public static class GetEmployeeByBusinessEntityId
        {
            public const string Url = EmployeesBase + "/{businessEntityId}";
            public static string UrlFor(int businessEntityId) => Url.Replace("{businessEntityId}", businessEntityId.ToString());
        }
        
        public static class GetEmployeeByNationalIdNumber
        {
            public const string Url = EmployeesBase + "/by-national-id/{nationalIdNumber}";
            public static string UrlFor(string nationalIdNumber) => Url.Replace("{nationalIdNumber}", nationalIdNumber);
        }
        
        public static class GetEmployees
        {
            public const string Url = EmployeesBase;
        }
    }
    
    public static class Products
    {
        public const string ProductsBase = Base + "/products";
        
        public static class GetProductById
        {
            public const string Url = ProductsBase + "/{productId}";
            public static string UrlFor(int productId) => Url.Replace("{productId}", productId.ToString());
        }
        
        public static class GetProducts
        {
            public const string Url = ProductsBase;
        }
    }
  

    public static class Users
    {
        public static class Me
        {
            public const string Url = Base + "/users/me";
        }
    }
}