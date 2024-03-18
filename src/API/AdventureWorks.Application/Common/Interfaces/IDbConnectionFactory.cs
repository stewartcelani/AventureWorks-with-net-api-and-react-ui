using DataAbstractions.Dapper;

namespace AdventureWorks.Application.Common.Interfaces;

public interface IDbConnectionFactory
{
    IDataAccessor CreateConnection(string connectionString);
}