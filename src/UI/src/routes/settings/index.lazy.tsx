import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsPage from '@features/settings/components/SettingsPage.tsx';

export const Route = createLazyFileRoute('/settings/')({
  component: SettingsPage
});
