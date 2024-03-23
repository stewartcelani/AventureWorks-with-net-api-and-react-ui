import { Separator } from '@components/ui/separator.tsx';
import { useAuth } from '@hooks/useAuth.ts';
import { useGetServerClaimsQuery } from '@features/settings/queries/getServerClaims.ts';

export default function SettingsClaims() {
  const user = useAuth();
  const { data: serverUserClaims } = useGetServerClaimsQuery();
  return (
    <>
      <div>
        <h3 className="pb-1 text-2xl font-bold tracking-tight text-foreground/90">Local Claims</h3>
        <p className="text-muted-foreground">
          These are the claims embedded in your Microsoft Azure{' '}
          <span className="underline underline-offset-4">ID token</span>.
        </p>
      </div>
      <Separator className="my-6" />
      <pre>{JSON.stringify(user.userClaims, null, 2)}</pre>
      {serverUserClaims && (
        <>
          <div className="mt-12">
            <h3 className="pb-1 text-2xl font-bold tracking-tight text-foreground/90">Server Claims</h3>
            <p className="text-muted-foreground">
              These are the claims embedded in your Microsoft Azure{' '}
              <span className="underline underline-offset-4">access token</span>.
            </p>
          </div>
          <Separator className="my-6" />
          <pre>{JSON.stringify(serverUserClaims, null, 2)}</pre>
        </>
      )}
    </>
  );
}
