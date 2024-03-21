import { createLazyFileRoute } from '@tanstack/react-router';
import User from '@features/user/components/User.tsx';

export const Route = createLazyFileRoute('/user/')({
  component: User
});
