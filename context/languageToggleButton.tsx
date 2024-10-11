// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { languageTexts } from '../constants/Text'; // Ensure path is correct

interface LanguageContextType {
  currentLanguage: 'e' | 'm';
  toggleLanguage: () => void;
  getText: (key: keyof typeof languageTexts) => string;
  displayLanguage: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<'e' | 'm'>('e');

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'e' ? 'm' : 'e'));
  };

  const getText = (key: keyof typeof languageTexts) => {
    return languageTexts[key][currentLanguage];
  };

  const displayLanguage = currentLanguage === 'e' ? 'English' : 'Māori';

  const contextValue = React.useMemo(() => ({
    currentLanguage,
    toggleLanguage,
    getText,
    displayLanguage,
  }), [currentLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
