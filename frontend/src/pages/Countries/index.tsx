import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../hooks/appContext';
import api from "../../services/api";
import { Container, Country } from './styles';

const Countries: React.FC = () => {

  const { isSearchBoxExpanded, countries, handleCountries } = useAppContext();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('countries');
        console.table(response.data);
        handleCountries(response.data);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    if (!Array.isArray(countries) || countries.length === 0) {
      loadWines();
    }
  }, []);

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(countries)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Countries</h1>
      {Array.isArray(countries) &&
        countries.map((country, index) => (
          <Country key={index} href={`/country/${country.name}`}>{country.name}</Country>
        ))}
      
    </Container>
  );
};

export default Countries;