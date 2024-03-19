using Ardalis.SmartEnum;

namespace AdventureWorks.Domain.Employees;

public class MartialStatus(string name, string value) : SmartEnum<MartialStatus, string>(name, value)
{
    public static readonly MartialStatus Single = new(nameof(Single), "S");
    public static readonly MartialStatus Married = new(nameof(Married), "M");
}