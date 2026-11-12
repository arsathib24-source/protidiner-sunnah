import type { Locale } from '@/types/i18n';

const dictionaries = {
  bn: () => import('./dictionaries/bn.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }
  return dictionaries.bn();
};
