import React, { createContext, useContext, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';
import * as CsData from './Data';
import * as EnData from './Data_en';
import { CardInfo } from './Data';

// Define the data context type
type DataContextType = {
  needs: CardInfo[];
  feelings: CardInfo[];
  findCard: (id: string) => CardInfo;
};

// Create the context with default values
const DataContext = createContext<DataContextType>({
  needs: [],
  feelings: [],
  findCard: () => ({ id: '', data: [] }),
});

// Custom hook to use the data context
export const useData = () => useContext(DataContext);

// Props for the provider component
type DataProviderProps = {
  children: ReactNode;
};

// Provider component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { language } = useLanguage();
  
  // Select the appropriate data based on language
  const data = language === 'cs' ? CsData : EnData;
  
  // Create the context value
  const contextValue: DataContextType = {
    needs: data.needs,
    feelings: data.feelings,
    findCard: data.findCard,
  };
  
  // Provide the data context to children
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};