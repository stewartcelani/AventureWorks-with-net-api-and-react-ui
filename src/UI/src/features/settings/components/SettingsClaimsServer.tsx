import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { Separator } from '@components/ui/separator.tsx';
import { appRoles, appScopes } from '@config/authConfig.ts';
import { useGetServerClaimsQuery } from '@features/settings/queries/getServerClaims.ts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getApiAccessToken } from '@lib/apiClient.ts';

export default function SettingsClaimsServer() {
  const { data: serverUserClaims, isLoading } = useGetServerClaimsQuery();
  const [tokenCopied, setTokenCopied] = useState(false);

  const copyApiAccessTokenToClipboard = async () => {
    const apiAccessToken = await getApiAccessToken([appScopes.api]);
    await navigator.clipboard.writeText(apiAccessToken);
    setTokenCopied(true);
  };

  const handleClipboardClick = () => {
    void copyApiAccessTokenToClipboard();
  };

  return (
    <>
      <div>
        <h3 className="pb-1 text-2xl font-bold tracking-tight text-foreground/90">Server Claims</h3>
        <p className="text-muted-foreground">
          These are the claims embedded in your Microsoft Azure{' '}
          <span className="underline underline-offset-4">access token</span>.
        </p>
        <AuthorizeView anyRole={[appRoles.developer, appRoles.administrator]}>
          <div className="relative">
            {serverUserClaims && (
              <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="pt-4">
                    {!tokenCopied && <Clipboard onClick={handleClipboardClick} />}
                    {tokenCopied && <ClipboardCheck onClick={handleClipboardClick} />}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy JWT token to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {tokenCopied && (
              <p className="absolute pt-2 text-green-400" style={{ top: '8px', left: '34px' }}>
                Token copied to clipboard!
              </p>
            )}
          </div>
        </AuthorizeView>
      </div>
      <Separator className="my-6" />
      {isLoading && <p>Loading...</p>}
      {serverUserClaims && <pre>{JSON.stringify(serverUserClaims, null, 2)}</pre>}
    </>
  );
}
