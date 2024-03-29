using System.Data;
using AdventureWorks.Domain.Employees;
using Dapper;

namespace AdventureWorks.Infrastructure.Common.Data;

public class MartialStatusTypeHandler : SqlMapper.TypeHandler<MartialStatus>
{
    public override void SetValue(IDbDataParameter parameter, MartialStatus value)
    {
        parameter.Value = value.Value;
    }

    public override MartialStatus Parse(object value)
    {
        return MartialStatus.FromValue((string)value);
    }
}