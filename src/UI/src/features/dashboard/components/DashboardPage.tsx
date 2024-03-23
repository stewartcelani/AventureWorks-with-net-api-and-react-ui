import { useAuth } from '@hooks/useAuth.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs.tsx';

export default function DashboardPage() {
  const authContext = useAuth();

  return (
    <div className="hidden space-y-6 p-10 pb-16 pt-7 md:block">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="w-[400px] space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports" disabled={true}>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled={true}>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>Welcome, {authContext.account!.name}</p>
          <pre>{JSON.stringify(authContext, null, 2)}</pre>
        </TabsContent>
        <TabsContent value="analytics">Analytics here.</TabsContent>
        <TabsContent value="reports">Reports here.</TabsContent>
        <TabsContent value="notifications">Notifications here.</TabsContent>
      </Tabs>
    </div>
  );
}
