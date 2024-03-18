using System.Net.Http.Json;
using System.Text.Json.Serialization;
using ErrorOr;

namespace AdventureWorks.Application.Common.Helpers;

public static class MicrosoftIdentityPlatformHelper
{
    /**
   * Resource Owner Password Credentials (ROPC) grant
   * https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth-ropc
   * - ONLY should be used in E2E testing as a service account
   */
    public static async Task<ErrorOr<MicrosoftIdentityPlatformLoginResponse>>
        AuthenticateUsingResourceOwnerCredentialsGrant(string username, string password,
            string tenantId, string clientId, string clientSecret, string scopes)
    {
        using var http = new HttpClient();
        http.BaseAddress = new Uri("https://login.microsoftonline.com/");

        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            { "grant_type", "password" },
            { "username", username },
            { "password", password },
            { "client_id", clientId },
            {
                "scope", scopes
            }, 
            {
                "client_secret", clientSecret
            }
        });

        var response = await http.PostAsync($"{tenantId}/oauth2/v2.0/token", content);
        if (!response.IsSuccessStatusCode) return Error.Unauthorized();

        var loginResponse = await response.Content.ReadFromJsonAsync<MicrosoftIdentityPlatformLoginResponse>();
        if (loginResponse is null) return Error.Unexpected();

        return loginResponse;
    }
}

public class MicrosoftIdentityPlatformLoginResponse
{
    [JsonPropertyName("token_type")] public string TokenType { get; set; }

    [JsonPropertyName("scope")] public string Scope { get; set; }

    [JsonPropertyName("expires_in")] public int ExpiresIn { get; set; }

    [JsonPropertyName("ext_expires_in")] public int ExtExpiresIn { get; set; }

    [JsonPropertyName("access_token")] public string AccessToken { get; set; }

    [JsonPropertyName("refresh_token")] public string RefreshToken { get; set; }

    [JsonPropertyName("id_token")] public string IdToken { get; set; }
}