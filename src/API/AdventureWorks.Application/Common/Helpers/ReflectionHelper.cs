using System.Reflection;

namespace AdventureWorks.Application.Common.Helpers;

public static class ReflectionHelper
{
    public static List<Type> GetConcreteTypesInAssembly<T>(Assembly assembly)
    {
        return assembly.ExportedTypes
            .Where(x => typeof(T).IsAssignableFrom(x) && x is { IsInterface: false, IsAbstract: false })
            .ToList();
    }

    public static string GetExecutingAssemblyName()
    {
        return Assembly.GetExecutingAssembly().GetName().Name ?? string.Empty;
    }

    public static string GetNameOfAssemblyContaining<T>()
    {
        return Assembly.GetAssembly(typeof(T))?.GetName().Name ?? string.Empty;
    }

    public static string GetVersionOfAssemblyContaining<T>()
    {
        return Assembly.GetAssembly(typeof(T))?.GetName().Version?.ToString() ?? string.Empty;
    }

    public static string GetRequestPath<T>(T instance)
    {
        if (instance == null) throw new ArgumentNullException(nameof(instance));
        var type = instance.GetType();
        return $"{type.FullName}, {type.Assembly.GetName().Name}";
    }
}