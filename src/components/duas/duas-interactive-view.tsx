'use client';

import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Share2, ShieldCheck, Heart, 
  RotateCcw, BookOpen, Volume2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AUTHENTIC_DUAS, DUA_CATEGORIES, DuaItem } from '@/lib/data/duas-data';

interface DuasInteractiveViewProps {
  locale: 'bn' | 'ar' | 'en';
}

export const DuasInteractiveView: React.FC<DuasInteractiveViewProps> = ({ locale }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [counterMap, setCounterMap] = useState<Record<string, number>>({});

  const filteredDuas = selectedCategory === 'all'
    ? AUTHENTIC_DUAS
    : AUTHENTIC_DUAS.filter((d) => d.categorySlug === selectedCategory);

  const handleIncrement = (id: string, target: number) => {
    setCounterMap((prev) => {
      const current = prev[id] || 0;
      const next = current < target ? current + 1 : current;
      return { ...prev, [id]: next };
    });
  };

  const handleReset = (id: string) => {
    setCounterMap((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.titleBn}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.transliterationBn}\n\nঅনুবাদ: ${dua.translationBn}\n\nউৎস: ${dua.referenceBn}\n— প্রতিদিনের সুন্নাহ`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShare = async (dua: DuaItem) => {
    const text = `${dua.titleBn}\n${dua.arabic}\n${dua.translationBn}\n${dua.referenceBn}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: dua.titleBn,
          text: text,
          url: window.location.href,
        });
      } catch (e) {
        handleCopy(dua);
      }
    } else {
      handleCopy(dua);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-background shadow-md'
              : 'bg-surface hover:bg-surface-muted text-text-muted border border-border'
          }`}
        >
          {locale === 'bn' ? 'সকল দু‘আ' : locale === 'ar' ? 'جميع الأدعية' : 'All Supplications'}
        </button>

        {DUA_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === cat.slug
                ? 'bg-primary text-background shadow-md'
                : 'bg-surface hover:bg-surface-muted text-text-muted border border-border'
            }`}
          >
            {locale === 'bn' ? cat.bn : locale === 'ar' ? cat.ar : cat.en}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-6">
        {filteredDuas.map((dua) => {
          const count = counterMap[dua.id] || 0;
          const isCompleted = count >= dua.targetCount;

          return (
            <div
              key={dua.id}
              className="bg-surface rounded-3xl border border-border hover:border-primary/30 transition-all shadow-card hover:shadow-card-hover p-6 sm:p-8 space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="sm">
                      {locale === 'bn' ? dua.categoryTitleBn : dua.categoryTitleEn}
                    </Badge>
                    <span className="text-xs text-text-muted font-mono">
                      {dua.targetCount > 1 ? `${dua.targetCount} বার পাঠ্য` : '১ বার পাঠ্য'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-bengali-heading text-primary">
                    {locale === 'bn' ? dua.titleBn : dua.titleEn}
                  </h3>
                </div>

                {/* Digital Counter Widget */}
                {dua.targetCount > 1 && (
                  <div className="flex items-center gap-2 self-start sm:self-center bg-muted/40 p-1.5 rounded-2xl border border-border">
                    <button
                      onClick={() => handleIncrement(dua.id, dua.targetCount)}
                      disabled={isCompleted}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-accent text-primary hover:bg-accent-hover'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>সম্পন্ন ({count}/{dua.targetCount})</span>
                        </span>
                      ) : (
                        <span>তাসবীহ: {count} / {dua.targetCount}</span>
                      )}
                    </button>

                    {count > 0 && (
                      <button
                        onClick={() => handleReset(dua.id)}
                        className="p-1.5 rounded-xl text-text-muted hover:text-foreground transition-colors"
                        title="রিসেট"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Classical Arabic with Tashkeel */}
              <div dir="rtl" className="text-right py-2">
                <p className="font-arabic text-2xl sm:text-3xl text-primary leading-loose tracking-wide">
                  {dua.arabic}
                </p>
              </div>

              {/* Transliteration */}
              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20">
                <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                  {locale === 'bn' ? 'উচ্চারণ' : 'Pronunciation'}:
                </span>
                <p className="text-xs sm:text-sm text-foreground/80 font-bengali-body italic leading-relaxed">
                  {dua.transliterationBn}
                </p>
              </div>

              {/* Meaning & Benefit */}
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-text-muted block mb-1">
                    {locale === 'bn' ? 'অনুবাদ' : 'Translation'}:
                  </span>
                  <p className="text-sm sm:text-base text-foreground font-bengali-body leading-relaxed">
                    {locale === 'en' ? dua.translationEn : dua.translationBn}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/10 text-xs text-text-muted leading-relaxed">
                  <span className="font-semibold text-primary block mb-0.5">
                    {locale === 'bn' ? 'ফজিলত ও শিক্ষা:' : 'Benefit & Reward:'}
                  </span>
                  {locale === 'en' ? dua.benefitEn : dua.benefitBn}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono text-[11px]">{dua.referenceBn}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(dua)}
                    className="gap-1.5 text-xs font-semibold"
                  >
                    {copiedId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === dua.id ? (locale === 'bn' ? 'কপি হয়েছে' : 'Copied') : (locale === 'bn' ? 'কপি' : 'Copy')}</span>
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleShare(dua)}
                    className="gap-1.5 text-xs font-semibold"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{locale === 'bn' ? 'শেয়ার' : 'Share'}</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
