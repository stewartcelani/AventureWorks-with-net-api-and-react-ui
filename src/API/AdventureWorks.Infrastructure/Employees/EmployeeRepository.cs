using AdventureWorks.Application.Common.Domain;
using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Settings;
using AdventureWorks.Application.Employees.Queries.GetEmployees;
using AdventureWorks.Domain.Employees;
using AdventureWorks.Infrastructure.Common.Data;
using Dapper;

namespace AdventureWorks.Infrastructure.Employees;

public class EmployeeRepository(ConnectionStrings connectionStrings, IDbConnectionFactory dbConnectionFactory, ILoggerAdapter<EmployeeRepository> logger)
    : IEmployeeRepository
{
    private readonly ConnectionStrings _connectionStrings = connectionStrings ?? throw new ArgumentNullException(nameof(connectionStrings));
    private readonly IDbConnectionFactory _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
    private readonly ILoggerAdapter<EmployeeRepository> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

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
        var employeeQueryModel =
            await connection.QuerySingleOrDefaultAsync<EmployeeQueryModel>(
                new CommandDefinition(query, filter, cancellationToken: cancellationToken));
        return employeeQueryModel?.ToEmployee();
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
        var employeeQueryModel =
            await connection.QuerySingleOrDefaultAsync<EmployeeQueryModel>(
                new CommandDefinition(query, filter, cancellationToken: cancellationToken));
        return employeeQueryModel?.ToEmployee();
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
            Items = employees,
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

    public async Task<bool> UpdateEmployeeAsync(Employee existingEmployee, Employee updatedEmployee, CancellationToken cancellationToken)
    {
        (bool updateEmployeeRequired, string updateEmployeeQuery, DynamicParameters updateEmployeeParameters) BuildUpdateEmployeeQuery()
        {
            var parameters = new DynamicParameters();
            var updateRequired = false;
            var query = @"UPDATE HumanResources.Employee SET ";
            if (existingEmployee.NationalIDNumber != updatedEmployee.NationalIDNumber)
            {
                query += "NationalIDNumber = @NationalIDNumber, ";
                parameters.Add("@NationalIDNumber", updatedEmployee.NationalIDNumber);
                updateRequired = true;
            }
            if (existingEmployee.LoginID != updatedEmployee.LoginID)
            {
                query += "LoginID = @LoginID, ";
                parameters.Add("@LoginID", updatedEmployee.LoginID);
                updateRequired = true;
            }
            if (existingEmployee.JobTitle != updatedEmployee.JobTitle)
            {
                query += "JobTitle = @JobTitle, ";
                parameters.Add("@JobTitle", updatedEmployee.JobTitle);
                updateRequired = true;
            }
            if (existingEmployee.BirthDate != updatedEmployee.BirthDate)
            {
                query += "BirthDate = @BirthDate, ";
                parameters.Add("@BirthDate", updatedEmployee.BirthDate.ToDateTime(TimeOnly.MinValue));
                updateRequired = true;
            }
            if (existingEmployee.MaritalStatus != updatedEmployee.MaritalStatus)
            {
                query += "MaritalStatus = @MaritalStatus, ";
                parameters.Add("@MaritalStatus", updatedEmployee.MaritalStatus.Value);
                updateRequired = true;
            }
            if (existingEmployee.Gender != updatedEmployee.Gender)
            {
                query += "Gender = @Gender, ";
                parameters.Add("@Gender", updatedEmployee.Gender.Value);
                updateRequired = true;
            }
            if (existingEmployee.HireDate != updatedEmployee.HireDate)
            {
                query += "HireDate = @HireDate, ";
                parameters.Add("@HireDate", updatedEmployee.HireDate.ToDateTime(TimeOnly.MinValue));
                updateRequired = true;
            }
            if (existingEmployee.SalariedFlag != updatedEmployee.SalariedFlag)
            {
                query += "SalariedFlag = @SalariedFlag, ";
                parameters.Add("@SalariedFlag", updatedEmployee.SalariedFlag);
                updateRequired = true;
            }
            if (existingEmployee.CurrentFlag != updatedEmployee.CurrentFlag)
            {
                query += "CurrentFlag = @CurrentFlag, ";
                parameters.Add("@CurrentFlag", updatedEmployee.CurrentFlag);
                updateRequired = true;
            }
            if (query.EndsWith(", "))
                query = query.Remove(query.Length - 2);
            query += " WHERE BusinessEntityID = @BusinessEntityID;";
            parameters.Add("@BusinessEntityID", updatedEmployee.BusinessEntityID);
            return (updateRequired, query, parameters);
        }
        (bool updatePersonRequired, string updatePersonQuery, DynamicParameters updatePersonParameters) BuildUpdatePersonQuery()
        {
            var updateRequired = false;
            var parameters = new DynamicParameters();
            var query = @"UPDATE Person.Person SET ";
            if (existingEmployee.FirstName != updatedEmployee.FirstName)
            {
                query += "FirstName = @FirstName, ";
                parameters.Add("@FirstName", updatedEmployee.FirstName);
                updateRequired = true;
            }
            if (existingEmployee.MiddleName != updatedEmployee.MiddleName)
            {
                query += "MiddleName = @MiddleName, ";
                parameters.Add("@MiddleName", updatedEmployee.MiddleName);
                updateRequired = true;
            }
            if (existingEmployee.LastName != updatedEmployee.LastName)
            {
                query += "LastName = @LastName, ";
                parameters.Add("@LastName", updatedEmployee.LastName);
                updateRequired = true;
            }
            if (query.EndsWith(", "))
                query = query.Remove(query.Length - 2);
            query += " WHERE BusinessEntityID = @BusinessEntityID;";
            parameters.Add("@BusinessEntityID", updatedEmployee.BusinessEntityID);
            return (updateRequired, query, parameters);
        }

        var (updateEmployeeRequired, updateEmployeeQuery, updateEmployeeParameters) = BuildUpdateEmployeeQuery();
        var (updatePersonRequired, updatePersonQuery, updatePersonParameters) = BuildUpdatePersonQuery();
        var updateDepartmentRequired = existingEmployee.Department.DepartmentID != updatedEmployee.Department.DepartmentID;

        if (!updateEmployeeRequired && !updatePersonRequired && !updateDepartmentRequired) return true;

        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        connection.Open();

        using var transaction = connection.BeginTransaction();
        try
        {
            if (updateEmployeeRequired)
            {
                _logger.LogTrace("EXECUTING QUERY:\n {Query}, {@Parameters}", updateEmployeeQuery, updateEmployeeParameters.ToExpandoObject());
                await connection.ExecuteAsync(new CommandDefinition(updateEmployeeQuery, updateEmployeeParameters, transaction: transaction, cancellationToken: cancellationToken));
            }

            if (updatePersonRequired)
            {
                _logger.LogTrace("EXECUTING QUERY:\n {Query}, {@Parameters}", updatePersonQuery, updatePersonParameters.ToExpandoObject());
                await connection.ExecuteAsync(new CommandDefinition(updatePersonQuery, updatePersonParameters, transaction: transaction, cancellationToken: cancellationToken));
            }

            if (updateDepartmentRequired)
            {
                const string updateQuery = @"UPDATE HumanResources.EmployeeDepartmentHistory SET EndDate = GETDATE() WHERE BusinessEntityID = @BusinessEntityID AND EndDate IS NULL;";
                var updateParams = new { updatedEmployee.BusinessEntityID };
                _logger.LogTrace("EXECUTING QUERY:\n {Query}, {@Parameters}", updateQuery, updateParams);
                await connection.ExecuteAsync(new CommandDefinition(updateQuery, updateParams, transaction: transaction, cancellationToken: cancellationToken));
                
                const string insertQuery = @"INSERT INTO HumanResources.EmployeeDepartmentHistory (BusinessEntityID, DepartmentID, ShiftID, StartDate) VALUES (@BusinessEntityID, @DepartmentID, 1, GETDATE());";
                var insertParams = new { updatedEmployee.BusinessEntityID, updatedEmployee.Department.DepartmentID };
                _logger.LogTrace("EXECUTING QUERY:\n {Query}, {@Parameters}", insertQuery, insertParams);
                await connection.ExecuteAsync(new CommandDefinition(insertQuery, insertParams, transaction: transaction, cancellationToken: cancellationToken));
            }
            
            transaction.Commit();
            return true;
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    public async Task<List<Department>> GetDepartmentsAsync(CancellationToken cancellationToken)
    {
        const string query = @"
            SELECT
            DepartmentID,
            Name,
            GroupName
            FROM HumanResources.Department";
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var departments = (await connection.QueryAsync<Department>(new CommandDefinition(query, cancellationToken: cancellationToken))).ToList();
        return departments;
    }

    public async Task<List<DepartmentHistory>> GetEmployeeDepartmentHistoryAsync(int businessEntityId, CancellationToken cancellationToken)
    {
        const string query = @"
            SELECT
                D.DepartmentID,
                D.Name,
                D.GroupName,
                EDH.StartDate,
                EDH.EndDate
            FROM HumanResources.EmployeeDepartmentHistory EDH
            INNER JOIN HumanResources.Department D ON D.DepartmentID = EDH.DepartmentID
            WHERE EDH.BusinessEntityID = @BusinessEntityID
            ORDER BY EDH.StartDate ASC, EDH.ModifiedDate ASC";
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);
        var departmentHistories = (await connection.QueryAsync<DepartmentHistory>(new CommandDefinition(query, new { BusinessEntityID = businessEntityId }, cancellationToken: cancellationToken))).ToList();
        return departmentHistories;
    }

    #endregion
}