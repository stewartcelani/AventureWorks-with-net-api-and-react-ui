using FluentValidation;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeById;

public class GetEmployeeByIdQueryValidator : AbstractValidator<GetEmployeeByIdQuery>
{
    public GetEmployeeByIdQueryValidator()
    {
        RuleFor(v => v.BusinessEntityID)
            .NotEmpty()
            .WithMessage("BusinessEntityID is required.")
            .Must(x => x > 0)
            .WithMessage("BusinessEntityID must be greater than 0.");
    }
}