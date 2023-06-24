import React, { useEffect, useRef, useState } from 'react';
import api from "../../services/api";
import { Container, Winery } from './styles';

const Wineries: React.FC = () => {

  const [wineries, setWinesArray] = useState<string[]>([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    async function loadWines(): Promise<void> {
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;

      try {
        const response = await api.get('wineries');
        setWinesArray(response.data as string[]);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    loadWines();
  }, []);

  if (wineries.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Wineries</h1>
      {wineries.map((wine) => (
        <Winery key={wine} href={`/winery/${wine}`}>{wine}</Winery>
      ))}
    </Container>
  );
};

export default Wineries;