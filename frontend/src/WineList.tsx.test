import React, { useEffect, useState } from "react";

interface Wine {
  country: string;
  description: string;
  designation: string;
  id: number;
  points: number;
  price: number;
  province: string;
  region_1: string;
  region_2: string;
  taster_name: string;
  taster_twitter_handle: string;
  title: string;
  variety: string;
  winery: string;
}

const WineList: React.FC = () => {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/wines")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWines(data);
      });
  }, []);

  return (
    <div>
      <h1>Wine List</h1>
      {wines.map((wine) => (
        <div key={wine.id}>
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
          <hr />
        </div>
      ))}
    </div>
  );
};

export default WineList;
