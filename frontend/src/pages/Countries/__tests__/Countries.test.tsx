// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Countries from '../index';

test('renders Countries component', () => {
  render(<Countries />);
  const CountriesText = screen.getByText('Countries');
  expect(CountriesText).toBeInTheDocument();
});
