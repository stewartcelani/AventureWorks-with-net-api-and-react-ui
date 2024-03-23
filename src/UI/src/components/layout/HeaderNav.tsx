import { Link } from '@tanstack/react-router';
import type { HTMLAttributes } from 'react';
import { Route as IndexRoute } from '@/routes';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { Route as EmployeeRoute } from '@routes/employees.index.tsx';
import { Route as SettingsRoute } from '@routes/settings.index.tsx';
import { cn } from '@utils';

export default function HeaderNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header>
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link
          to={IndexRoute.to}
          className="px-1.5 text-sm font-medium transition-colors hover:text-primary"
          activeProps={{
            className: 'text-foreground'
          }}
          inactiveProps={{
            className: 'text-muted-foreground'
          }}
        >
          Home
        </Link>
        <AuthorizeView role={appRoles.employeesRead}>
          <Link
            to={EmployeeRoute.to}
            className="px-1.5 text-sm font-medium transition-colors hover:text-primary"
            activeProps={{
              className: 'text-foreground'
            }}
            inactiveProps={{
              className: 'text-muted-foreground'
            }}
            search={{
              page: 1,
              pageSize: 10
            }}
          >
            Employees
          </Link>
        </AuthorizeView>
        <Link
          to={SettingsRoute.to}
          className="px-1.5 text-sm font-medium transition-colors hover:text-primary"
          activeProps={{
            className: 'text-foreground'
          }}
          inactiveProps={{
            className: 'text-muted-foreground'
          }}
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
