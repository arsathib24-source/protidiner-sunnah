import React from 'react';
import Link from 'next/link';
import { Bookmark, BookOpen } from 'lucide-react';
import { SectionHeader } from '@/components/ui/decorative';
import { Button } from '@/components/ui/button';

export default function BookmarksPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang || 'bn';

  return (
    <div className="py-12 md:py-20 bg-background bg-islamic-pattern min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 space-y-10 max-w-4xl">
        <SectionHeader
          badge="সংরক্ষিত সংগ্রহশালা"
          title="আপনার সংরক্ষিত বুকমার্ক ও নোট"
          subtitle="পড়ার সময় সংরক্ষিত প্রিয় আয়াত, হাদিস ও গুরুত্বপূর্ণ অনুচ্ছেদসমূহ এখানে তালিকাভুক্ত থাকে।"
        />

        <div className="text-center py-20 bg-surface rounded-3xl border border-border/80 shadow-card p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent-dark flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-bengali-heading text-primary">
            বর্তমানে কোনো বুকমার্ক সংরক্ষিত নেই
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            যেকোনো কিতাব পড়ার সময় ডানপাশের বুকমার্ক রিবনে ক্লিক করে আপনার গুরুত্বপূর্ণ অংশগুলো এখানে সহজে সংরক্ষণ করে রাখতে পারেন।
          </p>
          <div className="pt-2">
            <Link href={`/${lang}/library`}>
              <Button variant="primary" size="md">
                <BookOpen className="w-4 h-4 me-2" />
                <span>লাইব্রেরিতে বই খুঁজুন</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
