// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../index';

test('renders Footer component', () => {
  render(<Footer />);
  const FooterText = screen.getByText('Terms and Conditions');
  expect(FooterText).toBeInTheDocument();
});
