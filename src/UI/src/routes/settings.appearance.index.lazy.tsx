import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsAppearance from '@features/settings/components/SettingsAppearance.tsx';

export const Route = createLazyFileRoute('/settings/appearance/')({
  component: SettingsAppearance
});
