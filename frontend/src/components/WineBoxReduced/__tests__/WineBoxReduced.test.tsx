// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import WineBoxReduced from '../index';

test('renders WineBoxExpanded component', () => {
  const wine = {
    id: 1,
    country: 'France',
    description: 'Lorem ipsum dolor sit amet',
    designation: 'Designation 1',
    points: 90,
    variety: 'Variety 1',
    winery: 'Winery 1',
    province: 'Province 1',
    region_1: 'Region 1',
    region_2: 'Region 2',
    taster_name: 'Taster Name 1',
    taster_twitter_handle: '@taster1',
  };

  render(<WineBoxReduced wine={wine} />);

  const countryElement = screen.getByText(`Country: ${wine.country}`);
  expect(countryElement).toBeInTheDocument();

  const designationElement = screen.getByText(`Designation: ${wine.designation}`);
  expect(designationElement).toBeInTheDocument();

  const pointsElement = screen.getByText(`Points: ${wine.points}`);
  expect(pointsElement).toBeInTheDocument();

  const varietyElement = screen.getByText(`Variety: ${wine.variety}`);
  expect(varietyElement).toBeInTheDocument();

  const wineryElement = screen.getByText(`Winery: ${wine.winery}`);
  expect(wineryElement).toBeInTheDocument();

  const provinceElement = screen.getByText(`Province: ${wine.province}`);
  expect(provinceElement).toBeInTheDocument();

  const region1Element = screen.getByText(`Region 1: ${wine.region_1}`);
  expect(region1Element).toBeInTheDocument();

  const region2Element = screen.getByText(`Region 2: ${wine.region_2}`);
  expect(region2Element).toBeInTheDocument();

  const tasterNameElement = screen.getByText(`Taster Name: ${wine.taster_name}`);
  expect(tasterNameElement).toBeInTheDocument();

  const tasterTwitterElement = screen.getByText(`Taster Twitter Handle: ${wine.taster_twitter_handle}`);
  expect(tasterTwitterElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(`Description: ${wine.description}`);
  expect(descriptionElement).toBeInTheDocument();
});
