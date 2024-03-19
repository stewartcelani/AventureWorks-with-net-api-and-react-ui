namespace AdventureWorks.Contracts.v1;

public static class ApiEndpoints
{
    private const string Root = "api";
    private const string Version = "v1";
    private const string Base = $"/{Root}/{Version}";

    public static class Employees
    {
        public static class GetEmployeeByBusinessEntityId
        {
            public const string Url = Base + "/employees/{businessEntityId}";
            public static string UrlFor(int businessEntityId) => Url.Replace("{businessEntityId}", businessEntityId.ToString());
        }
        
        public static class GetEmployeeByNationalIdNumber
        {
            public const string Url = Base + "/employees/by-national-id/{nationalIdNumber}";
            public static string UrlFor(string nationalIdNumber) => Url.Replace("{nationalIdNumber}", nationalIdNumber);
        }
        
        public static class GetEmployees
        {
            public const string Url = Base + "/employees";
        }
    }
}