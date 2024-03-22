import { Link } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { Route as EmployeeRoute } from '@routes/employees';
import { Route as SettingsRoute } from '@routes/settings';
import { cn } from '@utils';
import type { HTMLAttributes } from 'react';

export default function HeaderNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header>
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link
          to={IndexRoute.to}
          className="text-sm font-medium transition-colors hover:text-primary"
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
            className="text-sm font-medium transition-colors hover:text-primary"
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
          className="text-sm font-medium transition-colors hover:text-primary"
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
