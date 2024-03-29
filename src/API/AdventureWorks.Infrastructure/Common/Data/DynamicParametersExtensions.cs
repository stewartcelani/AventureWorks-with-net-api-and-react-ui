using System.Dynamic;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using Dapper;

namespace AdventureWorks.Infrastructure.Common.Data;

public static class DynamicParametersExtensions
{
    public static string ToString(this DynamicParameters parameters)
    {
        var sb = new StringBuilder();
        foreach (var name in parameters.ParameterNames)
        {
            var pValue = parameters.Get<dynamic>(name);
            sb.AppendFormat("{0}={1}\n", name, pValue.ToString());
        }
        return sb.ToString();
    }
    
    public static object ToExpandoObject(this DynamicParameters parameters)
    {
        var obj = new ExpandoObject() as IDictionary<string, object>;
        foreach (var name in parameters.ParameterNames)
        {
            obj.Add(name, parameters.Get<dynamic>(name));
        }
        return obj;
    }
    
}