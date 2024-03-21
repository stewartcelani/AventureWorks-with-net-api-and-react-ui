import { Link } from '@tanstack/react-router';
import { Route as IndexRoute } from '@/routes';
import AuthorizeView from '@components/auth/AuthorizeView.tsx';
import { appRoles } from '@config/authConfig.ts';
import { Route as EmployeeRoute } from '@routes/employees';
import { Route as UserRoute } from '@routes/user';

const activeProps = {
  style: {
    fontWeight: 'bold'
  }
};

export default function Header() {
  return (
    <header>
      <Link to={IndexRoute.to} activeProps={activeProps}>
        Home
      </Link>
      <AuthorizeView role={appRoles.employeesRead}>
        <Link
          to={EmployeeRoute.to}
          activeProps={activeProps}
          search={{
            page: 1,
            pageSize: 10
          }}
        >
          Employees
        </Link>
      </AuthorizeView>
      <Link to={UserRoute.to} activeProps={activeProps}>
        User
      </Link>
    </header>
  );
}
