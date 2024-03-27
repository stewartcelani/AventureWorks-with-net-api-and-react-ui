using MediatR;
using ErrorOr;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommand : IRequest<ErrorOr<UpdateEmployeeCommandResponse>>
{
    public required int BusinessEntityID { get; init; }
    public required string NationalIDNumber { get; init; }
    public required string FirstName { get; init; }
    public required string MiddleName { get; init; } = string.Empty;
    public required string LastName { get; init; }
    public required string JobTitle { get; init; }
}