import React from 'react';
import { useAppContext } from '../../hooks/appContext';
import { Container } from './styles';
import WineBoxReduced from '../../components/WineBoxReduced';
// import WineBoxExpanded from '../WineBoxExpanded';

const SearchResult: React.FC = () => {
  const { isSearchBoxExpanded, wines } = useAppContext();

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wines)) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Search results</h1>
      {Array.isArray(wines) &&
        wines.map((wine) => (
          <WineBoxReduced wine={wine} key={wine.id} />
        ))}

      {/* {Array.isArray(wines) &&
        wines.map((wine) => (
          <WineBoxExpanded wine={wine} key={wine.id} />
        ))}           */}
    </Container>
  );
};

export default SearchResult;
