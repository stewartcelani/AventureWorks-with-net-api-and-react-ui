using Ardalis.SmartEnum;

namespace AdventureWorks.Application.Common.Domain;

public class OrderByOperator(string name, string value) : SmartEnum<OrderByOperator, string>(name, value)
{
    public static readonly OrderByOperator Ascending = new OrderByOperator("Ascending", "ASC");
    public static readonly OrderByOperator Descending = new OrderByOperator("Descending", "DESC");
}