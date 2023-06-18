import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import { Container } from './styles';

const Wines: React.FC = () => {
  
  const { handleWines } = useAppContext();
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

    loadWines();
  }, []);

  // if(isSearchBoxExpanded) return null;

  // if (!Array.isArray(wines)) {
  //   return <div>Loading...</div>;
  // }

  // const isActive = location.pathname === '/wines';
  const isActive = '/wines';

  return (
    <Container className={isActive ? 'active' : ''}>
      Wines
    </Container>
  );
};

export default Wines;
