import { Link, useRouterState } from '@tanstack/react-router';
import type { HTMLAttributes } from 'react';
import { Route as IndexRoute } from '@/routes';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { Route as EmployeeRoute } from '@routes/employees.index.tsx';
import { Route as SettingsClaimsRoute } from '@routes/settings.claims.local.index.tsx';
import { Route as ProductsRoute } from '@routes/products.index.tsx';
import { cn } from '@utils';
import { defaultGetProductsRequest } from '@features/products/queries/getProducts.ts';
import { defaultGetEmployeesRequest } from '@/features/employees/queries/getEmployees';

export default function HeaderNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const {
    location: { pathname }
  } = useRouterState();

  return (
    <header>
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link
          to={IndexRoute.to}
          className="text-sm px-1.5 font-medium transition-colors"
          activeProps={{
            className: 'text-primary'
          }}
          inactiveProps={{
            className: 'text-muted-foreground hover:text-foreground/90'
          }}
        >
          Dashboard
        </Link>
        <AuthorizeView role={appRoles.productsRead}>
          <Link
            to={ProductsRoute.to}
            search={defaultGetProductsRequest}
            className={cn(
              'text-sm px-1.5 font-medium transition-colors',
              pathname.startsWith('/products/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90'
            )}
          >
            Products
          </Link>
        </AuthorizeView>
        <AuthorizeView role={appRoles.employeesRead}>
          <Link
            to={EmployeeRoute.to}
            search={defaultGetEmployeesRequest}
            className={cn(
              'text-sm px-1.5 font-medium transition-colors',
              pathname.startsWith('/employees/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90'
            )}
          >
            Employees
          </Link>
        </AuthorizeView>
        <Link
          to={SettingsClaimsRoute.to}
          className={cn(
            'text-sm px-1.5 font-medium transition-colors',
            pathname.startsWith('/settings/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground/90'
          )}
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
