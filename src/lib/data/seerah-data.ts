export interface SeerahMilestone {
  id: string;
  yearHijri: string;
  yearCE: string;
  era: 'meccan' | 'medinan';
  eraTitleBn: 'মাক্কী জীবন' | 'মাদানী জীবন';
  eraTitleAr: 'العهد المكي' | 'العهد المدني';
  eraTitleEn: 'Meccan Era' | 'Medinan Era';
  titleBn: string;
  titleAr: string;
  titleEn: string;
  summaryBn: string;
  summaryAr: string;
  summaryEn: string;
  detailsBn: string;
  referenceSource: string;
}

export const SEERAH_TIMELINE: SeerahMilestone[] = [
  {
    id: 'blessed-birth',
    yearHijri: '৫৩ হিজরি পূর্ব',
    yearCE: '৫৭১ খ্রিস্টাব্দ',
    era: 'meccan',
    eraTitleBn: 'মাক্কী জীবন',
    eraTitleAr: 'العهد المكي',
    eraTitleEn: 'Meccan Era',
    titleBn: 'পবিত্র শুভাগমন ও শৈশবকাল',
    titleAr: 'المولد النبوي الشريف والنشأة المباركة',
    titleEn: 'Blessed Birth & Noble Childhood',
    summaryBn: 'আমিরুল আম্বিয়া হযরত মুহাম্মদ ﷺ পবিত্র মক্কার বনু হাশিম বংশে শুভাগমন করেন। জন্মের পূর্বেই পিতা আব্দুল্লাহর ও বাল্যকালেই মাতা আমিনার ইন্তেকাল ঘটে।',
    summaryAr: 'ولد النبي المصطفى ﷺ في مكة المكرمة في عام الفيل، ونشأ يتيم الأب والأم في كفالة جده عبد المطلب ثم عمه أبي طالب.',
    summaryEn: 'The Prophet Muhammad ﷺ was born in Makkah in the Year of the Elephant into the noble clan of Banu Hashim.',
    detailsBn: 'দাদাজান আব্দুল মুত্তালিব তাঁর নাম রাখেন "মুহাম্মদ" (সর্বাধিক প্রশংসিত)। শৈশবে বনু সা‘দ গোত্রে হালীমা আস-সা‘দিয়ার ঘরে লালিত-পালিত হন। বাল্যকাল থেকেই তিনি "আল-আমিন" (বিশ্বস্ত) ও "আস-সাদিক" (সত্যবাদী) হিসেবে মক্কার সর্বস্তরের মানুষের আস্থাভাজন ছিলেন।',
    referenceSource: 'আর-রাহীকুল মাখতূম, পৃ. ৫৫-৬২; সীরাতে ইবনে হিশাম',
  },
  {
    id: 'first-revelation',
    yearHijri: '১৩ হিজরি পূর্ব',
    yearCE: '৬১০ খ্রিস্টাব্দ',
    era: 'meccan',
    eraTitleBn: 'মাক্কী জীবন',
    eraTitleAr: 'العهد المكي',
    eraTitleEn: 'Meccan Era',
    titleBn: 'হেরা গুহায় নবুওয়াত প্রাপ্তি ও প্রথম ওহী',
    titleAr: 'بدء الوحي الشريف في غار حراء',
    titleEn: 'First Divine Revelation at Cave of Hira',
    summaryBn: 'চল্লিশ বছর বয়সে হেরা গুহায় ধ্যানমগ্ন অবস্থায় জিবরিল (আ.)-এর মাধ্যমে পবিত্র কুরআনুল কারীমের প্রথম পাঁচ আয়াত অবতীর্ণ হয়।',
    summaryAr: 'نزل جبريل عليه السلام بالوحي الإلهي على النبي ﷺ في غار حراء بآيات سورة العلق: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾.',
    summaryEn: 'At age forty, while meditating in the Cave of Hira, Archangel Jibreel brought the inaugural revelation of Surah Al-Alaq: "Read in the name of your Lord who created."',
    detailsBn: 'সূরা আলাকের প্রথম পাঁচ আয়াত অবতীর্ণ হওয়ার পর মানবজাতির পথপ্রদর্শনের চূড়ান্ত নবুওয়াতি দায়িত্ব সূচিত হয়। উম্মুল মুমিনিন খাদিজা (রা.) সর্বপ্রথম ইসলাম গ্রহণ করে নবীজি ﷺ-কে অভয় ও সান্ত্বনা দান করেন।',
    referenceSource: 'সহিহ আল-বুখারি: ৩; আর-রাহীকুল মাখতূম, পৃ. ৭২-৭৮',
  },
  {
    id: 'isra-miraj',
    yearHijri: '৩ হিজরি পূর্ব',
    yearCE: '৬২১ খ্রিস্টাব্দ',
    era: 'meccan',
    eraTitleBn: 'মাক্কী জীবন',
    eraTitleAr: 'العهد المكي',
    eraTitleEn: 'Meccan Era',
    titleBn: 'ঐতিহাসিক ইসরা ও মি‘রাজ গমন',
    titleAr: 'الإسراء والمعراج وفرض الصلاة',
    titleEn: 'The Miraculous Night Journey & Ascension (Isra & Mi\'raj)',
    summaryBn: 'মসজিদুল হারাম থেকে মসজিদুল আকসা এবং ঊর্ধ্বাকাশে সপ্ত আসমান অতিক্রম করে মহান আল্লাহর সান্নিধ্যে গমন এবং দৈনিক পাঁচ ওয়াক্ত নামাজ ফরজ হওয়া।',
    summaryAr: 'أسرى الله بنبيه ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى ثم عرج به إلى سدرة المنتهى، وفُرضت الصلوات الخمس.',
    summaryEn: 'The miraculous night journey from the Sacred Mosque to Al-Aqsa, followed by the celestial ascension to the Divine Presence where the five daily prayers were ordained.',
    detailsBn: 'শোকের বছরে মহান রাব্বুল আলামিন স্বীয় প্রিয় হাবীব ﷺ-কে মহাশক্তি ও কুদরতের নিদর্শন প্রত্যক্ষ করান। মুমিনদের জন্য উপহার হিসেবে পাঁচ ওয়াক্ত নামাজ নির্ধারিত হয়। হযরত আবু বকর (রা.) নিঃশর্ত সত্যায়ন করে "আস-সিদ্দীক" উপাধিতে ভূষিত হন।',
    referenceSource: 'সূরা বনী ইসরাঈল: ১; সহিহ মুসলিম: ১৬২',
  },
  {
    id: 'the-great-hijrah',
    yearHijri: '১ হিজরি',
    yearCE: '৬২২ খ্রিস্টাব্দ',
    era: 'medinan',
    eraTitleBn: 'মাদানী জীবন',
    eraTitleAr: 'العهد المدني',
    eraTitleEn: 'Medinan Era',
    titleBn: 'ঐতিহাসিক হিজরত ও মদিনায় আগমন',
    titleAr: 'الهجرة النبوية المباركة إلى المدينة المنورة',
    titleEn: 'The Great Hijrah to Madinah',
    summaryBn: 'মক্কার কুরাইশদের নির্যাতন ও হত্যার ষড়যন্ত্র উপেক্ষা করে আল্লাহর আদেশে বিশ্বস্ত সঙ্গী আবু বকর (রা.)-কে নিয়ে ইয়াসরিবে (মদিনা মুনাওয়ারা) হিজরত।',
    summaryAr: 'هاجر النبي ﷺ وصاحبه أبو بكر الصديق إلى يثرب، فاستقبلهم الأنصار بالترحاب، وتأسست أول دولة إسلامية.',
    summaryEn: 'Undertaking the momentous migration from persecution in Makkah to Madinah alongside Abu Bakr (ra), establishing the first Islamic society.',
    detailsBn: 'মদিনায় পৌঁছে সর্বপ্রথম মসজিদে কুবা ও মসজিদে নববী নির্মাণ করা হয়। মুহাজির ও আনসারদের মধ্যে ঐতিহাসিক ভ্রাতৃত্ব স্থাপন করা হয় এবং পৃথিবীর প্রথম লিখিত সংবিধান "মদিনা সনদ" প্রণীত হয়।',
    referenceSource: 'আর-রাহীকুল মাখতূম, পৃ. ২১৪-২৩১',
  },
  {
    id: 'battle-of-badr',
    yearHijri: '২ হিজরি',
    yearCE: '৬২৪ খ্রিস্টাব্দ',
    era: 'medinan',
    eraTitleBn: 'মাদানী জীবন',
    eraTitleAr: 'العهد المدني',
    eraTitleEn: 'Medinan Era',
    titleBn: 'ঐতিহাসিক বদর প্রান্তর ও সত্য-মিথ্যার ফায়সালা',
    titleAr: 'غزوة بدر الكبرى (يوم الفرقان)',
    titleEn: 'The Battle of Badr (Yawm al-Furqan)',
    summaryBn: 'মাত্র ৩১৩ জন নিরস্ত্র সাহাবী নিয়ে কুরাইশদের সহস্রাধিক সশস্ত্র বাহিনীর বিরুদ্ধে ইসলামের প্রথম প্রকাশ্য চূড়ান্ত বিজয়।',
    summaryAr: 'انتصار المسلمين الحاسم في أول معركة فاصلة بين الحق والباطل بتأييد الله وملائكته.',
    summaryEn: 'The decisive victory where 313 believers with limited armor triumphed over a heavily armed thousand-strong army through divine assistance.',
    detailsBn: 'রমজান মাসের ১৭ তারিখে সংঘটিত এই যুদ্ধকে কুরআনে "ইয়াওমুল ফুরকান" (সত্য ও মিথ্যার পার্থক্যকারী দিন) হিসেবে অভিহিত করা হয়েছে। আবু জাহেলসহ কুরাইশদের শীর্ষ নেতৃবৃন্দ নিহত হয়।',
    referenceSource: 'সূরা আল-আনফাল: ৯-১২; সহিহ আল-বুখারি: ৩৯৮৬',
  },
  {
    id: 'conquest-of-makkah',
    yearHijri: '৮ হিজরি',
    yearCE: '৬৩০ খ্রিস্টাব্দ',
    era: 'medinan',
    eraTitleBn: 'মাদানী জীবন',
    eraTitleAr: 'العهد المدني',
    eraTitleEn: 'Medinan Era',
    titleBn: 'রক্তপাতহীন মক্কা বিজয় ও সাধারণ ক্ষমা',
    titleAr: 'فتح مكة العظيم والعفو العام',
    titleEn: 'The Glorious Bloodless Conquest of Makkah',
    summaryBn: 'দশ হাজার সাহাবীর বাহিনী নিয়ে বিজয়ী বেশে পবিত্র মক্কায় প্রবেশ, কাবার ৩৬০টি প্রতিমা অপসারণ এবং চরম শত্রুদের প্রতি অভূতপূর্ব সাধারণ ক্ষমা ঘোষণা।',
    summaryAr: 'دخل النبي ﷺ مكة فاتحاً متواضعاً، فطهر البيت الحرام من الأصنام، وأعلن العفو العام قائلاً: «اذهبوا فأنتم الطلقاء».',
    summaryEn: 'Entering Makkah victoriously with ten thousand companions, cleansing the Kaaba of 360 idols, and proclaiming unconditional general amnesty to former persecutors.',
    detailsBn: 'নবীজি ﷺ শির নত করে বিনয়ের সাথে মক্কায় প্রবেশ করেন। দীর্ঘ ২১ বছর ধরে সীমাহীন অত্যাচারকারী কাফেরদের উদ্দেশ্যে তিনি ঘোষণা করেন: "আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই; যাও, তোমরা সবাই মুক্ত!" বিশ্ব ইতিহাসে ক্ষমার এমন নজির বিরল।',
    referenceSource: 'সহিহ আল-বুখারি: ৪২৮০; আর-রাহীকুল মাখতূম, পৃ. ৪৮৫-৫০৪',
  },
  {
    id: 'farewell-pilgrimage',
    yearHijri: '১০ হিজরি',
    yearCE: '৬৩২ খ্রিস্টাব্দ',
    era: 'medinan',
    eraTitleBn: 'মাদানী জীবন',
    eraTitleAr: 'العهد المدني',
    eraTitleEn: 'Medinan Era',
    titleBn: 'বিদায় হজ ও ঐতিহাসিক মানবাধিকার ভাষণ',
    titleAr: 'حجة الوداع وخطبة حقوق الإنسان الخالدة',
    titleEn: 'The Farewell Pilgrimage & Universal Sermon',
    summaryBn: 'আরাফাতের ময়দানে এক লক্ষাধিক সাহাবীর সামনে মানবজাতির সামগ্রিক অধিকার, সাম্য, নারীদের সম্মান ও বিদায়ী অসিয়ত প্রদান।',
    summaryAr: 'ألقى النبي ﷺ خطبته الجامعة في عرفات، مقرراً حقوق الإنسان، ومحرماً الدماء والأموال والأعراض، وموصياً بالنساء خيراً.',
    summaryEn: 'Addressing over one hundred thousand companions at Arafat, articulating timeless universal principles of human dignity, racial equality, and women\'s rights.',
    detailsBn: 'ঘোষণা করা হয়: "কোনো আরবের উপর কোনো অনারবের এবং কোনো অনারবের উপর কোনো আরবের শ্রেষ্ঠত্ব নেই; শ্রেষ্ঠত্বের একমাত্র মাপকাঠি তাকওয়া।" এরপর অবতীর্ণ হয় দ্বীনের পূর্ণতার আয়াত: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ﴾ (আজ তোমাদের জন্য তোমাদের দ্বীনকে পূর্ণাঙ্গ করলাম)।',
    referenceSource: 'সহিহ মুসলিম: ১২১৮; মুসনাদে আহমাদ: ২২৯৭৮',
  },
];
