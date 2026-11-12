import React from 'react';
import { getAllCategories } from '@/lib/admin/admin-store';
import { EbookForm } from '@/components/admin/ebook-form';

export default async function NewEbookPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const categories = await getAllCategories();

  return (
    <div className="max-w-5xl mx-auto">
      <EbookForm locale={locale} categories={categories} isEdit={false} />
    </div>
  );
}
