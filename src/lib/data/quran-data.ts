export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameBengali: string;
  nameEnglish: string;
  meaningBengali: string;
  meaningEnglish: string;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeBn: 'মাক্কী' | 'মাদানী';
  totalAyahs: number;
  slug: string;
}

export interface AyahItem {
  numberInSurah: number;
  textArabic: string;
  textBengali: string;
  textEnglish: string;
  audioUrl?: string;
}

export const SURAH_LIST: SurahMeta[] = [
  {
    number: 1,
    nameArabic: 'الفَاتِحَة',
    nameBengali: 'আল-ফাতিহা',
    nameEnglish: 'Al-Fatihah',
    meaningBengali: 'সূচনা / ভূমিকা',
    meaningEnglish: 'The Opening',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 7,
    slug: 'al-fatihah',
  },
  {
    number: 2,
    nameArabic: 'البَقَرَة',
    nameBengali: 'আল-বাকারা',
    nameEnglish: 'Al-Baqarah',
    meaningBengali: 'বকনা বাছুর',
    meaningEnglish: 'The Cow',
    revelationType: 'Medinan',
    revelationTypeBn: 'মাদানী',
    totalAyahs: 286,
    slug: 'al-baqarah',
  },
  {
    number: 3,
    nameArabic: 'آلِ عِمْرَان',
    nameBengali: 'আলে ইমরান',
    nameEnglish: 'Ali \'Imran',
    meaningBengali: 'ইমরানের পরিবার',
    meaningEnglish: 'Family of Imran',
    revelationType: 'Medinan',
    revelationTypeBn: 'মাদানী',
    totalAyahs: 200,
    slug: 'ali-imran',
  },
  {
    number: 4,
    nameArabic: 'النِّسَاء',
    nameBengali: 'আন-নিসা',
    nameEnglish: 'An-Nisa',
    meaningBengali: 'মহিলাগণ',
    meaningEnglish: 'The Women',
    revelationType: 'Medinan',
    revelationTypeBn: 'মাদানী',
    totalAyahs: 176,
    slug: 'an-nisa',
  },
  {
    number: 18,
    nameArabic: 'الكَهْف',
    nameBengali: 'আল-কাহফ',
    nameEnglish: 'Al-Kahf',
    meaningBengali: 'গুহা',
    meaningEnglish: 'The Cave',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 110,
    slug: 'al-kahf',
  },
  {
    number: 36,
    nameArabic: 'يس',
    nameBengali: 'ইয়াসিন',
    nameEnglish: 'Ya-Sin',
    meaningBengali: 'ইয়াসীন',
    meaningEnglish: 'Ya Sin',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 83,
    slug: 'ya-sin',
  },
  {
    number: 55,
    nameArabic: 'الرَّحْمَٰن',
    nameBengali: 'আর-রহমান',
    nameEnglish: 'Ar-Rahman',
    meaningBengali: 'পরম দয়ালু',
    meaningEnglish: 'The Beneficent',
    revelationType: 'Medinan',
    revelationTypeBn: 'মাদানী',
    totalAyahs: 78,
    slug: 'ar-rahman',
  },
  {
    number: 56,
    nameArabic: 'الوَاقِعَة',
    nameBengali: 'আল-ওয়াকিয়া',
    nameEnglish: 'Al-Waqi\'ah',
    meaningBengali: 'নিশ্চিত ঘটনা',
    meaningEnglish: 'The Inevitable',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 96,
    slug: 'al-waqiah',
  },
  {
    number: 67,
    nameArabic: 'المُلْك',
    nameBengali: 'আল-মুলক',
    nameEnglish: 'Al-Mulk',
    meaningBengali: 'সার্বভৌম কর্তৃত্ব / রাজত্ব',
    meaningEnglish: 'Sovereignty',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 30,
    slug: 'al-mulk',
  },
  {
    number: 112,
    nameArabic: 'الإِخْلَاص',
    nameBengali: 'আল-ইখলাস',
    nameEnglish: 'Al-Ikhlas',
    meaningBengali: 'একনিষ্ঠতা / বিশুদ্ধ বিশ্বাস',
    meaningEnglish: 'The Sincerity',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 4,
    slug: 'al-ikhlas',
  },
  {
    number: 113,
    nameArabic: 'الفَلَق',
    nameBengali: 'আল-ফালাক',
    nameEnglish: 'Al-Falaq',
    meaningBengali: 'প্রভাত / ভোরের আলো',
    meaningEnglish: 'The Daybreak',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 5,
    slug: 'al-falaq',
  },
  {
    number: 114,
    nameArabic: 'النَّاس',
    nameBengali: 'আন-নাস',
    nameEnglish: 'An-Nas',
    meaningBengali: 'মানবজাতি',
    meaningEnglish: 'Mankind',
    revelationType: 'Meccan',
    revelationTypeBn: 'মাক্কী',
    totalAyahs: 6,
    slug: 'an-nas',
  },
];

export const VERIFIED_SURAHS_CONTENT: Record<number, { meta: SurahMeta; ayahs: AyahItem[] }> = {
  1: {
    meta: SURAH_LIST[0],
    ayahs: [
      {
        numberInSurah: 1,
        textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        textBengali: 'শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।',
        textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      {
        numberInSurah: 2,
        textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        textBengali: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি সকল সৃষ্টিজগতের পালনকর্তা।',
        textEnglish: '[All] praise is [due] to Allah, Lord of the worlds -',
      },
      {
        numberInSurah: 3,
        textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        textBengali: 'যিনি পরম করুণাময় ও অতি দয়ালু।',
        textEnglish: 'The Entirely Merciful, the Especially Merciful,',
      },
      {
        numberInSurah: 4,
        textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
        textBengali: 'যিনি বিচার দিবসের মালিক।',
        textEnglish: 'Sovereign of the Day of Recompense.',
      },
      {
        numberInSurah: 5,
        textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        textBengali: 'আমরা কেবল আপনারই ইবাদত করি এবং কেবল আপনারই সাহায্য প্রার্থনা করি।',
        textEnglish: 'It is You we worship and You we ask for help.',
      },
      {
        numberInSurah: 6,
        textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        textBengali: 'আমাদেরকে সরল-সঠিক পথ প্রদর্শন করুন।',
        textEnglish: 'Guide us to the straight path -',
      },
      {
        numberInSurah: 7,
        textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        textBengali: 'সে সমস্ত মানুষের পথ, যাদেরকে আপনি অনুগ্রহ দান করেছেন; তাদের পথ নয় যাদের ওপর আপনার ক্রোধ আপতিত হয়েছে এবং যারা পথভ্রষ্ট হয়েছে।',
        textEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      },
    ],
  },
  112: {
    meta: SURAH_LIST.find((s) => s.number === 112)!,
    ayahs: [
      {
        numberInSurah: 1,
        textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        textBengali: 'বলুন, তিনিই আল্লাহ, একক ও অদ্বিতীয়।',
        textEnglish: 'Say, "He is Allah, [who is] One,',
      },
      {
        numberInSurah: 2,
        textArabic: 'اللَّهُ الصَّمَدُ',
        textBengali: 'আল্লাহ অমুখাপেক্ষী (সকল সৃষ্টি তাঁর মুখাপেক্ষী)।',
        textEnglish: 'Allah, the Eternal Refuge.',
      },
      {
        numberInSurah: 3,
        textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        textBengali: 'তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।',
        textEnglish: 'He neither begets nor is born,',
      },
      {
        numberInSurah: 4,
        textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        textBengali: 'এবং তাঁর সমকক্ষ কেউই নেই।',
        textEnglish: 'Nor is there to Him any equivalent."',
      },
    ],
  },
  113: {
    meta: SURAH_LIST.find((s) => s.number === 113)!,
    ayahs: [
      {
        numberInSurah: 1,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        textBengali: 'বলুন, আমি আশ্রয় প্রার্থনা করছি প্রভাতের রবের কাছে,',
        textEnglish: 'Say, "I seek refuge in the Lord of daybreak,',
      },
      {
        numberInSurah: 2,
        textArabic: 'مِن شَرِّ مَا خَلَقَ',
        textBengali: 'তিনি যা সৃষ্টি করেছেন তার অনিষ্ট হতে,',
        textEnglish: 'From the evil of that which He created,',
      },
      {
        numberInSurah: 3,
        textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        textBengali: 'এবং রাতের অন্ধকারের অনিষ্ট হতে যখন তা সমাগত হয়,',
        textEnglish: 'And from the evil of darkness when it settles,',
      },
      {
        numberInSurah: 4,
        textArabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        textBengali: 'এবং গ্রন্থিতে ফুঁকদানকারী জাদুকরিদের অনিষ্ট হতে,',
        textEnglish: 'And from the evil of the blowers in knots,',
      },
      {
        numberInSurah: 5,
        textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        textBengali: 'এবং হিংসুকের অনিষ্ট হতে যখন সে হিংসা করে।',
        textEnglish: 'And from the evil of an envier when he envies."',
      },
    ],
  },
  114: {
    meta: SURAH_LIST.find((s) => s.number === 114)!,
    ayahs: [
      {
        numberInSurah: 1,
        textArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        textBengali: 'বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের প্রতিপালকের কাছে,',
        textEnglish: 'Say, "I seek refuge in the Lord of mankind,',
      },
      {
        numberInSurah: 2,
        textArabic: 'مَلِكِ النَّاسِ',
        textBengali: 'মানুষের অধিপতির কাছে,',
        textEnglish: 'The Sovereign of mankind,',
      },
      {
        numberInSurah: 3,
        textArabic: 'إِلَٰهِ النَّاسِ',
        textBengali: 'মানুষের সত্য উপাস্যের কাছে,',
        textEnglish: 'The God of mankind,',
      },
      {
        numberInSurah: 4,
        textArabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        textBengali: 'কুন্ত্রণাদাতার অনিষ্ট থেকে, যে আত্মগোপন করে,',
        textEnglish: 'From the evil of the retreating whisperer -',
      },
      {
        numberInSurah: 5,
        textArabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        textBengali: 'যে মানুষের অন্তরে কুমন্ত্রণা দেয়,',
        textEnglish: 'Who whispers [evil] into the breasts of mankind -',
      },
      {
        numberInSurah: 6,
        textArabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
        textBengali: 'জিন অথবা মানুষের মধ্য হতে।',
        textEnglish: 'From among the jinn and mankind."',
      },
    ],
  },
};
