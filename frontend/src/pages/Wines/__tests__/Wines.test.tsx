// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Wines from '../index';

test('renders Wines component', () => {
  render(<Wines />);
  const WinesText = screen.getByText('Wines');
  expect(WinesText).toBeInTheDocument();
});
