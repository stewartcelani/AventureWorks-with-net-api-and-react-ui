using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdventureWorks.Contracts.v1.Employees.Requests;

public class UpdateEmployeeRequest
{
    [MinLength(8)]
    [MaxLength(15)]
    [Required]
    public required string NationalIDNumber { get; init; }

    [MinLength(3)]
    [MaxLength(256)]
    [Required]
    public required string LoginId { get; init; }

    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string FirstName { get; init; }

    [MaxLength(50)]
    public required string MiddleName { get; init; } = string.Empty;

    [MinLength(2)]
    [MaxLength(50)]
    [Required]
    public required string LastName { get; init; }

    [MinLength(3)]
    [MaxLength(50)]
    [Required]
    public required string JobTitle { get; init; }

    [Required]
    public required DateTime BirthDate { get; init; }

    [Required]
    public required MaritalStatus MaritalStatus { get; init; }

    [Required]
    public required Gender Gender { get; init; }

    [Required]
    public required DateTime HireDate { get; init; }

    [Required]
    public required bool SalariedFlag { get; init; }

    [Required]
    public required bool CurrentFlag { get; init; }
    
    [Required]
    public required int DepartmentID { get; init; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MaritalStatus
{
    Single,
    Married
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Gender
{
    Male,
    Female
}