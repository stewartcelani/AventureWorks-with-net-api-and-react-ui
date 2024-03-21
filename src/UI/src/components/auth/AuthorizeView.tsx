import { useAuth } from '@hooks/useAuth.ts';
import type { ReactNode } from 'react';

type AllRolesProps = {
  allRoles: string[];
  children: ReactNode;
};

type AnyRolesProps = {
  anyRole: string[];
  children: ReactNode;
};

type RoleProps = {
  role: string;
  children: ReactNode;
};

type AuthorizeViewProps = AllRolesProps | AnyRolesProps | RoleProps;

function AuthorizeView({ children, ...props }: AuthorizeViewProps) {
  const authContext = useAuth();

  if ('role' in props) {
    if (authContext.hasRole(props.role)) {
      return <>{children}</>;
    }
  } else if ('anyRole' in props) {
    if (props.anyRole.some((role) => authContext.hasRole(role))) {
      return <>{children}</>;
    }
  } else if ('allRoles' in props) {
    if (props.allRoles.every((role) => authContext.hasRole(role))) {
      return <>{children}</>;
    }
  }

  return null;
}

export default AuthorizeView;
