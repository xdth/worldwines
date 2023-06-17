import React from 'react';
import { useAppContext } from '../../hooks/appContext';
import { Container, WineBoxReduced, WineBoxExpanded } from './styles';

const SearchResult: React.FC = () => {
  const { isSearchBoxExpanded, wines } = useAppContext();

  if(isSearchBoxExpanded) return null;

  if (!Array.isArray(wines)) {
    // Display a loading indicator or appropriate fallback when wines is not an array
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <h1>Wine List reduced</h1>
        {Array.isArray(wines) &&
        wines.map((wine) => (
          <WineBoxReduced key={wine.id}>
            <a href={`/wine/${wine.id}`}>
              <div className="wine-details">
                <h2>{wine.title}</h2>
                <p>
                  <span>Country:</span> {wine.country}
                </p>
                <p>
                  <span>Designation:</span> {wine.designation}
                </p>
                <p>
                  <span>Points:</span> {wine.points}
                </p>
                <p>
                  <span>Variety:</span> {wine.variety}
                </p>
                <p>
                  <span>Winery:</span> {wine.winery}
                </p>
                <p>
                  <span>Description: </span>
                  {wine.description && wine.description.length > 100
                    ? `${wine.description.slice(0, 100)}... `
                    : wine.description}
                    <span className="read-more">read more</span>
                </p>
              </div>
            </a>
          </WineBoxReduced>
        ))}

        <h1>Wine List expanded</h1>
        {Array.isArray(wines) &&
        wines.map((wine) => (
          <WineBoxExpanded key={wine.id}>
            <h2>{wine.title}</h2>
            <p>Country: {wine.country}</p>
            <p>Description: {wine.description}</p>
            <p>Designation: {wine.designation}</p>
            <p>Points: {wine.points}</p>
            <p>Price: {wine.price}</p>
            <p>Province: {wine.province}</p>
            <p>Region 1: {wine.region_1}</p>
            <p>Region 2: {wine.region_2}</p>
            <p>Taster Name: {wine.taster_name}</p>
            <p>Taster Twitter Handle: {wine.taster_twitter_handle}</p>
            <p>Variety: {wine.variety}</p>
            <p>Winery: {wine.winery}</p>
          </WineBoxExpanded>
        ))}
      </Container>
    </>
  );
};

export default SearchResult;
