import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import WineBoxReduced from '../../components/WineBoxReduced';
import { Container } from './styles';

const Wines: React.FC = () => {
  
  const { isSearchBoxExpanded, wines, handleWines } = useAppContext();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('wines');
        handleWines(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(wines) || wines.length === 0) {
      loadWines();
    }
  }, []);

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wines)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
    <h1>Wines</h1>
    {Array.isArray(wines) &&
      wines.map((wine, index) => (
        <WineBoxReduced wine={wine} key={index} />
      ))}
    </Container>
  );
};

export default Wines;
