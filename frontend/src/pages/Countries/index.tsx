import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import WineBoxExpanded from '../../components/WineBoxExpanded';
import { Container } from './styles';

const Countries: React.FC = () => {
  
  const { isSearchBoxExpanded, wines, handleWines } = useAppContext();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('countries');
        handleWines(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    loadWines();
  }, []);

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wines)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
    <h1>Search results</h1>
    {Array.isArray(wines) &&
      wines.map((wine) => (
        <WineBoxExpanded wine={wine} key={wine.id} />
      ))}
    </Container>
  );
};

export default Countries;
