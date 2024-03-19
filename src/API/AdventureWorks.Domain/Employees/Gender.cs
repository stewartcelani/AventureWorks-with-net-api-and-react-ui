using Ardalis.SmartEnum;

namespace AdventureWorks.Domain.Employees;

public class Gender(string name, string value) : SmartEnum<Gender, string>(name, value)
{
    public static readonly Gender Male = new(nameof(Male), "M");
    public static readonly Gender Female = new(nameof(Female), "F");
}