// This is just mocking a search

import React, { useEffect, useRef } from "react";
import { useAppContext } from './hooks/appContext';
import api from "./services/api";

const WineList: React.FC = () => {
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


  return (
    <div>
    </div>
  );
};

export default WineList;
