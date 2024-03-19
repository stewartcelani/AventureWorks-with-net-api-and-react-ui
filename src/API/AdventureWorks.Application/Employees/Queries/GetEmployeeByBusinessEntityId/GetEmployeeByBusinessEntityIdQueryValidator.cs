using FluentValidation;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByBusinessEntityID;

public class GetEmployeeByBusinessEntityIdQueryValidator : AbstractValidator<GetEmployeeByBusinessEntityIdQuery>
{
    public GetEmployeeByBusinessEntityIdQueryValidator()
    {
        RuleFor(v => v.BusinessEntityID)
            .NotEmpty()
            .WithMessage("BusinessEntityID is required.")
            .Must(x => x > 0)
            .WithMessage("BusinessEntityID must be greater than 0.");
    }
}