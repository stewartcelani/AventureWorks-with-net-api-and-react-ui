import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsClaimsLocal from '@features/settings/components/SettingsClaimsLocal.tsx';

export const Route = createLazyFileRoute('/settings/claims/local/')({
  component: SettingsClaimsLocal
});
