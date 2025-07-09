import React from 'react';
import App from './App';
import { useData } from './DataProvider';
import { useLanguage } from './LanguageContext';

const AppWrapper: React.FC = () => {
  const { needs, feelings, findCard } = useData();
  const { language, setLanguage } = useLanguage();

  // Pass the data and language functions to App as props
  return (
    <App 
      needs={needs}
      feelings={feelings}
      findCard={findCard}
      language={language}
      setLanguage={setLanguage}
    />
  );
};

export default AppWrapper;