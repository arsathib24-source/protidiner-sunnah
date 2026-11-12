import { ReaderBook } from '@/types/reader';

export const VERIFIED_READER_BOOKS: Record<string, ReaderBook> = {
  'riyad-us-saliheen': {
    slug: 'riyad-us-saliheen',
    title: {
      bn: 'রিয়াদুস সলেহিন',
      ar: 'رياض الصالحين',
      en: 'Riyad us-Saliheen',
    },
    author: {
      bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
      ar: 'الإمام النووي رحمه الله',
      en: 'Imam Yahya ibn Sharaf an-Nawawi (rah.)',
    },
    category: {
      bn: 'হাদিস সংকলন',
      ar: 'الحديث الشريف',
      en: 'Hadith Collection',
    },
    verifiedSource: 'দারুসসালাম প্রকাশনী, রিয়াদ (তাহকিককৃত সংস্করণ ২০০০)',
    chapters: [
      {
        number: 1,
        slug: 'chapter-1-iklas-niyyat',
        title: {
          bn: '১. ইখলাস ও নিয়ত শুদ্ধিকরণ',
          ar: '١. باب الإخلاص وإحضار النية في جميع الأعمال والأقوال',
          en: '1. Sincerity and Intention in All Actions and Words',
        },
        subtitle: {
          bn: 'সকল প্রকাশ্য ও অপ্রকাশ্য কর্ম এবং কথার ক্ষেত্রে আল্লাহর সন্তুষ্টির নিয়ত নির্ধারণ',
          ar: 'في جميع الأعمال والأقوال والأحوال البارزة والخفية',
          en: 'In all actions, utterances, and states, both overt and covert',
        },
        durationMins: 8,
        paragraphs: [
          {
            id: 'p-1',
            type: 'quran',
            arabic: '﴿وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ﴾',
            bengali: '«আর তাদেরকে এছাড়া অন্য কোনো হুকুম দেওয়া হয়নি যে, তারা খাঁটি আনুগত্যের সাথে একনিষ্ঠভাবে কেবল আল্লাহরই ইবাদত করবে, সালাত কায়েম করবে এবং জাকাত আদায় করবে। আর এটাই হলো চিরন্তন সত্য ও সঠিক দ্বীন।’',
            english: '‘And they were not commanded except to worship Allah, [being] sincere to Him in religion, inclining to truth, and to establish prayer and to give zakah. And that is the correct religion.’',
            source: 'সুরা আল-বাইয়্যিনাহ: ৫ (Surah Al-Bayyinah 98:5)',
          },
          {
            id: 'p-2',
            type: 'quran',
            arabic: '﴿لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ﴾',
            bengali: '«আল্লাহর কাছে কখনই এগুলোর (কোরবানির পশুর) গোশত ও রক্ত পৌঁছে না; বরং তাঁর কাছে পৌঁছে কেবল তোমাদের অন্তরের তাকওয়া ও নিষ্ঠা।’',
            english: '‘Their meat will not reach Allah, nor will their blood, but what reaches Him is piety from you.’',
            source: 'সুরা আল-হাজ্জ: ৩৭ (Surah Al-Hajj 22:37)',
          },
          {
            id: 'p-3',
            type: 'hadith',
            arabic: 'عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ، قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:\n«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا، أَوِ امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ»',
            bengali: 'আমিরুল মুমিনিন আবু হাফস উমর ইবনুল খাত্তাব (রাদিয়াল্লাহু আনহু) থেকে বর্ণিত, তিনি বলেন: আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি:\n«সকল কাজের গ্রহণযোগ্যতা কেবল নিয়তের উপর নির্ভরশীল; আর প্রত্যেক ব্যক্তি তাই পাবে, যা সে নিয়ত করেছে। অতএব যার হিজরত একমাত্র আল্লাহ ও তাঁর রাসুলের সন্তুষ্টির উদ্দেশ্যে হবে, তার হিজরত আল্লাহ ও তাঁর রাসুলের প্রতিই গণ্য হবে। আর যার হিজরত কোনো পার্থিব সম্পদ অর্জন বা কোনো নারীকে বিবাহের উদ্দেশ্যে হবে, তার হিজরত সেই উদ্দেশ্যেই গণ্য হবে যার দিকে সে হিজরত করেছে।»',
            english: 'Narrated from the Commander of the Faithful, Abu Hafs Umar ibn al-Khattab (may Allah be pleased with him): I heard the Messenger of Allah ﷺ say:\n‘Actions are according to intentions, and each person will have only what he intended. So whoever emigrated for Allah and His Messenger, his emigration is for Allah and His Messenger. And whoever emigrated for worldly gain or to marry a woman, his emigration is for what he emigrated for.’',
            source: 'সহিহ আল-বুখারি: ১, সহিহ মুসলিম: ১৯০৭ (Sahih al-Bukhari: 1, Sahih Muslim: 1907)',
            grade: 'মুত্তাফাকুন আলাইহ (সর্বোচ্চ সহিহ হাদিস)',
          },
          {
            id: 'p-4',
            type: 'hadith',
            arabic: 'عَنْ أَبِي هُرَيْرَةَ عَبْدِ الرَّحْمَنِ بْنِ صَخْرٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ:\n«إِنَّ اللَّهَ لا يَنْظُرُ إِلَى أَجْسَامِكُمْ، وَلا إِلَى صُوَرِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ»',
            bengali: 'আবু হুরায়রা (রাদিয়াল্লাহু আনহু) থেকে বর্ণিত, তিনি বলেন: রাসুলুল্লাহ ﷺ ইরশাদ করেছেন:\n«নিশ্চয়ই আল্লাহ তাআলা তোমাদের বাহ্যিক দেহাবয়ব কিংবা রূপ-সৌন্দর্যের দিকে তাকান না; বরং তিনি দৃষ্টিপাত করেন তোমাদের অন্তর এবং তোমাদের কর্মসমূহের দিকে।»',
            english: 'Narrated from Abu Hurairah (may Allah be pleased with him): The Messenger of Allah ﷺ said:\n‘Verily Allah does not look at your bodies or your outward appearances, but He looks at your hearts and your deeds.’',
            source: 'সহিহ মুসলিম: ২৫৬৪ (Sahih Muslim: 2564)',
            grade: 'সহিহ মুসলিম',
          },
          {
            id: 'p-5',
            type: 'commentary',
            bengali: 'হাদিসের সারসংক্ষেপ ও ফিকহ:\nইমাম নববী (রহ.) তার কিতাবের সূচনায় এই হাদিসটি উল্লেখ করে স্মরণ করিয়ে দিয়েছেন যে, দ্বীনি ইলম অর্জন, হাদিস পাঠ কিংবা যেকোনো নেক আমলের গ্রহণযোগ্যতার প্রধান শর্ত হলো মনের একাগ্রতা ও খাঁটি নিয়ত। যখন কোনো কর্মে লোকদেখানো বা আত্মতৃপ্তির মনোভাব যুক্ত হয়, তখন তার বরকত নষ্ট হয়ে যায়।',
            english: 'Commentary & Scholarly Reflections:\nImam an-Nawawi initiated his work with these traditions to emphasize that seeking sacred knowledge, reading prophetic traditions, or performing any pious work requires pure dedication to Allah alone. Sincerity transforms everyday permissible acts into acts of reward.',
          },
        ],
      },
      {
        number: 2,
        slug: 'chapter-2-tawbah',
        title: {
          bn: '২. তাওবাহ ও অনুশোচনা',
          ar: '٢. باب التوبة ووجوبها من كل ذنب',
          en: '2. Repentance and its Obligation for Every Sin',
        },
        subtitle: {
          bn: 'প্রত্যেক পাপ থেকে অবিলম্বে তওবা করার অপরিহার্যতা ও এর শর্তাবলি',
          ar: 'وجوب التوبة والإقلاع عن المعاصي ورد المظالم',
          en: 'The obligation to turn to Allah in repentance and rectify wrongs',
        },
        durationMins: 10,
        paragraphs: [
          {
            id: 'p-1',
            type: 'quran',
            arabic: '﴿وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ﴾',
            bengali: '«হে মুমিনগণ! তোমরা সবাই আল্লাহর দিকে তওবা করো, যাতে তোমরা সফলকাম হতে পারো।’',
            english: '‘And turn to Allah in repentance, all of you, O believers, that you might succeed.’',
            source: 'সুরা আন-নূর: ৩১ (Surah An-Nur 24:31)',
          },
          {
            id: 'p-2',
            type: 'hadith',
            arabic: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:\n«وَاللَّهِ إِنِّي لأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً»',
            bengali: 'আবু হুরায়রা (রাদিয়াল্লাহু আনহু) থেকে বর্ণিত, তিনি বলেন: আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি:\n«আল্লাহর শপথ! নিশ্চয়ই আমি প্রত্যহ সত্তরবারেরও অধিক আল্লাহর নিকট ক্ষমা প্রার্থনা (ইস্তিগফার) করি এবং তাঁর দিকে তাওবা করি।»',
            english: 'Narrated from Abu Hurairah (may Allah be pleased with him): I heard the Messenger of Allah ﷺ say:\n‘By Allah, I seek forgiveness from Allah and repent to Him more than seventy times a day.’',
            source: 'সহিহ আল-বুখারি: ৬৩০৭ (Sahih al-Bukhari: 6307)',
            grade: 'সহিহ বুখারি',
          },
          {
            id: 'p-3',
            type: 'commentary',
            bengali: 'তওবার শর্তাবলি:\nউলামায়ে কেরাম বর্ণনা করেছেন যে, তওবা কবুল হওয়ার জন্য প্রধান তিনটি শর্ত: (১) পাপ কাজ অবিলম্বে ত্যাগ করা, (২) অতীতের কৃতকর্মের জন্য আন্তরিকভাবে অনুতপ্ত হওয়া, (৩) ভবিষ্যতে পুনরায় তা না করার দৃঢ় সংকল্প গ্রহণ করা। আর অপরাধ যদি বান্দার হকের সাথে সংশ্লিষ্ট হয়, তবে চতুর্থ শর্ত হলো সেই হক ফিরিয়ে দেওয়া বা ক্ষমা চেয়ে নেওয়া।',
            english: 'Pillars of Valid Repentance:\nScholars state that repentance requires: (1) Immediate desistance from sin, (2) Deep remorse over the past, and (3) Resolute intention never to return to it. If a human right was infringed, restitution or seeking pardon is mandatory.',
          },
        ],
      },
      {
        number: 3,
        slug: 'chapter-3-sabr',
        title: {
          bn: '৩. ধৈর্য ও সবর ধারণ',
          ar: '٣. باب الصبر على البلاء والشدائد',
          en: '3. Patience through Adversity and Trials',
        },
        durationMins: 12,
        paragraphs: [
          {
            id: 'p-1',
            type: 'quran',
            arabic: '﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾',
            bengali: '«হে ঈমানদারগণ! তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা করো। নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে রয়েছেন।’',
            english: '‘O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.’',
            source: 'সুরা আল-বাকারাহ: ১৫৩ (Surah Al-Baqarah 2:153)',
          },
          {
            id: 'p-2',
            type: 'hadith',
            arabic: 'عَنْ أَبِي يَحْيَى صُهَيْبِ بْنِ سِنَانٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ:\n«عَجَبًا لأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لأَحَدٍ إِلاَّ لِلْمُؤْمِنِ: إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ»',
            bengali: 'সুহাইব ইবনে সিনান (রাদিয়াল্লাহু আনহু) থেকে বর্ণিত, তিনি বলেন: রাসুলুল্লাহ ﷺ বলেছেন:\n«মুমিনের বিষয়টি কতই না চমৎকার! নিশ্চয়ই তার সমস্ত কর্মকাণ্ডই তার জন্য কল্যাণকর, আর এই সৌভাগ্য মুমিন ছাড়া অন্য কারো নসিবে নেই। যদি তাকে কোনো সুখ-স্বাচ্ছন্দ্য স্পর্শ করে, তবে সে আল্লাহর শুকরিয়া আদায় করে, আর তা তার জন্য কল্যাণ বয়ে আনে। আর যদি সে কোনো দুঃখ-কষ্টে পতিত হয়, তবে সে ধৈর্য ধারণ করে, আর তাও তার জন্য প্রভূত কল্যাণ বয়ে আনে।»',
            english: 'Narrated from Suhaib ibn Sinan (may Allah be pleased with him): The Messenger of Allah ﷺ said:\n‘How wondrous is the affair of the believer! For indeed all of his affairs are good, and that is for none except the believer: if ease touches him, he shows gratitude and it is good for him; and if adversity touches him, he shows patience and it is good for him.’',
            source: 'সহিহ মুসলিম: ২৯৯৯ (Sahih Muslim: 2999)',
            grade: 'সহিহ মুসলিম',
          },
        ],
      },
    ],
  },
  'arbain-nawawi': {
    slug: 'arbain-nawawi',
    title: {
      bn: 'চল্লিশ হাদিস (আল-আরবাঈন)',
      ar: 'الأربعون النووية',
      en: 'An-Nawawi’s Forty Hadith',
    },
    author: {
      bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
      ar: 'الإمام النووي رحمه الله',
      en: 'Imam Yahya ibn Sharaf an-Nawawi (rah.)',
    },
    category: {
      bn: 'মৌলিক ইসলাম',
      ar: 'أصول الدين',
      en: 'Foundations of Faith',
    },
    verifiedSource: 'আল-মাকতাবাতুশ শামিলা তাহকিক সংস্করণ',
    chapters: [
      {
        number: 1,
        slug: 'hadith-1-niyyah',
        title: {
          bn: '১. নিয়ত ও কাজের সার্থকতা',
          ar: '١. إنما الأعمال بالنيات',
          en: '1. Actions are by Intentions',
        },
        durationMins: 4,
        paragraphs: [
          {
            id: 'p-1',
            type: 'hadith',
            arabic: 'عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ:\n«إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ»',
            bengali: 'আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রা.) বলেন: আমি রাসুলুল্লাহ ﷺ-কে বলতে শুনেছি:\n«সকল আমল নিয়তের উপর নির্ভরশীল; আর প্রত্যেক ব্যক্তি তাই পাবে যার সে নিয়ত করেছে...»',
            english: 'Umar ibn al-Khattab narrated: I heard the Messenger of Allah ﷺ say: ‘Actions are judged by motives, and each person will be rewarded according to what he intended...’',
            source: 'সহিহ বুখারি: ১, সহিহ মুসলিম: ১৯০৭',
            grade: 'সহিহ',
          },
        ],
      },
      {
        number: 2,
        slug: 'hadith-2-jibril',
        title: {
          bn: '২. হাদিসে জিবরাইল (ইসলাম, ঈমান ও ইহসান)',
          ar: '٢. حديث جبريل عليه السلام في بيان مراتب الدين',
          en: '2. The Hadith of Jibril (Islam, Iman, Ihsan)',
        },
        durationMins: 6,
        paragraphs: [
          {
            id: 'p-1',
            type: 'hadith',
            arabic: 'عَنْ عُمَرَ رَضِيَ اللهُ عَنْهُ أَيْضًا قَالَ: بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ رَسُولِ اللَّهِ ﷺ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوَادِ الشَّعْرِ، لاَ يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلاَ يَعْرِفُهُ مِنَّا أَحَدٌ، حَتَّى جَلَسَ إِلَى النَّبِيِّ ﷺ...\nفَقَالَ: «يَا مُحَمَّدُ أَخْبِرْنِي عَنِ الإِسْلاَمِ» فَقَالَ رَسُولُ اللَّهِ ﷺ:\n«الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً»',
            bengali: 'উমর (রা.) থেকে বর্ণিত: একদিন আমরা রাসুলুল্লাহ ﷺ-এর কাছে বসা ছিলাম। এমন সময় এক ব্যক্তি আগমন করলেন যার পরনের পোশাক ছিল ধবধবে সাদা এবং মাথার চুল ঘোর কৃষ্ণবর্ণ। তার মধ্যে সফরের কোনো চিহ্ন পরিলক্ষিত হচ্ছিল না এবং আমাদের মধ্যকার কেউ তাকে চিনতও না। তিনি নবীজি ﷺ-এর সামনে বসলেন এবং জিজ্ঞাসা করলেন: «হে মুহাম্মদ, আমাকে ইসলাম সম্পর্কে বলুন...»',
            english: 'Umar (may Allah be pleased with him) narrated: While we were sitting with the Messenger of Allah ﷺ one day, there appeared before us a man with exceedingly white clothes and exceedingly black hair. No signs of travel were visible upon him and none of us knew him...',
            source: 'সহিহ মুসলিম: ৮ (Sahih Muslim: 8)',
            grade: 'সহিহ মুসলিম',
          },
        ],
      },
    ],
  },
  'hisnul-muslim': {
    slug: 'hisnul-muslim',
    title: {
      bn: 'হিসনুল মুসলিম',
      ar: 'حصن المسلم',
      en: 'Hisnul Muslim',
    },
    author: {
      bn: 'ড. সাঈদ ইবন ওয়াহফ আল-কাহত্বানী (রহ.)',
      ar: 'الدكتور سعيد بن علي بن وهف القحطاني',
      en: 'Dr. Saeed bin Ali al-Qahtani (rah.)',
    },
    category: {
      bn: 'দোয়া ও জিকির',
      ar: 'الأذكار والدعاء',
      en: 'Duas & Remembrances',
    },
    verifiedSource: 'মাকতাবাতুল মাআরিফ রিয়াদ',
    chapters: [
      {
        number: 1,
        slug: 'sleep-wake-dhikr',
        title: {
          bn: '১. ঘুম থেকে জাগ্রত হওয়ার দোয়া',
          ar: '١. أذكار الاستيقاظ من النوم',
          en: '1. Remembrance upon Waking',
        },
        durationMins: 3,
        paragraphs: [
          {
            id: 'p-1',
            type: 'hadith',
            arabic: '«الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ»',
            bengali: '«সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদেরকে মৃত্যুর (নিদ্রার) পর পুনরায় জীবিত করলেন; আর তাঁর দিকেই আমাদের পুনরুত্থান।’',
            english: '‘Praise is to Allah Who gives us life after He has caused us to die and unto Him is the resurrection.’',
            source: 'সহিহ আল-বুখারি: ৬৩১২, সহিহ মুসলিম: ২৭১১',
            grade: 'সহিহ',
          },
          {
            id: 'p-2',
            type: 'hadith',
            arabic: '«لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلاَ إِلَهَ إِلاَّ اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي»',
            bengali: '«একমাত্র আল্লাহ ছাড়া কোনো সত্য মাবুদ নেই, তাঁর কোনো শরিক নেই। রাজত্ব একমাত্র তাঁরই এবং সমস্ত প্রশংসাও তাঁরই; আর তিনি সব কিছুর ওপর ক্ষমতাবান। আল্লাহ অতি পবিত্র, সমস্ত প্রশংসা আল্লাহর, আল্লাহ ছাড়া কোনো সত্য মাবুদ নেই, আল্লাহ মহান। সুউচ্চ মহিমান্বিত আল্লাহর সাহায্য ছাড়া পাপ থেকে বাঁচার এবং সৎকাজ করার কোনো সামর্থ্য নেই। হে আমার রব! আমাকে ক্ষমা করে দিন।’',
            english: '‘None has the right to be worshipped but Allah alone without partner. To Him belongs all sovereignty and praise, and He is over all things competent...’',
            source: 'সহিহ আল-বুখারি: ১১৫৪ (Sahih al-Bukhari: 1154)',
            grade: 'সহিহ বুখারি',
          },
        ],
      },
    ],
  },
};
