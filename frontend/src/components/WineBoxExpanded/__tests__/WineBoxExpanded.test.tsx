// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import WineBoxExpanded from '../index';

test('renders WineBoxExpanded component', () => {
  const wine = {
    id: 1,
    country: 'Belgique',
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

  render(<WineBoxExpanded wine={wine} />);
  
  const countryElement = screen.getByText('Belgique');
  expect(countryElement).toBeInTheDocument();
});
