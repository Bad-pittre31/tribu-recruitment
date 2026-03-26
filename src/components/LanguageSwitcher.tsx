import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { cn } from '../utils/cn';

export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useTranslation();

  return (
    <div className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest", className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "transition-colors duration-300 hover:text-black",
          language === 'en' ? "text-black" : "text-gray-400"
        )}
      >
        EN
      </button>
      <span className="text-gray-200">|</span>
      <button
        onClick={() => setLanguage('fr')}
        className={cn(
          "transition-colors duration-300 hover:text-black",
          language === 'fr' ? "text-black" : "text-gray-400"
        )}
      >
        FR
      </button>
    </div>
  );
}
