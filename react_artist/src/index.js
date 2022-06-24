import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) =>
      alert(`GraphQL Error ${message}`)
    );
  }
});

const admin_api = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:4000/admin-api',
    credentials: 'include',
  }),
]);
const shop_api = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:4000/shop-api',
    credentials: 'include',
  }),
]);

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === 'admin_api',
    admin_api,
    shop_api
  ),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
