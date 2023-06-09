import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import { Winery } from './styles';

const Wineries: React.FC = () => {

  const { isSearchBoxExpanded, wineries, handleWineries } = useAppContext();
  const dataFetchedRef = useRef(false);
  const containerClassName = isSearchBoxExpanded ? 'reduced' : 'expanded';

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('wineries');
        handleWineries(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(wineries) || wineries.length === 0) {
      loadWines();
    }
  }, []);

  // if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wineries)) {
    return <div>Loading...</div>;
  }

  return (
    <section className={containerClassName}>
      <h1>Wineries</h1>
      {Array.isArray(wineries) &&
        wineries.map((winery, index) => (
          <Winery key={index} href={`/winery/${winery}`}>{winery}</Winery>
        ))}
      
    </section>
  );
};

export default Wineries;