import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env.local
const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
const env = {};
for (const line of envFile.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    env[key] = val;
  }
}

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log('Testing Supabase connection...');
  const { data: roles, error: rolesError } = await supabase.from('roles').select('*');
  if (rolesError) {
    console.error('Error fetching roles:', rolesError);
    return;
  }
  console.log('Roles found:', roles.length, roles.map(r => r.name));

  // Seed Categories
  const categories = [
    {
      slug: 'hadith',
      icon_name: 'book-open',
      sort_order: 1,
      translations: {
        bn: { name: 'হাদিস ও সুন্নাহ', desc: 'রাসুলুল্লাহ ﷺ-এর বাণী, কর্ম ও সম্মতির বিশুদ্ধ সংকলন' },
        ar: { name: 'الحديث الشريف والسنة', desc: 'الأحاديث النبوية الشريفة الموثقة' },
        en: { name: 'Hadith & Sunnah', desc: 'Authentic collections of the Prophet’s sayings and traditions' },
      }
    },
    {
      slug: 'seerah',
      icon_name: 'sparkles',
      sort_order: 2,
      translations: {
        bn: { name: 'সীরাত ও শামায়েল', desc: 'নবীজি ﷺ-এর পবিত্র জীবনচরিত ও চারিত্রিক গুণাবলি' },
        ar: { name: 'السيرة النبوية والشمائل', desc: 'سيرة النبي المصطفى ﷺ وأخلاقه' },
        en: { name: 'Seerah & Prophetic Characteristics', desc: 'Life story and sublime character of Prophet Muhammad ﷺ' },
      }
    },
    {
      slug: 'duas',
      icon_name: 'heart',
      sort_order: 3,
      translations: {
        bn: { name: 'দু‘আ ও যিকির', desc: 'দৈনন্দিন জীবনের সকাল-সন্ধ্যা ও বিশেষ মুহূর্তের দু‘আ' },
        ar: { name: 'الأدعية والأذكار', desc: 'حصن المسلم وأذكار اليوم والليلة' },
        en: { name: 'Duas & Adhkar', desc: 'Daily supplications and remembrances of Allah' },
      }
    },
    {
      slug: 'akhlaq',
      icon_name: 'shield',
      sort_order: 4,
      translations: {
        bn: { name: 'আখলাক ও শিষ্টাচার', desc: 'ইসলামি উত্তম চরিত্র, মানবসেবা ও সামাজিক শিষ্টাচার' },
        ar: { name: 'الأخلاق والآداب الإسلامية', desc: 'الآداب النبوية والمعاملات الإنسانية' },
        en: { name: 'Islamic Morals & Etiquettes', desc: 'Prophetic manners, ethics, and interpersonal courtesies' },
      }
    }
  ];

  const categoryMap = {};

  for (const cat of categories) {
    const { data: existingCat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', cat.slug)
      .single();

    let catId = existingCat?.id;
    if (!catId) {
      const { data: newCat, error: catErr } = await supabase
        .from('categories')
        .insert({ slug: cat.slug, icon_name: cat.icon_name, sort_order: cat.sort_order })
        .select('id')
        .single();
      if (catErr) {
        console.error(`Error inserting category ${cat.slug}:`, catErr);
        continue;
      }
      catId = newCat.id;
    }
    categoryMap[cat.slug] = catId;

    // Translations
    for (const [lang, t] of Object.entries(cat.translations)) {
      await supabase.from('category_translations').upsert(
        {
          category_id: catId,
          language_code: lang,
          name: t.name,
          description: t.desc,
        },
        { onConflict: 'category_id,language_code' }
      );
    }
  }

  console.log('Categories seeded successfully:', Object.keys(categoryMap));

  // Seed 7 Classical Books
  const booksToSeed = [
    {
      slug: 'riyad-us-saliheen',
      catSlug: 'hadith',
      status: 'published',
      is_featured: true,
      is_popular: true,
      source_reference: 'মাকতাবাতুল মাআরিফ রিয়াদ, তাহকিক: শায়খ নাসিরুদ্দিন আলবানী (রহ.)',
      authenticity_grade: 'সহিহ ও নির্ভরযোগ্য (Sahih / Authentic)',
      titles: {
        bn: 'রিয়াযুস সলেহিন (রিয়াদুস সালেহীন)',
        ar: 'رياض الصالحين من كلام سيد المرسلين',
        en: 'Riyad us-Saliheen (Gardens of the Righteous)',
      },
      authors: {
        bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
        ar: 'الإمام محيي الدين أبو زكريا يحيى بن شرف النووي',
        en: 'Imam Abu Zakariya Yahya ibn Sharaf al-Nawawi',
        bio: {
          bn: 'হিজরি সপ্তম শতকের প্রখ্যাত মুহাদ্দিস, ফকিহ ও বহু মৌলিক গ্রন্থের রচয়িতা।',
          ar: 'الإمام الحافظ الفقيه الشافعي المحدث المشهور.',
          en: 'Renowned 7th-century Hijri hadith scholar and jurist.',
        },
        deathYear: '৬৭৬ হিজরি'
      },
      descriptions: {
        bn: 'দৈনন্দিন জীবনে আমলযোগ্য সহিহ হাদিসের সর্বশ্রেষ্ঠ প্রামাণ্য বিশ্বকোষ। মানবজীবনের প্রতিটি ক্ষেত্রের জন্য সুস্পষ্ট দিকনির্দেশনা।',
        ar: 'كتاب جامع في الحديث النبوي الشريف في مختلف أبواب الأخلاق والآداب والعبادات.',
        en: 'An indispensable comprehensive classical anthology of authentic hadiths covering every facet of Muslim life and spiritual growth.',
      },
      chapters: [
        {
          chapter_number: 1,
          slug: 'chapter-1-ikhlas-niyyah',
          duration_mins: 6,
          status: 'published',
          titles: {
            bn: '১. ইখলাস ও নিয়তের একনিষ্ঠতা',
            ar: '١. باب الإخلاص وإحضار النية في جميع الأعمال',
            en: '1. Sincerity and Noble Intent in All Actions',
          },
          hadiths: [
            {
              hadith_number: '১',
              collection_name: 'সহিহ আল-বুখারি (Sahih al-Bukhari)',
              narrator: 'আমিরুল মুমিনিন উমর ইবনুল খাত্তাব (রা.)',
              grade: 'Sahih',
              arabic_text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
              bengali_translation: 'কাজের ফলাফল কেবল নিয়তের উপর নির্ভরশীল, এবং প্রত্যেক ব্যক্তি যা নিয়ত করেছে তা-ই পাবে। যার হিজরত দুনিয়ার পার্থিব স্বার্থে কিংবা কোনো নারীকে বিয়ে করার উদ্দেশ্যে হবে, তার হিজরত সেই উদ্দেশ্যেই পরিগণিত হবে।',
              english_translation: 'Actions are judged by motives, so each person will have but that which he purposed...',
            }
          ]
        },
        {
          chapter_number: 2,
          slug: 'chapter-2-tawbah',
          duration_mins: 8,
          status: 'published',
          titles: {
            bn: '২. তাওবাহ ও আল্লাহর দিকে প্রত্যাবর্তন',
            ar: '٢. باب التوبة والاستغفار',
            en: '2. Repentance and Turning to Allah',
          },
          hadiths: [
            {
              hadith_number: '১৪',
              collection_name: 'সহিহ মুসলিম (Sahih Muslim)',
              narrator: 'আবু হুরায়রা (রা.)',
              grade: 'Sahih',
              arabic_text: 'يَا أَيُّهَا النَّاسُ تُوبُوا إِلَى اللَّهِ، فَإِنِّي أَتُوبُ فِي الْيَوْمِ إِلَيْهِ مِائَةَ مَرَّةٍ.',
              bengali_translation: 'হে মানবমণ্ডলী! তোমরা আল্লাহর সমীপে তাওবাহ কর; নিশ্চয় আমি প্রত্যহ একশত বার তাঁর কাছে তাওবাহ ও ক্ষমা প্রার্থনা করি।',
              english_translation: 'O people, repent to Allah and seek His forgiveness, for indeed I repent to Him a hundred times a day.',
            }
          ]
        }
      ]
    },
    {
      slug: 'hisnul-muslim',
      catSlug: 'duas',
      status: 'published',
      is_featured: true,
      is_popular: true,
      source_reference: 'মাকতাবাতুল মালিক ফাহাদ, রিয়াদ, ১৪০৯ হি.',
      authenticity_grade: 'সহিহ ও হাসান সনদে প্রমাণিত',
      titles: {
        bn: 'হিসনুল মুসলিম (দৈনন্দিন জীবনের দো‘আ ও যিকির)',
        ar: 'حصن المسلم من أذكار الكتاب والسنة',
        en: 'Hisnul Muslim (Fortress of the Muslim)',
      },
      authors: {
        bn: 'ড. সাঈদ ইবনে আলী ইবনে ওহাফ আল-কাহতানী (রহ.)',
        ar: 'د. سعيد بن علي بن وهف القحطاني',
        en: 'Dr. Sa\'eed bin Ali bin Wahf Al-Qahtani',
        bio: {
          bn: 'সৌদি আরবের প্রখ্যাত স্কলার ও বহু নির্ভরযোগ্য ইসলামি গ্রন্থের লেখক।',
          ar: 'عالم وداعية إسلامي سعودي ومؤلف مشهور.',
          en: 'Prominent Islamic scholar, author, and researcher.',
        },
        deathYear: '১৪৪০ হিজরি'
      },
      descriptions: {
        bn: 'কুরআন ও সুন্নাহর আলোকে সকাল-সন্ধ্যা, বিপদ-আপদ, নামাজ এবং দৈনন্দিন সর্বাবস্থার নির্ভরযোগ্য দু‘আ ও যিকিরের সংকলন।',
        ar: 'أشهر وأصح كتاب جمع أذكار الصباح والمساء واليوم والليلة من القرآن والسنة الصحيحة.',
        en: 'The world-renowned authenticated handbook of daily supplications and Quranic invocations for every aspect of Muslim daily life.',
      },
      chapters: [
        {
          chapter_number: 1,
          slug: 'morning-evening-dhikr',
          duration_mins: 7,
          status: 'published',
          titles: {
            bn: '১. সকাল ও সন্ধ্যার মাসনূন দু‘আ ও যিকির',
            ar: '١. أذكار الصباح والمساء',
            en: '1. Morning and Evening Remembrances',
          },
          hadiths: [
            {
              hadith_number: '১',
              collection_name: 'সহিহ আল-বুখারি ও মুসলিম',
              narrator: 'শাদ্দাদ ইবনে আউস (রা.)',
              grade: 'Sahih (Muttafaq Alayh)',
              arabic_text: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
              bengali_translation: 'সাইয়্যিদুল ইস্তিগফার: হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া কোনো সত্য ইলাহ নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা...',
              english_translation: 'Chief of Forgiveness: O Allah, You are my Lord, none has the right to be worshipped but You...',
            }
          ]
        }
      ]
    },
    {
      slug: 'arbauna-an-nawawiyyah',
      catSlug: 'hadith',
      status: 'published',
      is_featured: true,
      is_popular: true,
      source_reference: 'দারুল মিনহাজ, দামেশক, তাহকিককৃত প্রামাণ্য সংস্করণ',
      authenticity_grade: 'উচ্চমানের সহিহ হাদিস (Sahih)',
      titles: {
        bn: 'আল-আরবাঈন আন-নববিয়্যাহ (ইমাম নববীর ৪০ হাদিস)',
        ar: 'الأربعون النووية في مباني الإسلام وقواعد الأحكام',
        en: 'Al-Arba\'in An-Nawawiyyah (The Forty Hadith of Al-Nawawi)',
      },
      authors: {
        bn: 'ইমাম মুহিউদ্দীন আবু জাকারিয়া ইয়াহইয়া আন-নববী (রহ.)',
        ar: 'الإمام محيي الدين أبو زكريا يحيى بن شرف النووي',
        en: 'Imam Abu Zakariya Yahya ibn Sharaf al-Nawawi',
        bio: {
          bn: 'হিজরি সপ্তম শতকের প্রখ্যাত মুহাদ্দিস ও ফকিহ।',
          ar: 'الإمام الحافظ الفقيه الشافعي.',
          en: 'Eminent hadith master and author of classical Islamic works.',
        },
        deathYear: '৬৭৬ হিজরি'
      },
      descriptions: {
        bn: 'দ্বীন ইসলামের মূল ভিত্তি ও মূলনীতি সম্বলিত সর্বাধিক গ্রহণযোগ্য ৪২টি অতি গুরুত্বপূর্ণ প্রামাণ্য হাদিসের অনন্য সংকলন।',
        ar: 'كتاب مبارك يضم جوامع كلم النبي ﷺ وقواعد الدين الإسلامي الحنيف.',
        en: 'Forty-two foundational hadiths encapsulating the quintessential principles and spiritual pillars of the Islamic faith.',
      },
      chapters: [
        {
          chapter_number: 1,
          slug: 'hadith-jibreel',
          duration_mins: 8,
          status: 'published',
          titles: {
            bn: '২. হাদিসে জিবরিল (ইসলাম, ঈমান ও ইহসান)',
            ar: '٢. حديث جبريل عليه السلام في بيان مراتب الدين',
            en: '2. The Hadith of Gabriel (Islam, Iman, and Ihsan)',
          },
          hadiths: [
            {
              hadith_number: '২',
              collection_name: 'সহিহ মুসলিম',
              narrator: 'উমর ইবনুল খাত্তাব (রা.)',
              grade: 'Sahih',
              arabic_text: 'قَالَ: فَأَخْبِرْنِي عَنِ الإِسْلاَمِ. قَالَ رَسُولُ اللَّهِ ﷺ: الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ...',
              bengali_translation: 'জিবরিল (আ.) বললেন: আমাকে ইসলাম সম্পর্কে বলুন। রাসুলুল্লাহ ﷺ বললেন: ইসলাম হলো তুমি সাক্ষ্য দেবে আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই...',
              english_translation: 'He said: Tell me about Islam. The Messenger of Allah ﷺ said: Islam is that you testify that there is no god but Allah...',
            }
          ]
        }
      ]
    },
    {
      slug: 'adabul-mufrad',
      catSlug: 'akhlaq',
      status: 'published',
      is_featured: false,
      is_popular: true,
      source_reference: 'দারুল বাশাইর আল-ইসলামিয়্যাহ, বৈরুত, ১৪০৯ হি.',
      authenticity_grade: 'তাহকিককৃত সহিহ ও হাসান বর্ণনা',
      titles: {
        bn: 'আল-আদাবুল মুফরাদ (আখলাক ও শিষ্টাচার)',
        ar: 'الأدب المفرد بالسنن والآثار',
        en: 'Al-Adab Al-Mufrad (Islamic Manners and Etiquettes)',
      },
      authors: {
        bn: 'ইমাম আবু আবদুল্লাহ মুহাম্মদ ইবনে ইসমাইল আল-বুখারি (রহ.)',
        ar: 'الإمام أبو عبد الله محمد بن إسماعيل البخاري',
        en: 'Imam Muhammad ibn Ismail al-Bukhari',
        bio: {
          bn: 'আমিরুল মুমিনিন ফিল হাদিস, সহিহ বুখারির সংকলক।',
          ar: 'أمير المؤمنين في الحديث الشريف.',
          en: 'The foremost master and codifier of authentic hadith traditions.',
        },
        deathYear: '২৫৬ হিজরি'
      },
      descriptions: {
        bn: 'পিতা-মাতার খেদমত, আত্মীয়তার সম্পর্ক, প্রতিবেশীর অধিকার ও উন্নত চারিত্রিক শিষ্টাচার সম্পর্কিত প্রামাণ্য হাদিসের অনন্য ভাণ্ডার।',
        ar: 'كتاب فريد في مكارم الأخلاق والبر والصلة وحقوق الجيران والآداب الرفيعة.',
        en: 'A profound collection of prophetic traditions dedicated specifically to noble manners, ethics, family relationships, and personal conduct.',
      },
      chapters: []
    },
    {
      slug: 'ar-raheeq-al-makhtum',
      catSlug: 'seerah',
      status: 'published',
      is_featured: true,
      is_popular: true,
      source_reference: 'রাবেতায়ে আলমে ইসলামী প্রথম পুরস্কারপ্রাপ্ত পাণ্ডুলিপি, মাকতাবাতুস সালাফিয়্যাহ',
      authenticity_grade: 'বিশ্বস্বীকৃত ও নির্ভরযোগ্য সীরাত গ্রন্থ',
      titles: {
        bn: 'আর-রাহীকুল মাখতূম (মোহরাঙ্কিত জান্নাতী সুধা)',
        ar: 'الرحيق المختوم: بحث في السيرة النبوية على صاحبها أفضل الصلاة والسلام',
        en: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
      },
      authors: {
        bn: 'আল্লামা সফিউর রহমান মুবারকপুরী (রহ.)',
        ar: 'العلامة صفي الرحمن المباركفوري',
        en: 'Safiur Rahman al-Mubarakpuri',
        bio: {
          bn: 'আন্তর্জাতিক খ্যাতিসম্পন্ন ইতিহাসবিদ ও হাদিস গবেষক।',
          ar: 'مؤرخ وباحث إسلامي بارز وأستاذ بالجامعة الإسلامية بالمدينة المنورة.',
          en: 'Renowned historian, Islamic researcher, and professor at Islamic University of Madinah.',
        },
        deathYear: '১৪২৭ হিজরি'
      },
      descriptions: {
        bn: 'বিশ্ব মুসলিম লীগের বিশ্বব্যাপী সীরাতুন্নবী প্রতিযোগিতায় প্রথম স্থান অধিকারী সর্বাধিক প্রামাণ্য ও বহুল পঠিত সীরাত গ্রন্থ।',
        ar: 'الكتاب الفائز بالمركز الأول في مسابقة رابطة العالم الإسلامي في السيرة النبوية المطهرة.',
        en: 'The definitive award-winning classical biography of the Prophet Muhammad ﷺ, celebrated globally for its precision, scholarship, and narrative brilliance.',
      },
      chapters: []
    },
    {
      slug: 'shamail-tirmidhi',
      catSlug: 'seerah',
      status: 'published',
      is_featured: false,
      is_popular: true,
      source_reference: 'দারুল হাদিস, কায়রো, পাণ্ডুলিপি সংস্করণ',
      authenticity_grade: 'সহিহ ও সুনান গ্রন্থভুক্ত প্রামাণ্য সনদ',
      titles: {
        bn: 'শামায়েলে তিরমিযী (নবীজির দৈহিক ও আত্মিক রূপ)',
        ar: 'الشمائل المحمدية والخصائص المصطفوية',
        en: 'Ash-Shama\'il Al-Muhammadiyyah',
      },
      authors: {
        bn: 'ইমাম আবু ঈসা মুহাম্মদ আত-তিরমিযী (রহ.)',
        ar: 'الإمام أبو عيسى محمد بن عيسى الترمذي',
        en: 'Imam Abu Isa Muhammad at-Tirmidhi',
        bio: {
          bn: 'সুনানে তিরমিযীর রচয়িতা ও প্রখ্যাত মুহাদ্দিস।',
          ar: 'صاحب الجامع الكبير وأحد الأئمة الستة.',
          en: 'One of the six major classical Hadith compilers and master scholar.',
        },
        deathYear: '২৭৯ হিজরি'
      },
      descriptions: {
        bn: 'রাসুলুল্লাহ ﷺ-এর মুবারক আকৃতি, সুন্দর বেশভূষা, হাঁটাচলা, চারিত্রিক বৈশিষ্ট্য ও পবিত্র স্বভাবের প্রামাণ্য নিখুঁত বিবরণ।',
        ar: 'وصف تفصيلي دقيق لخصائص النبي ﷺ وخلقه الشريف وأخلاقه الرفيعة.',
        en: 'A sublime collection of authentic narrations detailing the blessed physical description, sublime mannerisms, and noble character of the Prophet ﷺ.',
      },
      chapters: []
    },
    {
      slug: 'bulugh-al-maram',
      catSlug: 'hadith',
      status: 'published',
      is_featured: false,
      is_popular: false,
      source_reference: 'দারুস সালাম, রিয়াদ, ১৪১৮ হি.',
      authenticity_grade: 'তাহকিককৃত প্রামাণ্য আহকাম হাদিস',
      titles: {
        bn: 'বুলুগুল মারাম মিন আদিল্লাতিল আহকাম',
        ar: 'بلوغ المرام من أدلة الأحكام',
        en: 'Bulugh al-Maram',
      },
      authors: {
        bn: 'আল-হাফিজ ইবনে হাজার আল-আসকালানী (রহ.)',
        ar: 'الحافظ أحمد بن علي بن حجر العسقلاني',
        en: 'Al-Hafiz Ibn Hajar al-Asqalani',
        bio: {
          bn: 'আমিরুল মুমিনিন ফিল হাদিস, ফাতহুল বারীর রচয়িতা।',
          ar: 'شيخ الإسلام وأمير المؤمنين في الحديث وصاحب فتح الباري.',
          en: 'The paramount 8th-century hadith authority and commentator of Sahih al-Bukhari.',
        },
        deathYear: '৮৫২ হিজরি'
      },
      descriptions: {
        bn: 'ইসলামি শরিয়তের আহকাম, ইবাদত ও ফিকহ সংক্রান্ত অপরিহার্য দলিলের প্রামাণ্য ও উচ্চমানের সংকলন।',
        ar: 'أهم كتاب جمع أدلة الأحكام الفقهية من أمهات كتب الحديث الشريف.',
        en: 'A premier sourcebook compiling essential hadith evidences underpinning Islamic jurisprudence, devotional worship, and transactions.',
      },
      chapters: []
    }
  ];

  for (const b of booksToSeed) {
    const categoryId = categoryMap[b.catSlug];

    const { data: existingBook } = await supabase
      .from('books')
      .select('id')
      .eq('slug', b.slug)
      .single();

    let bookId = existingBook?.id;
    if (!bookId) {
      const { data: newBook, error: bookErr } = await supabase
        .from('books')
        .insert({
          slug: b.slug,
          category_id: categoryId,
          status: b.status,
          is_featured: b.is_featured,
          is_popular: b.is_popular,
          source_reference: b.source_reference,
          authenticity_grade: b.authenticity_grade,
          published_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (bookErr) {
        console.error(`Error inserting book ${b.slug}:`, bookErr);
        continue;
      }
      bookId = newBook.id;
    }

    console.log(`Book ready: ${b.slug} (ID: ${bookId})`);

    // Translations (bn, ar, en)
    for (const lang of ['bn', 'ar', 'en']) {
      await supabase.from('book_translations').upsert(
        {
          book_id: bookId,
          language_code: lang,
          title: b.titles[lang],
          original_title: b.titles['ar'],
          author_name: b.authors[lang],
          author_bio: b.authors.bio ? b.authors.bio[lang] : '',
          author_death_hijri: b.authors.deathYear,
          description: b.descriptions[lang],
          full_description: b.descriptions[lang],
        },
        { onConflict: 'book_id,language_code' }
      );
    }

    // Chapters and Hadiths
    if (b.chapters && b.chapters.length > 0) {
      for (const ch of b.chapters) {
        const { data: existingCh } = await supabase
          .from('chapters')
          .select('id')
          .eq('book_id', bookId)
          .eq('slug', ch.slug)
          .single();

        let chapterId = existingCh?.id;
        if (!chapterId) {
          const { data: newCh, error: chErr } = await supabase
            .from('chapters')
            .insert({
              book_id: bookId,
              chapter_number: ch.chapter_number,
              slug: ch.slug,
              duration_mins: ch.duration_mins,
              status: ch.status,
              sort_order: ch.chapter_number,
            })
            .select('id')
            .single();

          if (chErr) {
            console.error(`Error inserting chapter ${ch.slug}:`, chErr);
            continue;
          }
          chapterId = newCh.id;
        }

        // Chapter Translations
        for (const lang of ['bn', 'ar', 'en']) {
          await supabase.from('chapter_translations').upsert(
            {
              chapter_id: chapterId,
              language_code: lang,
              title: ch.titles[lang],
              content_html: `<p>${ch.titles[lang]}</p>`,
            },
            { onConflict: 'chapter_id,language_code' }
          );
        }

        // Hadiths
        if (ch.hadiths && ch.hadiths.length > 0) {
          for (const h of ch.hadiths) {
            await supabase.from('hadith_references').insert({
              chapter_id: chapterId,
              hadith_number: h.hadith_number,
              collection_name: h.collection_name,
              arabic_text: h.arabic_text,
              bengali_translation: h.bengali_translation,
              english_translation: h.english_translation,
              narrator: h.narrator,
              grade: h.grade,
            });
          }
        }
      }
    }
  }

  console.log('Seeding complete! Verified all 7 books and chapters.');
}

main().catch(err => {
  console.error('Seed script error:', err);
  process.exit(1);
});
