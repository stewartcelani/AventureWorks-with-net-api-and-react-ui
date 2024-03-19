using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Settings;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Domain.Employees;
using Dapper;

namespace AdventureWorks.Infrastructure.Employees;

public class EmployeeRepository(ConnectionStrings connectionStrings, IDbConnectionFactory dbConnectionFactory)
    : IEmployeeRepository
{
    private readonly ConnectionStrings _connectionStrings = connectionStrings ?? throw new ArgumentNullException(nameof(connectionStrings));
    private readonly IDbConnectionFactory _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));

    #region Public Methods

    public async Task<Employee?> GetEmployeeAsync(int businessEntityId, CancellationToken cancellationToken)
    {
        var filter = new GetEmployeesFilter
        {
            BusinessEntityID = businessEntityId,
            Page = 1,
            PageSize = 2
        };
        var query = filter.BuildGetQuery();
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var employee =
            await connection.QuerySingleOrDefaultAsync<EmployeeQueryModel>(
                new CommandDefinition(query, filter, cancellationToken: cancellationToken));
        return employee?.ToEmployee();
    }

    public async Task<Employee?> GetEmployeeAsync(string nationalIdNumber, CancellationToken cancellationToken)
    {
        var filter = new GetEmployeesFilter
        {
            NationalIDNumber = nationalIdNumber,
            Page = 1,
            PageSize = 2
        };
        var query = filter.BuildGetQuery();
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var employee =
            await connection.QuerySingleOrDefaultAsync<EmployeeQueryModel>(
                new CommandDefinition(query, filter, cancellationToken: cancellationToken));
        return employee?.ToEmployee();
    }

    public async Task<GetEmployeesQueryResponse> GetEmployeesAsync(GetEmployeesFilter filter,
        CancellationToken cancellationToken)
    {
        var getQuery = filter.BuildGetQuery();
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var employeeQueryModels =
            await connection.QueryAsync<EmployeeQueryModel>(new CommandDefinition(getQuery, filter,
                cancellationToken: cancellationToken));
        var employees = employeeQueryModels.Select(x => x.ToEmployee()).ToList();
        var response = new GetEmployeesQueryResponse
        {
            Employees = employees,
            TotalCount = null
        };
        if (!filter.IncludeTotalCount) return response;
        response.TotalCount = employees.Count;
        if (response.TotalCount >= filter.PageSize ||
            filter.Page > 1) // We don't need to hit the database again if we already know the total count
        {
            var countQuery = filter.BuildCountQuery();
            response.TotalCount =
                await connection.ExecuteScalarAsync<int>(new CommandDefinition(countQuery, filter,
                    cancellationToken: cancellationToken));
        }

        return response;
    }

    #endregion
}