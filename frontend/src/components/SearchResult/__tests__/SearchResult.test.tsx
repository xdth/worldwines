// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResult from '../index';

test('renders SearchResult component', () => {
  render(<SearchResult />);
  const SearchResultText = screen.getByText('Search results');
  expect(SearchResultText).toBeInTheDocument();
});
