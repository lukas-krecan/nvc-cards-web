import { Language } from './LanguageContext';

// Define the structure of our translations
type TranslationsType = {
  [key in Language]: {
    menu: {
      share: string;
      load: string;
      save: string;
      delete: string;
    };
    messages: {
      noCardsSelected: string;
    };
    navigation: {
      feelings: string;
      needs: string;
      selection: string;
      help: string;
      appTitle: string;
    };
    dialogs: {
      save: {
        title: string;
        namePlaceholder: string;
        storageInfo: string;
        saveButton: string;
      };
      share: {
        title: string;
        copyButton: string;
      };
      load: {
        title: string;
        loadButton: string;
        deleteConfirmation: string;
      };
    };
  };
};

// Define the translations
export const translations: TranslationsType = {
  cs: {
    menu: {
      share: 'Sdílet',
      load: 'Načíst',
      save: 'Uložit',
      delete: 'Vymazat',
    },
    messages: {
      noCardsSelected: 'Nejsou vybrány žádné kartičky',
    },
    navigation: {
      feelings: 'Pocity',
      needs: 'Potřeby',
      selection: 'Výběr',
      help: 'Nápověda',
      appTitle: 'NVC Kartičky',
    },
    dialogs: {
      save: {
        title: 'Uložit',
        namePlaceholder: 'Jméno',
        storageInfo: 'Data jsou uložena u vás v prohlížeči, nejsou tedy nikde sdílena.',
        saveButton: 'Uložit',
      },
      share: {
        title: 'Vybrané kartičky',
        copyButton: 'Zkopírovat do schránky',
      },
      load: {
        title: 'Uložené výběry',
        loadButton: 'Načíst',
        deleteConfirmation: 'Upravdu chcete vymazat {name} z {date}',
      },
    },
  },
  en: {
    menu: {
      share: 'Share',
      load: 'Load',
      save: 'Save',
      delete: 'Delete',
    },
    messages: {
      noCardsSelected: 'No cards selected',
    },
    navigation: {
      feelings: 'Feelings',
      needs: 'Needs',
      selection: 'Selection',
      help: 'Help',
      appTitle: 'NVC Cards',
    },
    dialogs: {
      save: {
        title: 'Save',
        namePlaceholder: 'Name',
        storageInfo: 'Data is stored in your browser, not shared anywhere.',
        saveButton: 'Save',
      },
      share: {
        title: 'Selected cards',
        copyButton: 'Copy to clipboard',
      },
      load: {
        title: 'Saved selections',
        loadButton: 'Load',
        deleteConfirmation: 'Do you really want to delete {name} from {date}',
      },
    },
  },
};

// Helper function to get translations based on current language
export const getTranslation = (language: Language) => translations[language];
