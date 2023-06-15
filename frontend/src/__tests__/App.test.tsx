// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App component without errors', () => {
  render(<App />);
});
