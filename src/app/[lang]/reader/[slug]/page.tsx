import { redirect } from 'next/navigation';

export default function ReaderRedirectPage({
  params,
  searchParams,
}: {
  params: { lang: string; slug: string };
  searchParams?: Record<string, string>;
}) {
  const query = new URLSearchParams(searchParams).toString();
  redirect(`/${params.lang}/read/${params.slug}${query ? `?${query}` : ''}`);
}
