'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Upload,
  ShieldCheck,
  Sparkles,
  Loader2,
  FileText,
  Languages,
  Layers,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminEbook, AdminCategory, EbookStatus } from '@/lib/admin/admin-store';
import { createBookAction, updateBookAction } from '@/lib/admin/actions';

interface EbookFormProps {
  locale: string;
  initialData?: AdminEbook;
  categories: AdminCategory[];
  isEdit?: boolean;
}

export const EbookForm: React.FC<EbookFormProps> = ({
  locale,
  initialData,
  categories,
  isEdit = false,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [coverPreview, setCoverPreview] = useState(
    initialData?.coverUrl || '/covers/default-book.webp'
  );

  // Form State
  const [titleBn, setTitleBn] = useState(initialData?.title.bn || '');
  const [titleAr, setTitleAr] = useState(initialData?.title.ar || '');
  const [titleEn, setTitleEn] = useState(initialData?.title.en || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [authorBn, setAuthorBn] = useState(initialData?.author.bn || '');
  const [authorAr, setAuthorAr] = useState(initialData?.author.ar || '');
  const [authorEn, setAuthorEn] = useState(initialData?.author.en || '');
  const [deathYearHijri, setDeathYearHijri] = useState(initialData?.author.deathYearHijri || '');
  const [categorySlug, setCategorySlug] = useState(initialData?.category.slug || 'hadith');
  const [descriptionBn, setDescriptionBn] = useState(initialData?.description.bn || '');
  const [descriptionAr, setDescriptionAr] = useState(initialData?.description.ar || '');
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description.en || '');
  const [sourceReference, setSourceReference] = useState(initialData?.sourceReference || '');
  const [authenticityGrade, setAuthenticityGrade] = useState(
    initialData?.authenticityGrade || 'সহিহ ও নির্ভরযোগ্য (Sahih)'
  );
  const [chapterCount, setChapterCount] = useState(initialData?.chapterCount || 1);
  const [readingTimeMins, setReadingTimeMins] = useState(initialData?.readingTimeMins || 15);
  const [status, setStatus] = useState<EbookStatus>(initialData?.status || 'draft');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isPopular, setIsPopular] = useState(initialData?.isPopular || false);

  // Audit Checklist State
  const [physicalSourceVerified, setPhysicalSourceVerified] = useState(
    initialData?.audit.physicalSourceVerified || false
  );
  const [sanadChecked, setSanadChecked] = useState(
    initialData?.audit.sanadChecked || false
  );
  const [matnChecked, setMatnChecked] = useState(
    initialData?.audit.matnChecked || false
  );
  const [reviewerNotes, setReviewerNotes] = useState(
    initialData?.audit.reviewerNotes || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side quick validation
    if (!titleBn.trim() || !titleAr.trim() || !authorBn.trim() || !sourceReference.trim()) {
      setError('বাংলা শিরোনাম, আরবি শিরোনাম, রচয়িতার নাম এবং প্রিন্ট রেফারেন্স প্রদান করা আবশ্যক।');
      return;
    }

    const formData = new FormData();
    formData.append('titleBn', titleBn);
    formData.append('titleAr', titleAr);
    formData.append('titleEn', titleEn);
    formData.append('slug', slug);
    formData.append('authorBn', authorBn);
    formData.append('authorAr', authorAr);
    formData.append('authorEn', authorEn);
    formData.append('categorySlug', categorySlug);
    formData.append('descriptionBn', descriptionBn);
    formData.append('descriptionAr', descriptionAr);
    formData.append('descriptionEn', descriptionEn);
    formData.append('sourceReference', sourceReference);
    formData.append('authenticityGrade', authenticityGrade);
    formData.append('chapterCount', String(chapterCount));
    formData.append('readingTimeMins', String(readingTimeMins));
    formData.append('status', status);
    formData.append('isFeatured', String(isFeatured));
    formData.append('isPopular', String(isPopular));
    formData.append('physicalSourceVerified', String(physicalSourceVerified));
    formData.append('sanadChecked', String(sanadChecked));
    formData.append('matnChecked', String(matnChecked));
    formData.append('reviewerNotes', reviewerNotes);

    startTransition(async () => {
      try {
        let res;
        if (isEdit && initialData) {
          res = await updateBookAction(initialData.id, formData);
        } else {
          res = await createBookAction(formData);
        }

        if (res.success) {
          setSuccess(isEdit ? 'ই-বুকের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!' : 'নতুন ই-বুক সফলভাবে সংরক্ষিত হয়েছে!');
          setTimeout(() => {
            router.push(`/${locale}/admin/books`);
          }, 800);
        } else {
          setError(res.error || 'একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        }
      } catch (err: any) {
        setError(err.message || 'সংরক্ষণ ব্যর্থ হয়েছে।');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/books`}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold font-bengali-heading text-foreground">
              {isEdit ? `ই-বুক সম্পাদনা: ${initialData?.title.bn}` : 'নতুন ই-বুক যুক্ত করুন'}
            </h2>
            <p className="text-xs text-muted-foreground">
              ইসলামিক ঐতিহ্যের প্রামাণ্যতা রক্ষার্থে প্রতিটি তথ্য সতর্কতার সাথে লিখুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/${locale}/admin/books`}>
            <Button variant="outline" type="button" size="sm">
              বাতিল
            </Button>
          </Link>
          <Button
            type="submit"
            variant="accent"
            size="sm"
            disabled={isPending}
            className="font-semibold shadow-md flex items-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isEdit ? 'পরিবর্তন সংরক্ষণ করুন' : 'ই-বুক তৈরি করুন'}</span>
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 2 Spans - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Multilingual Titles */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-base font-bengali-heading text-foreground flex items-center gap-2">
              <Languages className="w-4 h-4 text-primary" />
              <span>বহুভাষিক শিরোনাম ও পরিচিতি</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                বইয়ের শিরোনাম (বাংলা) <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                placeholder="যেমন: রিয়াদুস সলেহিন"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                বইয়ের মূল আরবি শিরোনাম (Original Arabic Title){' '}
                <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                dir="rtl"
                placeholder="যেমন: رياض الصالحين من كلام سيد المرسلين"
                className="font-arabic text-base"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                বইয়ের ইংরেজি শিরোনাম (English Title)
              </label>
              <Input
                type="text"
                placeholder="e.g. Riyad us-Saliheen"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                ইউআরএল স্ল্যাগ (Unique Slug)
              </label>
              <Input
                type="text"
                placeholder="যেমন: riyad-us-saliheen"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <span className="text-[11px] text-muted-foreground mt-1 block">
                অনলাইন রিডার লিংকের জন্য ব্যবহৃত হবে: /read/{slug || 'book-slug'}
              </span>
            </div>
          </div>

          {/* Section 2: Author Information */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-base font-bengali-heading text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>রচয়িতা ও সংকলকের তথ্য</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  রচয়িতার নাম (বাংলা) <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="যেমন: ইমাম নববী (রহ.)"
                  value={authorBn}
                  onChange={(e) => setAuthorBn(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  রচয়িতার নাম (আরবি)
                </label>
                <Input
                  type="text"
                  dir="rtl"
                  placeholder="الإمام النووي رحمه الله"
                  className="font-arabic"
                  value={authorAr}
                  onChange={(e) => setAuthorAr(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  ইংরেজি নাম
                </label>
                <Input
                  type="text"
                  placeholder="Imam An-Nawawi"
                  value={authorEn}
                  onChange={(e) => setAuthorEn(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  মৃত্যু সন (হিজরি)
                </label>
                <Input
                  type="text"
                  placeholder="যেমন: ৬৭৬ হিজরি"
                  value={deathYearHijri}
                  onChange={(e) => setDeathYearHijri(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-base font-bengali-heading text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>সারসংক্ষেপ ও ভূমিকা (Description)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                বাংলা সারসংক্ষেপ
              </label>
              <textarea
                rows={4}
                value={descriptionBn}
                onChange={(e) => setDescriptionBn(e.target.value)}
                placeholder="বইটির সংক্ষিপ্ত পরিচয়, গুরুত্ব এবং আলোচ্য বিষয়..."
                className="w-full p-3.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                আরবি সারসংক্ষেপ (Arabic Synopsis)
              </label>
              <textarea
                rows={3}
                dir="rtl"
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                placeholder="نبذة مختصرة عن هذا الكتاب وأهميته المباركة..."
                className="w-full p-3.5 text-sm bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-arabic"
              />
            </div>
          </div>

          {/* Section 4: Mandatory Physical Citation & Anti-Hallucination Audit */}
          <div className="bg-surface p-6 rounded-3xl border-2 border-accent/40 shadow-xs space-y-4 bg-accent/5">
            <div className="flex items-center gap-2 text-primary font-bold">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <h3 className="text-base font-bengali-heading">
                তাহকিক নিরীক্ষা ও শারীরিক মূল প্রিন্ট যাচাই (Scholarly Verification)
              </h3>
            </div>

            <p className="text-xs text-muted-foreground">
              কৃত্রিম বুদ্ধিমত্তার ভুল উদ্ধৃতি রোধে প্রতিটি হাদিস বা বইয়ের মূল কাগজের সংস্করণ উল্লেখ করা বাধ্যতামূলক।
            </p>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                শারীরিক প্রিন্ট সংস্করণের রেফারেন্স <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                value={sourceReference}
                onChange={(e) => setSourceReference(e.target.value)}
                placeholder="যেমন: দারুল হাদিস কায়রো, ১৪১৮ হি., তাহকিক: শায়খ শুআইব আল-আরনাউত"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                সনদ ও মতন প্রামাণ্যতা গ্রেড (Authenticity Grade)
              </label>
              <Input
                type="text"
                value={authenticityGrade}
                onChange={(e) => setAuthenticityGrade(e.target.value)}
                placeholder="যেমন: সহিহ ও বিশুদ্ধ (Sahih)"
              />
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-accent/20">
              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={physicalSourceVerified}
                  onChange={(e) => setPhysicalSourceVerified(e.target.checked)}
                  className="rounded text-primary focus:ring-accent"
                />
                <span>শারীরিক মূল গ্রন্থ ও পৃষ্ঠা নম্বর নিরীক্ষিত (Physical Book Verified)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={sanadChecked}
                  onChange={(e) => setSanadChecked(e.target.checked)}
                  className="rounded text-primary focus:ring-accent"
                />
                <span>সনদ ও বর্ণনাকারী পরম্পরা যাচাইকৃত (Sanad Checked)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={matnChecked}
                  onChange={(e) => setMatnChecked(e.target.checked)}
                  className="rounded text-primary focus:ring-accent"
                />
                <span>আরবি হরকত ও মূল মতন নির্ভুল (Matn Verified)</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                তাহকিক অডিট নোট (Reviewer Notes)
              </label>
              <textarea
                rows={2}
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                placeholder="যাচাইকারী আলেমের পর্যবেক্ষণ বা মন্তব্য..."
                className="w-full p-2.5 text-xs bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Cover, Category, Status */}
        <div className="space-y-6">
          {/* Status & Review Workflow */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-sm font-bengali-heading text-foreground">
              প্রকাশনা ও রিভিউ স্ট্যাটাস
            </h3>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                বর্তমান পর্যায় (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EbookStatus)}
                className="w-full p-2.5 text-sm bg-muted/40 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="draft">১. Draft (খসড়া)</option>
                <option value="review">২. Under Review (পর্যালোচনাধীন)</option>
                <option value="changes_requested">৩. Changes Requested (সংশোধন প্রত্যাশিত)</option>
                <option value="approved">৪. Approved (অনুমোদিত)</option>
                <option value="published">৫. Published (প্রকাশিত)</option>
                <option value="archived">৬. Archived (আর্কাইভকৃত)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 text-xs text-muted-foreground">
              {status === 'published' ? (
                <span className="text-emerald-700 font-medium">
                  এই বইটি বর্তমানে সাধারণ পাঠকদের জন্য উন্মুক্ত রয়েছে।
                </span>
              ) : status === 'review' ? (
                <span className="text-amber-700 font-medium">
                  বইটি বর্তমানে আলেম বোর্ডের পর্যালোচনায় রয়েছে।
                </span>
              ) : (
                <span>এটি সাধারণ পাঠকদের প্রদর্শিত হবে না।</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-sm font-bengali-heading text-foreground">
              ক্যাটাগরি নির্বাচন
            </h3>

            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full p-2.5 text-sm bg-muted/40 border border-border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name.bn} ({c.name.en})
                </option>
              ))}
            </select>
          </div>

          {/* Book Metrics */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-sm font-bengali-heading text-foreground">
              অধ্যায় ও সময় পরিমাপ
            </h3>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                অধ্যায় সংখ্যা
              </label>
              <Input
                type="number"
                min={1}
                value={chapterCount}
                onChange={(e) => setChapterCount(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                আনুমানিক পড়ার সময় (মিনিট)
              </label>
              <Input
                type="number"
                min={1}
                value={readingTimeMins}
                onChange={(e) => setReadingTimeMins(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Cover Artwork */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-4">
            <h3 className="font-bold text-sm font-bengali-heading text-foreground">
              বইয়ের প্রচ্ছদ আর্টওয়ার্ক (Cover)
            </h3>

            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-2xl bg-muted/20">
              <div className="w-24 h-36 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-md mb-3 overflow-hidden">
                <BookOpen className="w-10 h-10 text-accent" />
              </div>

              <div className="text-center">
                <label className="cursor-pointer text-xs font-bold text-accent hover:underline flex items-center gap-1.5 justify-center">
                  <Upload className="w-3.5 h-3.5" />
                  <span>প্রচ্ছদ নির্বাচন করুন</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                <p className="text-[11px] text-muted-foreground mt-1">
                  WebP বা PNG, সর্বোচ্চ 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Featured & Popular toggles */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-xs space-y-3">
            <h3 className="font-bold text-sm font-bengali-heading text-foreground">
              হোমপেজ প্রদর্শন
            </h3>

            <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-primary focus:ring-accent"
              />
              <span>ফিচার্ড ই-বুক হিসেবে দেখান</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
                className="rounded text-primary focus:ring-accent"
              />
              <span>জনপ্রিয় তালিকায় প্রদর্শন</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
