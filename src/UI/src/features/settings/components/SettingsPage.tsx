import { useAuth } from '@hooks/useAuth.ts';
import { useGetServerClaimsQuery } from '@features/settings/queries/getServerClaims.ts';
import { Separator } from '@components/ui/separator.tsx';
import { Link } from '@tanstack/react-router';
import { cn } from '@utils';
import { buttonVariants } from '@components/ui/button.tsx';
import { Route as SettingsRoute } from '@routes/settings/index.tsx';

const sidebarNavItems = [
  {
    title: 'Claims',
    href: SettingsRoute.to
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance'
  },
  {
    title: 'Api Key',
    href: '/examples/forms/account'
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications'
  },
  {
    title: 'Display',
    href: '/examples/forms/display'
  }
];

export default function SettingsPage() {
  const user = useAuth();
  const { data: serverUserClaims } = useGetServerClaimsQuery();

  return (
    <div className="hidden space-y-6 p-10 pb-16 pt-7 md:block">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(buttonVariants({ variant: 'ghost' }), 'justify-start')}
                activeProps={{ className: 'bg-muted hover:bg-muted' }}
                inactiveProps={{ className: 'hover:bg-transparent hover:underline' }}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground/90 pb-1">Local Claims</h3>
            <p className="text-md text-muted-foreground">
              These are the claims embedded in your Microsoft Azure{' '}
              <span className="underline underline-offset-4">ID token</span>.
            </p>
          </div>
          <Separator className="my-6" />
          <pre>{JSON.stringify(user.userClaims, null, 2)}</pre>
          {serverUserClaims && (
            <>
              <div className="mt-12">
                <h3 className="text-2xl font-bold tracking-tight text-foreground/90 pb-1">Server Claims</h3>
                <p className="text-md text-muted-foreground">
                  These are the claims embedded in your Microsoft Azure{' '}
                  <span className="underline underline-offset-4">access token</span>.
                </p>
              </div>
              <Separator className="my-6" />
              <pre>{JSON.stringify(serverUserClaims, null, 2)}</pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
