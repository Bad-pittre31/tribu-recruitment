import { en } from './translations/en';
import { fr } from './translations/fr';

export const translations = {
  en,
  fr,
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof en;

export function getTranslation(lang: Language) {
  return translations[lang];
}
