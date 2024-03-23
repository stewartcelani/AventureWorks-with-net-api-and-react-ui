namespace AdventureWorks.Domain.Authentication;

public static class AuthConstants
{
    public static class Roles
    {
        public static class Employees
        {
            public const string Read = "Employees.Read";
            public const string Write = "Employees.Write";
        }
        
        public static class Products
        {
            public const string Read = "Products.Read";
            public const string Write = "Products.Write";
        }
        
        public const string Administrator = "Administrator";
        public const string Developer = "Developer";
        
    }    
}