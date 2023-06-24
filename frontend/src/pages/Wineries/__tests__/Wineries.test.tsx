// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Wineries from '../index';

test('renders Wineries component', () => {
  render(<Wineries />);
  const WineriesText = screen.getByText('Loading...');
  expect(WineriesText).toBeInTheDocument();
});
