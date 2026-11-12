import React from 'react';
import { Quote, Plus, CheckCircle2, BookOpen } from 'lucide-react';
import { getAllHadithReferences } from '@/lib/admin/admin-store';
import { AddHadithModal } from '@/components/admin/add-hadith-modal';

export default async function AdminHadithRefsPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const hadiths = await getAllHadithReferences();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <Quote className="w-6 h-6 text-primary" />
            <span>হাদিস রেফারেন্স ভল্ট (Hadith References)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            বইসমূহে উদ্ধৃত বিশুদ্ধ হাদিসের আরবি মতন, সনদ, কানোনিকাল নম্বর ও তাহকিক গ্রেড
          </p>
        </div>

        <AddHadithModal />
      </div>

      <div className="space-y-4">
        {hadiths.map((h) => (
          <div
            key={h.id}
            className="bg-surface p-6 rounded-3xl border border-border shadow-xs hover:border-accent/40 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-foreground">
                  {h.collectionName}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted text-accent-dark">
                  হাদিস নং {h.hadithNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  {h.grade}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {h.bookSlug}
                </span>
              </div>
            </div>

            {/* Narrator */}
            <div className="text-xs font-medium text-foreground/80">
              <span className="text-muted-foreground">বর্ণনাকারী:</span> {h.narrator}
            </div>

            {/* Arabic Text with Tashkeel */}
            <div
              dir="rtl"
              className="p-4 rounded-2xl bg-muted/20 border border-border font-arabic text-lg sm:text-xl leading-loose text-foreground"
            >
              {h.arabicText}
            </div>

            {/* Bengali Translation */}
            <div className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold text-xs text-muted-foreground block mb-1">
                অনুবাদ:
              </span>
              {h.bengaliTranslation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
