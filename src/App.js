import React from 'react';
import { HashRouter as Router, Outlet } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import store from './store/store'
import { MainRoutes } from './MainRoutes';

let persistor = persistStore(store);

export const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <MainRoutes />
        <Outlet />
      </Router>
      </PersistGate>
    </Provider>
  );
}
