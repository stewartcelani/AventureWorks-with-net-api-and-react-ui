import { Link } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { Route as EmployeeRoute } from '@routes/employees';
import { Route as UserRoute } from '@routes/user';
import { cn } from '@utils';
import type { HTMLAttributes } from 'react';

const activeProps = {
  style: {
    fontWeight: 'bold'
  }
};

export default function HeaderNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header>
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link
          to={IndexRoute.to}
          activeProps={activeProps}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Home
        </Link>
        <AuthorizeView role={appRoles.employeesRead}>
          <Link
            to={EmployeeRoute.to}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            activeProps={activeProps}
            search={{
              page: 1,
              pageSize: 10
            }}
          >
            Employees
          </Link>
        </AuthorizeView>
        <Link
          to={UserRoute.to}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          activeProps={activeProps}
        >
          User
        </Link>
      </nav>
    </header>
  );
}
