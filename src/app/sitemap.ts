import { MetadataRoute } from 'next';
import { CLASSICAL_BOOKS } from '@/lib/data/books';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protidinersunnah.com';
  const locales = ['bn', 'ar', 'en'] as const;
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Core static pages per locale
  locales.forEach((locale) => {
    routes.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/ebooks`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/categories`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${locale}/bookmarks`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/${locale}/design-system`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.3,
      }
    );
  });

  // Unique categories
  const categories = Array.from(new Set(CLASSICAL_BOOKS.map((b) => b.category.slug)));
  categories.forEach((catSlug) => {
    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}/categories/${catSlug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Dynamic book and reader pages
  CLASSICAL_BOOKS.forEach((book) => {
    locales.forEach((locale) => {
      routes.push(
        {
          url: `${baseUrl}/${locale}/ebooks/${book.slug}`,
          lastModified: book.publishedAt ? new Date(book.publishedAt).toISOString() : currentDate,
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${baseUrl}/${locale}/read/${book.slug}`,
          lastModified: book.publishedAt ? new Date(book.publishedAt).toISOString() : currentDate,
          changeFrequency: 'weekly',
          priority: 0.85,
        }
      );
    });
  });

  return routes;
}
