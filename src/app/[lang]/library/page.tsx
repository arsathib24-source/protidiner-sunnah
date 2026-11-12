import { redirect } from 'next/navigation';

export default function LibraryPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams).toString();
  const target = `/${params.lang}/ebooks${query ? `?${query}` : ''}`;
  redirect(target);
}
