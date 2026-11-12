export interface ClassicalBook {
  id: string;
  slug: string;
  title: { bn: string; ar: string; en: string };
  author: { bn: string; ar: string; en: string };
  category: { bn: string; ar: string; en: string; slug: string };
  description: { bn: string; ar: string; en: string };
  chapterCount: number;
  readingTimeMins: number;
  verifiedSource: string;
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
      ar: 'رياض الصالحين',
      en: 'Riyad us-Saliheen',
    },
    author: {
      bn: 'ইমাম আন-নববী (রহ.)',
      ar: 'الإمام النووي رحمه الله',
      en: 'Imam An-Nawawi (rah.)',
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
    chapterCount: 1896,
    readingTimeMins: 20,
    verifiedSource: 'দারুসসালাম প্রকাশনী (তাহকিককৃত মূল পাঠ)',
    isFeatured: true,
    isPopular: true,
    readCount: 15420,
  },
  {
    id: 'hisnul-muslim',
    slug: 'hisnul-muslim',
    title: {
      bn: 'হিসনুল মুসলিম',
      ar: 'حصن المسلم',
      en: 'Hisnul Muslim',
    },
    author: {
      bn: 'সাঈদ ইবন ওয়াহফ আল-কাহত্বানী',
      ar: 'سعيد بن علي بن وهف القحطاني',
      en: 'Saeed bin Ali al-Qahtani',
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
    chapterCount: 132,
    readingTimeMins: 8,
    verifiedSource: 'মাকতাবাতুল মাআরিফ রিয়াদ',
    isFeatured: true,
    isPopular: true,
    readCount: 22890,
  },
  {
    id: 'arbain-nawawi',
    slug: 'arbain-nawawi',
    title: {
      bn: 'চল্লিশ হাদিস (আল-আরবাঈন)',
      ar: 'الأربعون النووية',
      en: 'An-Nawawi’s Forty Hadith',
    },
    author: {
      bn: 'ইমাম আন-নববী (রহ.)',
      ar: 'الإمام النووي رحمه الله',
      en: 'Imam An-Nawawi (rah.)',
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
    chapterCount: 42,
    readingTimeMins: 6,
    verifiedSource: 'আল-মাকতাবাতুশ শামিলা তাহকিক',
    isFeatured: true,
    isPopular: true,
    readCount: 18740,
  },
  {
    id: 'shamail-muhammadiyyah',
    slug: 'shamail-muhammadiyyah',
    title: {
      bn: 'আশ-শামায়েলে মুহাম্মাদিয়্যাহ',
      ar: 'الشمائل المحمدية',
      en: 'Ash-Shama’il al-Muhammadiyyah',
    },
    author: {
      bn: 'ইমাম আত-তিরমিজি (রহ.)',
      ar: 'الإمام الترمذي رحمه الله',
      en: 'Imam At-Tirmidhi (rah.)',
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
    chapterCount: 397,
    readingTimeMins: 18,
    verifiedSource: 'মাকতাবাতুল কাওসার (শায়খ আলবানীর তাহকিক)',
    isPopular: true,
    readCount: 12900,
  },
  {
    id: 'adab-al-mufrad',
    slug: 'adab-al-mufrad',
    title: {
      bn: 'আল-আদাবুল মুফরাদ',
      ar: 'الأدب المفرد',
      en: 'Al-Adab al-Mufrad',
    },
    author: {
      bn: 'ইমাম আল-বুখারি (রহ.)',
      ar: 'الإمام البخاري رحمه الله',
      en: 'Imam Al-Bukhari (rah.)',
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
    chapterCount: 1322,
    readingTimeMins: 22,
    verifiedSource: 'মুহাম্মদ ফুয়াদ আব্দুল বাকি সংস্করণ',
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
      bn: 'হাফেজ ইবনে হাজার আল-আসকালানী',
      ar: 'الحافظ ابن حجر العسقلاني',
      en: 'Ibn Hajar al-Asqalani',
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
    chapterCount: 1596,
    readingTimeMins: 25,
    verifiedSource: 'দারুল ফিকর সংস্করণ',
    isRecent: true,
    readCount: 8750,
  },
  {
    id: 'kitab-at-tawheed',
    slug: 'kitab-at-tawheed',
    title: {
      bn: 'কিতাবুত তাওহিদ',
      ar: 'كتاب التوحيد',
      en: 'Kitab at-Tawheed',
    },
    author: {
      bn: 'শায়খুল ইসলাম মুহাম্মদ ইবনে আব্দুল ওয়াহহাব',
      ar: 'محمد بن عبد الوهاب',
      en: 'Muhammad ibn Abd al-Wahhab',
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
    chapterCount: 67,
    readingTimeMins: 10,
    verifiedSource: 'দারুসসালাম প্রকাশনী',
    isRecent: true,
    readCount: 7920,
  },
];
