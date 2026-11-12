import React from 'react';
import Link from 'next/link';
import { ListTree, Eye, Clock, BookOpen } from 'lucide-react';
import { getAllChapters } from '@/lib/admin/admin-store';

export default async function AdminChaptersPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const chapters = await getAllChapters();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <ListTree className="w-6 h-6 text-primary" />
            <span>অধ্যায় ও পরিচ্ছেদসমূহ (All Chapters)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            মোট {chapters.length} টি ডিজিটাইজড পরিচ্ছেদ • প্রতিটি অধ্যায়ের প্রামাণ্য মতন ও সময়কাল
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">বই ও ক্রম</th>
              <th className="px-6 py-4">অধ্যায়ের শিরোনাম</th>
              <th className="px-6 py-4">আরবি শিরোনাম</th>
              <th className="px-4 py-4">পড়ার সময়</th>
              <th className="px-4 py-4">স্ট্যাটাস</th>
              <th className="px-6 py-4 text-right">প্রিভিউ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {chapters.map((ch) => (
              <tr key={ch.id} className="hover:bg-muted/15 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs font-mono font-bold bg-muted px-2 py-0.5 rounded text-foreground">
                    {ch.bookSlug} #{ch.chapterNumber}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-foreground font-bengali-heading">
                  {ch.title.bn}
                </td>
                <td className="px-6 py-4 font-arabic text-muted-foreground" dir="rtl">
                  {ch.title.ar}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>{ch.durationMins} মিনিট</span>
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                    প্রকাশিত
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/${locale}/read/${ch.bookSlug}?chapter=${ch.slug}`}
                    target="_blank"
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors inline-block"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
