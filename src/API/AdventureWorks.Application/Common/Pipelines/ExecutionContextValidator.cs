using FluentValidation;

namespace AdventureWorks.Application.Common.Pipelines;

public class ExecutionContextValidator : AbstractValidator<ExecutionContext>
{
    public ExecutionContextValidator()
    {
        RuleFor(x => x.BatchId).NotEmpty();
        RuleFor(x => x.RequestId).NotEmpty();
        RuleFor(x => x.RequestPath).NotEmpty();
        RuleFor(x => x.UserAgent).NotEmpty();
        RuleFor(x => x.UserClaims)
            .NotNull()
            .Must(x => x.Roles.Count > 0);
    }
}