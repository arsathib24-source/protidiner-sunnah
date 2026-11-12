import React from 'react';
import { FolderTree, Plus, BookOpen, Layers } from 'lucide-react';
import { getAllCategories } from '@/lib/admin/admin-store';
import { AddCategoryModal } from '@/components/admin/add-category-modal';

export default async function AdminCategoriesPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <FolderTree className="w-6 h-6 text-primary" />
            <span>ক্যাটাগরি ব্যবস্থাপনা (Categories Taxonomy)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            ইসলামিক জ্ঞানের বিষয়ভিত্তিক শ্রেণিবিন্যাস ও বহুভাষিক নামসমূহ পরিচালনা করুন
          </p>
        </div>

        <AddCategoryModal nextOrder={categories.length + 1} />
      </div>

      {/* Categories Grid / Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">ক্রম</th>
              <th className="px-6 py-4">বাংলা নাম</th>
              <th className="px-6 py-4">আরবি নাম</th>
              <th className="px-6 py-4">ইংরেজি নাম ও স্ল্যাগ</th>
              <th className="px-6 py-4">মোট বই</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat, idx) => (
              <tr key={cat.id} className="hover:bg-muted/15 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-muted-foreground">
                  #{cat.sortOrder || idx + 1}
                </td>
                <td className="px-6 py-4 font-bold text-foreground font-bengali-heading text-base">
                  {cat.name.bn}
                </td>
                <td className="px-6 py-4 font-arabic text-muted-foreground" dir="rtl">
                  {cat.name.ar}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-medium text-foreground">{cat.name.en}</div>
                  <div className="text-[11px] font-mono text-accent">/{cat.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{cat.bookCount} টি বই</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
