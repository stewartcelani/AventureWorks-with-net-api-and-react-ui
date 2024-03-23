using FluentValidation;

namespace AdventureWorks.Application.Products.Queries.GetProductById;

public class GetProductByIdQueryValidator : AbstractValidator<GetProductByIdQuery>
{
    public GetProductByIdQueryValidator()
    {
        RuleFor(v => v.ProductID)
            .NotEmpty()
            .WithMessage("ProductID is required.")
            .Must(x => x > 0)
            .WithMessage("ProductID must be greater than 0.");
    }
}