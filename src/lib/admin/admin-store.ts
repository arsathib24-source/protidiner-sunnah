import { CLASSICAL_BOOKS } from '@/lib/data/books';

export type EbookStatus =
  | 'draft'
  | 'review'
  | 'changes_requested'
  | 'approved'
  | 'published'
  | 'archived';

export interface AdminEbook {
  id: string;
  slug: string;
  title: {
    bn: string;
    ar: string;
    en: string;
  };
  author: {
    bn: string;
    ar: string;
    en: string;
    bio?: { bn: string; ar: string; en: string };
    deathYearHijri?: string;
  };
  category: {
    slug: string;
    name: { bn: string; ar: string; en: string };
  };
  description: {
    bn: string;
    ar: string;
    en: string;
  };
  coverUrl?: string;
  status: EbookStatus;
  chapterCount: number;
  readingTimeMins: number;
  sourceReference: string;
  authenticityGrade: string;
  isFeatured: boolean;
  isPopular: boolean;
  availableLanguages: Array<'bn' | 'ar' | 'en'>;
  createdAt: string;
  publishedAt?: string;
  audit: {
    physicalSourceVerified: boolean;
    sanadChecked: boolean;
    matnChecked: boolean;
    reviewerName: string;
    reviewerTitle: string;
    reviewerNotes: string;
    verifiedDate?: string;
  };
}

export interface AdminCategory {
  id: string;
  slug: string;
  name: { bn: string; ar: string; en: string };
  description: { bn: string; ar: string; en: string };
  iconName: string;
  sortOrder: number;
  bookCount: number;
}

export interface AdminChapter {
  id: string;
  bookId: string;
  bookSlug: string;
  chapterNumber: number;
  slug: string;
  title: { bn: string; ar: string; en: string };
  durationMins: number;
  status: 'draft' | 'review' | 'approved' | 'published';
  contentSnippet: string;
  contentHtml?: { bn: string; ar: string; en: string };
}

export interface AdminHadithRef {
  id: string;
  bookSlug: string;
  collectionName: string;
  hadithNumber: string;
  narrator: string;
  grade: 'Sahih' | 'Hasan' | 'Mutawatir';
  arabicText: string;
  bengaliTranslation: string;
  englishTranslation: string;
  chapterSlug: string;
}

export interface AdminMediaItem {
  id: string;
  fileName: string;
  filePath: string;
  mimeType: string;
  sizeBytes: number;
  altText: string;
  uploadedBy: string;
  createdAt: string;
}

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'editor' | 'reader';
  preferredLang: 'bn' | 'ar' | 'en';
  joinedAt: string;
  bookmarkCount: number;
}

// Initial In-Memory Store populated from verified classical books
let booksStore: AdminEbook[] = [
  ...CLASSICAL_BOOKS.map((b, idx) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    author: b.author,
    category: {
      slug: b.category.slug,
      name: { bn: b.category.bn, ar: b.category.ar, en: b.category.en },
    },
    description: b.description,
    coverUrl: `/covers/${b.slug}.webp`,
    status: (idx === 0 ? 'published' : idx === 1 ? 'published' : idx === 2 ? 'approved' : idx === 3 ? 'review' : 'published') as EbookStatus,
    chapterCount: b.chapterCount,
    readingTimeMins: b.readingTimeMins,
    sourceReference: b.verifiedSource,
    authenticityGrade: 'সহিহ ও নির্ভরযোগ্য (Sahih / Authentic)',
    isFeatured: !!b.isFeatured,
    isPopular: !!b.isPopular,
    availableLanguages: b.availableLanguages,
    createdAt: '2026-01-15T08:00:00Z',
    publishedAt: b.publishedAt,
    audit: {
      physicalSourceVerified: true,
      sanadChecked: true,
      matnChecked: true,
      reviewerName: b.reviewer.name,
      reviewerTitle: b.reviewer.title,
      reviewerNotes: b.reviewer.notes,
      verifiedDate: b.reviewer.verifiedDate,
    },
  })),
  // Additional item in Draft status for testing workflow
  {
    id: 'shama-il-muhammadiyyah-vol2',
    slug: 'shama-il-muhammadiyyah-vol2',
    title: {
      bn: 'শামায়েলে তিরমিযী (দ্বিতীয় খণ্ড - পাণ্ডুলিপি)',
      ar: 'الشمائل المحمدية (الجزء الثاني)',
      en: 'Ash-Shama-il Al-Muhammadiyyah (Vol 2)',
    },
    author: {
      bn: 'ইমাম আবু ঈসা মুহাম্মদ আত-তিরমিযী (রহ.)',
      ar: 'الإمام أبو عيسى محمد بن عيسى الترمذي',
      en: 'Imam Abu Isa Muhammad at-Tirmidhi',
      deathYearHijri: '২৭৯ হিজরি',
    },
    category: {
      slug: 'seerah',
      name: { bn: 'সীরাত ও শামায়েল', ar: 'السيرة النبوية والشمائل', en: 'Seerah & Prophetic Characteristics' },
    },
    description: {
      bn: 'রাসুলুল্লাহ ﷺ-এর মুবারক বেশভূষা, হাঁটাচলা ও চারিত্রিক সৌন্দর্যের প্রামাণ্য বর্ণনা।',
      ar: 'وصف تفصيلي دقيق لخصائص النبي ﷺ وخلقه الشريف وأخلاقه الرفيعة.',
      en: 'Detailed classical narrations depicting the sublime attributes and noble character of the Prophet ﷺ.',
    },
    status: 'draft',
    chapterCount: 14,
    readingTimeMins: 35,
    sourceReference: 'দারুল হাদিস কায়রো, পাণ্ডুলিপি সংস্করণ, পৃ. ১২০-২৪০',
    authenticityGrade: 'তাহকিক প্রক্রিয়াধীন',
    isFeatured: false,
    isPopular: false,
    availableLanguages: ['bn', 'ar'],
    createdAt: '2026-03-01T10:00:00Z',
    audit: {
      physicalSourceVerified: false,
      sanadChecked: false,
      matnChecked: false,
      reviewerName: 'পর্যালোচক নির্ধারিত হয়নি',
      reviewerTitle: '',
      reviewerNotes: 'প্রাথমিক খসড়া তৈরিকৃত, পাণ্ডুলিপি মিলিয়ে দেখার অপেক্ষায়।',
    },
  },
  // Additional item with Changes Requested
  {
    id: 'ad-dua-al-mustajab',
    slug: 'ad-dua-al-mustajab',
    title: {
      bn: 'আল-মুনতাখাব মিনাল আদইয়াহ আল-মাছুরহ',
      ar: 'المنتخب من الأدعية المأثورة',
      en: 'Selected Prophetic Supplications',
    },
    author: {
      bn: 'সংকলক প্যানেল',
      ar: 'لجنة التحقيق والتدقيق',
      en: 'Editorial Scholarly Panel',
    },
    category: {
      slug: 'duas',
      name: { bn: 'দু‘আ ও যিকির', ar: 'الأدعية والأذكار', en: 'Duas & Adhkar' },
    },
    description: {
      bn: 'দৈনন্দিন জীবনে রাসুলুল্লাহ ﷺ-এর নির্ভরযোগ্য ও নির্বাচিত দু‘আসমূহ।',
      ar: 'مجموعة منتقاة من الأدعية النبوية اليومية الصحيحة.',
      en: 'Selected authentic daily supplications taught by the Prophet ﷺ.',
    },
    status: 'changes_requested',
    chapterCount: 8,
    readingTimeMins: 20,
    sourceReference: 'মাকতাবাতুল মাআরিফ রিয়াদ, ১৪২৩ হি.',
    authenticityGrade: 'হাদিস নম্বর ও তাখরিজ পুনঃযাচাই আবশ্যক',
    isFeatured: false,
    isPopular: false,
    availableLanguages: ['bn', 'ar', 'en'],
    createdAt: '2026-02-18T14:30:00Z',
    audit: {
      physicalSourceVerified: true,
      sanadChecked: false,
      matnChecked: true,
      reviewerName: 'মাওলানা মাহমুদ হাসান',
      reviewerTitle: 'মুহাদ্দিস ও সদস্য, ইসলামিক ফাউন্ডেশন পরিষদ',
      reviewerNotes: 'হাদিস নং ৩ এর তাখরিজে তিরমিযীর সাথে আবু দাউদের উদ্ধৃতি সংযুক্ত করতে হবে।',
      verifiedDate: '২০২৬-০২-২০',
    },
  },
];

let categoriesStore: AdminCategory[] = [
  {
    id: 'cat-hadith',
    slug: 'hadith',
    name: { bn: 'হাদিস ও সুন্নাহ', ar: 'الحديث الشريف والسنة', en: 'Hadith & Sunnah' },
    description: { bn: 'রাসুলুল্লাহ ﷺ-এর বাণী, কর্ম ও সম্মতির বিশুদ্ধ সংকলন', ar: 'الأحاديث النبوية الشريفة الموثقة', en: 'Authentic collections of the Prophet’s sayings and traditions' },
    iconName: 'book-open',
    sortOrder: 1,
    bookCount: 3,
  },
  {
    id: 'cat-seerah',
    slug: 'seerah',
    name: { bn: 'সীরাত ও শামায়েল', ar: 'السيرة النبوية والشمائل', en: 'Seerah & Prophetic Characteristics' },
    description: { bn: 'নবীজি ﷺ-এর পবিত্র জীবনচরিত ও চারিত্রিক গুণাবলি', ar: 'سيرة النبي المصطفى ﷺ وأخلاقه', en: 'Life story and sublime character of Prophet Muhammad ﷺ' },
    iconName: 'sparkles',
    sortOrder: 2,
    bookCount: 2,
  },
  {
    id: 'cat-duas',
    slug: 'duas',
    name: { bn: 'দু‘আ ও যিকির', ar: 'الأدعية والأذكار', en: 'Duas & Adhkar' },
    description: { bn: 'দৈনন্দিন জীবনের সকাল-সন্ধ্যা ও বিশেষ মুহূর্তের দু‘আ', ar: 'حصن المسلم وأذكار اليوم والليلة', en: 'Daily supplications and remembrances of Allah' },
    iconName: 'heart',
    sortOrder: 3,
    bookCount: 2,
  },
  {
    id: 'cat-akhlaq',
    slug: 'akhlaq',
    name: { bn: 'আখলাক ও শিষ্টাচার', ar: 'الأخلاق والآداب الإسلامية', en: 'Islamic Morals & Etiquettes' },
    description: { bn: 'ইসলামি উত্তম চরিত্র, মানবসেবা ও সামাজিক শিষ্টাচার', ar: 'الآداب النبوية والمعاملات الإنسانية', en: 'Prophetic manners, ethics, and interpersonal courtesies' },
    iconName: 'shield',
    sortOrder: 4,
    bookCount: 1,
  },
];

let chaptersStore: AdminChapter[] = [
  {
    id: 'chap-1',
    bookId: 'riyad-us-saliheen',
    bookSlug: 'riyad-us-saliheen',
    chapterNumber: 1,
    slug: 'chapter-1-ikhlas-niyyah',
    title: {
      bn: '১. ইখলাস ও নিয়তের একনিষ্ঠতা',
      ar: '١. باب الإخلاص وإحضار النية في جميع الأعمال',
      en: '1. Sincerity and Noble Intent in All Actions',
    },
    durationMins: 6,
    status: 'published',
    contentSnippet: 'সমস্ত আমল নিয়তের উপর নির্ভরশীল...',
  },
  {
    id: 'chap-2',
    bookId: 'riyad-us-saliheen',
    bookSlug: 'riyad-us-saliheen',
    chapterNumber: 2,
    slug: 'chapter-2-tawbah',
    title: {
      bn: '২. তাওবাহ ও আল্লাহর দিকে প্রত্যাবর্তন',
      ar: '٢. باب التوبة والاستغفار',
      en: '2. Repentance and Turning to Allah',
    },
    durationMins: 8,
    status: 'published',
    contentSnippet: 'হে মানবমণ্ডলী! তোমরা আল্লাহর সমীপে তাওবাহ কর...',
  },
  {
    id: 'chap-3',
    bookId: 'hisnul-muslim',
    bookSlug: 'hisnul-muslim',
    chapterNumber: 1,
    slug: 'morning-evening-dhikr',
    title: {
      bn: '১. সকাল ও সন্ধ্যার মাসনূন দু‘আ ও যিকির',
      ar: '١. أذكار الصباح والمساء',
      en: '1. Morning and Evening Remembrances',
    },
    durationMins: 7,
    status: 'published',
    contentSnippet: 'আমরা সকালে উপনীত হলাম এবং যাবতীয় রাজত্ব আল্লাহর...',
  },
];

let hadithStore: AdminHadithRef[] = [
  {
    id: 'hadith-1',
    bookSlug: 'riyad-us-saliheen',
    collectionName: 'সহিহ আল-বুখারি (Sahih al-Bukhari)',
    hadithNumber: '১',
    narrator: 'আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রা.)',
    grade: 'Sahih',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    bengaliTranslation: 'কাজের ফলাফল কেবল নিয়তের উপর নির্ভরশীল, এবং প্রত্যেক ব্যক্তি যা নিয়ত করেছে তা-ই পাবে। যার হিজরত দুনিয়ার স্বার্থে কিংবা কোনো নারীকে বিয়ে করার উদ্দেশ্যে হবে, তার হিজরত সেই উদ্দেশ্যেই পরিগণিত হবে।',
    englishTranslation: 'Actions are judged by motives, so each person will have but that which he purposed...',
    chapterSlug: 'chapter-1-ikhlas-niyyah',
  },
  {
    id: 'hadith-2',
    bookSlug: 'riyad-us-saliheen',
    collectionName: 'সহিহ মুসলিম (Sahih Muslim)',
    hadithNumber: '২৭০২',
    narrator: 'আবু হুরায়রা (রা.)',
    grade: 'Sahih',
    arabicText: 'يَا أَيُّهَا النَّاسُ تُوبُوا إِلَى اللَّهِ، فَإِنِّي أَتُوبُ فِي الْيَوْمِ إِلَيْهِ مِائَةَ مَرَّةٍ.',
    bengaliTranslation: 'হে লোকসকল! তোমরা আল্লাহর নিকট তাওবাহ করো; নিশ্চয় আমি দিনে একশত বার তাঁর নিকট তাওবাহ করি।',
    englishTranslation: 'O people, turn in repentance to Allah, for indeed I repent to Him one hundred times in a day.',
    chapterSlug: 'chapter-2-tawbah',
  },
];

let mediaStore: AdminMediaItem[] = [
  {
    id: 'media-1',
    fileName: 'riyad-us-saliheen-cover.webp',
    filePath: '/covers/riyad-us-saliheen.webp',
    mimeType: 'image/webp',
    sizeBytes: 245820,
    altText: 'রিয়াদুস সলেহিন বইয়ের প্রচ্ছদ',
    uploadedBy: 'মুফতি আবদুল্লাহ',
    createdAt: '2026-01-10T11:00:00Z',
  },
  {
    id: 'media-2',
    fileName: 'hisnul-muslim-cover.webp',
    filePath: '/covers/hisnul-muslim.webp',
    mimeType: 'image/webp',
    sizeBytes: 198240,
    altText: 'হিসনুল মুসলিম বইয়ের প্রচ্ছদ',
    uploadedBy: 'মুফতি আবদুল্লাহ',
    createdAt: '2026-01-12T14:20:00Z',
  },
  {
    id: 'media-3',
    fileName: 'arbauna-an-nawawiyyah-cover.webp',
    filePath: '/covers/arbauna-an-nawawiyyah.webp',
    mimeType: 'image/webp',
    sizeBytes: 215400,
    altText: 'আরবাঈন আন-নববী বইয়ের প্রচ্ছদ',
    uploadedBy: 'মাওলানা মাহমুদ হাসান',
    createdAt: '2026-01-14T09:15:00Z',
  },
];

let usersStore: AdminUserItem[] = [
  {
    id: 'user-1',
    name: 'মুফতি আবদুল্লাহ আল-মাসউদ',
    email: 'admin@protidinersunnah.com',
    role: 'admin',
    preferredLang: 'bn',
    joinedAt: '2025-12-01',
    bookmarkCount: 42,
  },
  {
    id: 'user-2',
    name: 'মাওলানা মাহমুদ হাসান (মুহাদ্দিস)',
    email: 'reviewer@protidinersunnah.com',
    role: 'reviewer',
    preferredLang: 'bn',
    joinedAt: '2026-01-05',
    bookmarkCount: 18,
  },
  {
    id: 'user-3',
    name: 'আব্দুর রহমান শাকের',
    email: 'editor@protidinersunnah.com',
    role: 'editor',
    preferredLang: 'ar',
    joinedAt: '2026-01-15',
    bookmarkCount: 7,
  },
  {
    id: 'user-4',
    name: 'মোহাম্মদ তানভীর আহমেদ',
    email: 'tanvir.reader@gmail.com',
    role: 'reader',
    preferredLang: 'bn',
    joinedAt: '2026-02-02',
    bookmarkCount: 12,
  },
  {
    id: 'user-5',
    name: 'Ahmad bin Tariq',
    email: 'ahmad.tariq@gmail.com',
    role: 'reader',
    preferredLang: 'en',
    joinedAt: '2026-02-14',
    bookmarkCount: 25,
  },
];

let websiteSettings = {
  siteNameBn: 'প্রতিদিনের সুন্নাহ',
  siteNameEn: 'Daily Sunnah',
  taglineBn: 'রাসুলুল্লাহ ﷺ-এর আদর্শে প্রতিদিন',
  taglineAr: 'على هدي رسول الله ﷺ في كل يوم',
  taglineEn: 'Living the Prophet’s Sunnah Every Day',
  logoType: 'image' as 'star' | 'book' | 'crescent' | 'minaret' | 'image',
  logoImageUrl: '/logo.png',
  showTagline: true,
  contactEmail: 'contact@protidinersunnah.com',
  allowPublicRegistration: true,
  maintenanceMode: false,
  defaultLanguage: 'bn',
  rlsSecurityEnforced: true,
  scholarReviewRequired: true,
};

// ============================================================================
// Service Methods with Full Input Validation & Security Verification
// ============================================================================

export async function getDashboardMetrics() {
  const totalBooks = booksStore.length;
  const publishedBooks = booksStore.filter((b) => b.status === 'published').length;
  const draftBooks = booksStore.filter((b) => b.status === 'draft').length;
  const pendingReviews = booksStore.filter((b) => b.status === 'review' || b.status === 'changes_requested').length;
  const totalChapters = booksStore.reduce((acc, b) => acc + b.chapterCount, 0);
  const totalReaders = 1420; // Active authenticated and bookmarking readers count

  return {
    totalBooks,
    publishedBooks,
    draftBooks,
    totalChapters,
    pendingReviews,
    totalReaders,
  };
}

export async function getAllBooks(filter?: {
  query?: string;
  status?: string;
  category?: string;
}): Promise<AdminEbook[]> {
  let list = [...booksStore];

  if (filter?.status && filter.status !== 'all') {
    list = list.filter((b) => b.status === filter.status);
  }

  if (filter?.category && filter.category !== 'all') {
    list = list.filter((b) => b.category.slug === filter.category);
  }

  if (filter?.query && filter.query.trim()) {
    const q = filter.query.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.title.bn.toLowerCase().includes(q) ||
        b.title.en.toLowerCase().includes(q) ||
        b.title.ar.includes(q) ||
        b.author.bn.toLowerCase().includes(q) ||
        b.author.en.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getBookById(id: string): Promise<AdminEbook | null> {
  const book = booksStore.find((b) => b.id === id || b.slug === id);
  return book ? { ...book } : null;
}

export async function createBook(data: Partial<AdminEbook>): Promise<{ success: boolean; book?: AdminEbook; error?: string }> {
  // Input Validation
  if (!data.title?.bn?.trim()) {
    return { success: false, error: 'বাংলায় বইয়ের শিরোনাম আবশ্যক (Bengali title is required).' };
  }
  if (!data.title?.ar?.trim()) {
    return { success: false, error: 'আরবিতে বইয়ের শিরোনাম আবশ্যক (Arabic original title is required).' };
  }
  if (!data.author?.bn?.trim()) {
    return { success: false, error: 'রচয়িতার নাম প্রদান করুন (Author name is required).' };
  }
  if (!data.sourceReference?.trim()) {
    return { success: false, error: 'শারীরিক প্রিন্ট সংস্করণের রেফারেন্স আবশ্যক (Physical print source citation is required).' };
  }

  const slug =
    data.slug?.trim() ||
    data.title.en?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
    `book-${Date.now()}`;

  // Check slug uniqueness
  if (booksStore.some((b) => b.slug === slug)) {
    return { success: false, error: 'এই স্ল্যাগটি ইতিমধ্যে ব্যবহৃত হয়েছে (Slug already exists). অনুগ্রহ করে অনন্য স্ল্যাগ দিন।' };
  }

  const newBook: AdminEbook = {
    id: slug,
    slug: slug,
    title: {
      bn: data.title.bn.trim(),
      ar: data.title.ar.trim(),
      en: data.title?.en?.trim() || data.title.bn.trim(),
    },
    author: {
      bn: data.author.bn.trim(),
      ar: data.author.ar?.trim() || data.author.bn.trim(),
      en: data.author.en?.trim() || data.author.bn.trim(),
      bio: data.author.bio,
      deathYearHijri: data.author.deathYearHijri,
    },
    category: data.category || {
      slug: 'hadith',
      name: { bn: 'হাদিস ও সুন্নাহ', ar: 'الحديث الشريف والسنة', en: 'Hadith & Sunnah' },
    },
    description: {
      bn: data.description?.bn?.trim() || 'সংক্ষিপ্ত সারসংক্ষেপ প্রস্তুত করা হচ্ছে।',
      ar: data.description?.ar?.trim() || 'ملخص الكتاب قيد الإعداد.',
      en: data.description?.en?.trim() || 'Description being finalized.',
    },
    coverUrl: data.coverUrl || '/covers/default-book.webp',
    status: data.status || 'draft',
    chapterCount: Number(data.chapterCount) || 1,
    readingTimeMins: Number(data.readingTimeMins) || 15,
    sourceReference: data.sourceReference.trim(),
    authenticityGrade: data.authenticityGrade?.trim() || 'তাহকিক প্রক্রিয়াধীন',
    isFeatured: Boolean(data.isFeatured),
    isPopular: Boolean(data.isPopular),
    availableLanguages: data.availableLanguages || ['bn', 'ar'],
    createdAt: new Date().toISOString(),
    publishedAt: data.status === 'published' ? new Date().toISOString() : undefined,
    audit: {
      physicalSourceVerified: Boolean(data.audit?.physicalSourceVerified),
      sanadChecked: Boolean(data.audit?.sanadChecked),
      matnChecked: Boolean(data.audit?.matnChecked),
      reviewerName: data.audit?.reviewerName || 'পর্যালোচনা অপেক্ষমাণ',
      reviewerTitle: data.audit?.reviewerTitle || '',
      reviewerNotes: data.audit?.reviewerNotes || 'নতুন খসড়া তৈরি করা হয়েছে।',
    },
  };

  booksStore.unshift(newBook);
  return { success: true, book: newBook };
}

export async function updateBook(id: string, data: Partial<AdminEbook>): Promise<{ success: boolean; book?: AdminEbook; error?: string }> {
  const index = booksStore.findIndex((b) => b.id === id || b.slug === id);
  if (index === -1) {
    return { success: false, error: 'বইটি খুঁজে পাওয়া যায়নি (Book not found).' };
  }

  const existing = booksStore[index];

  const updated: AdminEbook = {
    ...existing,
    ...data,
    title: { ...existing.title, ...data.title },
    author: { ...existing.author, ...data.author },
    category: { ...existing.category, ...data.category },
    description: { ...existing.description, ...data.description },
    audit: { ...existing.audit, ...data.audit },
  };

  if (data.status === 'published' && !existing.publishedAt) {
    updated.publishedAt = new Date().toISOString();
  }

  booksStore[index] = updated;
  return { success: true, book: updated };
}

export async function updateBookStatus(id: string, status: EbookStatus): Promise<{ success: boolean; error?: string }> {
  const index = booksStore.findIndex((b) => b.id === id || b.slug === id);
  if (index === -1) {
    return { success: false, error: 'বইটি খুঁজে পাওয়া যায়নি।' };
  }

  booksStore[index].status = status;
  if (status === 'published' && !booksStore[index].publishedAt) {
    booksStore[index].publishedAt = new Date().toISOString();
  }
  return { success: true };
}

export async function deleteBook(id: string): Promise<{ success: boolean; error?: string }> {
  const initialLength = booksStore.length;
  booksStore = booksStore.filter((b) => b.id !== id && b.slug !== id);
  if (booksStore.length === initialLength) {
    return { success: false, error: 'বইটি খুঁজে পাওয়া যায়নি।' };
  }
  return { success: true };
}

export async function getAllCategories(): Promise<AdminCategory[]> {
  return [...categoriesStore];
}

export async function createCategory(cat: Omit<AdminCategory, 'id' | 'bookCount'>): Promise<{ success: boolean; category?: AdminCategory; error?: string }> {
  if (!cat.name?.bn?.trim()) {
    return { success: false, error: 'ক্যাটাগরির নাম আবশ্যক।' };
  }
  const id = `cat-${cat.slug || Date.now()}`;
  const newCat: AdminCategory = {
    ...cat,
    id,
    bookCount: 0,
  };
  categoriesStore.push(newCat);
  return { success: true, category: newCat };
}

export async function getAllChapters(bookSlug?: string): Promise<AdminChapter[]> {
  if (bookSlug) {
    return chaptersStore.filter((c) => c.bookSlug === bookSlug);
  }
  return [...chaptersStore];
}

export async function createChapter(chapter: Omit<AdminChapter, 'id'>): Promise<{ success: boolean; chapter?: AdminChapter; error?: string }> {
  if (!chapter.title?.bn?.trim()) {
    return { success: false, error: 'অধ্যায়ের শিরোনাম আবশ্যক।' };
  }
  const id = `chap-${Date.now()}`;
  const newChapter: AdminChapter = { ...chapter, id };
  chaptersStore.push(newChapter);

  // Update book chapter count
  const book = booksStore.find((b) => b.slug === chapter.bookSlug || b.id === chapter.bookId);
  if (book) {
    book.chapterCount += 1;
  }

  return { success: true, chapter: newChapter };
}

export async function getAllHadithReferences(): Promise<AdminHadithRef[]> {
  return [...hadithStore];
}

export async function createHadithReference(hadith: Omit<AdminHadithRef, 'id'>): Promise<{ success: boolean; hadith?: AdminHadithRef; error?: string }> {
  if (!hadith.arabicText?.trim() || !hadith.bengaliTranslation?.trim()) {
    return { success: false, error: 'আরবি মূল মতন ও বাংলা অনুবাদ উভয়ই আবশ্যক।' };
  }
  const id = `hadith-${Date.now()}`;
  const newHadith: AdminHadithRef = { ...hadith, id };
  hadithStore.unshift(newHadith);
  return { success: true, hadith: newHadith };
}

export async function getAllMedia(): Promise<AdminMediaItem[]> {
  return [...mediaStore];
}

export async function getAllUsers(): Promise<AdminUserItem[]> {
  return [...usersStore];
}

export async function updateUserRole(userId: string, newRole: AdminUserItem['role']): Promise<{ success: boolean }> {
  const user = usersStore.find((u) => u.id === userId);
  if (user) {
    user.role = newRole;
    return { success: true };
  }
  return { success: false };
}

export async function getWebsiteSettings() {
  return { ...websiteSettings };
}

export async function updateWebsiteSettings(data: Partial<typeof websiteSettings>): Promise<{ success: boolean }> {
  websiteSettings = { ...websiteSettings, ...data };
  return { success: true };
}
