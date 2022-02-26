import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

let httpLink = 'http://localhost:4012/'
if (process.env.NODE_ENV !== 'production') {
  httpLink = 'https://firefinance.vercel.app/server.js'
}
const link = createHttpLink({ uri: httpLink })

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const startApp = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
    ,
    document.getElementById('root')
  );
}

if(!window.cordova) {
  startApp();
} else {
  document.addEventListener('deviceready', startApp, false);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
