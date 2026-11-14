import fs from 'fs';
import path from 'path';

const RAW_SURAHS = [
  [1, "الفَاتِحَة", "আল-ফাতিহা", "Al-Fatihah", "সূচনা / ভূমিকা", "The Opening", "Meccan", "মাক্কী", 7, 1, "al-fatihah"],
  [2, "البَقَرَة", "আল-বাকারা", "Al-Baqarah", "বকনা বাছুর", "The Cow", "Medinan", "মাদানী", 286, 1, "al-baqarah"],
  [3, "آلِ عِمْرَان", "আলে ইমরান", "Ali 'Imran", "ইমরানের পরিবার", "Family of Imran", "Medinan", "মাদানী", 200, 3, "ali-imran"],
  [4, "النِّسَاء", "আন-নিসা", "An-Nisa", "মহিলাগণ", "The Women", "Medinan", "মাদানী", 176, 4, "an-nisa"],
  [5, "المَائِدَة", "আল-মায়িদাহ", "Al-Ma'idah", "খাদ্য পরিবেশিত পাত্র", "The Table Spread", "Medinan", "মাদানী", 120, 6, "al-maidah"],
  [6, "الأَنْعَام", "আল-আনআম", "Al-An'am", "গৃহপালিত পশু", "The Cattle", "Meccan", "মাক্কী", 165, 7, "al-anam"],
  [7, "الأَعْرَاف", "আল-আরাফ", "Al-A'raf", "উঁচু স্থানসমূহ", "The Heights", "Meccan", "মাক্কী", 206, 8, "al-araf"],
  [8, "الأَنْفَال", "আল-আনফাল", "Al-Anfal", "যুদ্ধলব্ধ সম্পদ", "The Spoils of War", "Medinan", "মাদানী", 75, 9, "al-anfal"],
  [9, "التَّوْبَة", "আত-তাওবাহ", "At-Tawbah", "অনুশোচনা / ক্ষমা", "The Repentance", "Medinan", "মাদানী", 129, 10, "at-tawbah"],
  [10, "يُونُس", "ইউনুস", "Yunus", "নবী ইউনুস (আ.)", "Jonah", "Meccan", "মাক্কী", 109, 11, "yunus"],
  [11, "هُود", "হুদ", "Hud", "নবী হুদ (আ.)", "Hud", "Meccan", "মাক্কী", 123, 11, "hud"],
  [12, "يُوسُف", "ইউসুফ", "Yusuf", "নবী ইউসুফ (আ.)", "Joseph", "Meccan", "মাক্কী", 111, 12, "yusuf"],
  [13, "الرَّعْد", "আর-রাদ", "Ar-Ra'd", "বজ্রনাদ", "The Thunder", "Medinan", "মাদানী", 43, 13, "ar-rad"],
  [14, "إِبْرَاهِيم", "ইব্রাহিম", "Ibrahim", "নবী ইব্রাহিম (আ.)", "Abraham", "Meccan", "মাক্কী", 52, 13, "ibrahim"],
  [15, "الحِجْر", "আল-হিজর", "Al-Hijr", "পাথুরে উপত্যকা", "The Rocky Tract", "Meccan", "মাক্কী", 99, 14, "al-hijr"],
  [16, "النَّحْل", "আন-নাহল", "An-Nahl", "মৌমাছি", "The Bee", "Meccan", "মাক্কী", 128, 14, "an-nahl"],
  [17, "الإِسْرَاء", "আল-ইসরা", "Al-Isra", "রজনী ভ্রমণ", "The Night Journey", "Meccan", "মাক্কী", 111, 15, "al-isra"],
  [18, "الكَهْف", "আল-কাহফ", "Al-Kahf", "গুহা", "The Cave", "Meccan", "মাক্কী", 110, 15, "al-kahf"],
  [19, "مَرْيَم", "মারইয়াম", "Maryam", "মারইয়াম (আ.)", "Mary", "Meccan", "মাক্কী", 98, 16, "maryam"],
  [20, "طه", "ত্বা-হা", "Taha", "ত্বা-হা", "Ta-Ha", "Meccan", "মাক্কী", 135, 16, "taha"],
  [21, "الأَنْبِيَاء", "আল-আম্বিয়া", "Al-Anbiya", "নবী-রাসূলগণ", "The Prophets", "Meccan", "মাক্কী", 112, 17, "al-anbiya"],
  [22, "الحَجّ", "আল-হাজ্জ", "Al-Hajj", "পবিত্র হজ", "The Pilgrimage", "Medinan", "মাদানী", 78, 17, "al-hajj"],
  [23, "المُؤْمِنُون", "আল-মুমিনুন", "Al-Mu'minun", "বিশ্বাসীগণ", "The Believers", "Meccan", "মাক্কী", 118, 18, "al-muminun"],
  [24, "النُّور", "আন-নূর", "An-Nur", "স্বর্গীয় জ্যোতি", "The Light", "Medinan", "মাদানী", 64, 18, "an-nur"],
  [25, "الفُرْقَان", "আল-ফুরকান", "Al-Furqan", "সত্য-মিথ্যার মাপকাঠি", "The Criterion", "Meccan", "মাক্কী", 77, 18, "al-furqan"],
  [26, "الشُّعَرَاء", "আশ-শুয়ারা", "Ash-Shu'ara", "কবিগণ", "The Poets", "Meccan", "মাক্কী", 227, 19, "ash-shuara"],
  [27, "النَّمْل", "আন-নামল", "An-Naml", "পিপীলিকা", "The Ant", "Meccan", "মাক্কী", 93, 19, "an-naml"],
  [28, "القَصَص", "আল-কাসাস", "Al-Qasas", "ঐতিহাসিক কাহিনী", "The Stories", "Meccan", "মাক্কী", 88, 20, "al-qasas"],
  [29, "العَنْكَبُوت", "আল-আনকাবুত", "Al-'Ankabut", "মাকড়সা", "The Spider", "Meccan", "মাক্কী", 69, 20, "al-ankabut"],
  [30, "الرُّوم", "আর-রূম", "Ar-Rum", "রোমান জাতি", "The Romans", "Meccan", "মাক্কী", 60, 21, "ar-rum"],
  [31, "لُقْمَان", "লুকমান", "Luqman", "জ্ঞানী লুকমান", "Luqman", "Meccan", "মাক্কী", 34, 21, "luqman"],
  [32, "السَّجْدَة", "আস-সাজদাহ", "As-Sajdah", "সিজদা", "The Prostration", "Meccan", "মাক্কী", 30, 21, "as-sajdah"],
  [33, "الأَحْزَاب", "আল-আহযাব", "Al-Ahzab", "সম্মিলিত বাহিনী", "The Combined Forces", "Medinan", "মাদানী", 73, 21, "al-ahzab"],
  [34, "سَبَأ", "সাবা", "Saba", "সাবা জাতি", "Sheba", "Meccan", "মাক্কী", 54, 22, "saba"],
  [35, "فَاطِر", "ফাতির", "Fatir", "আদি স্রষ্টা", "The Originator", "Meccan", "মাক্কী", 45, 22, "fatir"],
  [36, "يس", "ইয়াসিন", "Ya-Sin", "ইয়াসীন", "Ya-Sin", "Meccan", "মাক্কী", 83, 22, "ya-sin"],
  [37, "الصَّافَّات", "আস-সাফফাত", "As-Saffat", "সারিবদ্ধ ফেরেশতাগণ", "Those Ranks", "Meccan", "মাক্কী", 182, 23, "as-saffat"],
  [38, "ص", "ছোয়াদ", "Sad", "ছোয়াদ", "The Letter Sad", "Meccan", "মাক্কী", 88, 23, "sad"],
  [39, "الزُّمَر", "আয-যুমার", "Az-Zumar", "দলবদ্ধ মানবসমূহ", "The Groups", "Meccan", "মাক্কী", 75, 23, "az-zumar"],
  [40, "غَافِر", "গাফির", "Ghafir", "ক্ষমাশীল", "The Forgiver", "Meccan", "মাক্কী", 85, 24, "ghafir"],
  [41, "فُصِّلَت", "ফুসসিলাত", "Fussilat", "সুস্পষ্ট বিবরণ", "Explained in Detail", "Meccan", "মাক্কী", 54, 24, "fussilat"],
  [42, "الشُّورَى", "আশ-শুরা", "Ash-Shura", "পরামর্শ", "The Consultation", "Meccan", "মাক্কী", 53, 25, "ash-shura"],
  [43, "الزُّخْرُف", "আয-যুখরুফ", "Az-Zukhruf", "স্বর্ণালঙ্কার", "The Gold Adornment", "Meccan", "মাক্কী", 89, 25, "az-zukhruf"],
  [44, "الدُّخَان", "আদ-দুখান", "Ad-Dukhan", "ধোঁয়া", "The Smoke", "Meccan", "মাক্কী", 59, 25, "ad-dukhan"],
  [45, "الجَاثِيَة", "আল-জাসিয়াহ", "Al-Jathiyah", "নতজানু সম্প্রদায়", "The Kneeling", "Meccan", "মাক্কী", 37, 25, "al-jathiyah"],
  [46, "الأَحْقَاف", "আল-আহকাফ", "Al-Ahqaf", "বালির পাহাড়", "The Sand Dunes", "Meccan", "মাক্কী", 35, 26, "al-ahqaf"],
  [47, "مُحَمَّد", "মুহাম্মদ", "Muhammad", "নবী মুহাম্মদ ﷺ", "Muhammad", "Medinan", "মাদানী", 38, 26, "muhammad"],
  [48, "الفَتْح", "আল-ফাতহ", "Al-Fath", "মহাবিজয়", "The Victory", "Medinan", "মাদানী", 29, 26, "al-fath"],
  [49, "الحُجُرَات", "আল-হুজুরাত", "Al-Hujurat", "পবিত্র গৃহসমূহ", "The Private Chambers", "Medinan", "মাদানী", 18, 26, "al-hujurat"],
  [50, "ق", "কাফ", "Qaf", "কাফ", "The Letter Qaf", "Meccan", "মাক্কী", 45, 26, "qaf"],
  [51, "الذَّارِيَات", "আয-যারিয়াত", "Adh-Dhariyat", "বিক্ষিপ্তকারী বাতাস", "The Winnowing Winds", "Meccan", "মাক্কী", 60, 26, "adh-dhariyat"],
  [52, "الطُّور", "আত-তুর", "At-Tur", "তুর পর্বত", "The Mount", "Meccan", "মাক্কী", 49, 27, "at-tur"],
  [53, "النَّجْم", "আন-নাজম", "An-Najm", "উজ্জ্বল নক্ষত্র", "The Star", "Meccan", "মাক্কী", 62, 27, "an-najm"],
  [54, "القَمَر", "আল-কামার", "Al-Qamar", "চন্দ্র", "The Moon", "Meccan", "মাক্কী", 55, 27, "al-qamar"],
  [55, "الرَّحْمَٰن", "আর-রহমান", "Ar-Rahman", "পরম করুণাময়", "The Beneficent", "Medinan", "মাদানী", 78, 27, "ar-rahman"],
  [56, "الوَاقِعَة", "আল-ওয়াকিয়া", "Al-Waqi'ah", "নিশ্চিত কিয়ামত", "The Inevitable", "Meccan", "মাক্কী", 96, 27, "al-waqiah"],
  [57, "الحَدِيد", "আল-হাদিদ", "Al-Hadid", "লোহা", "The Iron", "Medinan", "মাদানী", 29, 27, "al-hadid"],
  [58, "المُجَادِلَة", "আল-মুজাদালাহ", "Al-Mujadila", "বাদানুবাদকারিণী", "The Pleading Woman", "Medinan", "মাদানী", 22, 28, "al-mujadila"],
  [59, "الحَشْر", "আল-হাশর", "Al-Hashr", "বিতাড়ন ও সমাবেশ", "The Exile", "Medinan", "মাদানী", 24, 28, "al-hashr"],
  [60, "المُمْتَحَنَة", "আল-মুমতাহিনাহ", "Al-Mumtahanah", "পরীক্ষিত নারী", "The Examined One", "Medinan", "মাদানী", 13, 28, "al-mumtahanah"],
  [61, "الصَّفّ", "আস-সফ", "As-Saff", "সুসংবদ্ধ সৈন্যদল", "The Ranks", "Medinan", "মাদানী", 14, 28, "as-saff"],
  [62, "الجُمُعَة", "আল-জুমুআহ", "Al-Jumu'ah", "জুমার দিন", "The Congregation", "Medinan", "মাদানী", 11, 28, "al-jumuah"],
  [63, "المُنَافِقُون", "আল-মুনাফিকুন", "Al-Munafiqun", "কপট বিশ্বাসীগণ", "The Hypocrites", "Medinan", "মাদানী", 11, 28, "al-munafiqun"],
  [64, "التَّغَابُن", "আত-তাগাবুন", "At-Taghabun", "লাভ-ক্ষতির প্রকাশ", "Mutual Loss and Gain", "Medinan", "মাদানী", 18, 28, "at-taghabun"],
  [65, "الطَّلَاق", "আত-তালাক", "At-Talaq", "বিবাহ বিচ্ছেদ", "The Divorce", "Medinan", "মাদানী", 12, 28, "at-talaq"],
  [66, "التَّحْرِيم", "আত-তাহরিম", "At-Tahrim", "নিষিদ্ধকরণ", "The Prohibition", "Medinan", "মাদানী", 12, 28, "at-tahrim"],
  [67, "المُلْك", "আল-মুলক", "Al-Mulk", "সার্বভৌম কর্তৃত্ব", "The Sovereignty", "Meccan", "মাক্কী", 30, 29, "al-mulk"],
  [68, "القَلَم", "আল-কলম", "Al-Qalam", "কলম", "The Pen", "Meccan", "মাক্কী", 52, 29, "al-qalam"],
  [69, "الحَاقَّة", "আল-হাক্কাহ", "Al-Haqqah", "সুনিশ্চিত সত্য", "The Inevitable Reality", "Meccan", "মাক্কী", 52, 29, "al-haqqah"],
  [70, "المَعَارِج", "আল-মাআরিজ", "Al-Ma'arij", "উন্নয়নের সোপানসমূহ", "The Ascending Stairways", "Meccan", "মাক্কী", 44, 29, "al-maarij"],
  [71, "نُوح", "নূহ", "Nuh", "নবী নূহ (আ.)", "Noah", "Meccan", "মাক্কী", 28, 29, "nuh"],
  [72, "الجِنّ", "আল-জিন", "Al-Jinn", "জিন সম্প্রদায়", "The Jinn", "Meccan", "মাক্কী", 28, 29, "al-jinn"],
  [73, "المُزَّمِّل", "আল-মুযযাম্মিল", "Al-Muzzammil", "বস্ত্রাবৃত নবী", "The Enshrouded One", "Meccan", "মাক্কী", 20, 29, "al-muzzammil"],
  [74, "المُدَّثِّر", "আল-মুদ্দাসসির", "Al-Muddaththir", "চাদরাবৃত", "The Cloaked One", "Meccan", "মাক্কী", 56, 29, "al-muddaththir"],
  [75, "القِيَامَة", "আল-কিয়ামাহ", "Al-Qiyamah", "পুনরুত্থান দিবস", "The Resurrection", "Meccan", "মাক্কী", 40, 29, "al-qiyamah"],
  [76, "الإِنْسَان", "আল-ইনসান", "Al-Insan", "মানবজাতি", "Man", "Medinan", "মাদানী", 31, 29, "al-insan"],
  [77, "المُرْسَلَات", "আল-মুরসালাত", "Al-Mursalat", "প্রেরিত বাতাসসমূহ", "The Emissaries", "Meccan", "মাক্কী", 50, 29, "al-mursalat"],
  [78, "النَّبَأ", "আন-নাবা", "An-Naba", "মহাসংবাদ", "The Great News", "Meccan", "মাক্কী", 40, 30, "an-naba"],
  [79, "النَّازِعَات", "আন-নাযিআত", "An-Nazi'at", "উৎপাটনকারী ফেরেশতা", "Those Who Drag Forth", "Meccan", "মাক্কী", 46, 30, "an-naziat"],
  [80, "عَبَسَ", "আবাসা", "'Abasa", "ভ্রুকুটি করলেন", "He Frowned", "Meccan", "মাক্কী", 42, 30, "abasa"],
  [81, "التَّكْوِير", "আত-তাকভীর", "At-Takwir", "সূর্যের অন্ধকারাচ্ছন্নতা", "The Overthrowing", "Meccan", "মাক্কী", 29, 30, "at-takwir"],
  [82, "الانْفِطَار", "আল-ইনফিতার", "Al-Infitar", "বিদীর্ণ আকাশ", "The Cleaving", "Meccan", "মাক্কী", 19, 30, "al-infitar"],
  [83, "المُطَفِّفِين", "আল-মুতাফফিফিন", "Al-Mutaffifin", "ওজনে কমদানকারী", "The Defrauders", "Meccan", "মাক্কী", 36, 30, "al-mutaffifin"],
  [84, "الانْشِقَاق", "আল-ইনশিকাক", "Al-Inshiqaq", "আকাশের ফেটে যাওয়া", "The Splitting Open", "Meccan", "মাক্কী", 25, 30, "al-inshiqaq"],
  [85, "البُرُوج", "আল-বুরূজ", "Al-Buruj", "নক্ষত্রমণ্ডল", "The Constellations", "Meccan", "মাক্কী", 22, 30, "al-buruj"],
  [86, "الطَّارِق", "আত-তারিক", "At-Tariq", "রাতের আগন্তুক", "The Morning Star", "Meccan", "মাক্কী", 17, 30, "at-tariq"],
  [87, "الأَعْلَى", "আল-আলা", "Al-A'la", "সর্বোচ্চ মহান", "The Most High", "Meccan", "মাক্কী", 19, 30, "al-ala"],
  [88, "الغَاشِيَة", "আল-গাশিয়াহ", "Al-Ghashiyah", "আচ্ছন্নকারী কিয়ামত", "The Overwhelming", "Meccan", "মাক্কী", 26, 30, "al-ghashiyah"],
  [89, "الفَجْر", "আল-ফজর", "Al-Fajr", "ভোরের আলো", "The Dawn", "Meccan", "মাক্কী", 30, 30, "al-fajr"],
  [90, "البَلَد", "আল-বালাদ", "Al-Balad", "পবিত্র নগরী", "The City", "Meccan", "মাক্কী", 20, 30, "al-balad"],
  [91, "الشَّمْس", "আশ-শামস", "Ash-Shams", "সূর্য", "The Sun", "Meccan", "মাক্কী", 15, 30, "ash-shams"],
  [92, "اللَّيْل", "আল-লাইল", "Al-Layl", "রজনী", "The Night", "Meccan", "মাক্কী", 21, 30, "al-layl"],
  [93, "الضُّحَى", "আদ-দুহা", "Ad-Duha", "পূর্বাহ্নের রৌদ্র", "The Morning Hours", "Meccan", "মাক্কী", 11, 30, "ad-duha"],
  [94, "الشَّرْح", "আল-ইনশিরাহ", "Ash-Sharh", "বক্ষ প্রশস্তকরণ", "The Relief", "Meccan", "মাক্কী", 8, 30, "ash-sharh"],
  [95, "التِّين", "আত-তীন", "At-Tin", "ডুমুর ফল", "The Fig", "Meccan", "মাক্কী", 8, 30, "at-tin"],
  [96, "العَلَق", "আল-আলাক", "Al-'Alaq", "রক্তপিণ্ড", "The Clot", "Meccan", "মাক্কী", 19, 30, "al-alaq"],
  [97, "القَدْر", "আল-কদর", "Al-Qadr", "মহিমান্বিত রজনী", "The Power", "Meccan", "মাক্কী", 5, 30, "al-qadr"],
  [98, "البَيِّنَة", "আল-বায়্যিনাহ", "Al-Bayyinah", "সুস্পষ্ট প্রমাণ", "The Clear Proof", "Medinan", "মাদানী", 8, 30, "al-bayyinah"],
  [99, "الزَّلْزَلَة", "আয-যালযালাহ", "Az-Zalzalah", "মহাকম্পন", "The Earthquake", "Medinan", "মাদানী", 8, 30, "az-zalzalah"],
  [100, "العَادِيَات", "আল-আদিয়াত", "Al-'Adiyat", "অভিযানকারী অশ্ব", "The Courser", "Meccan", "মাক্কী", 11, 30, "al-adiyat"],
  [101, "القَارِعَة", "আল-কারিয়াহ", "Al-Qari'ah", "মহাবিপদ", "The Calamity", "Meccan", "মাক্কী", 11, 30, "al-qariah"],
  [102, "التَّكَاثُر", "আত-তাকাসুর", "At-Takathur", "প্রাচুর্যের প্রতিযোগিতা", "The Rivalry in World Increase", "Meccan", "মাক্কী", 8, 30, "at-takathur"],
  [103, "العَصْر", "আল-আসর", "Al-'Asr", "সময় / কাল", "The Declining Day", "Meccan", "মাক্কী", 3, 30, "al-asr"],
  [104, "الهُمَزَة", "আল-হুমাযাহ", "Al-Humazah", "পরনিন্দুক", "The Traducer", "Meccan", "মাক্কী", 9, 30, "al-humazah"],
  [105, "الفِيل", "আল-ফিল", "Al-Fil", "হস্তীবাহিনী", "The Elephant", "Meccan", "মাক্কী", 5, 30, "al-fil"],
  [106, "قُرَيْش", "কুরাইশ", "Quraysh", "কুরাইশ গোত্র", "Quraysh", "Meccan", "মাক্কী", 4, 30, "quraysh"],
  [107, "المَاعُون", "আল-মাউন", "Al-Ma'un", "নিত্যব্যবহার্য সাহায্য", "The Small Kindnesses", "Meccan", "মাক্কী", 7, 30, "al-maun"],
  [108, "الكَوْثَر", "আল-কাউসার", "Al-Kawthar", "প্রচুর কল্যাণ / কাউসার", "The Abundance", "Meccan", "মাক্কী", 3, 30, "al-kawthar"],
  [109, "الكَافِرُون", "আল-কাফিরুন", "Al-Kafirun", "অবিশ্বাসীগণ", "The Disbelievers", "Meccan", "মাক্কী", 6, 30, "al-kafirun"],
  [110, "النَّصْر", "আন-নাসর", "An-Nasr", "আল্লাহর সাহায্য", "The Divine Support", "Medinan", "মাদানী", 3, 30, "an-nasr"],
  [111, "المَسَد", "আল-লাহাব", "Al-Masad", "খেজুরের পাকানো রশি", "The Palm Fiber", "Meccan", "মাক্কী", 5, 30, "al-masad"],
  [112, "الإِخْلَاص", "আল-ইখলাস", "Al-Ikhlas", "একনিষ্ঠতা / তাওহিদ", "The Sincerity", "Meccan", "মাক্কী", 4, 30, "al-ikhlas"],
  [113, "الفَلَق", "আল-ফালাক", "Al-Falaq", "ভোরের আলো", "The Daybreak", "Meccan", "মাক্কী", 5, 30, "al-falaq"],
  [114, "النَّاس", "আন-নাস", "An-Nas", "মানবজাতি", "Mankind", "Meccan", "মাক্কী", 6, 30, "an-nas"]
];

console.log('Total Surahs to output:', RAW_SURAHS.length);

const code = `export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameBengali: string;
  nameEnglish: string;
  meaningBengali: string;
  meaningEnglish: string;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeBn: 'মাক্কী' | 'মাদানী';
  totalAyahs: number;
  juzStart: number;
  slug: string;
}

export interface AyahItem {
  numberInSurah: number;
  textArabic: string;
  textBengali: string;
  textEnglish: string;
  audioUrl?: string;
}

export interface JuzMeta {
  number: number;
  nameArabic: string;
  nameBengali: string;
  nameEnglish: string;
  surahSpanBn: string;
  surahSpanEn: string;
}

export const JUZ_LIST: JuzMeta[] = [
  { number: 1, nameArabic: 'الم', nameBengali: 'আলিফ লাম মীম', nameEnglish: 'Alif Lam Meem', surahSpanBn: 'সূরা আল-ফাতিহা ১ - আল-বাকারা ১৪১', surahSpanEn: 'Al-Fatihah 1 - Al-Baqarah 141' },
  { number: 2, nameArabic: 'سَيَقُولُ', nameBengali: 'সায়াকুলু', nameEnglish: 'Sayaqool', surahSpanBn: 'সূরা আল-বাকারা ১৪২ - আল-বাকারা ২৫২', surahSpanEn: 'Al-Baqarah 142 - Al-Baqarah 252' },
  { number: 3, nameArabic: 'تِلْكَ الرُّسُلُ', nameBengali: 'তিলকার রুসুল', nameEnglish: 'Tilkar Rusul', surahSpanBn: 'সূরা আল-বাকারা ২৫৩ - আলে ইমরান ৯২', surahSpanEn: 'Al-Baqarah 253 - Ali Imran 92' },
  { number: 4, nameArabic: 'لَنْ تَنَالُوا', nameBengali: 'লান তানালু', nameEnglish: 'Lan Tanaalu', surahSpanBn: 'সূরা আলে ইমরান ৯৩ - আন-নিসা ২৩', surahSpanEn: 'Ali Imran 93 - An-Nisa 23' },
  { number: 5, nameArabic: 'وَالْمُحْصَنَاتُ', nameBengali: 'ওয়াল মুহসানাত', nameEnglish: 'Wal Muhsanat', surahSpanBn: 'সূরা আন-নিসা ২৪ - আন-নিসা ১৪৭', surahSpanEn: 'An-Nisa 24 - An-Nisa 147' },
  { number: 6, nameArabic: 'لَا يُحِبُّ اللَّهُ', nameBengali: 'লা ইউহিব্বুল্লাহ', nameEnglish: 'La Yuhibbullah', surahSpanBn: 'সূরা আন-নিসা ১৪৮ - আল-মায়িদাহ ৮১', surahSpanEn: 'An-Nisa 148 - Al-Maidah 81' },
  { number: 7, nameArabic: 'وَإِذَا سَمِعُوا', nameBengali: 'ওয়া ইযা সামিউ', nameEnglish: 'Wa Iza Samiu', surahSpanBn: 'সূরা আল-মায়িদাহ ৮২ - আল-আনআম ১১০', surahSpanEn: 'Al-Maidah 82 - Al-Anam 110' },
  { number: 8, nameArabic: 'وَلَوْ أَنَّنَا', nameBengali: 'ওয়ালাও আন্নানা', nameEnglish: 'Wa Law Annana', surahSpanBn: 'সূরা আল-আনআম ১১১ - আল-আরাফ ৮৭', surahSpanEn: 'Al-Anam 111 - Al-Araf 87' },
  { number: 9, nameArabic: 'قَالَ الْمَلَأُ', nameBengali: 'কালাল মালাউ', nameEnglish: 'Qalal Malao', surahSpanBn: 'সূরা আল-আরাফ ৮৮ - আল-আনফাল ৪০', surahSpanEn: 'Al-Araf 88 - Al-Anfal 40' },
  { number: 10, nameArabic: 'وَاعْلَمُوا', nameBengali: 'ওয়ালামু', nameEnglish: 'Walamu', surahSpanBn: 'সূরা আল-আনফাল ৪১ - আত-তাওবাহ ৯২', surahSpanEn: 'Al-Anfal 41 - At-Tawbah 92' },
  { number: 11, nameArabic: 'يَعْتَذِرُونَ', nameBengali: 'ইয়া‘তাযিরুন', nameEnglish: 'Yatazeroon', surahSpanBn: 'সূরা আত-তাওবাহ ৯৩ - হুদ ৫', surahSpanEn: 'At-Tawbah 93 - Hud 5' },
  { number: 12, nameArabic: 'وَمَا مِنْ دَابَّةٍ', nameBengali: 'ওয়ামা মিন দাব্বাহ', nameEnglish: 'Wa Mamin Daabbah', surahSpanBn: 'সূরা হুদ ৬ - ইউসুফ ৫২', surahSpanEn: 'Hud 6 - Yusuf 52' },
  { number: 13, nameArabic: 'وَمَا أُبَرِّئُ', nameBengali: 'ওয়ামা উবাররিউ', nameEnglish: 'Wa Ma Ubarriu', surahSpanBn: 'সূরা ইউসুফ ৫৩ - ইব্রাহিম ৫২', surahSpanEn: 'Yusuf 53 - Ibrahim 52' },
  { number: 14, nameArabic: 'رُبَمَا', nameBengali: 'রুবামা', nameEnglish: 'Rubama', surahSpanBn: 'সূরা আল-হিজর ১ - আন-নাহল ১২৮', surahSpanEn: 'Al-Hijr 1 - An-Nahl 128' },
  { number: 15, nameArabic: 'سُبْحَانَ الَّذِي', nameBengali: 'সুবহানাল্লাজি', nameEnglish: 'Subhanallazi', surahSpanBn: 'সূরা আল-ইসরা ১ - আল-কাহফ ৭৪', surahSpanEn: 'Al-Isra 1 - Al-Kahf 74' },
  { number: 16, nameArabic: 'قَالَ أَلَمْ', nameBengali: 'কালা আলাম', nameEnglish: 'Qala Alam', surahSpanBn: 'সূরা আল-কাহফ ৭৫ - ত্বা-হা ১৩৫', surahSpanEn: 'Al-Kahf 75 - Taha 135' },
  { number: 17, nameArabic: 'اقْتَرَبَ لِلنَّاسِ', nameBengali: 'ইকতারা Quadro', nameEnglish: 'Iqtaraba', surahSpanBn: 'সূরা আল-আম্বিয়া ১ - আল-হাজ্জ ৭৮', surahSpanEn: 'Al-Anbiya 1 - Al-Hajj 78' },
  { number: 18, nameArabic: 'قَدْ أَفْلَحَ', nameBengali: 'ক্বাদ আফলাহা', nameEnglish: 'Qadd Aflaha', surahSpanBn: 'সূরা আল-মুমিনুন ১ - আল-ফুরকান ২০', surahSpanEn: 'Al-Muminun 1 - Al-Furqan 20' },
  { number: 19, nameArabic: 'وَقَالَ الَّذِينَ', nameBengali: 'ওয়া কালাল্লাযিনা', nameEnglish: 'Wa Qalal Lazina', surahSpanBn: 'সূরা আল-ফুরকান ২১ - আন-নামল ৫৫', surahSpanEn: 'Al-Furqan 21 - An-Naml 55' },
  { number: 20, nameArabic: 'أَمَّنْ خَلَقَ', nameBengali: 'আম্মান খালাকা', nameEnglish: 'Amman Khalaq', surahSpanBn: 'সূরা আন-নামল ৫৬ - আল-আনকাবুত ৪৫', surahSpanEn: 'An-Naml 56 - Al-Ankabut 45' },
  { number: 21, nameArabic: 'اتْلُ مَا أُوحِيَ', nameBengali: 'উতলু মা উহিয়া', nameEnglish: 'Utlu Ma Oohiya', surahSpanBn: 'সূরা আল-আনকাবুত ৪৬ - আল-আহযাব ৩০', surahSpanEn: 'Al-Ankabut 46 - Al-Ahzab 30' },
  { number: 22, nameArabic: 'وَمَنْ يَقْنُتْ', nameBengali: 'ওয়ামান ইয়াকনুত', nameEnglish: 'Wa Manyaqnut', surahSpanBn: 'সূরা আল-আহযাব ৩১ - ইয়াসিন ২৭', surahSpanEn: 'Al-Ahzab 31 - Ya-Sin 27' },
  { number: 23, nameArabic: 'وَمَا لِيَ', nameBengali: 'ওয়ামালিয়া', nameEnglish: 'Wa Maliya', surahSpanBn: 'সূরা ইয়াসিন ২৮ - আয-যুমার ৩১', surahSpanEn: 'Ya-Sin 28 - Az-Zumar 31' },
  { number: 24, nameArabic: 'فَمَنْ أَظْلَمُ', nameBengali: 'ফামান আজলামু', nameEnglish: 'Faman Azlamu', surahSpanBn: 'সূরা আয-যুমার ৩২ - ফুসসিলাত ৪৬', surahSpanEn: 'Az-Zumar 32 - Fussilat 46' },
  { number: 25, nameArabic: 'إِلَيْهِ يُرَدُّ', nameBengali: 'ইলাইহি ইউরাদ্দু', nameEnglish: 'Ilaihi Yuraddu', surahSpanBn: 'সূরা ফুসসিলাত ৪৭ - আল-জাসিয়াহ ৩৭', surahSpanEn: 'Fussilat 47 - Al-Jathiyah 37' },
  { number: 26, nameArabic: 'حم', nameBengali: 'হা-মীম', nameEnglish: 'Ha-Meem', surahSpanBn: 'সূরা আল-আহকাফ ১ - আয-যারিয়াত ৩০', surahSpanEn: 'Al-Ahqaf 1 - Adh-Dhariyat 30' },
  { number: 27, nameArabic: 'قَالَ فَمَا خَطْبُكُمْ', nameBengali: 'কালা ফামা খাতবুকুম', nameEnglish: 'Qala Fama Khatbukum', surahSpanBn: 'সূরা আয-যারিয়াত ৩১ - আল-হাদিদ ২৯', surahSpanEn: 'Adh-Dhariyat 31 - Al-Hadid 29' },
  { number: 28, nameArabic: 'قَدْ سَمِعَ اللَّهُ', nameBengali: 'ক্বাদ সামিআল্লাহু', nameEnglish: 'Qadd Sami Allah', surahSpanBn: 'সূরা আল-মুজাদালাহ ১ - আত-তাহরিম ১২', surahSpanEn: 'Al-Mujadila 1 - At-Tahrim 12' },
  { number: 29, nameArabic: 'تَبَارَكَ الَّذِي', nameBengali: 'তাবারাকাল্লাজি', nameEnglish: 'Tabarakallazi', surahSpanBn: 'সূরা আল-মুলক ১ - আল-মুরসালাত ৫০', surahSpanEn: 'Al-Mulk 1 - Al-Mursalat 50' },
  { number: 30, nameArabic: 'عَمَّ يَتَسَاءَلُونَ', nameBengali: 'আম্মা ইয়াতাসাআলুন', nameEnglish: "Amma Yatasa'aloon", surahSpanBn: 'সূরা আন-নাবা ১ - আন-নাস ৬', surahSpanEn: 'An-Naba 1 - An-Nas 6' }
];

export const SURAH_LIST: SurahMeta[] = [
${RAW_SURAHS.map(([num, ar, bn, en, mbn, men, rev, revBn, ayahs, juz, slug]) => `  {
    number: ${num},
    nameArabic: ${JSON.stringify(ar)},
    nameBengali: ${JSON.stringify(bn)},
    nameEnglish: ${JSON.stringify(en)},
    meaningBengali: ${JSON.stringify(mbn)},
    meaningEnglish: ${JSON.stringify(men)},
    revelationType: ${JSON.stringify(rev)},
    revelationTypeBn: ${JSON.stringify(revBn)},
    totalAyahs: ${ayahs},
    juzStart: ${juz},
    slug: ${JSON.stringify(slug)},
  }`).join(',\n')}
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
  2: {
    meta: SURAH_LIST[1],
    ayahs: [
      {
        numberInSurah: 1,
        textArabic: 'الم',
        textBengali: 'আলিফ-লাম-মীম।',
        textEnglish: 'Alif, Lam, Meem.',
      },
      {
        numberInSurah: 2,
        textArabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        textBengali: 'এ সেই কিতাব, যাতে কোনো সন্দেহ নেই; মুত্তাকীদের জন্য এটি পথপ্রদর্শক।',
        textEnglish: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
      },
      {
        numberInSurah: 3,
        textArabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        textBengali: 'যারা অদৃশ্যের প্রতি বিশ্বাস স্থাপন করে, সালাত কায়েম করে এবং আমি তাদেরকে যে রিজিক দিয়েছি তা থেকে ব্যয় করে।',
        textEnglish: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,',
      },
      {
        numberInSurah: 4,
        textArabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
        textBengali: 'এবং যারা বিশ্বাস করে যা আপনার প্রতি অবতীর্ণ হয়েছে এবং যা আপনার পূর্বে অবতীর্ণ হয়েছে, আর আখেরাতের প্রতি তারা দৃঢ় বিশ্বাস রাখে।',
        textEnglish: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].',
      },
      {
        numberInSurah: 5,
        textArabic: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
        textBengali: 'তারাই তাদের রবের পক্ষ থেকে হিদায়াতের ওপর রয়েছে এবং তারাই সফলকাম।',
        textEnglish: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.',
      },
      {
        numberInSurah: 255,
        textArabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        textBengali: 'আল্লাহ, তিনি ছাড়া অন্য কোনো সত্য উপাস্য নেই; তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তন্দ্রা বা নিদ্রা তাঁকে স্পর্শ করে না। আসমান ও যমীনে যা কিছু রয়েছে সবই তাঁর। কে আছে যে তাঁর অনুমতি ছাড়া তাঁর কাছে সুপারিশ করবে? তাদের সম্মুখে ও পেছনে যা কিছু আছে তা তিনি অবগত আছেন। তাঁর জ্ঞানের কোনো কিছু তারা পরিবেষ্টন করতে পারে না, কেবল যতটুকু তিনি ইচ্ছে করেন। তাঁর কুরসী সমস্ত আসমান ও যমীন পরিব্যাপ্ত করে আছে। আর এ দুটির রক্ষণাবেক্ষণ তাঁকে বিন্দুমাত্র ক্লান্ত করে না। তিনি সর্বোচ্চ, মহামহিম। (আয়াতুল কুরসী)',
        textEnglish: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
      }
    ]
  },
  36: {
    meta: SURAH_LIST[35],
    ayahs: [
      { numberInSurah: 1, textArabic: 'يس', textBengali: 'ইয়াসীন।', textEnglish: 'Ya, Seen.' },
      { numberInSurah: 2, textArabic: 'وَالْقُرْآنِ الْحَكِيمِ', textBengali: 'প্রজ্ঞাপূর্ণ কুরআনের শপথ,', textEnglish: "By the wise Qur'an." },
      { numberInSurah: 3, textArabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ', textBengali: 'নিশ্চয় আপনি প্রেরিত রাসূলদের অন্যতম,', textEnglish: 'Indeed you, [O Muhammad], are from among the messengers,' },
      { numberInSurah: 4, textArabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', textBengali: 'সরল-সঠিক পথের ওপর প্রতিষ্ঠিত।', textEnglish: 'On a straight path.' },
      { numberInSurah: 5, textArabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ', textBengali: 'এ কুরআন পরাক্রমশালী, পরম দয়ালু আল্লাহর অবতীর্ণ।', textEnglish: '[This is] a revelation of the Exalted in Might, the Merciful,' }
    ]
  },
  67: {
    meta: SURAH_LIST[66],
    ayahs: [
      { numberInSurah: 1, textArabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', textBengali: 'বরকতময় তিনি, যাঁর হাতে সমস্ত রাজত্ব; এবং তিনি সবকিছুর ওপর সর্বশক্তিমান।', textEnglish: 'Blessed is He in whose hand is dominion, and He is over all things competent -' },
      { numberInSurah: 2, textArabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', textBengali: 'যিনি সৃষ্টি করেছেন মৃত্যু ও জীবন, তোমাদের পরীক্ষা করার জন্য যে কে তোমাদের মধ্যে আমলের দিক থেকে উত্তম। আর তিনি মহাপরাক্রমশালী, ক্ষমাশীল।', textEnglish: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -' },
      { numberInSurah: 3, textArabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', textBengali: 'যিনি সপ্ত আকাশ স্তরে স্তরে সৃষ্টি করেছেন। পরম দয়াময়ের সৃষ্টিতে আপনি কোনো অসংগতি দেখতে পাবেন না। আবার দৃষ্টি ফিরিয়ে দেখুন, কোনো ত্রুটি দেখতে পান কি?', textEnglish: '[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?' }
    ]
  },
  112: {
    meta: SURAH_LIST[111],
    ayahs: [
      { numberInSurah: 1, textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', textBengali: 'বলুন, তিনিই আল্লাহ, একক ও অদ্বিতীয়।', textEnglish: 'Say, "He is Allah, [who is] One,' },
      { numberInSurah: 2, textArabic: 'اللَّهُ الصَّمَدُ', textBengali: 'আল্লাহ অমুখাপেক্ষী (সকল সৃষ্টি তাঁর মুখাপেক্ষী)।', textEnglish: 'Allah, the Eternal Refuge.' },
      { numberInSurah: 3, textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', textBengali: 'তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি।', textEnglish: 'He neither begets nor is born,' },
      { numberInSurah: 4, textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', textBengali: 'এবং তাঁর সমকক্ষ কেউই নেই।', textEnglish: 'Nor is there to Him any equivalent."' }
    ]
  },
  113: {
    meta: SURAH_LIST[112],
    ayahs: [
      { numberInSurah: 1, textArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', textBengali: 'বলুন, আমি আশ্রয় প্রার্থনা করছি প্রভাতের রবের কাছে,', textEnglish: 'Say, "I seek refuge in the Lord of daybreak,' },
      { numberInSurah: 2, textArabic: 'مِن شَرِّ مَا خَلَقَ', textBengali: 'তিনি যা সৃষ্টি করেছেন তার অনিষ্ট হতে,', textEnglish: 'From the evil of that which He created,' },
      { numberInSurah: 3, textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', textBengali: 'এবং রাতের অন্ধকারের অনিষ্ট হতে যখন তা সমাগত হয়,', textEnglish: 'And from the evil of darkness when it settles,' },
      { numberInSurah: 4, textArabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', textBengali: 'এবং গ্রন্থিতে ফুঁকদানকারী জাদুকরিদের অনিষ্ট হতে,', textEnglish: 'And from the evil of the blowers in knots,' },
      { numberInSurah: 5, textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', textBengali: 'এবং হিংসুকের অনিষ্ট হতে যখন সে হিংসা করে।', textEnglish: 'And from the evil of an envier when he envies."' }
    ]
  },
  114: {
    meta: SURAH_LIST[113],
    ayahs: [
      { numberInSurah: 1, textArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', textBengali: 'বলুন, আমি আশ্রয় প্রার্থনা করছি মানুষের প্রতিপালকের কাছে,', textEnglish: 'Say, "I seek refuge in the Lord of mankind,' },
      { numberInSurah: 2, textArabic: 'مَلِكِ النَّاسِ', textBengali: 'মানুষের অধিপতির কাছে,', textEnglish: 'The Sovereign of mankind,' },
      { numberInSurah: 3, textArabic: 'إِلَٰهِ النَّاسِ', textBengali: 'মানুষের সত্য উপাস্যের কাছে,', textEnglish: 'The God of mankind,' },
      { numberInSurah: 4, textArabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', textBengali: 'কুন্ত্রণাদাতার অনিষ্ট থেকে, যে আত্মগোপন করে,', textEnglish: 'From the evil of the retreating whisperer -' },
      { numberInSurah: 5, textArabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', textBengali: 'যে মানুষের অন্তরে কুমন্ত্রণা দেয়,', textEnglish: 'Who whispers [evil] into the breasts of mankind -' },
      { numberInSurah: 6, textArabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', textBengali: 'জিন অথবা মানুষের মধ্য হতে।', textEnglish: 'From among the jinn and mankind."' }
    ]
  }
};
`;

fs.writeFileSync(path.resolve('src/lib/data/quran-data.ts'), code, 'utf8');
console.log('Successfully written src/lib/data/quran-data.ts with all 114 Surahs and 30 Juz!');
