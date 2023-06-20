import React, { useEffect, useRef, useState } from 'react';
import api from "../../services/api";
import { Container, Country } from './styles';

const Countries: React.FC = () => {

  const [countries, setWinesArray] = useState<string[]>([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('countries');
        setWinesArray(response.data as string[]);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    loadWines();
  }, []);

  if (countries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Countries</h1>
      {countries.map((wine) => (
        <Country key={wine} href={`/country/${wine}`}>{wine}</Country>
      ))}
    </Container>
  );
};

export default Countries;