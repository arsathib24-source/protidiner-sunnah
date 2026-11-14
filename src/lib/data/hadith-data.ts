export interface HadithCollection {
  slug: string;
  nameArabic: string;
  nameBengali: string;
  nameEnglish: string;
  authorBengali: string;
  authorArabic: string;
  authorEnglish: string;
  deathYearHijri: string;
  totalHadithCount: number;
  descriptionBn: string;
  descriptionEn: string;
  authenticityStatusBn: string;
  authenticityStatusEn: string;
  categoryTag: string;
}

export interface HadithDetailItem {
  id: string;
  collectionSlug: string;
  collectionNameBn: string;
  collectionNameAr: string;
  hadithNumber: string;
  chapterNumber: number;
  chapterTitleBn: string;
  chapterTitleAr: string;
  chapterTitleEn: string;
  narratorBn: string;
  narratorAr: string;
  narratorEn: string;
  gradeBn: string;
  gradeAr: string;
  gradeEn: string;
  arabicText: string;
  bengaliText: string;
  englishText: string;
  explanationBn?: string;
}

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    slug: 'sahih-bukhari',
    nameArabic: 'صحيح البخاري',
    nameBengali: 'সহিহ আল-বুখারি',
    nameEnglish: 'Sahih al-Bukhari',
    authorBengali: 'ইমাম আবু আবদুল্লাহ মুহাম্মদ ইবনে ইসমাইল আল-বুখারি (রহ.)',
    authorArabic: 'الإمام محمد بن إسماعيل البخاري',
    authorEnglish: 'Imam Muhammad ibn Ismail al-Bukhari',
    deathYearHijri: '২৫৬ হিজরি',
    totalHadithCount: 7563,
    descriptionBn: 'পবিত্র কুরআনুল কারীমের পর মুসলিম উম্মাহর সর্বসম্মত সর্বাধিক বিশুদ্ধতম হাদিস গ্রন্থ।',
    descriptionEn: 'The most authentic book of Hadith after the Holy Quran, revered universally across Islamic scholarship.',
    authenticityStatusBn: 'সর্বোচ্চ বিশুদ্ধ মান (সহিহ)',
    authenticityStatusEn: 'Highest Authenticity (Sahih)',
    categoryTag: 'kutub-sittah',
  },
  {
    slug: 'sahih-muslim',
    nameArabic: 'صحيح مسلم',
    nameBengali: 'সহিহ মুসলিম',
    nameEnglish: 'Sahih Muslim',
    authorBengali: 'ইমাম আবুল হুসাইন মুসলিম ইবনুল হাজ্জাজ আন-নিশাপুরী (রহ.)',
    authorArabic: 'الإمام مسلم بن الحجاج النيسابوري',
    authorEnglish: 'Imam Muslim ibn al-Hajjaj',
    deathYearHijri: '২৬১ হিজরি',
    totalHadithCount: 7500,
    descriptionBn: 'বিন্যাস ও সনদ ধারাবাহিকতার অনন্য মানদণ্ডে সংকলিত দ্বিতীয় বিশুদ্ধতম হাদিস গ্রন্থ।',
    descriptionEn: 'The second most authentic hadith compilation, celebrated for its exquisite thematic arrangement and sanad continuity.',
    authenticityStatusBn: 'সর্বোচ্চ বিশুদ্ধ মান (সহিহ)',
    authenticityStatusEn: 'Highest Authenticity (Sahih)',
    categoryTag: 'kutub-sittah',
  },
  {
    slug: 'sunan-abu-dawood',
    nameArabic: 'سنن أبي داود',
    nameBengali: 'সুনানে আবু দাউদ',
    nameEnglish: 'Sunan Abi Dawood',
    authorBengali: 'ইমাম আবু দাউদ সুলাইমান ইবনুল আশআছ আস-সিজিস্তানী (রহ.)',
    authorArabic: 'الإمام أبو داود السجستاني',
    authorEnglish: 'Imam Abu Dawood al-Sijistani',
    deathYearHijri: '২৭৫ হিজরি',
    totalHadithCount: 5274,
    descriptionBn: 'ইসলামি শরিয়তের ফিকহ ও দৈনন্দিন আমল সংক্রান্ত আহকামের হাদিসের প্রধান ভিত্তিগ্রন্থ।',
    descriptionEn: 'The primary sourcebook specializing in legal traditions, rulings, and prophetic juristic norms.',
    authenticityStatusBn: 'সহিহ ও হাসান সনদে সংকলিত',
    authenticityStatusEn: 'Authentic & Sound Legal Traditions',
    categoryTag: 'kutub-sittah',
  },
  {
    slug: 'jami-at-tirmidhi',
    nameArabic: 'جامع الترمذي',
    nameBengali: 'জামে আত-তিরমিজি',
    nameEnglish: 'Jami` at-Tirmidhi',
    authorBengali: 'ইমাম আবু ঈসা মুহাম্মদ ইবনে ঈসা আত-তিরমিযী (রহ.)',
    authorArabic: 'الإمام أبو عيسى الترمذي',
    authorEnglish: 'Imam Abu Isa al-Tirmidhi',
    deathYearHijri: '২৭৯ হিজরি',
    totalHadithCount: 3956,
    descriptionBn: 'হাদিসের সনদ বিচার, ফকিহগণের ইখতিলাফ ও ইলমুত তাখরিজের প্রামাণ্য শাস্ত্রীয় গ্রন্থ।',
    descriptionEn: 'Renowned for its rigorous comparative grading of narrations and scholarly juristic perspectives.',
    authenticityStatusBn: 'সহিহ ও হাসান সনদে শ্রেণিবদ্ধ',
    authenticityStatusEn: 'Classified & Graded Hadith',
    categoryTag: 'kutub-sittah',
  },
  {
    slug: 'sunan-an-nasai',
    nameArabic: 'سنن النسائي',
    nameBengali: 'সুনানে আন-নাসায়ী',
    nameEnglish: 'Sunan an-Nasa\'i',
    authorBengali: 'ইমাম আহমদ ইবনে শুআইব আন-নাসায়ী (রহ.)',
    authorArabic: 'الإمام أحمد بن شعيب النسائي',
    authorEnglish: 'Imam Ahmad ibn Shu\'ayb an-Nasa\'i',
    deathYearHijri: '৩০৩ হিজরি',
    totalHadithCount: 5758,
    descriptionBn: 'সনদের কঠোর যাচাই-বাছাই ও বর্ণনাকারীদের নির্ভরযোগ্যতার সূক্ষ্ম বিচারে অগ্রগণ্য।',
    descriptionEn: 'Distinguished by stringent authentication of narrators and precision in chain analysis.',
    authenticityStatusBn: 'উচ্চমানের সহিহ ও বিশুদ্ধ সনদ',
    authenticityStatusEn: 'High Standard of Chains',
    categoryTag: 'kutub-sittah',
  },
  {
    slug: 'sunan-ibn-majah',
    nameArabic: 'سنن ابن ماجه',
    nameBengali: 'সুনানে ইবনে মাজাহ',
    nameEnglish: 'Sunan Ibn Majah',
    authorBengali: 'ইমাম আবু আবদুল্লাহ মুহাম্মদ ইবনে ইয়াজিদ ইবনে মাজাহ (রহ.)',
    authorArabic: 'الإمام ابن ماجه القزويني',
    authorEnglish: 'Imam Ibn Majah al-Qazwini',
    deathYearHijri: '২৭৩ হিজরি',
    totalHadithCount: 4341,
    descriptionBn: 'কুতুবে সিত্তার অন্যতম মূল স্তম্ভ, প্রাঞ্জল বিন্যাস ও অনন্য দুর্লভ হাদিসের অনন্য ভাণ্ডার।',
    descriptionEn: 'One of the six major canonical compilations, renowned for its concise chapters and rare legal narrations.',
    authenticityStatusBn: 'তাহকিককৃত প্রামাণ্য সংকলন',
    authenticityStatusEn: 'Graded Prophetic Traditions',
    categoryTag: 'kutub-sittah',
  },
];

export const FEATURED_HADITHS: HadithDetailItem[] = [
  {
    id: 'bukhari-1',
    collectionSlug: 'sahih-bukhari',
    collectionNameBn: 'সহিহ আল-বুখারি',
    collectionNameAr: 'صحيح البخاري',
    hadithNumber: '১',
    chapterNumber: 1,
    chapterTitleBn: '১. ওহীর সূচনা পর্ব',
    chapterTitleAr: '١. كتاب بدء الوحي',
    chapterTitleEn: '1. Revelation',
    narratorBn: 'আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রা.)',
    narratorAr: 'عمر بن الخطاب رضي الله عنه',
    narratorEn: 'Umar ibn al-Khattab (ra)',
    gradeBn: 'সহিহ আল-বুখারি (সর্বসম্মত বিশুদ্ধ)',
    gradeAr: 'صحيح البخاري',
    gradeEn: 'Sahih al-Bukhari',
    arabicText: 'سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ».',
    bengaliText: 'আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি: সমস্ত কাজ নিয়তের উপর নির্ভরশীল, এবং প্রত্যেক ব্যক্তি তা-ই পাবে যা সে নিয়ত করেছে। অতএব যার হিজরত পার্থিব কোনো স্বার্থলাভের উদ্দেশ্যে হবে কিংবা কোনো নারীকে বিবাহ করার নিয়তে হবে, তার হিজরত সেই উদ্দেশ্যেই পরিগণিত হবে যার জন্য সে হিজরত করেছে।',
    englishText: 'I heard the Messenger of Allah ﷺ say: "Actions are but by intentions, and every person will have only what they intended. So whoever migrated for world gain or to marry a woman, their migration is for that which they migrated."',
    explanationBn: 'ইমাম শাফেয়ী ও ইমাম আহমদ (রহ.) বলেছেন: এই হাদিসটি দ্বীনের এক-তৃতীয়াংশ ইলম ধারণ করে। বান্দার প্রতিটি ইবাদতের গ্রহণযোগ্যতার প্রথম ও প্রধান শর্ত হলো আল্লাহর সন্তুষ্টির উদ্দেশ্যে একনিষ্ঠ নিয়ত।',
  },
  {
    id: 'muslim-1',
    collectionSlug: 'sahih-muslim',
    collectionNameBn: 'সহিহ মুসলিম',
    collectionNameAr: 'صحيح مسلم',
    hadithNumber: '৮',
    chapterNumber: 1,
    chapterTitleBn: '১. কিতাবুল ঈমান (হাদিসে জিবরিল)',
    chapterTitleAr: '١. كتاب الإيمان',
    chapterTitleEn: '1. Book of Faith',
    narratorBn: 'আবদুল্লাহ ইবনে উমর (রা.) স্বীয় পিতা উমর (রা.) থেকে',
    narratorAr: 'عبد الله بن عمر عن أبيه عمر بن الخطاب رضي الله عنهما',
    narratorEn: 'Abdullah ibn Umar from Umar ibn al-Khattab (ra)',
    gradeBn: 'সহিহ মুসলিম (উচ্চতম মান)',
    gradeAr: 'صحيح مسلم',
    gradeEn: 'Sahih Muslim',
    arabicText: 'قَالَ: يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلاَمِ. فَقَالَ رَسُولُ اللَّهِ ﷺ: «الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً»...',
    bengaliText: 'তিনি (জিবরিল আ.) বললেন: হে মুহাম্মদ! আমাকে ইসলাম সম্পর্কে অবহিত করুন। রাসুলুল্লাহ ﷺ বললেন: ইসলাম হলো তুমি সাক্ষ্য প্রদান করবে আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই এবং মুহাম্মদ ﷺ আল্লাহর রাসুল; নামাজ কায়েম করবে, যাকাত আদায় করবে, রমজানের রোজা রাখবে এবং সামর্থ্য থাকলে বায়তুল্লাহর হজ পালন করবে...',
    englishText: 'He (Gabriel) said: "O Muhammad, inform me about Islam." The Messenger of Allah ﷺ said: "Islam is to testify that there is no god but Allah and that Muhammad is the Messenger of Allah, to establish prayer, give zakah, fast Ramadan, and make pilgrimage to the House if you are able to find a way."',
    explanationBn: 'এই মর্যাদাপূর্ণ হাদিসটিকে "উম্মুস সুন্নাহ" বলা হয়। এতে ইসলাম, ঈমান ও ইহসানের স্তরসমূহ সুস্পষ্টভাবে বিন্যস্ত হয়েছে।',
  },
  {
    id: 'tirmidhi-1',
    collectionSlug: 'jami-at-tirmidhi',
    collectionNameBn: 'জামে আত-তিরমিজি',
    collectionNameAr: 'جامع الترمذي',
    hadithNumber: '১৯৮৭',
    chapterNumber: 27,
    chapterTitleBn: '২৭. সদ্ব্যবহার ও আত্মীয়তার সম্পর্ক রক্ষা',
    chapterTitleAr: '٢٧. باب ما جاء في معاشرة الناس',
    chapterTitleEn: '27. Interpersonal Relationships & Character',
    narratorBn: 'আবু যার আল-গিফারী ও মু‘আয ইবনে জাবাল (রা.)',
    narratorAr: 'أبو ذر الغفاري ومعاذ بن جبل رضي الله عنهما',
    narratorEn: 'Abu Dharr and Mu\'adh ibn Jabal (ra)',
    gradeBn: 'হাসান সহিহ (তিরমিজি ও আলবানী)',
    gradeAr: 'حسن صحيح',
    gradeEn: 'Hasan Sahih',
    arabicText: 'اتَّقِ اللَّهِ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.',
    bengaliText: 'তুমি যেখানেই থাকো আল্লাহকে ভয় করো (তাকওয়া অবলম্বন করো), কোনো ভুল বা পাপ সংঘটিত হয়ে গেলে সাথে সাথে একটি নেক কাজ করো যা সেই পাপকে মিটিয়ে দেবে, এবং মানুষের সাথে উত্তম চরিত্রের মাধ্যমে মেলামেশা করো।',
    englishText: 'Fear Allah wherever you may be; follow up an evil deed with a good one which will wipe it out; and behave well towards the people with noble character.',
    explanationBn: 'হাদিসটি মানুষের জীবনের তিনটি মূল ক্ষেত্রকে সন্নিবেশিত করেছে: ১. আল্লাহর সাথে সম্পর্ক (তাকওয়া), ২. নিজের নফসের সাথে সম্পর্ক (তাওবাহ ও সৎকর্ম), ৩. মানবসমাজের সাথে সম্পর্ক (উত্তম চরিত্র)।',
  },
];
