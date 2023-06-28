import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import { Country } from './styles';

const Countries: React.FC = () => {

  const { isSearchBoxExpanded, countries, handleCountries } = useAppContext();
  const dataFetchedRef = useRef(false);
  const containerClassName = isSearchBoxExpanded ? 'expanded' : 'reduced';

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('countries');
        handleCountries(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(countries) || countries.length === 0) {
      loadWines();
    }
  }, []);

  // if(isSearchBoxExpanded) return null;

  if (!Array.isArray(countries)) {
    return <div>Loading...</div>;
  }

  return (
    <section className={containerClassName}>
      <h1>Countries</h1>
      {Array.isArray(countries) &&
        countries.map((country, index) => (
          <Country key={index} href={`/country/${country}`}>{country}</Country>
        ))}
      
    </section>
  );
};

export default Countries;