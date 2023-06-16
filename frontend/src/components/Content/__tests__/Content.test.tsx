// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from '../index';

test('renders Navbar component', () => {
  render(<Content />);
  const ContentText = screen.getByText('Terms and Conditions');
  expect(ContentText).toBeInTheDocument();
});
