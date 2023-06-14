// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../index';

test('renders Navbar component', () => {
  render(<Navbar />);
  const appLogo = screen.getByText(/worldwines.app/i);
  expect(appLogo).toBeInTheDocument();
});
