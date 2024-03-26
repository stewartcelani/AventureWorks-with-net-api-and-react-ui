using FluentValidation;

namespace AdventureWorks.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator()
    {
        RuleFor(x => x.FirstName)
            .MinimumLength(2)
            .MaximumLength(50)
            .NotEmpty();
        
        RuleFor(x => x.LastName)
            .MinimumLength(2)
            .MaximumLength(50)
            .NotEmpty();
        
        RuleFor(x => x.JobTitle)
            .MinimumLength(3)
            .MaximumLength(50)
            .NotEmpty();
    }
}