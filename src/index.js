import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { ApolloWrapper } from './ApolloWrapper'
import store from './store/store'

let persistor = persistStore(store);

const startApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloWrapper>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ApolloWrapper>
      </PersistGate>
    </Provider>
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
