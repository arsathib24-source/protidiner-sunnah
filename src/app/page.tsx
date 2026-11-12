import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/types/i18n';

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
