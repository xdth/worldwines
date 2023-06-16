// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../SearchBox';
import { AppContextProvider } from '../../../hooks/appContext';

test('renders SearchBox component', async () => {
  render(
    <AppContextProvider>
      <SearchBox />
    </AppContextProvider>
  );

  // Verify that the initial state is expanded
  const expandedInputContainer = screen.getByTestId('input-container-expanded');
  expect(expandedInputContainer).toBeInTheDocument();

  // Toggle the SearchBox to the reduced state
  const container = screen.getByTestId('input-container-expanded');

  container.setPointerCapture = jest.fn(); // Mocking setPointerCapture function

  await userEvent.click(container);

  // Verify that the state is now reduced
  const reducedInputContainer = screen.getByTestId('input-container-reduced');
  expect(reducedInputContainer).toBeInTheDocument();
});
