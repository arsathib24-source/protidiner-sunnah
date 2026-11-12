import React from 'react';
import { notFound } from 'next/navigation';
import { getBookById, getAllCategories } from '@/lib/admin/admin-store';
import { EbookForm } from '@/components/admin/ebook-form';

export default async function EditEbookPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const locale = params.lang || 'bn';
  const book = await getBookById(params.id);
  const categories = await getAllCategories();

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <EbookForm
        locale={locale}
        initialData={book}
        categories={categories}
        isEdit={true}
      />
    </div>
  );
}
