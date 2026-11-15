import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, SUPPORTED_LOCALES } from '@/types/i18n';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getWebsiteSettings } from '@/lib/admin/admin-store';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Locale;
  if (!SUPPORTED_LOCALES[lang]) {
    return {};
  }
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://protidinersunnah.com'),
    title: {
      default: `${dict.brand.name} | ${dict.brand.tagline}`,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.brand.description,
    keywords: [
      dict.brand.name,
      'Islamic Library',
      'Sunnah',
      'Hadith',
      'Ebook',
      lang === 'bn' ? 'বাংলা ইসলামিক বই' : lang === 'ar' ? 'كتب إسلامية' : 'Authentic Islamic Ebooks',
      'Daily Sunnah',
    ],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        bn: '/bn',
        ar: '/ar',
        en: '/en',
        'x-default': '/bn',
      },
    },
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    openGraph: {
      title: dict.brand.name,
      description: dict.brand.description,
      type: 'website',
      locale: lang === 'bn' ? 'bn_BD' : lang === 'ar' ? 'ar_SA' : 'en_US',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 800,
          alt: dict.brand.name,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Locale;

  if (!SUPPORTED_LOCALES[lang]) {
    notFound();
  }

  const localeConfig = SUPPORTED_LOCALES[lang];
  const [dict, settings] = await Promise.all([
    getDictionary(lang),
    getWebsiteSettings(),
  ]);

  return (
    <html lang={lang} dir={localeConfig.dir} className="scroll-smooth">
      <body
        className={`min-h-screen flex flex-col bg-background text-foreground ${localeConfig.fontClass} antialiased`}
      >
        <Header locale={lang} dict={dict} siteSettings={settings} />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} dict={dict} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://protidiner-sunnah-9ceq.vercel.app/#organization',
                  name: 'প্রতিদিনের সুন্নাহ (Protidiner Sunnah)',
                  url: 'https://protidiner-sunnah-9ceq.vercel.app',
                  description: 'Authentic Multilingual Islamic Knowledge & Classical Ebook Platform',
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://protidiner-sunnah-9ceq.vercel.app/#website',
                  url: 'https://protidiner-sunnah-9ceq.vercel.app',
                  name: dict.brand.name,
                  publisher: {
                    '@id': 'https://protidiner-sunnah-9ceq.vercel.app/#organization',
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
