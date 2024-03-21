import { useAuth } from '@hooks/useAuth.ts';
import { useGetServerClaimsQuery } from '@features/user/queries/getServerClaims.ts';

export default function User() {
  const user = useAuth();
  const { data: serverUserClaims } = useGetServerClaimsQuery();

  return (
    <>
      <h1>User</h1>
      <h2>Local User</h2>
      <pre>{JSON.stringify(user.userClaims, null, 2)}</pre>
      {serverUserClaims && (
        <>
          <h2>Server User</h2>
          <pre>{JSON.stringify(serverUserClaims, null, 2)}</pre>
        </>
      )}
    </>
  );
}
