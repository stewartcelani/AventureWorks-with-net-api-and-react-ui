using System.ComponentModel.DataAnnotations;

namespace AdventureWorks.Contracts.v1.Employees.Requests;

public class UpdateEmployeeRequest
{
    [MinLength(8)]
    [MaxLength(15)]
    [Required]
    public required string NationalIDNumber { get; init; }
    
    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string FirstName { get; init; }

    [MaxLength(50)] public required string MiddleName { get; init; } = string.Empty;
    
    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string LastName { get; init; }
    
    [MinLength(3)]
    [MaxLength(50)]
    [Required]
    public required string JobTitle { get; init; }
}