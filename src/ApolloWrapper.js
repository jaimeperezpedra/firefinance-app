import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { useSelector } from 'react-redux'
import { setContext } from '@apollo/client/link/context';
import PropTypes from 'prop-types';

let httpLink = 'http://localhost:4012/'
if (process.env.NODE_ENV === 'production') {
  httpLink = 'https://firefinance.vercel.app/server.js'
}


export const ApolloWrapper = ({children}) => {
  const credentials = useSelector(state => state.credentials);
  console.log(credentials);
  const link = createHttpLink({ uri: httpLink })

  const authLink = setContext((_, { headers }) => {
    const token = credentials.values.accessToken;
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      }
    }
  });


  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
};

ApolloWrapper.propTypes = {
  children: PropTypes.node,
}