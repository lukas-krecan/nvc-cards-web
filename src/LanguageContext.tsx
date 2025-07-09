import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define supported languages
export type Language = 'cs' | 'en';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'cs',
  setLanguage: () => {},
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Props for the provider component
type LanguageProviderProps = {
  children: ReactNode;
};

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with browser language or saved preference
  const getBrowserLanguage = (): Language => {
    // Check localStorage first for saved preference
    const savedLanguage = localStorage.getItem('@language');
    if (savedLanguage === 'cs' || savedLanguage === 'en') {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('cs')) {
      return 'cs';
    }
    return 'en'; // Default to English for all other languages
  };

  const [language, setLanguageState] = useState<Language>(getBrowserLanguage());

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('@language', lang);
  };

  // Provide the language context to children
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};