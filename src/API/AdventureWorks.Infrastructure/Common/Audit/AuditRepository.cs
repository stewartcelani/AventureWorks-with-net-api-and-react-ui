using AdventureWorks.Application.Common.Interfaces;
using AdventureWorks.Application.Common.Settings;
using AdventureWorks.Domain.Common;
using Dapper;

namespace AdventureWorks.Infrastructure.Common.Audit;

public class AuditRepository(ConnectionStrings connectionStrings, IDbConnectionFactory dbConnectionFactory, ILoggerAdapter<AuditRepository> logger)
    : IAuditRepository
{
    private readonly ConnectionStrings _connectionStrings = connectionStrings ?? throw new ArgumentNullException(nameof(connectionStrings));
    private readonly IDbConnectionFactory _dbConnectionFactory = dbConnectionFactory ?? throw new ArgumentNullException(nameof(dbConnectionFactory));
    private readonly ILoggerAdapter<AuditRepository> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

    public async Task<bool> AddAsync(AuditLogEntry auditLogEntry)
    {
        using var connection = _dbConnectionFactory.CreateConnection(_connectionStrings.AdventureWorks);

        const string sql = @"
        INSERT INTO AuditLog
        (
            RequestId, RequestPath, BatchId,  Command, Request, IsError, Error, Response, 
            UserId, UserEmail, UserFirstName, UserLastName, 
            UserRoles, UserAgent
        )
        VALUES
        (
            @RequestId, @RequestPath, @BatchId, @Command, @Request, @IsError, @Error, @Response, 
            @UserId, @UserEmail, @UserFirstName, @UserLastName, 
            @UserRoles, @UserAgent
        );";

        try
        {
            var parameters = new
            {
                auditLogEntry.RequestId,
                auditLogEntry.RequestPath,
                auditLogEntry.BatchId,
                auditLogEntry.Command,
                auditLogEntry.Request,
                auditLogEntry.IsError,
                auditLogEntry.Error,
                auditLogEntry.Response,
                auditLogEntry.UserId,
                auditLogEntry.UserEmail,
                auditLogEntry.UserFirstName,
                auditLogEntry.UserLastName,
                UserRoles = string.Join(',',
                    auditLogEntry.UserRoles), // Convert List of roles to comma-separated string
                auditLogEntry.UserAgent
            };

            var rowsAffected =
                await connection.ExecuteAsync(new CommandDefinition(sql, parameters, commandTimeout: 120));
            return rowsAffected == 1;
        }
        catch (Exception ex)
        {
            _logger.LogError("Error adding audit log entry: {Message}", ex.Message);
            return false;
        }
    }
}