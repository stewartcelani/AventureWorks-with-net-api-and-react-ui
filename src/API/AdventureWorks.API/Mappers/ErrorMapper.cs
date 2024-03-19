using ErrorOr;
using Microsoft.AspNetCore.Mvc;

namespace AdventureWorks.API.Mappers;

public static class ErrorMapper
{
    public static IActionResult ToActionResult(this Error error)
    {
        var problemDetails = new ProblemDetails
        {
            Title = error.Type.ToString(),
            Extensions = { ["code"] = error.Code },
            Detail = error.Description
        };

        return error.Type switch
        {
            ErrorType.Validation => new ObjectResult(problemDetails) { StatusCode = StatusCodes.Status400BadRequest },
            ErrorType.NotFound => new ObjectResult(problemDetails) { StatusCode = StatusCodes.Status404NotFound },
            ErrorType.Unauthorized => new ObjectResult(problemDetails)
                { StatusCode = StatusCodes.Status401Unauthorized },
            ErrorType.Forbidden => new ObjectResult(problemDetails) { StatusCode = StatusCodes.Status403Forbidden },
            _ => GenerateGeneric500Error()
        };
    }

    private static IActionResult GenerateGeneric500Error()
    {
        var genericProblemDetails = new ProblemDetails
        {
            Title = "Internal Server Error",
            Detail = "An unexpected error occurred.",
            Status = StatusCodes.Status500InternalServerError
        };

        return new ObjectResult(genericProblemDetails) { StatusCode = StatusCodes.Status500InternalServerError };
    }
}