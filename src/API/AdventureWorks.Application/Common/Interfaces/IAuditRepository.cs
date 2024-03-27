using AdventureWorks.Domain.Common;

namespace AdventureWorks.Application.Common.Interfaces;

public interface IAuditRepository
{
    Task<bool> AddAsync(AuditLogEntry auditLogEntry);

}