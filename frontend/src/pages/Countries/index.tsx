import React from 'react';
import { useAppContext } from '../../hooks/appContext';
import { Container } from './styles';

const Countries: React.FC = () => {
  const { isSearchBoxExpanded, wines } = useAppContext();

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wines)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      Countries
    </Container>
  );
};

export default Countries;
