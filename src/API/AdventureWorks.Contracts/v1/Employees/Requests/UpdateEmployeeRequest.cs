using System.ComponentModel.DataAnnotations;

namespace AdventureWorks.Contracts.v1.Employees.Requests;

public class UpdateEmployeeRequest
{
    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string FirstName { get; init; }
    
    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string LastName { get; init; }
    
    [MinLength(3)]
    [MaxLength(50)]
    [Required]
    public required string JobTitle { get; init; }
}