using System.Security.Cryptography.X509Certificates;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace AdventureWorks.Application.Common.Helpers;

public static class AzureKeyVaultHelper
{
    public static async Task<string> GetSecretUsingCertificateAsync(string secretName, string certificateThumbprint, string tenantId, string clientId, string keyVaultUrl)
    {
        var store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
        store.Open(OpenFlags.ReadOnly);
        var certs = store.Certificates.Find(X509FindType.FindByThumbprint, certificateThumbprint, false);
        store.Close();

        if (certs.Count == 0)
            throw new InvalidOperationException(
                "Certificate to authenticate against Azure Key Vault not found in the local user store.");

        var clientCertificate = certs[0];
        
        var credential = new ClientCertificateCredential(tenantId,
            clientId, clientCertificate);
        var keyVaultUri = new Uri(keyVaultUrl);
        var secretClient = new SecretClient(keyVaultUri, credential);

        string secretValue;
        try
        {
            KeyVaultSecret secret = await secretClient.GetSecretAsync(secretName);
            secretValue = secret.Value;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to retrieve secret from Azure Key Vault.", ex);
        }

        return secretValue;
    }
}