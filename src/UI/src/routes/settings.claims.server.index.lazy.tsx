import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsClaimsServer from '@features/settings/components/SettingsClaimsServer.tsx';

export const Route = createLazyFileRoute('/settings/claims/server/')({
  component: SettingsClaimsServer
});
