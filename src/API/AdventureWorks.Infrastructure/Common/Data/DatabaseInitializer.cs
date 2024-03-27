using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Settings;

namespace AdventureWorks.Infrastructure.Common.Data;

public class DatabaseInitializer
{
    private readonly ConnectionStrings _connectionStrings;
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public DatabaseInitializer(ConnectionStrings connectionStrings, IDbConnectionFactory dbConnectionFactory)
    {
        _connectionStrings = connectionStrings ?? throw new ArgumentNullException(nameof(connectionStrings));
        _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
    }

    public void Initialize()
    {
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);

        const string query = @"
            -- Check if the table 'AuditLog' already exists
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'AuditLog')
            BEGIN
                -- Create the table
                CREATE TABLE AuditLog
                (
                    Id INT IDENTITY(1,1) PRIMARY KEY,              -- Auto-incrementing starting at 1
                    RequestId NVARCHAR(255) NOT NULL,              -- TraceIdentifier from ASPNET core
			        RequestPath NVARCHAR(255) NOT NULL,            -- Request Path
			        BatchId UNIQUEIDENTIFIER NULL,                 -- BatchId used to group commands into a session or batch for reporting
                    Command NVARCHAR(255) NOT NULL,                -- Mediatr command name
                    Request NVARCHAR(MAX) NOT NULL,                -- JSON for Request
                    IsError BIT NOT NULL,                          -- Boolean flag for error
                    Error NVARCHAR(MAX) NULL,                      -- JSON of FirstError from ErrorOr response
                    Response NVARCHAR(MAX) NULL,                   -- JSON for Value from ErrorOr response
                    UserId UNIQUEIDENTIFIER NOT NULL,              -- GUID for UserId
                    UserEmail NVARCHAR(255) NOT NULL,              -- Email address
                    UserFirstName NVARCHAR(255) NOT NULL,          -- User first name
                    UserLastName NVARCHAR(255) NOT NULL,           -- User last name
                    UserRoles NVARCHAR(MAX) NOT NULL,              -- Comma separated list of roles
			        UserAgent NVARCHAR(255) NOT NULL,              -- User agent of the requesting program
                    DateCreated DATETIME DEFAULT GETDATE() NOT NULL-- Date created with default current datetime
                );         
            END";
        
        connection.Execute(query);
    }
}