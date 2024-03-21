import { useAuth } from '@hooks/useAuth.ts';

export default function Dashboard() {
  const authContext = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome, {authContext.account!.name}</p>
      <pre>{JSON.stringify(authContext, null, 2)}</pre>
    </>
  );
}
