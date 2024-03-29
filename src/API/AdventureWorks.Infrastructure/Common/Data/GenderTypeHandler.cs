using System.Data;
using AdventureWorks.Domain.Employees;
using Dapper;

namespace AdventureWorks.Infrastructure.Common.Data;

public class GenderTypeHandler : SqlMapper.TypeHandler<Gender>
{
    public override void SetValue(IDbDataParameter parameter, Gender value)
    {
        parameter.Value = value.Value;
    }

    public override Gender Parse(object value)
    {
        return Gender.FromValue((string)value);
    }
}