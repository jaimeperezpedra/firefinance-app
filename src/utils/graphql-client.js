import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export const GRAPHQL_ENDPOINT_URI = '/graphql/';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === 'development') {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) =>
        console.error(`[GraphQL error]: Message: ${message}`)
      );
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  }
});

export const defaultConfig = () => ({
  link: from([
    errorLink,
    new HttpLink({
      credentials: 'include',
      uri: new URL(GRAPHQL_ENDPOINT_URI, window.location),
      fetch: (...args) => fetch(...args),
    }),
  ]),
  cache: new InMemoryCache(),
  // Fetch policies say whether the client uses its cache, the network, or a
  // combination of the two. ApolloClient uses the cache too much by default.
  //
  // Generally speaking, the UI should display the latest data. However a
  // reasonable compromise between performance and freshness is to initially
  // display a cached value and immediately refresh from the network.
  //
  // Any query can override the defaults below.
  defaultOptions: {
    // `query` is the low-level API. The cache is ignored (but still updated) by default.
    query: {
      fetchPolicy: 'network-only',
    },
    // `watchQuery` is "observable" and used by query hooks (useQuery,
    // useLazyQuery, etc). The cache is used for the initial value but the value
    // may be updated by a background network call.
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  },
});

export function createClient() {
  return new ApolloClient(defaultConfig());
}
