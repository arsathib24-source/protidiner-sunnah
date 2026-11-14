'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Copy, Check, Share2, ShieldCheck, ChevronLeft, ChevronRight, 
  Calendar, BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface HadithEntry {
  id: number;
  arabic: string;
  bengali: string;
  english: string;
  lessonBn: string;
  lessonAr: string;
  lessonEn: string;
  sourceBn: string;
  sourceAr: string;
  sourceEn: string;
  gradeBn: string;
  gradeAr: string;
  gradeEn: string;
}

const ROTATIONAL_HADITHS: HadithEntry[] = [
  {
    id: 1,
    arabic: '«مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»',
    bengali: '«যে ব্যক্তি জ্ঞান অর্জনের উদ্দেশ্যে কোনো পথ অবলম্বন করে, আল্লাহ তাআলা তার জন্য জান্নাতের পথ সহজ করে দেন।»',
    english: '«Whoever takes a path upon which he seeks knowledge, Allah makes the path to Paradise easy for him.»',
    lessonBn: 'বিশুদ্ধ উৎস থেকে ধর্মীয় জ্ঞান আহরণ জান্নাত লাভের অন্যতম সহজ ও সর্বোত্তম মাধ্যম। দ্বীনের জ্ঞানবান ব্যক্তি আল্লাহর বিশেষ অনুগ্রহপ্রাপ্ত।',
    lessonAr: 'فضل طلب العلم الشرعي وعظيم أجره عند الله تعالى؛ إذ جعل الله السعي في تحصيل العلم النافع طريقاً موصلاً إلى الجنة ورضوان الله.',
    lessonEn: 'The immense virtue of seeking authentic Islamic knowledge; striving to learn beneficial prophetic guidance is a direct pathway to Paradise.',
    sourceBn: 'সহিহ মুসলিম: ২৬৯৯ (আহমাদ: ৭১০৭, তিরমিজি: ২৬৪৬)',
    sourceAr: 'صحيح مسلم: 2699',
    sourceEn: 'Sahih Muslim: 2699',
    gradeBn: 'সহিহ (সর্বসম্মতিক্রমে বিশুদ্ধ)',
    gradeAr: 'صحيح ثابت',
    gradeEn: 'Sahih (Authentic)',
  },
  {
    id: 2,
    arabic: '«خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ»',
    bengali: '«তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শেখে এবং অন্যকে তা শেখায়।»',
    english: '«The best of you are those who learn the Quran and teach it to others.»',
    lessonBn: 'কুরআনুল কারীম তিলাওয়াত, হিফজ এবং তাদাব্বুর (উপলব্ধি) ও জীবনের প্রতিটি ক্ষেত্রে আমল করা মুমিনের শ্রেষ্ঠতম মর্যাদার কারণ।',
    lessonAr: 'خيرية هذه الأمة في العناية بكتاب الله تعالى حفظاً وتلاوة وتدبراً وتعليماً للناس.',
    lessonEn: 'True nobility in this Ummah lies in dedicating oneself to learning, contemplating, and teaching the Noble Quran.',
    sourceBn: 'সহিহ আল-বুখারি: ৫০২৭',
    sourceAr: 'صحيح البخاري: 5027',
    sourceEn: 'Sahih al-Bukhari: 5027',
    gradeBn: 'সহিহ আল-বুখারি (উচ্চতম বিশুদ্ধ মান)',
    gradeAr: 'صحيح البخاري',
    gradeEn: 'Sahih (Highest Standard)',
  },
  {
    id: 3,
    arabic: '«لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ»',
    bengali: '«তোমাদের কেউ ততক্ষণ পর্যন্ত প্রকৃত মুমিন হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তা-ই পছন্দ করে যা সে নিজের জন্য পছন্দ করে।»',
    english: '«None of you truly believes until he loves for his brother what he loves for himself.»',
    lessonBn: 'মুসলমানের প্রতি নিঃস্বার্থ ভালোবাসা, আন্তরিক কল্যাণকামিতা ও হিংসা-বিদ্বেষমুক্ত হৃদয় ঈমানের পূর্ণতার মৌলিক শর্ত।',
    lessonAr: 'سلامة الصدر ومحبة الخير لجميع المسلمين من أعظم شعب الإيمان وأمارات كماله.',
    lessonEn: 'Purity of heart and genuinely wishing goodness for others are essential hallmarks of complete faith.',
    sourceBn: 'সহিহ আল-বুখারি: ১৩, সহিহ মুসলিম: ৪৫',
    sourceAr: 'صحيح البخاري: 13، صحيح مسلم: 45',
    sourceEn: 'Sahih al-Bukhari: 13, Sahih Muslim: 45',
    gradeBn: 'মুত্তাফাকুন আলাইহ (বুখারি ও মুসলিম সর্বসম্মত)',
    gradeAr: 'متفق عليه',
    gradeEn: 'Muttafaq Alayh (Agreed Upon)',
  },
  {
    id: 4,
    arabic: '«تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ»',
    bengali: '«তোমার ভাইয়ের মুখের দিকে চেয়ে মুচকি হাসাও তোমার জন্য একটি সাদকা।»',
    english: '«Your smiling in the face of your brother is charity for you.»',
    lessonBn: 'মানুষের সাথে হাসিমুখে দেখা করা, কোমল ও অমায়িক ব্যবহার করা শুধু সামাজিক শিষ্টাচার নয়, বরং এটি একটি সওয়াবপূর্ণ ইবাদত।',
    lessonAr: 'طلاقة الوجه والبشاشة عند لقاء الناس من الصدقات المعنوية التي تؤلف القلوب.',
    lessonEn: 'Meeting fellow human beings with a cheerful demeanor and gentle smile is a spiritually rewarding act of charity.',
    sourceBn: 'জামে আত-তিরমিজি: ১৯৫৬, সহিহ ইবনে হিব্বান: ৪৭৪',
    sourceAr: 'جامع الترمذي: 1956',
    sourceEn: 'Jami` at-Tirmidhi: 1956',
    gradeBn: 'সহিহ (আলবানী রহ.)',
    gradeAr: 'صحيح بشواهده',
    gradeEn: 'Sahih (Authentic)',
  },
  {
    id: 5,
    arabic: '«الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ»',
    bengali: '«প্রকৃত মুসলিম সেই ব্যক্তি, যার জিহ্বা (কথা) ও হাত (আঘাত/ক্ষতি) থেকে অন্য মুসলিম নিরাপদ থাকে।»',
    english: '«A true Muslim is the one from whose tongue and hands other Muslims are safe.»',
    lessonBn: 'পরনিন্দা, গিবত, অপবাদ ও শারীরিক কিংবা আর্থিক ক্ষতিসাধন থেকে নিজের অঙ্গ-প্রত্যঙ্গ সংযত রাখা ইসলামের প্রধান নীতি।',
    lessonAr: 'كف الأذى وحفظ اللسان واليد عن حقوق المسلمين هو جوهر الاستسلام لأمر الله تعالى.',
    lessonEn: 'Restraining one’s speech and actions from harming others is fundamental to embodying genuine Islam.',
    sourceBn: 'সহিহ আল-বুখারি: ১০, সহিহ মুসলিম: ৪০',
    sourceAr: 'صحيح البخاري: 10، صحيح مسلم: 40',
    sourceEn: 'Sahih al-Bukhari: 10, Sahih Muslim: 40',
    gradeBn: 'মুত্তাফাকুন আলাইহ (সর্বসম্মত)',
    gradeAr: 'متفق عليه',
    gradeEn: 'Muttafaq Alayh (Agreed Upon)',
  },
  {
    id: 6,
    arabic: '«إِنَّمَا بُعِثْتُ لأُتَمِّمَ مَكَارِمَ الأَخْلاَقِ»',
    bengali: '«আমি তো কেবল উত্তম চরিত্রের পূর্ণতা সাধনের জন্যই প্রেরিত হয়েছি।»',
    english: '«I have only been sent to perfect noble character.»',
    lessonBn: 'নবীজি ﷺ-এর অন্যতম প্রধান নবুওয়াতি মিশন ছিল মানবজাতিকে সততা, বিনয়, দয়া ও অনুপম চরিত্রের শিক্ষা দান করা।',
    lessonAr: 'رسالة النبي ﷺ قامت على ترسيخ الفضائل والخصال الحميدة في النفوس والمجتمعات.',
    lessonEn: 'The core mission of the Prophet ﷺ was to instill and perfect exquisite moral virtues within humanity.',
    sourceBn: 'মুয়াত্তা মালিক: ১৬১৪, মুসনাদে আহমাদ: ৮৯৫২',
    sourceAr: 'موطأ مالك: 1614، مسند أحمد: 8952',
    sourceEn: 'Muwatta Malik: 1614, Musnad Ahmad: 8952',
    gradeBn: 'সহিহ সনদ (আলবানী রহ.)',
    gradeAr: 'صحيح',
    gradeEn: 'Sahih (Authentic)',
  },
  {
    id: 7,
    arabic: '«الطَّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ»',
    bengali: '«পবিত্রতা ঈমানের অর্ধেক, আর ‘আলহামদুলিল্লাহ’ (আল্লাহর প্রশংসা) মীযানের পাল্লা পরিপূর্ণ করে দেয়।»',
    english: '«Purity is half of faith, and saying "Al-hamdulillah" fills the scale of good deeds.»',
    lessonBn: 'বাহ্যিক ও আত্মিক পরিচ্ছন্নতা বজায় রাখা এবং সর্বাবস্থায় কৃতজ্ঞতার সাথে আল্লাহর প্রশংসা করা অপরিমেয় সওয়াবের কাজ।',
    lessonAr: 'عظمة الطهارة الحسية والمعنوية ومكانة الشكر والحمد في ميزان الحسنات يوم القيامة.',
    lessonEn: 'Physical and spiritual purity constitute half of faith, and perpetual gratitude to Allah weighs heavily on the scale.',
    sourceBn: 'সহিহ মুসলিম: ২২৩',
    sourceAr: 'صحيح مسلم: 223',
    sourceEn: 'Sahih Muslim: 223',
    gradeBn: 'সহিহ মুসলিম',
    gradeAr: 'صحيح مسلم',
    gradeEn: 'Sahih Muslim',
  }
];

interface TodaysSunnahProps {
  locale: string;
}

export const TodaysSunnah: React.FC<TodaysSunnahProps> = ({ locale }) => {
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically calculate daily index based on day of year
  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dailyIndex = dayOfYear % ROTATIONAL_HADITHS.length;
    setCurrentIndex(dailyIndex);
  }, []);

  const hadith = ROTATIONAL_HADITHS[currentIndex] || ROTATIONAL_HADITHS[0];

  const primaryTranslation =
    locale === 'ar'
      ? hadith.arabic
      : locale === 'en'
      ? hadith.english
      : hadith.bengali;

  const currentLesson =
    locale === 'ar'
      ? hadith.lessonAr
      : locale === 'en'
      ? hadith.lessonEn
      : hadith.lessonBn;

  const currentSource =
    locale === 'ar'
      ? hadith.sourceAr
      : locale === 'en'
      ? hadith.sourceEn
      : hadith.sourceBn;

  const currentGrade =
    locale === 'ar'
      ? hadith.gradeAr
      : locale === 'en'
      ? hadith.gradeEn
      : hadith.gradeBn;

  const textToCopy = `${primaryTranslation}\n${hadith.arabic}\n${currentSource} — Protidiner Sunnah`;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: locale === 'ar' ? 'سنة اليوم - سُنَّةُ كُلِّ يَوْم' : locale === 'en' ? "Today's Sunnah - Daily Sunnah" : 'আজকের সুন্নাহ - প্রতিদিনের সুন্নাহ',
          text: textToCopy,
          url: window.location.href,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : ROTATIONAL_HADITHS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < ROTATIONAL_HADITHS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div id="todays-sunnah" className="scroll-mt-28">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-light to-secondary text-primary-foreground p-8 sm:p-12 shadow-card-hover border-2 border-accent/40 overflow-hidden">
        {/* Background Islamic Star Watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <IslamicStarIcon className="w-80 h-80 text-accent" />
        </div>

        {/* Header Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-primary-light/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-bold shadow-subtle">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-accent">
                  {locale === 'bn' ? 'প্রাত্যহিক নসিহত' : locale === 'ar' ? 'هدي النبوة اليومي' : 'Daily Prophetic Guidance'}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-mono font-semibold">
                  #{hadith.id}/{ROTATIONAL_HADITHS.length}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-bengali-heading text-background">
                {locale === 'bn' ? 'আজকের সুন্নাহ ও দিকনির্দেশনা' : locale === 'ar' ? 'سنة اليوم والموعظة النبوية' : "Today's Sunnah & Reflection"}
              </h3>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              title={locale === 'bn' ? 'পূর্ববর্তী হাদিস' : 'Previous Hadith'}
              className="p-2 rounded-xl bg-primary-dark/80 hover:bg-primary-dark text-background border border-accent/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-background/80 bg-primary-dark/80 px-3.5 py-1.5 rounded-xl border border-accent/30 font-mono">
              {currentSource}
            </span>
            <button
              onClick={handleNext}
              title={locale === 'bn' ? 'পরবর্তী হাদিস' : 'Next Hadith'}
              className="p-2 rounded-xl bg-primary-dark/80 hover:bg-primary-dark text-background border border-accent/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative z-10 space-y-6">
          {/* Classical Arabic with Tashkeel */}
          <div dir="rtl" className="text-right">
            <p className="text-2xl sm:text-3xl font-arabic text-accent-light leading-loose tracking-wide">
              {hadith.arabic}
            </p>
          </div>

          {/* Localized Translation if not purely Arabic */}
          {locale !== 'ar' && (
            <blockquote className="text-lg sm:text-2xl font-medium font-bengali-heading text-background leading-relaxed border-s-4 border-accent ps-5 py-1">
              {primaryTranslation}
            </blockquote>
          )}

          {/* Scholarly Lesson */}
          <div className="p-4 rounded-2xl bg-primary-dark/60 border border-accent/20 text-xs sm:text-sm text-background/85 leading-relaxed">
            <span className="font-bold text-accent">
              {locale === 'bn' ? 'শিক্ষণীয় শিক্ষা: ' : locale === 'ar' ? 'الفائدة الإيمانية: ' : 'Reflection & Lesson: '}
            </span>
            {currentLesson}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-primary-light/60">
          <div className="flex items-center gap-2 text-xs text-accent">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {locale === 'bn' ? 'সনদ মান: ' : locale === 'ar' ? 'درجة الحديث: ' : 'Authenticity Grade: '}
              <strong className="text-background">{currentGrade}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="accent"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs font-semibold shadow-subtle"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (locale === 'bn' ? 'কপি হয়েছে' : locale === 'ar' ? 'تم النسخ' : 'Copied') : (locale === 'bn' ? 'শেয়ার করতে কপি' : locale === 'ar' ? 'نسخ للمشاركة' : 'Copy Hadith')}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1.5 text-xs bg-primary-dark/60 text-background border-accent/30 hover:bg-primary-dark"
            >
              <Share2 className="w-3.5 h-3.5 text-accent" />
              <span>{locale === 'bn' ? 'শেয়ার' : locale === 'ar' ? 'مشاركة' : 'Share'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
