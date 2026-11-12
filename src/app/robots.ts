import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protidinersunnah.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/bn/admin',
          '/bn/admin/*',
          '/ar/admin',
          '/ar/admin/*',
          '/en/admin',
          '/en/admin/*',
          '/api',
          '/api/*',
          '/auth',
          '/auth/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
