import { Link, Outlet } from '@tanstack/react-router';
import { Separator } from '@components/ui/separator.tsx';
import { cn } from '@utils';
import { buttonVariants } from '@components/ui/button.tsx';

const sidebarNavItems = [
  {
    title: 'Claims',
    href: '/settings/claims'
  },
  {
    title: 'Appearance',
    href: '/settings/appearance'
  }
];

export default function SettingsLayout() {
  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item, idx) => (
              <Link
                key={idx}
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
        {/* <Separator className="my-6 lg:hidden" /> */}
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
