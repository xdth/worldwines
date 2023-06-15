import React, { createContext, useCallback, useState, useContext } from 'react';

interface Wine {
  id: number;
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

interface WineContextData {
  wine: Wine;
  handleWine(wine: Wine): void;
}

interface WineContextProviderProps {
  children: React.ReactNode;
}

const WineContext = createContext<WineContextData>({} as WineContextData);


const WineContextProvider: React.FC<WineContextProviderProps> = ({ children }) => {
  const [wine, setWine] = useState<Wine>({} as Wine);

  const handleWine = useCallback((wine: Wine) => {
    setWine(wine);
  }, []);

  return (
    <WineContext.Provider value={{ 
      wine,
      handleWine
      }}>
      {children}
    </WineContext.Provider>
  );
};

function useWineContext(): WineContextData {
  const context = useContext(WineContext);

  if (!context) {
    throw new Error('useWineContext must be used within an WineContextProvider');
  }

  return context;
}

export { WineContextProvider, useWineContext };