import React, { createContext, useCallback, useState, useContext } from 'react';

interface Wine {
  id?: number;
  country?: string;
  description?: string;
  designation?: string;
  points?: number;
  price?: number;
  province?: string;
  region_1?: string;
  region_2?: string;
  taster_name?: string;
  taster_twitter_handle?: string;
  title?: string;
  variety?: string;
  winery?: string;
}

interface AppContextData {
  isSearchBoxExpanded: boolean;
  wine: Wine;
  wines: Wine[];
  handleIsSearchBoxExpanded(value: boolean) : void;
  handleWine(wine: Wine): void;
  handleWines(wines: Wine[]): void;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState<boolean>(true);
  
  const [wine, setWine] = useState<Wine>({} as Wine);

  const [wines, setWines] = useState<Wine[]>({} as Wine[]);

  const handleIsSearchBoxExpanded = useCallback((isSearchBoxExpanded: boolean) => {
    setIsSearchBoxExpanded(isSearchBoxExpanded);
  }, []);

  const handleWine = useCallback((wine: Wine) => {
    setWine(wine);
  }, []);

  const handleWines = useCallback((wines: Wine[]) => {
    setWines(wines);
  }, []);


  return (
    <AppContext.Provider value={{ 
      isSearchBoxExpanded,
      wine,
      wines,
      handleIsSearchBoxExpanded,
      handleWine,
      handleWines
      }}>
      {children}
    </AppContext.Provider>
  );
};

function useAppContext(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
}

export { AppContextProvider, useAppContext };