// // @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, RouteProps } from 'react-router-dom';
import Navbar from '../index';

const TestComponent: React.FC<RouteProps> = () => <Navbar />;

test('renders Navbar component', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Route path="/" Component={TestComponent} />
    </MemoryRouter>
  );

  const homeLink = screen.getByText('Home');
  const winesLink = screen.getByText('Wines');
  const countriesLink = screen.getByText('Countries');
  const varietiesLink = screen.getByText('Varieties');
  const wineriesLink = screen.getByText('Wineries');

  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveClass('active');
  expect(winesLink).toBeInTheDocument();
  expect(winesLink).not.toHaveClass('active');
  expect(countriesLink).toBeInTheDocument();
  expect(countriesLink).not.toHaveClass('active');
  expect(varietiesLink).toBeInTheDocument();
  expect(varietiesLink).not.toHaveClass('active');
  expect(wineriesLink).toBeInTheDocument();
  expect(wineriesLink).not.toHaveClass('active');
});
