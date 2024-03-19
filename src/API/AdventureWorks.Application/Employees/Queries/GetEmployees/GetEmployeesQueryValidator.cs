using FluentValidation;

namespace AdventureWorks.Application.Employees.Queries.GetEmployees;

public class GetEmployeesQueryValidator : AbstractValidator<GetEmployeesQuery>
{
    public GetEmployeesQueryValidator()
    {
        RuleFor(v => v.Filter).NotNull();
    }
}