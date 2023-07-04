import React from 'react';
import { Link } from 'react-router-dom';
import { WineBoxExpandedContainer } from './styles';

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

interface WineBoxExpandedProps {
  wine: Wine;
}

const WineBoxExpanded: React.FC<WineBoxExpandedProps> = ({ wine }) => {

  return (
    <WineBoxExpandedContainer>
      <Link to={`/wine/${wine.id}`}>
        <div className="wine-details">
          {/* <h1 key={wine.id}>{wine.title}</h1> */}
          {wine.country && <p><span>Country:</span> {wine.country}</p>}
          {wine.designation && <p><span>Designation:</span> {wine.designation}</p>}
          {wine.points && <p><span>Points:</span> {wine.points}</p>}
          {wine.variety && <p><span>Variety:</span> {wine.variety}</p>}
          {wine.winery && <p><span>Winery:</span> {wine.winery}</p>}
          {/* {wine.price && <p><span>Price:</span> {wine.price}</p>} */}
          {wine.province && <p><span>Province:</span> {wine.province}</p>}
          {wine.region_1 && <p><span>Region 1:</span> {wine.region_1}</p>}
          {wine.region_2 && <p><span>Region 2:</span> {wine.region_2}</p>}
          {wine.taster_name && <p><span>Taster Name:</span> {wine.taster_name}</p>}
          {wine.taster_twitter_handle && (
            <p>
              <span>Taster Twitter Handle:</span> {wine.taster_twitter_handle}
            </p>
          )}
          {wine.description && <p><span>Description:</span> {wine.description}</p>}
        </div>
      </Link>
    </WineBoxExpandedContainer>
  );
};

export default WineBoxExpanded;
