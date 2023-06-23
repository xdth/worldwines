import React, { useEffect, useRef, useState } from 'react';
import api from "../../services/api";
import { Container, Variety } from './styles';

const Varieties: React.FC = () => {

  const [varieties, setWinesArray] = useState<string[]>([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('varieties');
        setWinesArray(response.data as string[]);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    loadWines();
  }, []);

  if (varieties.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Varieties</h1>
      {varieties.map((wine) => (
        <Variety key={wine} href={`/variety/${wine}`}>{wine}</Variety>
      ))}
    </Container>
  );
};

export default Varieties;