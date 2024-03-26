import { useAuth } from '@hooks/useAuth.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs.tsx';

export default function DashboardPage() {
  const authContext = useAuth();

  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome {authContext.userClaims!.firstName}!</p>
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
          <p>Overview here.</p>
        </TabsContent>
        <TabsContent value="analytics">Analytics here.</TabsContent>
        <TabsContent value="reports">Reports here.</TabsContent>
        <TabsContent value="notifications">Notifications here.</TabsContent>
      </Tabs>
    </>
  );
}
