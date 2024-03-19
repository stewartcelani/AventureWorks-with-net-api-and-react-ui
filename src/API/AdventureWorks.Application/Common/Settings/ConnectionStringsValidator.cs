using AdventureWorks.Application.Common.Extensions;
using FluentValidation;

namespace AdventureWorks.Application.Common.Settings;

public class ConnectionStringsValidator : AbstractValidator<ConnectionStrings>
{
    public ConnectionStringsValidator()
    {
        RuleFor(v => v.AdventureWorks).NotEmpty().Must(x => x.IsValidConnectionString()).WithMessage("Must be a valid connection string.");
    }
}