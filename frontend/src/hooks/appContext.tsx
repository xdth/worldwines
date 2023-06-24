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
  countries: string[];
  varieties: string[];
  wineries: string[];
  handleIsSearchBoxExpanded(value: boolean) : void;
  handleWine(wine: Wine): void;
  handleWines(wines: Wine[]): void;
  handleCountries(countries: string[]): void;
  handleVarieties(varieties: string[]): void;
  handleWineries(wineries: string[]): void;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState<boolean>(false);
  
  const [wine, setWine] = useState<Wine>({} as Wine);

  const [wines, setWines] = useState<Wine[]>({} as Wine[]);

  const [countries, setCountries] = useState<string[]>({} as string[]);

  const [varieties, setVarieties] = useState<string[]>({} as string[]);

  const [wineries, setWineries] = useState<string[]>({} as string[]);

  const handleIsSearchBoxExpanded = useCallback((isSearchBoxExpanded: boolean) => {
    setIsSearchBoxExpanded(isSearchBoxExpanded);
  }, []);

  const handleWine = useCallback((wine: Wine) => {
    setWine(wine);
  }, []);

  const handleWines = useCallback((wines: Wine[]) => {
    setWines(wines);
  }, []);

  const handleCountries = useCallback((countries: string[]) => {
    setCountries(countries);
  }, []);

  const handleVarieties = useCallback((varieties: string[]) => {
    setVarieties(varieties);
  }, []);

  const handleWineries = useCallback((wineries: string[]) => {
    setWineries(wineries);
  }, []);


  return (
    <AppContext.Provider value={{ 
      isSearchBoxExpanded,
      wine,
      wines,
      countries,
      varieties,
      wineries,
      handleIsSearchBoxExpanded,
      handleWine,
      handleWines,
      handleCountries,
      handleVarieties,
      handleWineries
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