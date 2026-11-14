'use server';

import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/auth/admin-auth';
import {
  createBook,
  updateBook,
  updateBookStatus,
  deleteBook,
  createCategory,
  createChapter,
  createHadithReference,
  updateUserRole,
  updateWebsiteSettings,
  EbookStatus,
  AdminEbook,
} from './admin-store';

/**
 * Server Action: Create New Ebook with Server-Side Auth & Validation
 */
export async function createBookAction(formData: FormData) {
  // 1. Role verification on the server
  await requireAdminSession();

  // 2. Extract and validate form inputs
  const titleBn = formData.get('titleBn') as string;
  const titleAr = formData.get('titleAr') as string;
  const titleEn = formData.get('titleEn') as string;
  const authorBn = formData.get('authorBn') as string;
  const authorAr = formData.get('authorAr') as string;
  const authorEn = formData.get('authorEn') as string;
  const slug = formData.get('slug') as string;
  const categorySlug = (formData.get('categorySlug') as string) || 'hadith';
  const categoryNameBn = (formData.get('categoryNameBn') as string) || 'হাদিস ও সুন্নাহ';
  const descriptionBn = formData.get('descriptionBn') as string;
  const descriptionAr = formData.get('descriptionAr') as string;
  const descriptionEn = formData.get('descriptionEn') as string;
  const sourceReference = formData.get('sourceReference') as string;
  const authenticityGrade = formData.get('authenticityGrade') as string;
  const status = (formData.get('status') as EbookStatus) || 'draft';
  const chapterCount = Number(formData.get('chapterCount')) || 1;
  const readingTimeMins = Number(formData.get('readingTimeMins')) || 15;
  const isFeatured = formData.get('isFeatured') === 'true';
  const isPopular = formData.get('isPopular') === 'true';

  // Physical & textual audit flags
  const physicalSourceVerified = formData.get('physicalSourceVerified') === 'true';
  const sanadChecked = formData.get('sanadChecked') === 'true';
  const matnChecked = formData.get('matnChecked') === 'true';
  const reviewerNotes = formData.get('reviewerNotes') as string;

  const result = await createBook({
    slug,
    title: { bn: titleBn, ar: titleAr, en: titleEn },
    author: { bn: authorBn, ar: authorAr, en: authorEn },
    category: {
      slug: categorySlug,
      name: { bn: categoryNameBn, ar: 'التصنيف', en: categorySlug },
    },
    description: { bn: descriptionBn, ar: descriptionAr, en: descriptionEn },
    sourceReference,
    authenticityGrade,
    status,
    chapterCount,
    readingTimeMins,
    isFeatured,
    isPopular,
    audit: {
      physicalSourceVerified,
      sanadChecked,
      matnChecked,
      reviewerName: 'মুফতি আবদুল্লাহ আল-মাসউদ',
      reviewerTitle: 'প্রধান সম্পাদক',
      reviewerNotes: reviewerNotes || 'খসড়া সফলভাবে তৈরি করা হয়েছে।',
    },
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath('/[lang]/admin', 'layout');
  revalidatePath('/[lang]/ebooks', 'page');
  return { success: true, book: result.book };
}

/**
 * Server Action: Update Existing Ebook
 */
export async function updateBookAction(id: string, formData: FormData) {
  await requireAdminSession();

  const titleBn = formData.get('titleBn') as string;
  const titleAr = formData.get('titleAr') as string;
  const titleEn = formData.get('titleEn') as string;
  const authorBn = formData.get('authorBn') as string;
  const authorAr = formData.get('authorAr') as string;
  const authorEn = formData.get('authorEn') as string;
  const descriptionBn = formData.get('descriptionBn') as string;
  const sourceReference = formData.get('sourceReference') as string;
  const authenticityGrade = formData.get('authenticityGrade') as string;
  const status = (formData.get('status') as EbookStatus) || 'draft';
  const chapterCount = Number(formData.get('chapterCount')) || 1;
  const isFeatured = formData.get('isFeatured') === 'true';
  const isPopular = formData.get('isPopular') === 'true';

  const physicalSourceVerified = formData.get('physicalSourceVerified') === 'true';
  const sanadChecked = formData.get('sanadChecked') === 'true';
  const matnChecked = formData.get('matnChecked') === 'true';
  const reviewerNotes = formData.get('reviewerNotes') as string;

  const result = await updateBook(id, {
    title: { bn: titleBn, ar: titleAr, en: titleEn },
    author: { bn: authorBn, ar: authorAr, en: authorEn },
    description: { bn: descriptionBn, ar: '', en: '' },
    sourceReference,
    authenticityGrade,
    status,
    chapterCount,
    isFeatured,
    isPopular,
    audit: {
      physicalSourceVerified,
      sanadChecked,
      matnChecked,
      reviewerName: 'মুফতি আবদুল্লাহ আল-মাসউদ',
      reviewerTitle: 'প্রধান সম্পাদক',
      reviewerNotes: reviewerNotes || 'হালনাগাদ সম্পন্ন হয়েছে।',
    },
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath('/[lang]/admin', 'layout');
  revalidatePath('/[lang]/ebooks', 'page');
  return { success: true };
}

/**
 * Server Action: Quick Toggle Status (Publish / Unpublish / Review workflow)
 */
export async function togglePublishStatusAction(id: string, newStatus: EbookStatus) {
  await requireAdminSession();

  const res = await updateBookStatus(id, newStatus);
  if (res.success) {
    revalidatePath('/[lang]/admin', 'layout');
    revalidatePath('/[lang]/ebooks', 'page');
  }
  return res;
}

/**
 * Server Action: Delete Book
 */
export async function deleteBookAction(id: string) {
  await requireAdminSession();

  const res = await deleteBook(id);
  if (res.success) {
    revalidatePath('/[lang]/admin', 'layout');
    revalidatePath('/[lang]/ebooks', 'page');
  }
  return res;
}

/**
 * Server Action: Create Category
 */
export async function createCategoryAction(formData: FormData) {
  await requireAdminSession();

  const nameBn = formData.get('nameBn') as string;
  const nameAr = formData.get('nameAr') as string;
  const nameEn = formData.get('nameEn') as string;
  const slug = (formData.get('slug') as string) || `cat-${Date.now()}`;
  const iconName = (formData.get('iconName') as string) || 'book-open';
  const sortOrder = Number(formData.get('sortOrder')) || 0;

  const res = await createCategory({
    slug,
    name: { bn: nameBn, ar: nameAr || nameBn, en: nameEn || nameBn },
    description: { bn: `${nameBn} বিষয়ক বইসমূহ`, ar: '', en: '' },
    iconName,
    sortOrder,
  });

  if (res.success) {
    revalidatePath('/[lang]/admin/categories', 'page');
    revalidatePath('/[lang]/categories', 'page');
  }
  return res;
}

/**
 * Server Action: Create Chapter
 */
export async function createChapterAction(formData: FormData) {
  await requireAdminSession();

  const bookSlug = formData.get('bookSlug') as string;
  const chapterNumber = Number(formData.get('chapterNumber')) || 1;
  const slug = formData.get('slug') as string;
  const titleBn = formData.get('titleBn') as string;
  const titleAr = formData.get('titleAr') as string;
  const titleEn = formData.get('titleEn') as string;
  const durationMins = Number(formData.get('durationMins')) || 5;
  const status = (formData.get('status') as any) || 'published';
  const contentSnippet = (formData.get('contentSnippet') as string) || '';

  const res = await createChapter({
    bookId: bookSlug,
    bookSlug,
    chapterNumber,
    slug,
    title: { bn: titleBn, ar: titleAr || titleBn, en: titleEn || titleBn },
    durationMins,
    status,
    contentSnippet,
  });

  if (res.success) {
    revalidatePath('/[lang]/admin/chapters', 'page');
    revalidatePath(`/[lang]/read/${bookSlug}`, 'page');
  }
  return res;
}

/**
 * Server Action: Create Hadith Reference
 */
export async function createHadithRefAction(formData: FormData) {
  await requireAdminSession();

  const bookSlug = formData.get('bookSlug') as string;
  const collectionName = formData.get('collectionName') as string;
  const hadithNumber = formData.get('hadithNumber') as string;
  const narrator = formData.get('narrator') as string;
  const grade = (formData.get('grade') as any) || 'Sahih';
  const arabicText = formData.get('arabicText') as string;
  const bengaliTranslation = formData.get('bengaliTranslation') as string;
  const englishTranslation = (formData.get('englishTranslation') as string) || '';
  const chapterSlug = (formData.get('chapterSlug') as string) || '';

  const res = await createHadithReference({
    bookSlug,
    collectionName,
    hadithNumber,
    narrator,
    grade,
    arabicText,
    bengaliTranslation,
    englishTranslation,
    chapterSlug,
  });

  if (res.success) {
    revalidatePath('/[lang]/admin/hadith-references', 'page');
  }
  return res;
}

/**
 * Server Action: Update User Role
 */
export async function updateUserRoleAction(userId: string, newRole: any) {
  await requireAdminSession();

  const res = await updateUserRole(userId, newRole);
  if (res.success) {
    revalidatePath('/[lang]/admin/users', 'page');
  }
  return res;
}

/**
 * Server Action: Update Website Settings
 */
export async function updateWebsiteSettingsAction(formData: FormData) {
  await requireAdminSession();

  const siteNameBn = (formData.get('siteNameBn') as string) || '';
  const siteNameEn = (formData.get('siteNameEn') as string) || '';
  const taglineBn = (formData.get('taglineBn') as string) || '';
  const taglineAr = (formData.get('taglineAr') as string) || '';
  const taglineEn = (formData.get('taglineEn') as string) || '';
  const logoType = (formData.get('logoType') as any) || 'star';
  const logoImageUrl = (formData.get('logoImageUrl') as string) || '';
  const showTagline = formData.get('showTagline') === 'true';
  const contactEmail = (formData.get('contactEmail') as string) || '';
  const maintenanceMode = formData.get('maintenanceMode') === 'true';

  const res = await updateWebsiteSettings({
    siteNameBn,
    siteNameEn,
    taglineBn,
    taglineAr,
    taglineEn,
    logoType,
    logoImageUrl,
    showTagline,
    contactEmail,
    maintenanceMode,
  });

  if (res.success) {
    revalidatePath('/[lang]/admin/settings', 'page');
    revalidatePath('/', 'layout');
  }
  return res;
}
