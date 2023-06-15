// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBox from '../index';

test('renders the SearchBox component with reduced styling', () => {
  const isExpanded = false;
  render(<SearchBox isExpanded={isExpanded} />);

  const container = screen.getByTestId('input-container-reduced');
  const input = screen.getByTestId('input-reduced');

  expect(container).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});

test('renders the SearchBox component with expanded styling', () => {
  const isExpanded = true;
  render(<SearchBox isExpanded={isExpanded} />);

  const container = screen.getByTestId('input-container-expanded');
  const input = screen.getByTestId('input-expanded');

  expect(container).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});
