import React from 'react';
import { WineBoxReducedContainer } from './styles';

// @todo omit useless properties
interface Wine {
  id?: number;
  country?: string;
  description?: string;
  designation?: string;
  points?: number;
  price?: number;
  province?: string;
  region_1?: string;
  region_2?: string;
  taster_name?: string;
  taster_twitter_handle?: string;
  title?: string;
  variety?: string;
  winery?: string;
}

interface WineBoxReducedProps {
  wine: Wine;
}

const WineBoxReduced: React.FC<WineBoxReducedProps> = ({ wine }) => {
  return (
      <WineBoxReducedContainer>
        <a href={`/wine/${wine.id}`}>
          <div className="wine-details">
            <h2 key={wine.id}>{wine.title}</h2>
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
      </WineBoxReducedContainer>
  );
};

export default WineBoxReduced;
