export type Locale = 'bn' | 'ar' | 'en';

export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  dir: Direction;
  fontClass: string;
}

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    dir: 'ltr',
    fontClass: 'font-bengali',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    fontClass: 'font-arabic',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    fontClass: 'font-english',
  },
};

export const DEFAULT_LOCALE: Locale = 'bn';

export type I18nRecord<T = string> = {
  bn: T;
  ar: T;
  en: T;
};
