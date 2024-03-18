using AdventureWorks.Application.Common.Extensions;
using FluentValidation;

namespace AdventureWorks.Application.Common.Settings;

public class AzureAdSettingsValidator : AbstractValidator<AzureAdSettings>
{
    public AzureAdSettingsValidator()
    {
        RuleFor(x => x.Instance)
            .NotEmpty()
            .Must(x => x.IsValidUri())
            .WithMessage("Instance is required.");
        RuleFor(x => x.Domain)
            .NotEmpty()
            .WithMessage("Domain is required.");
        RuleFor(x => x.TenantId)
            .NotEmpty()
            .Must(x => x.IsValidGuid())
            .WithMessage("TenantId is required.");
        RuleFor(x => x.ClientId)
            .NotEmpty()
            .Must(x => x.IsValidGuid())
            .WithMessage("ClientId is required.");
        RuleFor(x => x.Scopes)
            .NotEmpty()
            .WithMessage("Scopes is required.");
        RuleFor(x => x.CallbackPath)
            .NotEmpty()
            .WithMessage("CallbackPath is required.");
      
    }
}