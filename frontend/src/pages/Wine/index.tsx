import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import WineBoxExpanded from '../../components/WineBoxExpanded';
import { useMatch } from 'react-router-dom';
import { Container } from './styles';

const Wine: React.FC = () => {
  const { isSearchBoxExpanded, wine, handleWine } = useAppContext();
  const containerClassName = isSearchBoxExpanded ? 'reduced' : 'expanded';
  const dataFetchedRef = useRef(false);
  const match = useMatch('/wine/:id');  

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const wineId = match?.params.id;
        if (!wineId) {
          console.error("Wine ID not found in URL parameters.");
          return;
        }

        const response = await api.get(`wine/${wineId}`);
        handleWine(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(wine) || wine.length === 0) {
      loadWines();
    }
  }, [match]);

  // if(isSearchBoxExpanded) return null;

  // if (!Array.isArray(wine)) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Container className={containerClassName}>
      {/* {Array.isArray(wines) && */}
        {/* wine.map((wine) => (
          <WineBoxExpanded wine={wine} key={wine.id} />
        ))
      // }           */}

      <WineBoxExpanded wine={wine} />
    </Container>
  );
}

export default Wine;