import React from 'react';
import { render } from '@testing-library/react';
import { ListExpenses } from './ListExpenses.js';


import { TestingApolloProvider } from '../../utils/test-helpers'

describe('ListExpenses',() => {
  it('renders loading', () => {
    const { container } = render(<TestingApolloProvider><ListExpenses /></TestingApolloProvider>);
    expect(container).toMatchSnapshot();
  });
})