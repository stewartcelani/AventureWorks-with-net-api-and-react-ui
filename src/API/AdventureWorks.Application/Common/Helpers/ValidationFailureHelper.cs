using FluentValidation.Results;

namespace AdventureWorks.Application.Common.Helpers;

public class ValidationFailureHelper
{
    public static IEnumerable<ValidationFailure> Generate(string paramName, string message)
    {
        return new[]
        {
            new ValidationFailure(paramName, message)
        };
    }
}