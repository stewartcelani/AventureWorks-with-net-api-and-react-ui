import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsClaims from '@features/settings/components/SettingsClaims.tsx';

export const Route = createLazyFileRoute('/settings/claims/')({
  component: SettingsClaims
});
