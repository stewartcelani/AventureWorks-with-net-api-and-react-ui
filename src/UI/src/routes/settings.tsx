import { createFileRoute } from '@tanstack/react-router';
import SettingsLayout from '@features/settings/components/SettingsLayout.tsx';

export const Route = createFileRoute('/settings')({
  component: SettingsLayout
});
