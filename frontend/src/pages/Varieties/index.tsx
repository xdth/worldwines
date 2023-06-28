import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import { Variety } from './styles';

const Varieties: React.FC = () => {

  const { isSearchBoxExpanded, varieties, handleVarieties } = useAppContext();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('varieties');
        handleVarieties(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(varieties) || varieties.length === 0) {
      loadWines();
    }
  }, []);

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(varieties)) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>Varieties</h1>
      {Array.isArray(varieties) &&
        varieties.map((variety, index) => (
          <Variety key={index} href={`/variety/${variety}`}>{variety}</Variety>
        ))}
      
    </section>
  );
};

export default Varieties;