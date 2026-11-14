export interface ChapterItem {
  number: number;
  slug: string;
  title: { bn: string; ar: string; en: string };
  durationMins: number;
}

export interface ReviewerInfo {
  name: string;
  title: string;
  institution: string;
  verifiedDate: string;
  notes: string;
}

export interface ClassicalBook {
  id: string;
  slug: string;
  title: { bn: string; ar: string; en: string };
  author: { 
    bn: string; 
    ar: string; 
    en: string;
    bio?: { bn: string; ar: string; en: string };
    deathYearHijri?: string;
  };
  category: { bn: string; ar: string; en: string; slug: string };
  description: { bn: string; ar: string; en: string };
  fullDescription?: { bn: string; ar: string; en: string };
  chapterCount: number; // Available transcribed digital chapters
  totalCompiledChapters?: number; // Total chapters in full classical manuscript
  editorialNotice?: { bn: string; ar: string; en: string };
  readingTimeMins: number;
  verifiedSource: string;
  reviewer: ReviewerInfo;
  publishedAt: string;
  availableLanguages: Array<'bn' | 'ar' | 'en'>;
  chapters: ChapterItem[];
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecent?: boolean;
  readCount?: number;
}

export const CLASSICAL_BOOKS: ClassicalBook[] = [
  {
    id: 'riyad-us-saliheen',
    slug: 'riyad-us-saliheen',
    title: {
      bn: 'রিয়াদুস সলেহিন',
      ar: 'رياض الصالحين من كلام سيد المرسلين',
      en: 'Riyad us-Saliheen',
    },
    author: {
      bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
      ar: 'الإمام محيي الدين أبو زكريا يحيى بن شرف النووي',
      en: 'Imam Yahya ibn Sharaf an-Nawawi (rah.)',
      deathYearHijri: '৬৭৬ হিজরি',
      bio: {
        bn: 'ইমাম আন-নববী সপ্তম হিজরি শতাব্দীর প্রখ্যাত ফকিহ, মুহাদ্দিস ও অন্যতম শীর্ষস্থানীয় ইসলামিক পণ্ডিত। তার কিতাবসমূহ বিশ্বজুড়ে সর্বাধিক সমাদৃত।',
        ar: 'من كبار فقهاء الشافعية ومحدثيهم، صاحب التصانيف المشهورة النافعة المقبولة في العالم الإسلامي.',
        en: 'A towering Islamic jurist, hadith scholar, and author of universally accepted classical literature.',
      },
    },
    category: {
      bn: 'হাদিস সংকলন',
      ar: 'الحديث الشريف',
      en: 'Hadith Collection',
      slug: 'hadith',
    },
    description: {
      bn: 'দৈনন্দিন জীবনে আমলযোগ্য সহিহ হাদিসের সর্বজনগ্রাহ্য এক অনুপম সংকলন যা প্রতিটি মুমিনের চরিত্র ও ইবাদতকে সমৃদ্ধ করে।',
      ar: 'دليل يومي شامل يجمع أمهات الأحاديث النبوية في الآداب والأخلاق والعبادات.',
      en: 'An essential compilation of authentic traditions guiding everyday conduct, morality, and worship.',
    },
    fullDescription: {
      bn: 'রিয়াদুস সলেহিন (সৎকর্মপরায়ণদের বাগান) মুসলিম বিশ্বের অন্যতম জনপ্রিয় ও পঠিত হাদিস গ্রন্থ। ইমাম নববী (রহ.) এতে ব্যক্তিগত জীবন, ইবাদত-বন্দেগি, সামাজিক লেনদেন ও উত্তম চরিত্র সংক্রান্ত সহিহ বুখারি ও সহিহ মুসলিমের প্রায় ১৮৯৬টি প্রামাণিক হাদিস বিষয়ভিত্তিক বিন্যাস করেছেন। প্রতিটি অধ্যায়ের শুরুতে প্রাসঙ্গিক কোরআনের আয়াত উদ্ধৃত করে তিনি বিষয়বস্তুকে আরও প্রাণবন্ত করেছেন।',
      ar: 'يعد كتاب رياض الصالحين من أكثر كتب الحديث تداولاً وقبولاً في مشارق الأرض ومغاربها، حيث رتبه الإمام النووي رحمه الله على الأبواب الفقهية والأخلاقية وركّز على الأحاديث الصحيحة والحسنة المقبولة للعمل اليومي.',
      en: 'The Gardens of the Righteous is one of the most widely read hadith collections in the world. Structured into thematic chapters covering faith, worship, and ethical conduct, it provides authentic guidance drawn primarily from Sahih al-Bukhari and Sahih Muslim.',
    },
    chapterCount: 5,
    totalCompiledChapters: 372,
    editorialNotice: {
      bn: 'ইমাম আন-নববী (রহ.) সংকলিত মূল রিয়াযুস সলেহিনে মোট ৩৭২টি অধ্যায় ও ১৮৯৬টি হাদিস রয়েছে। বর্তমান ডিজিটাল সংস্করণে প্রারম্ভিক ৫টি মৌলিক অধ্যায় সম্পূর্ণ নির্ভরযোগ্য তাহকিক ও অনুবাদসহ উন্মুক্ত করা হয়েছে। অবশিষ্ট ৩৬৭টি অধ্যায় গবেষক প্যানেল দ্বারা মূল পাণ্ডুলিপির আলোকে সম্পাদন ও প্রুফরিডিং প্রক্রিয়াটির মধ্য দিয়ে যাচ্ছে।',
      ar: 'يضم الأصل المطبوع لكتاب رياض الصالحين للإمام النووي رحمه الله ٣٧٢ باباً ونحو ١٨٩٦ حديثاً. تم تدقيق وضبط الفصول الخمسة الأولى رقمياً، بينما تجري مراجعة بقية الأبواب تباعاً.',
      en: 'The complete classical work by Imam An-Nawawi contains 372 chapters and approximately 1,896 hadiths. Currently, the first 5 foundational chapters have been digitally verified, transcribed, and proofread. The remaining 367 chapters are actively undergoing textual review against the physical print edition.',
    },
    readingTimeMins: 45,
    verifiedSource: 'দারুসসালাম প্রকাশনী, রিয়াদ (তাহকিককৃত মূল সংস্করণ ২০০০)',
    reviewer: {
      name: 'মাওলানা মুহাম্মদ আব্দুল্লাহ আল-কাফী',
      title: 'সিনিয়র হাদিস গবেষক ও খতিব',
      institution: 'ইসলামিক রিসার্চ একাডেমি',
      verifiedDate: '১৫ অক্টোবর ২০২৬',
      notes: 'দারুসসালাম মুদ্রিত মূল আরবি সংস্করণের সাথে প্রতিটি হাদিসের নম্বর ও তাহকিক পুরোপুরি মিলিয়ে দেখা হয়েছে। কোনো দুর্বল বা মওজু হাদিস নেই।',
    },
    publishedAt: '2026-10-20',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'chapter-1-iklas-niyyat', title: { bn: '১. ইখলাস ও নিয়ত শুদ্ধিকরণ', ar: '١. باب الإخلاص وإحضار النية', en: '1. Sincerity and Intention' }, durationMins: 8 },
      { number: 2, slug: 'chapter-2-tawbah', title: { bn: '২. তাওবাহ ও অনুশোচনা', ar: '٢. باب التوبة', en: '2. Repentance' }, durationMins: 10 },
      { number: 3, slug: 'chapter-3-sabr', title: { bn: '৩. ধৈর্য ও সবর ধারণ', ar: '٣. باب الصبر', en: '3. Patience and Perseverance' }, durationMins: 12 },
      { number: 4, slug: 'chapter-4-sidq', title: { bn: '৪. সত্যবাদিতা', ar: '٤. باب الصدق', en: '4. Truthfulness' }, durationMins: 7 },
      { number: 5, slug: 'chapter-5-muraqabah', title: { bn: '৫. মুরাকাবা (আল্লাহর সচেতনতা)', ar: '٥. باب المراقبة', en: '5. Self-Awareness & Watchfulness' }, durationMins: 8 },
    ],
    isFeatured: true,
    isPopular: true,
    readCount: 15420,
  },
  {
    id: 'hisnul-muslim',
    slug: 'hisnul-muslim',
    title: {
      bn: 'হিসনুল মুসলিম',
      ar: 'حصن المسلم من أذكار الكتاب والسنة',
      en: 'Hisnul Muslim',
    },
    author: {
      bn: 'ড. সাঈদ ইবন ওয়াহফ আল-কাহত্বানী (রহ.)',
      ar: 'الدكتور سعيد بن علي بن وهف القحطاني',
      en: 'Dr. Saeed bin Ali al-Qahtani (rah.)',
      deathYearHijri: '১৪৪০ হিজরি',
      bio: {
        bn: 'বিখ্যাত সৌদি আলেম ও বহু জনপ্রিয় ইসলামিক গ্রন্থের রচয়িতা। হিসনুল মুসলিম তার সর্বাধিক সমাদৃত সংকলন।',
        ar: 'عالم وداعية سعودي معاصر، اشتهر بمؤلفاته في الفقه والأذكار والدعوة.',
        en: 'A prominent contemporary Islamic scholar, known globally for his devotional and dhikr compilations.',
      },
    },
    category: {
      bn: 'দোয়া ও জিকির',
      ar: 'الأذكار والدعاء',
      en: 'Duas & Remembrances',
      slug: 'duas',
    },
    description: {
      bn: 'কুরআন ও সহিহ হাদিস থেকে চয়নকৃত সকাল-সন্ধ্যার জিকির এবং প্রাত্যহিক জীবনের অত্যন্ত প্রয়োজনীয় মাসনুন দোয়া।',
      ar: 'أذكار اليوم والليلة من القرآن والسنة الصحيحة لحصن المؤمن في كل وقت وحين.',
      en: 'Fortress of the Muslim: Authentic supplications and daily dhikr derived from the Quran and Sunnah.',
    },
    fullDescription: {
      bn: 'হিসনুল মুসলিম (কুরআন ও সুন্নাহর আলোকে মুসলিমের দুর্গ) একটি অতি পরিচিত ও জনপ্রিয় দোয়ার সংকলন। ঘুম থেকে জাগা থেকে শুরু করে নিদ্রা যাওয়া পর্যন্ত, বিপদ-আপদ, আনন্দ-বেদনা, সালাতের পরের দোয়া ইত্যাদি জীবনের প্রতিটি মুহূর্তের মাসনুন আমল এতে সন্নিবেশিত। প্রতিটি দোয়ার সাথে মূল সহিহ গ্রন্থের সূত্র উল্লেখ রয়েছে।',
      ar: 'كتيب جامع وميسر في الأدعية والأذكار المأثورة عن رسول الله صلى الله عليه وسلم، مخرجة من أصح دواوين السنة النبوية، ليكون حصنًا منيعًا لكل مسلم.',
      en: 'Fortress of the Muslim is an indispensable pocket companion for every believer, containing authenticated prophetic supplications for day, night, prayers, and trials.',
    },
    chapterCount: 4,
    totalCompiledChapters: 132,
    editorialNotice: {
      bn: 'ড. সাঈদ আল-কাহতানী (রহ.) সংকলিত হিসনুল মুসলিমের মূল গ্রন্থে মোট ১৩২টি পরিচ্ছেদ রয়েছে। এখানে সর্বাধিক পঠিত প্রাত্যহিক ৪টি পরিচ্ছেদ তাহকিকসহ উন্মুক্ত রাখা হয়েছে; অবশিষ্ট পরিচ্ছেদসমূহ সম্পাদনাধীন।',
      ar: 'يشتمل كتاب حصن المسلم على ١٣٢ باباً من الأذكار النبوية. نوفر حالياً الأبواب اليومية الأكثر تداولاً، مع استمرار إدراج بقية الأذكار تباعاً.',
      en: 'The original Hisnul Muslim handbook contains 132 chapters of prophetic invocations. Core daily chapters are currently available with verified sources, with remaining chapters undergoing audit.',
    },
    readingTimeMins: 15,
    verifiedSource: 'মাকতাবাতুল মাআরিফ রিয়াদ (সপ্তম পরিমার্জিত সংস্করণ)',
    reviewer: {
      name: 'মাওলানা আমিনুর রহমান',
      title: 'মুফতি ও দাওয়াহ ইনচার্জ',
      institution: 'মারকাজুত তাকওয়া',
      verifiedDate: '০২ সেপ্টেম্বর ২০২৬',
      notes: 'প্রতিটি দোয়ার আরবি হরকত ও বাংলা উচ্চারণের বিশুদ্ধতা নিশ্চিত করা হয়েছে। সনদগুলো পুরোপুরি সহিহ হাদিস দ্বারা সমর্থিত।',
    },
    publishedAt: '2026-09-10',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'sleep-wake-dhikr', title: { bn: '১. ঘুম থেকে জাগ্রত হওয়ার দোয়া', ar: '١. أذكار الاستيقاظ من النوم', en: '1. Remembrance upon Waking' }, durationMins: 3 },
      { number: 2, slug: 'garment-dhikr', title: { bn: '২. পোশাক পরিধান ও খোলার দোয়া', ar: '٢. دعاء لبس الثوب', en: '2. Supplication for Attire' }, durationMins: 2 },
      { number: 3, slug: 'toilet-dhikr', title: { bn: '৩. শৌচাগারে প্রবেশ ও বের হওয়ার দোয়া', ar: '٣. دعاء دخول الخلاء والخروج منه', en: '3. Bathroom Etiquette & Supplication' }, durationMins: 3 },
      { number: 4, slug: 'morning-evening-dhikr', title: { bn: '৪. সকাল ও সন্ধ্যার গুরুত্বপূর্ণ জিকির', ar: '٤. أذكار الصباح والمساء', en: '4. Morning and Evening Remembrances' }, durationMins: 7 },
    ],
    isFeatured: true,
    isPopular: true,
    readCount: 22890,
  },
  {
    id: 'arbain-nawawi',
    slug: 'arbain-nawawi',
    title: {
      bn: 'চল্লিশ হাদিস (আল-আরবাঈন)',
      ar: 'الأربعون النووية في مباني الإسلام',
      en: 'An-Nawawi’s Forty Hadith',
    },
    author: {
      bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
      ar: 'الإمام النووي رحمه الله',
      en: 'Imam Yahya ibn Sharaf an-Nawawi (rah.)',
      deathYearHijri: '৬৭৬ হিজরি',
      bio: {
        bn: 'ইসলামের ইতিহাসে অন্যতম শ্রেষ্ঠ পণ্ডিত ও মুহাদ্দিস।',
        ar: 'عالم الحديث والفقه الشهير صاحب المؤلفات العظيمة.',
        en: 'Renowned hadith master and jurist.',
      },
    },
    category: {
      bn: 'মৌলিক ইসলাম',
      ar: 'أصول الدين',
      en: 'Foundations of Faith',
      slug: 'aqeedah',
    },
    description: {
      bn: 'দ্বীন ইসলামের সর্বাধিক গুরুত্বপূর্ণ মূলনীতি ও স্তম্ভ সম্বলিত বিয়াল্লিশটি অতি নির্ভরযোগ্য ও সার্বজনীন সহিহ হাদিস।',
      ar: 'جوامع الكلم وقواعد الدين الإسلامي الأساسية في اثنين وأربعين حديثًا نبويًا صحيحًا.',
      en: 'The forty-two pivotal prophetic statements embodying the comprehensive fundamentals of Islam.',
    },
    fullDescription: {
      bn: 'আল-আরবাঈন আন-নববিয়্যাহ হলো এমন একটি সংক্ষিপ্ত সংকলন যা প্রতিটি মুসলিমের দ্বীনি জ্ঞানের বুনিয়াদ গড়ে তোলে। ইমাম নববী এতে এমন ৪২টি হাদিস চয়ন করেছেন যার প্রতিটিকে আলেমগণ ‘দ্বীনের অর্ধেক’ বা ‘দ্বীনের স্তম্ভ’ বলে আখ্যায়িত করেছেন। যেমন: নিয়তের হাদিস, জিবরাইলের হাদিস, হালাল-হারামের হাদিস।',
      ar: 'أعظم متون الحديث حفظاً ونفعاً، تشتمل على اثنين وأربعين حديثاً تمثل قواعد الإسلام وأصول الشريعة المحمدية السمحة.',
      en: 'An essential primer comprising 42 foundational statements of the Messenger of Allah ﷺ that encapsulate the core axioms of Islam.',
    },
    chapterCount: 4,
    totalCompiledChapters: 42,
    editorialNotice: {
      bn: 'ইমাম নববীর মূল সংকলনে মোট ৪২টি মৌলিক হাদিস রয়েছে। বর্তমান পর্বে প্রাথমিক ৪টি সুপরিচিত হাদিস সম্পূর্ণ ব্যাখ্যাসহ সন্নিবেশিত হয়েছে; অবশিষ্ট ৩৮টি হাদিস সম্পাদনাধীন।',
      ar: 'تضم الأربعون النووية ٤٢ حديثاً جامعاً. نوفر حالياً الأحاديث الأربعة الأولى مع الاستمرار في إدراج بقية المتون.',
      en: 'The compilation consists of 42 foundational hadiths. The opening four narrations are fully transcribed here, with the remaining 38 undergoing scholarly proofreading.',
    },
    readingTimeMins: 12,
    verifiedSource: 'আল-মাকতাবাতুশ শামিলা তাহকিক সংস্করণ',
    reviewer: {
      name: 'শায়খ মাহফুজুল হক',
      title: 'মুহাদ্দিস ও বিভাগীয় প্রধান',
      institution: 'দারুল হাদিস ইনস্টিটিউট',
      verifiedDate: '১২ আগস্ট ২০২৬',
      notes: 'মূল হাদিসের সনদ ও মতনের বিশুদ্ধতা পূর্ণাঙ্গভাবে পরীক্ষিত।',
    },
    publishedAt: '2026-08-20',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'hadith-1-niyyah', title: { bn: '১. নিয়ত ও কাজের সার্থকতা', ar: '١. إنما الأعمال بالنيات', en: '1. Actions are by Intentions' }, durationMins: 3 },
      { number: 2, slug: 'hadith-2-jibril', title: { bn: '২. ইসলাম, ঈমান ও ইহসান (হাদিসে জিবরাইল)', ar: '٢. مراتب الدين: الإسلام والإيمان والإحسان', en: '2. Islam, Iman, and Ihsan' }, durationMins: 4 },
      { number: 3, slug: 'hadith-3-islam-pillars', title: { bn: '৩. ইসলামের পাঁচটি স্তম্ভ', ar: '٣. بني الإسلام على خمس', en: '3. The Five Pillars of Islam' }, durationMins: 2 },
      { number: 4, slug: 'hadith-4-creation', title: { bn: '৪. মানব সৃষ্টির পর্যায় ও ভাগ্য', ar: '٤. مراحل خلق الإنسان والقدر', en: '4. Stages of Human Creation' }, durationMins: 3 },
    ],
    isFeatured: true,
    isPopular: true,
    readCount: 18740,
  },
  {
    id: 'shamail-muhammadiyyah',
    slug: 'shamail-muhammadiyyah',
    title: {
      bn: 'আশ-শামায়েলে মুহাম্মাদিয়্যাহ',
      ar: 'الشمائل المحمدية والخصائص المصطفوية',
      en: 'Ash-Shama’il al-Muhammadiyyah',
    },
    author: {
      bn: 'ইমাম আবু ঈসা মুহাম্মদ আত-তিরমিজি (রহ.)',
      ar: 'الإمام أبو عيسى محمد بن عيسى الترمذي',
      en: 'Imam Abu Isa Muhammad at-Tirmidhi (rah.)',
      deathYearHijri: '২৭৯ হিজরি',
      bio: {
        bn: 'কুতুবে সিত্তার অন্যতম প্রধান সংকলক এবং তিরমিজি শরিফের প্রণেতা।',
        ar: 'أحد أئمة الحديث الستة الكبار، صاحب السنن والشمائل.',
        en: 'One of the six great masters of hadith and author of Sunan at-Tirmidhi.',
      },
    },
    category: {
      bn: 'সিরাতুন নবী ﷺ',
      ar: 'الشمائل والسيرة',
      en: 'Prophetic Biography',
      slug: 'seerah',
    },
    description: {
      bn: 'রাসুলুল্লাহ ﷺ-এর অতুলনীয় শারীরিক সৌন্দর্য, অনুপম চরিত্রমাধুরী, পোশাক ও জীবনযাপনের প্রামাণ্য বিবরণ।',
      ar: 'وصف دقيق لخَلق وخُلق رسول الله ﷺ الشريف وأدق تفاصيل حياته الكريمة.',
      en: 'A meticulous account of the physical appearance, sublime attributes, and noble manner of the Prophet ﷺ.',
    },
    fullDescription: {
      bn: 'ইমাম তিরমিজির এই গ্রন্থটি রাসুলুল্লাহ ﷺ-এর জীবনচরিত্র ও শামায়েলের সর্বশ্রেষ্ঠ কিতাব। এতে নবীজি ﷺ-এর পবিত্র মুখাবয়ব, চুল, হাঁটাচলা, খাবার, পানীয়, পোশাক, কথা বলার ভঙ্গি, কান্নাকাটি ও ইবাদতের নিখুঁত সহিহ বর্ণনা রয়েছে।',
      ar: 'أشمل مصنف جمع فيه الإمام الترمذي صفات النبي ﷺ الخلقية والخُلقية، مسندة بأصح الأسانيد.',
      en: 'The definitive classical work detailing the physical attributes, noble character, daily habits, and personal possessions of the Prophet ﷺ.',
    },
    chapterCount: 3,
    totalCompiledChapters: 56,
    editorialNotice: {
      bn: 'ইমাম তিরমিজির মূল শামায়েল গ্রন্থে মোট ৫৬টি পরিচ্ছেদ রয়েছে। প্রাথমিক ৩টি মূল পরিচ্ছেদ ডিজিটাল সংস্করণে উন্মুক্ত রয়েছে।',
      ar: 'يضم الشمائل المحمدية ٥٦ باباً، نوفر حالياً الأبواب الثلاثة الأولى.',
      en: 'The full work comprises 56 thematic sections. The initial 3 sections are available in this release.',
    },
    readingTimeMins: 25,
    verifiedSource: 'মাকতাবাতুল কাওসার (শায়খ আলবানীর তাহকিক সংস্করণ)',
    reviewer: {
      name: 'ড. আব্দুল বারী',
      title: 'অধ্যাপক, ইসলামিক স্টাডিজ',
      institution: 'ঢাকা ইসলামিক রিসার্চ সেন্টার',
      verifiedDate: '০১ নভেম্বর ২০২৬',
      notes: 'শায়খ আলবানী ও ইমাম ইরাকীর তাহকিক অনুযায়ী সহিহ ও হাসান হাদিসসমূহ চিহ্নিত করে সন্নিবেশিত করা হয়েছে।',
    },
    publishedAt: '2026-11-05',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'prophet-physique', title: { bn: '১. রাসুলুল্লাহ ﷺ-এর পবিত্র শারীরিক গঠন', ar: '١. باب ما جاء في خَلق رسول الله ﷺ', en: '1. Physical Description of the Prophet ﷺ' }, durationMins: 5 },
      { number: 2, slug: 'prophet-seal', title: { bn: '২. মোহরে নবুওয়াত বা সীলমোহর', ar: '٢. باب ما جاء في خاتم النبوة', en: '2. The Seal of Prophethood' }, durationMins: 4 },
      { number: 3, slug: 'prophet-hair', title: { bn: '৩. নবীজি ﷺ-এর মাথার চুল মোবারক', ar: '٣. باب ما جاء في شَعر رسول الله ﷺ', en: '3. Hair of the Prophet ﷺ' }, durationMins: 4 },
    ],
    isPopular: true,
    readCount: 12900,
  },
  {
    id: 'adab-al-mufrad',
    slug: 'adab-al-mufrad',
    title: {
      bn: 'আল-আদাবুল মুফরাদ',
      ar: 'الأدب المفرد في الأخلاق والآداب',
      en: 'Al-Adab al-Mufrad',
    },
    author: {
      bn: 'ইমাম আবু আব্দুল্লাহ মুহাম্মদ ইবনে ইসমাইল আল-বুখারি (রহ.)',
      ar: 'الإمام محمد بن إسماعيل البخاري رحمه الله',
      en: 'Imam Muhammad ibn Ismail al-Bukhari (rah.)',
      deathYearHijri: '২৫৬ হিজরি',
      bio: {
        bn: 'সহিহ বুখারির মহান সংকলক, হাদিস শাস্ত্রের অবিসংবাদিত নেতা ও ইমামুল মুহাদ্দিসিন।',
        ar: 'أمير المؤمنين في الحديث وصاحب أصح كتاب بعد كتاب الله العزيز.',
        en: 'The Master of Hadith Scholars and author of the most authentic hadith compilation.',
      },
    },
    category: {
      bn: 'আখলাক ও শিষ্টাচার',
      ar: 'الأخلاق والآداب',
      en: 'Manners & Ethics',
      slug: 'tazkiyah',
    },
    description: {
      bn: 'পিতা-মাতার খেদমত, প্রতিবেশীর হক, আত্মীয়তার সম্পর্ক ও ইসলামিক আদব-আখলাক সংক্রান্ত বুখারি শরিফের বাইরের প্রামাণিক সংকলন।',
      ar: 'كتاب جامع في البر والصلة ومكارم الأخلاق النبوية والآداب الإسلامية الرفيعة.',
      en: 'A dedicated compilation by Imam Bukhari on personal ethics, filial piety, and social etiquette.',
    },
    fullDescription: {
      bn: 'ইমাম বুখারির এক অনন্য সংকলন যা চরিত্র গঠন ও সামাজিক শিষ্টাচারের উপর বিশেষভাবে নিবেদিত।',
      ar: 'كتاب عظيم في تهذيب النفوس ومكارم الأخلاق النبوية.',
      en: 'Imam Bukhari\'s celebrated work focused exclusively on Islamic manners and etiquette.',
    },
    chapterCount: 3,
    totalCompiledChapters: 644,
    editorialNotice: {
      bn: 'ইমাম বুখারির মূল গ্রন্থে ৬৪৪টি পরিচ্ছেদ রয়েছে। প্রাথমিক ৩টি মৌলিক পরিচ্ছেদ যাচাইকৃত অনুবাদসহ এখানে পরিবেশিত হয়েছে।',
      ar: 'يشتمل الكتاب على ٦٤٤ باباً، وتتوفر حالياً الأبواب الثلاثة الأولى.',
      en: 'The full compilation consists of 644 chapters. The initial three sections are currently verified and available.',
    },
    readingTimeMins: 35,
    verifiedSource: 'মুহাম্মদ ফুয়াদ আব্দুল বাকি সংস্করণ (দারুল বাশার)',
    reviewer: {
      name: 'মাওলানা মাহমুদ হাসান',
      title: 'মুহাদ্দিস',
      institution: 'মারকাযুন নূর ঢাকা',
      verifiedDate: '০৫ অক্টোবর ২০২৬',
      notes: 'বুখারির মূল পাণ্ডুলিপির সাথে যাচাইকৃত।',
    },
    publishedAt: '2026-10-15',
    availableLanguages: ['bn', 'ar'],
    chapters: [
      { number: 1, slug: 'parents-honor', title: { bn: '১. পিতা-মাতার সেবা ও সদ্ব্যবহার', ar: '١. باب بر الوالدين', en: '1. Dutifulness to Parents' }, durationMins: 6 },
      { number: 2, slug: 'kinship-ties', title: { bn: '২. আত্মীয়তার বন্ধন রক্ষা', ar: '٢. باب صلة الرحم', en: '2. Upholding Ties of Kinship' }, durationMins: 5 },
      { number: 3, slug: 'neighbor-rights', title: { bn: '৩. প্রতিবেশীর অধিকার ও কল্যাণকামিতা', ar: '٣. باب حق الجار', en: '3. Rights of the Neighbor' }, durationMins: 5 },
    ],
    isRecent: true,
    readCount: 9400,
  },
  {
    id: 'bulugh-al-maram',
    slug: 'bulugh-al-maram',
    title: {
      bn: 'বুলুগুল মারাম',
      ar: 'بلوغ المرام من أدلة الأحكام',
      en: 'Bulugh al-Maram',
    },
    author: {
      bn: 'হাফেজ ইবনে হাজার আল-আসকালানী (রহ.)',
      ar: 'الحافظ أحمد بن علي بن حجر العسقلاني',
      en: 'Al-Hafidh Ibn Hajar al-Asqalani (rah.)',
      deathYearHijri: '৮৫২ হিজরি',
      bio: {
        bn: 'ফাতহুল বারির মহান রচয়িতা ও হাদিস শাস্ত্রের মুকুটহীন সম্রাট।',
        ar: 'شيخ الإسلام وأمير المؤمنين في الحديث في زمانه، صاحب فتح الباري.',
        en: 'The definitive commentator of Sahih al-Bukhari and master scholar of hadith jurisprudence.',
      },
    },
    category: {
      bn: 'ফিকহুস সুন্নাহ',
      ar: 'الفقه وأدلة الأحكام',
      en: 'Fiqh Evidences',
      slug: 'fiqh',
    },
    description: {
      bn: 'শরয়ি বিধিবিধানের মূল দলিল ও প্রমাণের সহিহ হাদিসসমূহের অনন্য এবং বিশ্বস্ত সংকলন।',
      ar: 'نخبة أحاديث الأحكام الفقهية مع بيان درجتها وصحتها وتخريجها بدقة بالغة.',
      en: 'The definitive compilation of hadith evidences forming the foundation of Islamic jurisprudence.',
    },
    fullDescription: {
      bn: 'ইমাম ইবনে হাজার আল-আসকালানী ফিকহি আহকামের প্রমাণ্য হাদিসসমূহ এই কিতাবে পুঙ্খানুপুঙ্খভাবে সংকলন করেছেন।',
      ar: 'أهم كتاب جمع أحاديث الأحكام الفقهية مع تخريجها وبيان عللها.',
      en: 'The quintessential collection of legal hadiths providing source evidences for Islamic jurisprudence.',
    },
    chapterCount: 3,
    totalCompiledChapters: 450,
    editorialNotice: {
      bn: 'মূল সংকলনে ৪৫০টি অনুচ্ছেদ রয়েছে। প্রাথমিক ৩টি অনুচ্ছেদ এখানে তাহকিকসহ উন্মুক্ত করা হয়েছে।',
      ar: 'يشتمل الكتاب على ٤٥٠ فصلاً، نوفر منها الفصول الثلاثة الأولى.',
      en: 'The original work contains 450 sections. The foundational 3 sections are available in this digital edition.',
    },
    readingTimeMins: 30,
    verifiedSource: 'দারুল ফিকর তাহকিক সংস্করণ',
    reviewer: {
      name: 'মাওলানা কামরুল হাসান',
      title: 'ফিকহ ও উসুল গবেষক',
      institution: 'ইসলামিক ফিকহ একাডেমি',
      verifiedDate: '২০ সেপ্টেম্বর ২০২৬',
      notes: 'ইবনে হাজারের সনদের মান ও তাহকিক পুরোপুরি অবিকৃতভাবে সংরক্ষিত।',
    },
    publishedAt: '2026-09-25',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'purity-water', title: { bn: '১. পবিত্রতা ও পানির বিধান', ar: '١. كتاب الطهارة: باب المياه', en: '1. Book of Purification: Waters' }, durationMins: 6 },
      { number: 2, slug: 'utensils-purity', title: { bn: '২. পাত্রের পবিত্রতা ও অপবিত্রতা', ar: '٢. باب الآنية', en: '2. Utensils' }, durationMins: 4 },
      { number: 3, slug: 'wudu-prayers', title: { bn: '৩. অজু ও সালাতের প্রস্তুতি', ar: '٣. باب نواقض الوضوء', en: '3. Nullifiers of Wudu' }, durationMins: 5 },
    ],
    isRecent: true,
    readCount: 8750,
  },
  {
    id: 'kitab-at-tawheed',
    slug: 'kitab-at-tawheed',
    title: {
      bn: 'কিতাবুত তাওহিদ',
      ar: 'كتاب التوحيد الذي هو حق الله على العبيد',
      en: 'Kitab at-Tawheed',
    },
    author: {
      bn: 'শায়খুল ইসলাম মুহাম্মদ ইবনে আব্দুল ওয়াহহাব (রহ.)',
      ar: 'الشيخ محمد بن عبد الوهاب رحمه الله',
      en: 'Muhammad ibn Abd al-Wahhab (rah.)',
      deathYearHijri: '১২০৬ হিজরি',
      bio: {
        bn: 'বিশুদ্ধ তাওহিদের পুনর্জাগরণের প্রখ্যাত প্রচারক ও আলেম।',
        ar: 'مجدد الدعوة إلى التوحيد الخالص والرجوع إلى الكتاب والسنة.',
        en: 'A prominent theologian known for his strict emphasis on monotheistic creed.',
      },
    },
    category: {
      bn: 'আকিদা ও বিশ্বাস',
      ar: 'العقيدة والتوحيد',
      en: 'Islamic Monotheism',
      slug: 'aqeedah',
    },
    description: {
      bn: 'আল্লাহ তাআলার একত্ববাদ, শিরকের ভয়াবহতা এবং বিশুদ্ধ ঈমান রক্ষার মৌলিক দলিলভিত্তিক গ্রন্থ।',
      ar: 'بيان حق الله على العبيد في التوحيد الخالص والتحذير من الشرك ومظاهره.',
      en: 'Clarification of the essential monotheistic creed and preservation of pure faith according to Quran and Sunnah.',
    },
    chapterCount: 3,
    totalCompiledChapters: 67,
    editorialNotice: {
      bn: 'মূল কিতাবে ৬৭টি পরিচ্ছেদ রয়েছে। প্রারম্ভিক ৩টি মূল অধ্যায় এখানে সম্পূর্ণ তাহকিকসহ সংকলিত হয়েছে।',
      ar: 'يشتمل الكتاب على ٦٧ باباً، نوفر منها الأبواب الثلاثة الأولى.',
      en: 'The complete treatise contains 67 chapters. The initial 3 chapters are verified and published here.',
    },
    readingTimeMins: 15,
    verifiedSource: 'দারুসসালাম প্রকাশনী সংস্করণ',
    reviewer: {
      name: 'মাওলানা তরিকুল ইসলাম',
      title: 'আকিদা গবেষক',
      institution: 'তাওহিদ রিসার্চ সেন্টার',
      verifiedDate: '০৫ সেপ্টেম্বর ২০২৬',
      notes: 'কুরআনের আয়াত ও সহিহ হাদিসের রেফারেন্স যাচাইকৃত।',
    },
    publishedAt: '2026-09-15',
    availableLanguages: ['bn', 'ar', 'en'],
    chapters: [
      { number: 1, slug: 'tawheed-virtue', title: { bn: '১. তাওহিদের ফজিলত ও মর্যাদা', ar: '١. باب فضل التوحيد وما يكفر من الذنوب', en: '1. The Virtue of Monotheism' }, durationMins: 5 },
      { number: 2, slug: 'fear-of-shirk', title: { bn: '২. শিরকের ভয়াবহতা ও ভীতি', ar: '٢. باب الخوف من الشرك', en: '2. The Fear of Shirk' }, durationMins: 4 },
      { number: 3, slug: 'call-to-tawheed', title: { bn: '৩. তাওহিদের দিকে দাওয়াত দেওয়ার নির্দেশ', ar: '٣. باب الدعاء إلى شهادة أن لا إله إلا الله', en: '3. Calling to the Testimony of Faith' }, durationMins: 5 },
    ],
    isRecent: true,
    readCount: 7920,
  },
];
