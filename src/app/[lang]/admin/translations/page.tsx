import React from 'react';
import Link from 'next/link';
import { Languages, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getAllBooks } from '@/lib/admin/admin-store';

export default async function AdminTranslationsPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const books = await getAllBooks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <Languages className="w-6 h-6 text-primary" />
            <span>অনুবাদ কভারেজ ম্যাট্রিক্স (Translations Matrix)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            বাংলা, আরবি ও ইংরেজি সংস্করণের অনুবাদ স্থিতি নিরীক্ষণ করুন
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">বইয়ের শিরোনাম</th>
              <th className="px-6 py-4 text-center">বাংলা (BN)</th>
              <th className="px-6 py-4 text-center">আরবি মূল (AR)</th>
              <th className="px-6 py-4 text-center">ইংরেজি (EN)</th>
              <th className="px-6 py-4 text-right">অগ্রগতি</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {books.map((b) => {
              const hasBn = b.availableLanguages.includes('bn');
              const hasAr = b.availableLanguages.includes('ar');
              const hasEn = b.availableLanguages.includes('en');
              const percentage = Math.round(
                (([hasBn, hasAr, hasEn].filter(Boolean).length / 3) * 100)
              );

              return (
                <tr key={b.id} className="hover:bg-muted/15 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground font-bengali-heading text-base">
                      {b.title.bn}
                    </div>
                    <div className="text-xs text-muted-foreground">{b.title.en}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {hasBn ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>সম্পূর্ণ</span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">বাকি</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {hasAr ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>মূল মতন সংগৃহীত</span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">বাকি</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {hasEn ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>সম্পূর্ণ</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        <span>অনুবাদ চলমান</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold font-mono text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
