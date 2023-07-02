// @ts-expect-error // get rid of 'React' is declared but its value is never read.ts
import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from '../index';

test('renders Article component', () => {
  render(<Article />);
  const ArticleText = screen.getByText('Article');
  expect(ArticleText).toBeInTheDocument();
});
