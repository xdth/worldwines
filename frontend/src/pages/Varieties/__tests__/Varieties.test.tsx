// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Varieties from '../index';

test('renders Varieties component', () => {
  render(<Varieties />);
  const VarietiesText = screen.getByText('Varieties');
  expect(VarietiesText).toBeInTheDocument();
});
