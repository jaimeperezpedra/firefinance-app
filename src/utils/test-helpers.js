import { ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import React from 'react';

import { createClient } from './graphql-client';

const baseURL = 'http://ops.localhost';

export function definePathName(pathname) {
  global.jsdom?.reconfigure({
    url: `${baseURL}${pathname}`,
  });
}

// Wrap the child component tree with an ApolloProvider configured to use a
// default client.
export const TestingApolloProvider = ({ children, client }) => {
  if (!client) {
    client = createClient();
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

TestingApolloProvider.propTypes = {
  children: PropTypes.element.isRequired,
  client: PropTypes.object,
};
