using AdventureWorks.Application.Common.Interfaces;
using DataAbstractions.Dapper;
using Microsoft.Data.SqlClient;

namespace AdventureWorks.Infrastructure.Common.Data;

public class SqlDbConnectionFactory : IDbConnectionFactory
{
    public IDataAccessor CreateConnection(string connectionString)
    {
        return new DataAccessor(new SqlConnection(connectionString));
    }
}