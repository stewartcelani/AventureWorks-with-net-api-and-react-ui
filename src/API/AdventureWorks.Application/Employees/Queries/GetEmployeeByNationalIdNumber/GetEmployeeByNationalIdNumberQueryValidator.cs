using FluentValidation;

namespace AdventureWorks.Application.Employees.Queries.GetEmployeeByNationalIdNumber;

public class GetEmployeeByNationalIdNumberQueryValidator : AbstractValidator<GetEmployeeByNationalIdNumberQuery>
{
    public GetEmployeeByNationalIdNumberQueryValidator()
    {
        RuleFor(v => v.NationalIdNumber)
            .NotEmpty().WithMessage("National ID Number is required.")
            .MaximumLength(15).WithMessage("National ID Number must not exceed 15 characters.");
    }
}